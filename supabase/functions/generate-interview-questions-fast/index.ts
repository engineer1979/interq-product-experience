import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { interviewQuestionsDatabase, getQuestionsForRole } from "../interview-questions-database.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { interviewId, jobRole, difficulty, questionCount = 10 } = await req.json()
    
    console.log('Generating questions for:', { jobRole, difficulty, questionCount })

    if (!interviewId || !jobRole || !difficulty) {
      throw new Error('Missing required parameters: interviewId, jobRole and difficulty')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Use comprehensive database instead of AI generation for faster response
    const questions = getQuestionsForRole(jobRole, difficulty, questionCount)
    
    console.log('Generated questions:', { mcqCount: questions.mcqs.length, codingCount: questions.coding.length })

    // First, delete any existing questions for this interview to avoid duplicates
    await supabaseAdmin.from('interview_questions').delete().eq('interview_id', interviewId)

    // Insert questions into database
    const mcqPromises = questions.mcqs.map((mcq: any, index: number) => 
      supabaseAdmin.from('interview_questions').insert({
        interview_id: interviewId,
        question_type: 'mcq',
        question_text: mcq.question_text,
        options: mcq.options,
        correct_answer: mcq.correct_answer,
        difficulty: difficulty,
        points: mcq.points,
        order_index: index,
      })
    )

    const codingPromises = questions.coding.map((coding: any, index: number) => 
      supabaseAdmin.from('interview_questions').insert({
        interview_id: interviewId,
        question_type: 'coding',
        question_text: coding.question_text,
        starter_code: coding.starter_code,
        test_cases: coding.test_cases,
        time_limit_minutes: coding.time_limit_minutes,
        language_options: coding.language_options,
        difficulty: difficulty,
        points: coding.points,
        order_index: questions.mcqs.length + index,
      })
    )

    // Execute all insertions
    await Promise.all([...mcqPromises, ...codingPromises])

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Generated ${questions.mcqs.length} MCQs and ${questions.coding.length} coding questions for ${jobRole}`,
        data: {
          mcqs: questions.mcqs.length,
          coding: questions.coding.length,
          total: questions.mcqs.length + questions.coding.length
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error generating questions:', error)
    
    return new Response(
      JSON.stringify({ 
        error: (error as Error).message,
        message: 'Failed to generate interview questions. Please try again.'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})