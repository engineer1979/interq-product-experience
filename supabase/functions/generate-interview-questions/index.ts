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
    const { interviewId, jobRole, difficulty, questionCount = 10 } = await req.json();
    
    if (!interviewId || !jobRole) {
      return new Response(
        JSON.stringify({ error: 'Interview ID and job role are required' }),
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

    // Generate questions using Lovable AI
    const mcqCount = Math.floor(questionCount * 0.6); // 60% MCQs
    const codingCount = questionCount - mcqCount; // 40% coding

    const systemPrompt = `You are an expert technical interviewer for ${jobRole} positions. Generate interview questions that test real-world skills and knowledge.`;

    const userPrompt = `Generate ${mcqCount} multiple-choice questions and ${codingCount} coding challenges for a ${difficulty} level ${jobRole} interview.

For MCQs, return this exact JSON structure:
{
  "mcqs": [
    {
      "question_text": "Question here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "Option B",
      "difficulty": "${difficulty}",
      "points": 10
    }
  ]
}

For coding challenges, return this exact JSON structure:
{
  "coding": [
    {
      "question_text": "Problem description",
      "difficulty": "${difficulty}",
      "points": 20,
      "starter_code": "function solution() {\\n  // Your code here\\n}",
      "test_cases": [
        {"input": "test input", "expected_output": "expected result", "description": "Test case 1"}
      ],
      "time_limit_minutes": 30,
      "language_options": ["javascript", "python", "java"]
    }
  ]
}

Return both in a single JSON object: {"mcqs": [...], "coding": [...]}`;

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
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      throw new Error(`AI generation failed: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0].message.content;
    
    // Parse JSON from AI response
    const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from AI response');
    }
    
    const questions = JSON.parse(jsonMatch[0]);

    // Insert MCQs into database
    const mcqPromises = questions.mcqs?.map((q: any, index: number) => 
      supabase.from('interview_questions').insert({
        interview_id: interviewId,
        question_type: 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer,
        difficulty: q.difficulty,
        points: q.points,
        order_index: index,
      })
    ) || [];

    // Insert coding challenges into database
    const codingPromises = questions.coding?.map((q: any, index: number) => 
      supabase.from('interview_questions').insert({
        interview_id: interviewId,
        question_type: 'coding',
        question_text: q.question_text,
        difficulty: q.difficulty,
        points: q.points,
        starter_code: q.starter_code,
        test_cases: q.test_cases,
        time_limit_minutes: q.time_limit_minutes,
        language_options: q.language_options,
        order_index: mcqCount + index,
      })
    ) || [];

    await Promise.all([...mcqPromises, ...codingPromises]);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${mcqCount} MCQs and ${codingCount} coding challenges`,
        mcqCount,
        codingCount
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-interview-questions:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});