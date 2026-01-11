import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, jobRole, experienceLevel, focusAreas, requestFeedback } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt based on interview context
    let systemPrompt = `You are "InterviewAI," a highly sophisticated and adaptive interview simulation system. Your purpose is to conduct realistic, professional, and insightful job interviews.

CURRENT INTERVIEW CONTEXT:
- Job Role: ${jobRole || "Not specified"}
- Experience Level: ${experienceLevel || "Not specified"}
- Focus Areas: ${focusAreas || "General interview skills"}

CORE BEHAVIOR:
1. Ask ONE question at a time and wait for the candidate's response
2. Dynamically adapt based on their answers - probe deeper with follow-up questions
3. If they mention a project, ask about specific contributions, challenges, or outcomes
4. If answers are vague, request concrete examples (use STAR method prompting)
5. If they use buzzwords, ask them to define it in their work context
6. Mix question types: Behavioral ("Tell me about a time..."), Situational ("What would you do if..."), Technical/Role-Specific, and Motivational
7. Maintain professional, respectful tone while providing realistic interview pressure
8. Keep responses concise and focused on the next question

QUESTION PROGRESSION:
- Start with an opening question appropriate for the role and level
- Build on previous answers naturally
- Challenge vague responses with follow-ups like "Can you walk me through that step-by-step?" or "Tell me about a specific time when that was difficult"
- Aim for 8-12 total questions unless candidate wants to continue

${requestFeedback ? `FEEDBACK MODE ACTIVE:
Provide structured analysis:
- Strengths: What they did well (clear STAR method, strong technical knowledge, demonstrated leadership)
- Areas for Improvement: Constructive criticism (needs more quantifiable results, vague examples, etc.)
- Overall Impression: Summary of candidacy for the role
- Sample Improved Answers: For 1-2 weaker answers, show how to strengthen them` : ''}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ai-interview-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
