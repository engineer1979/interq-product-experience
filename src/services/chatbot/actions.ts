import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

export type UserRole = "admin" | "company" | "job_seeker" | "guest";

export interface ChatMessage {
  id: string;
  role: "user" | "bot" | "system";
  text: string;
  timestamp: number;
  payload?: any;
}

export interface QuickAction {
  id: string;
  label: string;
  action: string;
  params?: Record<string, any>;
}

export async function getUserRole(session: Session | null): Promise<UserRole> {
  try {
    if (!session?.user) return "guest";
    const { data, error } = await supabase.rpc("get_user_role", { _user_id: session.user.id });
    if (error) return "job_seeker";
    if (data === "admin" || data === "company" || data === "job_seeker") return data;
    return "job_seeker";
  } catch {
    return "job_seeker";
  }
}

export async function recordAudit(details: any, entityType = "chatbot_action") {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    await supabase.from("audit_logs").insert({
      user_id: user?.id ?? null,
      entity_type: entityType,
      details,
      ip_address: null,
    });
  } catch {
    
  }
}

export async function searchAssessments(topic?: string) {
  const query = supabase.from("assessments").select("*").order("created_at", { ascending: false }).limit(10);
  const { data, error } = topic ? await query.ilike("title", `%${topic}%`) : await query;
  if (error) throw error;
  await recordAudit({ action: "search_assessments", topic });
  return data ?? [];
}

export async function getLatestAssessmentStatus(userId: string) {
  const { data, error } = await supabase
    .from("assessment_results")
    .select("id, assessment_id, percentage, passed, completed_at, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  await recordAudit({ action: "get_assessment_status" });
  return data;
}

export async function listCertificates(userId: string) {
  const { data, error } = await supabase
    .from("job_seeker_certificates")
    .select("*")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  if (error) throw error;
  await recordAudit({ action: "list_certificates" });
  return data ?? [];
}

export async function requestInterviewBooking(userId: string, whenISO: string) {
  const { data: interviews, error: intErr } = await supabase
    .from("interviews")
    .select("id")
    .limit(1);
  if (intErr) throw intErr;
  const interviewId = interviews?.[0]?.id ?? crypto.randomUUID();
  const { data, error } = await supabase.from("interview_sessions").insert({
    user_id: userId,
    interview_id: interviewId,
    status: "requested",
    start_time: whenISO,
  }).select().single();
  if (error) throw error;
  await recordAudit({ action: "request_interview", when: whenISO });
  return data;
}

export async function getCompanyIdForUser(userId: string) {
  const { data, error } = await supabase
    .from("company_members")
    .select("company_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data?.company_id as string | undefined;
}

export async function companyCreateTest(userId: string, title: string, description: string, topic?: string) {
  const { data, error } = await supabase.from("assessments").insert({
    title,
    description,
    topic: topic ?? null,
    duration_minutes: 30,
    timer_enabled: true,
    grace_period_minutes: 0,
    auto_submit_on_timeout: true,
    proctoring_enabled: false,
    face_detection_enabled: false,
    tab_switch_detection: false,
    max_tab_switches: 3,
    passing_score: 70,
    created_by: userId
  }).select().single();
  if (error) throw error;
  await recordAudit({ action: "company_create_test", title });
  return data;
}

export async function companyAddQuestion(assessmentId: string, text: string, options: string[], correct: string, points = 5, orderIndex = 0) {
  const { data, error } = await supabase.from("assessment_questions").insert({
    assessment_id: assessmentId,
    question_text: text,
    options,
    correct_answer: correct,
    points,
    order_index: orderIndex,
    question_type: "mcq"
  }).select().single();
  if (error) throw error;
  await recordAudit({ action: "company_add_question", assessmentId });
  return data;
}

export async function companyFetchPipeline(companyId: string) {
  const { data, error } = await supabase
    .from("candidates")
    .select("id, full_name, email, status, job_id, skills")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  await recordAudit({ action: "company_fetch_pipeline" });
  return data ?? [];
}

export async function adminFetchResults(topic?: string, fromISO?: string) {
  let query = supabase
    .from("assessment_results")
    .select("id, assessment_id, user_id, percentage, passed, completed_at, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (fromISO) query = query.gte("created_at", fromISO);
  const { data, error } = await query;
  if (error) throw error;
  await recordAudit({ action: "admin_fetch_results", topic, fromISO });
  return data ?? [];
}

export function defaultQuickActions(role: UserRole): QuickAction[] {
  if (role === "admin") {
    return [
      { id: "qa_admin_results", label: "View All Results", action: "admin_view_results" },
      { id: "qa_admin_tests", label: "Manage Tests", action: "admin_manage_tests" },
      { id: "qa_admin_qbank", label: "Question Bank Summary", action: "admin_qbank" },
      { id: "qa_admin_users", label: "User Management", action: "admin_users" },
      { id: "qa_admin_certs", label: "Certificates", action: "admin_certificates" },
      { id: "qa_admin_audit", label: "Audit Logs", action: "admin_audit" },
      { id: "qa_admin_settings", label: "System Settings", action: "admin_settings" },
    ];
  }
  if (role === "company") {
    return [
      { id: "qa_company_create_test", label: "Create a Test", action: "company_create_test" },
      { id: "qa_company_add_questions", label: "Add Questions", action: "company_add_question" },
      { id: "qa_company_invite", label: "Invite Candidates", action: "company_invite" },
      { id: "qa_company_upload_jd", label: "Upload JD", action: "company_upload_jd" },
      { id: "qa_company_pipeline", label: "View ATS Pipeline", action: "company_view_pipeline" },
      { id: "qa_company_results", label: "View Candidate Results", action: "company_view_results" },
      { id: "qa_company_notify", label: "Send Notification", action: "company_notify" },
      { id: "qa_company_export", label: "Export Report", action: "company_export" },
    ];
  }
  return [
    { id: "qa_js_start", label: "Start an Assessment", action: "js_start_assessment" },
    { id: "qa_js_schedule", label: "Schedule Interview", action: "js_schedule_interview" },
    { id: "qa_js_results", label: "View My Results", action: "js_view_results" },
    { id: "qa_js_download_cert", label: "Download Certificate", action: "js_download_certificate" },
    { id: "qa_js_guidelines", label: "Open Guidelines", action: "js_guidelines" },
    { id: "qa_js_update_profile", label: "Update Profile", action: "js_update_profile" },
    { id: "qa_js_support", label: "Talk to Support", action: "support_escalation" },
  ];
}
