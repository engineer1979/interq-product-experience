import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { questionId, code, language, userId, interviewId } = await req.json();
    
    if (!questionId || !code || !userId || !interviewId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch question details
    const { data: question, error: questionError } = await supabase
      .from('interview_questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (questionError || !question) {
      throw new Error('Question not found');
    }

    // Use AI to evaluate code
    const systemPrompt = `You are an expert code reviewer. Evaluate the submitted code against the test cases and provide detailed feedback.`;

    const userPrompt = `
Problem: ${question.question_text}

Submitted Code (${language}):
\`\`\`${language}
${code}
\`\`\`

Test Cases:
${JSON.stringify(question.test_cases, null, 2)}

Evaluate this code and return a JSON object with:
{
  "passed": true/false,
  "test_results": [{"test": "description", "passed": true/false, "feedback": "reason"}],
  "overall_feedback": "detailed feedback on code quality, efficiency, and correctness",
  "score_percentage": 0-100,
  "points_earned": calculated points based on ${question.points} max points
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI evaluation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const evaluationContent = aiData.choices[0].message.content;
    
    const jsonMatch = evaluationContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse evaluation from AI response');
    }
    
    const evaluation = JSON.parse(jsonMatch[0]);

    // Save response to database
    const { error: insertError } = await supabase
      .from('interview_responses')
      .upsert({
        interview_id: interviewId,
        question_id: questionId,
        user_id: userId,
        code_submission: code,
        language_used: language,
        is_correct: evaluation.passed,
        points_earned: evaluation.points_earned,
        ai_feedback: evaluation,
        evaluated_at: new Date().toISOString(),
      });

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        evaluation 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in evaluate-code:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});