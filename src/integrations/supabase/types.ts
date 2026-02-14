export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      Analytics: {
        Row: {
          accuracy_score: number | null
          clarity_score: number | null
          confidence_score: number | null
          filler_word_count: number | null
          id: number
          relevance_score: number | null
          response_id: number | null
          sentiment_score: number | null
          skill_tags_identified: Json | null
          time_to_answer_sec: number | null
        }
        Insert: {
          accuracy_score?: number | null
          clarity_score?: number | null
          confidence_score?: number | null
          filler_word_count?: number | null
          id?: number
          relevance_score?: number | null
          response_id?: number | null
          sentiment_score?: number | null
          skill_tags_identified?: Json | null
          time_to_answer_sec?: number | null
        }
        Update: {
          accuracy_score?: number | null
          clarity_score?: number | null
          confidence_score?: number | null
          filler_word_count?: number | null
          id?: number
          relevance_score?: number | null
          response_id?: number | null
          sentiment_score?: number | null
          skill_tags_identified?: Json | null
          time_to_answer_sec?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Analytics_response_id_fkey"
            columns: ["response_id"]
            isOneToOne: false
            referencedRelation: "Responses"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_answers: {
        Row: {
          answer: string | null
          created_at: string
          id: string
          question_id: string
          session_id: string
          updated_at: string
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: string
          question_id: string
          session_id: string
          updated_at?: string
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: string
          question_id?: string
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          assessment_id: string
          correct_answer: string
          created_at: string
          id: string
          options: Json
          order_index: number
          points: number
          question_text: string
          question_type: string
        }
        Insert: {
          assessment_id: string
          correct_answer: string
          created_at?: string
          id?: string
          options: Json
          order_index: number
          points?: number
          question_text: string
          question_type?: string
        }
        Update: {
          assessment_id?: string
          correct_answer?: string
          created_at?: string
          id?: string
          options?: Json
          order_index?: number
          points?: number
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_results: {
        Row: {
          answers: Json
          assessment_id: string
          completed_at: string
          id: string
          ip_address: string | null
          passed: boolean
          percentage: number
          proctoring_flags: Json | null
          score: number
          started_at: string | null
          tab_switches_count: number | null
          time_taken_minutes: number | null
          timezone: string | null
          total_points: number
          user_agent: string | null
          user_id: string
        }
        Insert: {
          answers: Json
          assessment_id: string
          completed_at?: string
          id?: string
          ip_address?: string | null
          passed: boolean
          percentage: number
          proctoring_flags?: Json | null
          score: number
          started_at?: string | null
          tab_switches_count?: number | null
          time_taken_minutes?: number | null
          timezone?: string | null
          total_points: number
          user_agent?: string | null
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_id?: string
          completed_at?: string
          id?: string
          ip_address?: string | null
          passed?: boolean
          percentage?: number
          proctoring_flags?: Json | null
          score?: number
          started_at?: string | null
          tab_switches_count?: number | null
          time_taken_minutes?: number | null
          timezone?: string | null
          total_points?: number
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sessions: {
        Row: {
          assessment_id: string
          completed: boolean | null
          current_question_index: number | null
          id: string
          is_paused: boolean | null
          last_activity_at: string | null
          pause_reason: string | null
          paused_at: string | null
          proctoring_violations: Json | null
          started_at: string | null
          submitted_at: string | null
          tab_switches: number | null
          time_remaining_seconds: number
          user_id: string
        }
        Insert: {
          assessment_id: string
          completed?: boolean | null
          current_question_index?: number | null
          id?: string
          is_paused?: boolean | null
          last_activity_at?: string | null
          pause_reason?: string | null
          paused_at?: string | null
          proctoring_violations?: Json | null
          started_at?: string | null
          submitted_at?: string | null
          tab_switches?: number | null
          time_remaining_seconds: number
          user_id: string
        }
        Update: {
          assessment_id?: string
          completed?: boolean | null
          current_question_index?: number | null
          id?: string
          is_paused?: boolean | null
          last_activity_at?: string | null
          pause_reason?: string | null
          paused_at?: string | null
          proctoring_violations?: Json | null
          started_at?: string | null
          submitted_at?: string | null
          tab_switches?: number | null
          time_remaining_seconds?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          allow_pause: boolean | null
          auto_submit_on_timeout: boolean | null
          category: string
          created_at: string
          created_by: string
          description: string | null
          difficulty: string
          duration_minutes: number
          face_detection_enabled: boolean | null
          grace_period_minutes: number | null
          id: string
          is_published: boolean | null
          max_tab_switches: number | null
          passing_score: number
          proctoring_enabled: boolean | null
          question_randomization: boolean | null
          show_results_immediately: boolean | null
          tab_switch_detection: boolean | null
          timer_enabled: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          allow_pause?: boolean | null
          auto_submit_on_timeout?: boolean | null
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          difficulty: string
          duration_minutes?: number
          face_detection_enabled?: boolean | null
          grace_period_minutes?: number | null
          id?: string
          is_published?: boolean | null
          max_tab_switches?: number | null
          passing_score?: number
          proctoring_enabled?: boolean | null
          question_randomization?: boolean | null
          show_results_immediately?: boolean | null
          tab_switch_detection?: boolean | null
          timer_enabled?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          allow_pause?: boolean | null
          auto_submit_on_timeout?: boolean | null
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          face_detection_enabled?: boolean | null
          grace_period_minutes?: number | null
          id?: string
          is_published?: boolean | null
          max_tab_switches?: number | null
          passing_score?: number
          proctoring_enabled?: boolean | null
          question_randomization?: boolean | null
          show_results_immediately?: boolean | null
          tab_switch_detection?: boolean | null
          timer_enabled?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ats_screenings: {
        Row: {
          bonus_score: number | null
          candidate_id: string
          created_at: string
          decision: string
          decision_reason: string | null
          education_score: number | null
          experience_score: number | null
          id: string
          industry_score: number | null
          job_id: string | null
          knockout_details: Json | null
          knockout_failed: boolean | null
          notes: string | null
          progression_score: number | null
          screened_by: string
          skills_score: number | null
          total_score: number | null
          updated_at: string
        }
        Insert: {
          bonus_score?: number | null
          candidate_id: string
          created_at?: string
          decision?: string
          decision_reason?: string | null
          education_score?: number | null
          experience_score?: number | null
          id?: string
          industry_score?: number | null
          job_id?: string | null
          knockout_details?: Json | null
          knockout_failed?: boolean | null
          notes?: string | null
          progression_score?: number | null
          screened_by: string
          skills_score?: number | null
          total_score?: number | null
          updated_at?: string
        }
        Update: {
          bonus_score?: number | null
          candidate_id?: string
          created_at?: string
          decision?: string
          decision_reason?: string | null
          education_score?: number | null
          experience_score?: number | null
          id?: string
          industry_score?: number | null
          job_id?: string | null
          knockout_details?: Json | null
          knockout_failed?: boolean | null
          notes?: string | null
          progression_score?: number | null
          screened_by?: string
          skills_score?: number | null
          total_score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ats_screenings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ats_screenings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string
          created_by: string
          current_title: string | null
          education_level: string | null
          email: string
          full_name: string
          id: string
          industry: string | null
          is_blind_screening: boolean | null
          job_id: string | null
          location: string | null
          phone: string | null
          resume_text: string | null
          resume_url: string | null
          skills: string[] | null
          status: string
          updated_at: string
          work_eligibility: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          created_by: string
          current_title?: string | null
          education_level?: string | null
          email: string
          full_name: string
          id?: string
          industry?: string | null
          is_blind_screening?: boolean | null
          job_id?: string | null
          location?: string | null
          phone?: string | null
          resume_text?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string
          updated_at?: string
          work_eligibility?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string
          current_title?: string | null
          education_level?: string | null
          email?: string
          full_name?: string
          id?: string
          industry?: string | null
          is_blind_screening?: boolean | null
          job_id?: string | null
          location?: string | null
          phone?: string | null
          resume_text?: string | null
          resume_url?: string | null
          skills?: string[] | null
          status?: string
          updated_at?: string
          work_eligibility?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      hiring_decisions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          assessment_score: number | null
          assessment_weight: number | null
          ats_score: number | null
          ats_weight: number | null
          candidate_id: string
          created_at: string
          culture_fit_notes: string | null
          decided_by: string
          decision: string
          final_weighted_score: number | null
          id: string
          interview_score: number | null
          interview_weight: number | null
          job_id: string | null
          justification: string | null
          key_gaps: string[] | null
          key_strengths: string[] | null
          rank: number | null
          risk_level: string | null
          salary_band_fit: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          assessment_score?: number | null
          assessment_weight?: number | null
          ats_score?: number | null
          ats_weight?: number | null
          candidate_id: string
          created_at?: string
          culture_fit_notes?: string | null
          decided_by: string
          decision?: string
          final_weighted_score?: number | null
          id?: string
          interview_score?: number | null
          interview_weight?: number | null
          job_id?: string | null
          justification?: string | null
          key_gaps?: string[] | null
          key_strengths?: string[] | null
          rank?: number | null
          risk_level?: string | null
          salary_band_fit?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          assessment_score?: number | null
          assessment_weight?: number | null
          ats_score?: number | null
          ats_weight?: number | null
          candidate_id?: string
          created_at?: string
          culture_fit_notes?: string | null
          decided_by?: string
          decision?: string
          final_weighted_score?: number | null
          id?: string
          interview_score?: number | null
          interview_weight?: number | null
          job_id?: string | null
          justification?: string | null
          key_gaps?: string[] | null
          key_strengths?: string[] | null
          rank?: number | null
          risk_level?: string | null
          salary_band_fit?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hiring_decisions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hiring_decisions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_questions: {
        Row: {
          correct_answer: string | null
          created_at: string
          difficulty: string
          id: string
          interview_id: string
          language_options: string[] | null
          options: Json | null
          order_index: number
          points: number
          question_text: string
          question_type: string
          starter_code: string | null
          test_cases: Json | null
          time_limit_minutes: number | null
          updated_at: string
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string
          difficulty: string
          id?: string
          interview_id: string
          language_options?: string[] | null
          options?: Json | null
          order_index: number
          points?: number
          question_text: string
          question_type: string
          starter_code?: string | null
          test_cases?: Json | null
          time_limit_minutes?: number | null
          updated_at?: string
        }
        Update: {
          correct_answer?: string | null
          created_at?: string
          difficulty?: string
          id?: string
          interview_id?: string
          language_options?: string[] | null
          options?: Json | null
          order_index?: number
          points?: number
          question_text?: string
          question_type?: string
          starter_code?: string | null
          test_cases?: Json | null
          time_limit_minutes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_questions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_responses: {
        Row: {
          ai_feedback: Json | null
          answer_text: string | null
          code_submission: string | null
          evaluated_at: string | null
          id: string
          interview_id: string
          is_correct: boolean | null
          language_used: string | null
          points_earned: number | null
          question_id: string
          submitted_at: string
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          ai_feedback?: Json | null
          answer_text?: string | null
          code_submission?: string | null
          evaluated_at?: string | null
          id?: string
          interview_id: string
          is_correct?: boolean | null
          language_used?: string | null
          points_earned?: number | null
          question_id: string
          submitted_at?: string
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          ai_feedback?: Json | null
          answer_text?: string | null
          code_submission?: string | null
          evaluated_at?: string | null
          id?: string
          interview_id?: string
          is_correct?: boolean | null
          language_used?: string | null
          points_earned?: number | null
          question_id?: string
          submitted_at?: string
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_responses_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "interview_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_results: {
        Row: {
          ai_feedback: Json
          communication_score: number
          completed_at: string
          confidence_score: number
          fraud_detected: boolean | null
          id: string
          interview_id: string
          overall_score: number
          technical_score: number
          user_id: string
          video_url: string | null
        }
        Insert: {
          ai_feedback: Json
          communication_score: number
          completed_at?: string
          confidence_score: number
          fraud_detected?: boolean | null
          id?: string
          interview_id: string
          overall_score: number
          technical_score: number
          user_id: string
          video_url?: string | null
        }
        Update: {
          ai_feedback?: Json
          communication_score?: number
          completed_at?: string
          confidence_score?: number
          fraud_detected?: boolean | null
          id?: string
          interview_id?: string
          overall_score?: number
          technical_score?: number
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_results_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sessions: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string
          current_question_index: number | null
          final_score: number | null
          id: string
          interview_id: string
          interview_type: string | null
          responses: Json | null
          start_time: string | null
          status: string | null
          time_remaining_seconds: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          final_score?: number | null
          id?: string
          interview_id: string
          interview_type?: string | null
          responses?: Json | null
          start_time?: string | null
          status?: string | null
          time_remaining_seconds?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          current_question_index?: number | null
          final_score?: number | null
          id?: string
          interview_id?: string
          interview_type?: string | null
          responses?: Json | null
          start_time?: string | null
          status?: string | null
          time_remaining_seconds?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_sessions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          duration_minutes: number
          id: string
          is_published: boolean | null
          job_role: string
          questions: Json
          title: string
          topic: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean | null
          job_role: string
          questions: Json
          title: string
          topic?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_published?: boolean | null
          job_role?: string
          questions?: Json
          title?: string
          topic?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      InterviewSessions: {
        Row: {
          completed_at: string | null
          final_score: number | null
          id: string
          role_id: number | null
          started_at: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          final_score?: number | null
          id?: string
          role_id?: number | null
          started_at?: string | null
          status: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          final_score?: number | null
          id?: string
          role_id?: number | null
          started_at?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "InterviewSessions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "InterviewSessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_assessments: {
        Row: {
          created_at: string
          id: string
          interview_id: string
          job_id: string
          stage: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          interview_id: string
          job_id: string
          stage?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          interview_id?: string
          job_id?: string
          stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_assessments_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_assessments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string
          created_by: string
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          location: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      knockout_questions: {
        Row: {
          created_at: string
          created_by: string
          expected_answer: string
          id: string
          is_eliminating: boolean | null
          job_id: string
          order_index: number | null
          question_text: string
        }
        Insert: {
          created_at?: string
          created_by: string
          expected_answer?: string
          id?: string
          is_eliminating?: boolean | null
          job_id: string
          order_index?: number | null
          question_text: string
        }
        Update: {
          created_at?: string
          created_by?: string
          expected_answer?: string
          id?: string
          is_eliminating?: boolean | null
          job_id?: string
          order_index?: number | null
          question_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "knockout_questions_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      module_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_edit: boolean | null
          can_view: boolean | null
          created_at: string
          id: string
          module_name: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string
          id?: string
          module_name: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_edit?: boolean | null
          can_view?: boolean | null
          created_at?: string
          id?: string
          module_name?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_name: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone_number: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      Questions: {
        Row: {
          difficulty: string | null
          id: number
          question_text: string
          role_id: number | null
          skill_tags: string[] | null
        }
        Insert: {
          difficulty?: string | null
          id?: number
          question_text: string
          role_id?: number | null
          skill_tags?: string[] | null
        }
        Update: {
          difficulty?: string | null
          id?: number
          question_text?: string
          role_id?: number | null
          skill_tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "Questions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
        ]
      }
      Reports: {
        Row: {
          generated_at: string | null
          id: string
          pdf_url: string | null
          session_id: string | null
          summary_data: Json | null
        }
        Insert: {
          generated_at?: string | null
          id?: string
          pdf_url?: string | null
          session_id?: string | null
          summary_data?: Json | null
        }
        Update: {
          generated_at?: string | null
          id?: string
          pdf_url?: string | null
          session_id?: string | null
          summary_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "Reports_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "InterviewSessions"
            referencedColumns: ["id"]
          },
        ]
      }
      Responses: {
        Row: {
          audio_duration_sec: number | null
          audio_url: string | null
          full_transcript: string | null
          id: number
          question_id: number | null
          session_id: string | null
        }
        Insert: {
          audio_duration_sec?: number | null
          audio_url?: string | null
          full_transcript?: string | null
          id?: number
          question_id?: number | null
          session_id?: string | null
        }
        Update: {
          audio_duration_sec?: number | null
          audio_url?: string | null
          full_transcript?: string | null
          id?: number
          question_id?: number | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "InterviewSessions"
            referencedColumns: ["id"]
          },
        ]
      }
      Roles: {
        Row: {
          created_by: string | null
          description: string | null
          id: number
          role_name: string
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          id?: number
          role_name: string
        }
        Update: {
          created_by?: string | null
          description?: string | null
          id?: number
          role_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Roles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      Users: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "recruiter" | "enterprise" | "candidate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "recruiter", "enterprise", "candidate"],
    },
  },
} as const
