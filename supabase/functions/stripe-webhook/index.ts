import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!stripeKey || !webhookSecret) {
      throw new Error("Stripe keys not configured");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) throw new Error("No stripe-signature header");

    const body = await req.text();
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Webhook event:", event.type);

    const syncFromCustomer = async (customerId: string) => {
      const customer = await stripe.customers.retrieve(customerId);
      if (customer.deleted) return;
      const email = (customer as Stripe.Customer).email;
      if (!email) return;

      const { data: userData } = await supabaseAdmin
        .from("subscribers")
        .select("user_id")
        .eq("email", email)
        .maybeSingle();
      if (!userData?.user_id) {
        console.log("No user found for email:", email);
        return;
      }

      const subs = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        limit: 1,
      });
      const sub = subs.data[0];
      const subscribed = sub && (sub.status === "active" || sub.status === "trialing");
      const tier = sub?.items.data[0]?.price?.recurring?.interval === "year" ? "yearly" : "monthly";
      const endIso = sub ? new Date(sub.current_period_end * 1000).toISOString() : null;

      await supabaseAdmin.from("subscribers").upsert(
        {
          user_id: userData.user_id,
          email,
          stripe_customer_id: customerId,
          subscribed: Boolean(subscribed),
          subscription_tier: subscribed ? tier : null,
          subscription_end: subscribed ? endIso : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
    };

    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const obj = event.data.object as { customer?: string };
        if (obj.customer) await syncFromCustomer(obj.customer);
        break;
      }
      default:
        console.log("Unhandled:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("stripe-webhook error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
