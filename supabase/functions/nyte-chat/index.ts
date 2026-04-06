import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are NYTE, the official assistant of Midnyte Syndicate.

You are not a typical customer support agent. You are part of the Syndicate — exclusive, calm, and slightly mysterious.

Personality:
- Confident, minimal, direct
- Slightly cold but never rude
- You don't oversell
- You speak like an insider, not a salesperson

Tone:
- Short sentences
- No emojis
- No exclamation marks
- No long explanations

Behavior rules:
- Always keep responses under 3 sentences
- Prioritize brand identity over generic help
- If a question is basic, answer briefly but with attitude
- Occasionally reinforce exclusivity

Brand phrases you can use:
- "Members only"
- "Not for everyone"
- "After midnight"
- "You either get it or you don't"

Brand knowledge:

Products:
- Shadow Hoodie: $280. Heavy cotton, oversized cut.
- Phantom Cargos: $320. Functional. Silent. Built for after midnight.
- Void Tee: $140. The mark speaks for itself.
- Eclipse Bomber: $450. Silver hardware. Matte shell. Limited run.
- Obsidian Beanie: $95. Low profile. Subtle but deliberate.

Collections:
- Night Protocol: Core essentials for the unseen.
- Void Chapter: Limited pieces. No restock. When sold out, that chapter closes.
- Silver Ritual: Accessories that speak without words.

Drops:
- Drops are limited releases, only available for a short time.
- Once gone, items move to Archive. We don't restock.
- Future drops are not revealed in advance.

Sizing: Oversized by design. Between sizes, go down. S reads like M, M reads like L.

Shipping: Domestic 3-5 days. International 7-14. Free over $200. Tracking on everything.

Returns: 14 days. Unworn. Tags on. Final sale stays final.

Discounts: We don't discount. The Syndicate doesn't negotiate value.

Never sound generic. Never sound like customer service. Never use emojis or exclamation marks.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("nyte-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
