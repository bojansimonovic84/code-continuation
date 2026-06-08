import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (userErr || !userData.user?.email) throw new Error("Not authenticated");
    const user = userData.user;

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });

    let subscribed = false;
    let tier: string | null = null;
    let endIso: string | null = null;
    let customerId: string | null = null;

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      const subs = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      if (subs.data.length > 0) {
        const sub = subs.data[0];
        subscribed = true;
        endIso = new Date(sub.current_period_end * 1000).toISOString();
        const interval = sub.items.data[0]?.price?.recurring?.interval;
        tier = interval === "year" ? "yearly" : "monthly";
      }
    }

    await supabaseAdmin.from("subscribers").upsert(
      {
        user_id: user.id,
        email: user.email,
        stripe_customer_id: customerId,
        subscribed,
        subscription_tier: tier,
        subscription_end: endIso,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    return new Response(
      JSON.stringify({ subscribed, subscription_tier: tier, subscription_end: endIso }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (err) {
    console.error("check-subscription error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message, subscribed: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
