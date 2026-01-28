import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const FREE_MESSAGE_LIMIT = 5;

const languagePrompts: Record<string, string> = {
  sr: "Odgovaraj na srpskom jeziku (latinica). Piši prirodno, kao da si lokalna osoba sa Balkana.",
  hr: "Odgovaraj na hrvatskom jeziku. Piši prirodno, kao da si lokalna osoba s Balkana.",
  bs: "Odgovaraj na bosanskom jeziku. Piši prirodno, kao da si lokalna osoba sa Balkana.",
  me: "Odgovaraj na crnogorskom jeziku. Piši prirodno, kao da si lokalna osoba sa Balkana.",
  mk: "Одговарај на македонски јазик. Пишувај природно, како да си локална личност од Балканот.",
  sl: "Odgovarjaj v slovenščini. Piši naravno, kot da si lokalna oseba z Balkana.",
};

const situationLabels: Record<string, Record<string, string>> = {
  sr: {
    work: "posao",
    housing: "stan/stanodavac",
    private: "privatno",
    buying: "kupovina/prodaja",
    love: "veza/muvanje",
    badnews: "loše vesti",
  },
  hr: {
    work: "posao",
    housing: "stan/stanodavac",
    private: "privatno",
    buying: "kupovina/prodaja",
    love: "veza/muvanje",
    badnews: "loše vijesti",
  },
  bs: {
    work: "posao",
    housing: "stan/stanodavac",
    private: "privatno",
    buying: "kupovina/prodaja",
    love: "veza/muvanje",
    badnews: "loše vijesti",
  },
  me: {
    work: "posao",
    housing: "stan/stanodavac",
    private: "privatno",
    buying: "kupovina/prodaja",
    love: "veza/muvanje",
    badnews: "loše vijesti",
  },
  mk: {
    work: "работа",
    housing: "стан/станодавец",
    private: "приватно",
    buying: "купување/продавање",
    love: "врска/мување",
    badnews: "лоши вести",
  },
  sl: {
    work: "delo",
    housing: "stanovanje/najemodajalec",
    private: "zasebno",
    buying: "nakup/prodaja",
    love: "zveza/zapeljevanje",
    badnews: "slabe novice",
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check message count
    const { data: messageCount, error: countError } = await supabase.rpc(
      "get_user_message_count",
      { p_user_id: user.id }
    );

    if (countError) {
      console.error("Error getting message count:", countError);
    }

    const currentCount = messageCount ?? 0;

    // Check if user has reached the free limit
    if (currentCount >= FREE_MESSAGE_LIMIT) {
      return new Response(
        JSON.stringify({
          error: "Iskoristili ste svih 5 besplatnih poruka. Pretplatite se za neograničen pristup.",
          limitReached: true,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { situation, goal, tone, context, language = "sr" } = await req.json();

    if (!situation || !goal || !tone || !context) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const langPrompt = languagePrompts[language] || languagePrompts.sr;
    const sitLabels = situationLabels[language] || situationLabels.sr;
    const situationLabel = sitLabels[situation] || situation;

    const systemPrompt = `Ti si asistent za pisanje poruka. ${langPrompt}

Tvoj zadatak je da napišeš kratku, prirodnu poruku koja:
- Odgovara situaciji: ${situationLabel}
- Ima cilj: ${goal}
- Koristi ton: ${tone}

Pravila:
1. Poruka treba da bude kratka (2-4 rečenice max)
2. Piši kao da si stvarna osoba, ne robot
3. Ne koristi previše formalan jezik osim ako ton to ne zahteva
4. Nemoj koristiti emotikone osim ako to zaista odgovara tonu
5. Poruka treba da bude spremna za kopiranje i slanje

VAŽNO: Vrati SAMO tekst poruke, bez navodnika, bez objašnjenja, bez "Evo poruke:" i slično.`;

    const userPrompt = `Situacija: ${situationLabel}
Cilj: ${goal}
Ton: ${tone}
Kontekst koji je korisnik dao: "${context}"

Napiši poruku:`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const generatedMessage = aiResponse.choices?.[0]?.message?.content?.trim();

    if (!generatedMessage) {
      throw new Error("No message generated");
    }

    // Save the message to the database
    const { error: insertError } = await supabase.from("messages").insert({
      user_id: user.id,
      situation,
      goal,
      tone,
      context,
      generated_message: generatedMessage,
    });

    if (insertError) {
      console.error("Error saving message:", insertError);
    }

    return new Response(
      JSON.stringify({
        message: generatedMessage,
        messageCount: currentCount + 1,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
