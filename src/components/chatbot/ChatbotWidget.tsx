import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChatMessage,
  QuickAction,
  UserRole,
  defaultQuickActions,
  getLatestAssessmentStatus,
  getUserRole,
  listCertificates,
  recordAudit,
  requestInterviewBooking,
  searchAssessments,
  companyCreateTest,
  companyAddQuestion,
  companyFetchPipeline,
  getCompanyIdForUser,
  adminFetchResults,
  uploadFileToResumes,
  verifyCertificate,
  updateProfileVisibility,
  companyMoveCandidateStage,
  sendCandidateNotification,
  getActiveAssessmentSession,
  createSupportTicket,
} from "@/services/chatbot/actions";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const STORAGE_KEY = "interq_chatbot_conversation";

export function ChatbotWidget() {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [typing, setTyping] = useState(false);
  const [role, setRole] = useState<UserRole>("guest");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [scheduleISO, setScheduleISO] = useState("");
  const [language, setLanguage] = useState<"en" | "ur" | "ar">("en");
  const [supportMode, setSupportMode] = useState(false);
  const [issueType, setIssueType] = useState<"login" | "assessment" | "interview" | "results" | "billing" | "other">("assessment");
  const [issueText, setIssueText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setMessages(data.messages ?? []);
        setRole(data.role ?? "guest");
        if (data.language) setLanguage(data.language);
      } catch {}
    } else {
      setMessages([
        {
          id: uid(),
          role: "bot",
          text:
            "Hi! I’m the InterQ assistant. Choose your role to begin or log in for a personalized experience.",
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, role, language }));
  }, [messages, role, language]);

  useEffect(() => {
    async function detect() {
      const detected = await getUserRole(session);
      setRole(detected);
    }
    detect();
  }, [session]);

  useEffect(() => {
    if (open) setUnread(0);
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const quickActions: QuickAction[] = useMemo(() => defaultQuickActions(role), [role]);

  const pushBot = (text: string, payload?: any) => {
    setMessages((prev) => [...prev, { id: uid(), role: "bot", text, timestamp: Date.now(), payload }]);
  };
  const pushUser = (text: string) => setMessages((prev) => [...prev, { id: uid(), role: "user", text, timestamp: Date.now() }]);

  useEffect(() => {
    if (!open) return;
    const p = location.pathname;
    if (p.includes("/assessments")) {
      pushBot("You’re on the Assessments page. Start or view guidelines?");
    } else if (p.includes("/company")) {
      pushBot("You’re on Company pages. Need pipeline or test builder help?");
    } else if (p.includes("/admin")) {
      pushBot("Admin view detected. Need results, logs, or settings?");
    }
  }, [open]);

  async function handleSend(text: string) {
    if (!text.trim()) return;
    pushUser(text);
    setTyping(true);
    try {
      const t = text.toLowerCase();
      if (t.includes("assessment") && t.includes("start")) {
        pushBot("Opening assessments…");
        navigate("/assessments");
      } else if (t.includes("resume") && t.includes("attempt")) {
        if (!user) {
          pushBot("Sign in to resume your last attempt.");
        } else {
          const sess = await getActiveAssessmentSession(user.id);
          if (sess) {
            pushBot(`Resuming your session. Time remaining: ${sess.time_remaining_seconds ?? 0}s.`);
            navigate(`/assessment/${sess.assessment_id}`);
          } else {
            pushBot("No active session found.");
          }
        }
      } else if (t.includes("result")) {
        if (!user) {
          pushBot("Please sign in to view your results.");
        } else {
          const latest = await getLatestAssessmentStatus(user.id);
          if (latest) {
            pushBot(`Latest result: ${Math.round(latest.percentage)}% (${latest.passed ? "Passed" : "Failed"})`);
          } else {
            pushBot("No results found yet.");
          }
        }
      } else if (t.includes("verify") && t.includes("certificate")) {
        const code = text.split(" ").find((x) => x.length >= 8) ?? "";
        if (!code) {
          pushBot("Provide a certificate code to verify.");
        } else {
          const found = await verifyCertificate(code);
          if (found) {
            pushBot("Certificate verified.");
          } else {
            pushBot("Certificate not found.");
          }
        }
      } else if (t.includes("visibility")) {
        if (!user) {
          pushBot("Sign in to manage profile visibility.");
        } else {
          const on = t.includes("on");
          await updateProfileVisibility(on);
          pushBot(`Profile visibility ${on ? "enabled" : "disabled"}.`);
        }
      } else if (t.includes("certificate")) {
        if (!user) {
          pushBot("Please sign in to view certificates.");
        } else {
          const certs = await listCertificates(user.id);
          if (certs.length) {
            pushBot(`You have ${certs.length} certificate(s). Check Job Seeker → Certificates.`);
            navigate("/jobseeker/certificates");
          } else {
            pushBot("No certificates found yet.");
          }
        }
      } else {
        pushBot("I can help with assessments, interviews, results, and more. Use the quick actions below.");
      }
    } catch (e: any) {
      pushBot(`Error: ${e.message ?? "Something went wrong."}`);
    } finally {
      setTyping(false);
    }
  }

  async function handleQuickAction(action: QuickAction) {
    setTyping(true);
    try {
      await recordAudit({ action: action.action, source: "quick_action" });
      switch (action.action) {
        case "js_start_assessment": {
          const items = await searchAssessments();
          if (!items.length) {
            pushBot("No assessments available right now.");
          } else {
            const top = items.slice(0, 3);
            pushBot("Here are some assessments:", { type: "cards", items: top });
            navigate("/assessments");
          }
          break;
        }
        case "js_schedule_interview": {
          if (!user) {
            pushBot("Please sign in to request an interview.");
            break;
          }
          const when = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
          await requestInterviewBooking(user.id, when);
          pushBot("Interview request submitted. We’ll confirm a time slot shortly.");
          break;
        }
        case "js_view_results": {
          if (!user) {
            pushBot("Please sign in to view results.");
            break;
          }
          const latest = await getLatestAssessmentStatus(user.id);
          if (latest) {
            pushBot(`Latest result: ${Math.round(latest.percentage)}% (${latest.passed ? "Passed" : "Failed"})`);
            navigate("/jobseeker/results");
          } else {
            pushBot("No results found. Try starting an assessment.");
          }
          break;
        }
        case "js_download_certificate": {
          if (!user) {
            pushBot("Please sign in to access certificates.");
            break;
          }
          const certs = await listCertificates(user.id);
          if (certs.length) {
            pushBot("Opening your certificates…");
            navigate("/jobseeker/certificates");
          } else {
            pushBot("No certificates available yet.");
          }
          break;
        }
        case "js_guidelines": {
          pushBot("Opening assessment guidelines…");
          navigate("/guidelines");
          break;
        }
        case "js_update_profile": {
          if (!user) {
            pushBot("Please sign in to update your profile.");
          } else {
            pushBot("Opening profile settings…");
            navigate("/jobseeker/profile");
          }
          break;
        }
        case "support_escalation": {
          setSupportMode(true);
          pushBot("Tell me about your issue and I’ll create a support ticket.");
          break;
        }
        // Company
        case "company_create_test": {
          if (!user) {
            pushBot("Please sign in to create a test.");
            break;
          }
          const created = await companyCreateTest(user.id, "Sample Assessment", "Initial company-created assessment");
          pushBot(`Created test: ${created.title}. You can add questions from Company → Tests.`);
          navigate("/company/tests");
          break;
        }
        case "company_add_question": {
          pushBot("Navigate to Company → Tests to add questions with full UI. For quick add, open tests.");
          navigate("/company/tests");
          break;
        }
        case "company_view_pipeline": {
          if (!user) {
            pushBot("Please sign in to view your ATS pipeline.");
            break;
          }
          const companyId = await getCompanyIdForUser(user.id);
          if (!companyId) {
            pushBot("No company associated with your account.");
            break;
          }
          const pipeline = await companyFetchPipeline(companyId);
          if (pipeline.length) {
            pushBot(`Pipeline has ${pipeline.length} candidate(s).`, { type: "table", rows: pipeline });
            navigate("/company/candidates");
          } else {
            pushBot("No candidates in your pipeline yet.");
          }
          break;
        }
        case "company_view_results": {
          pushBot("Opening candidate results…");
          navigate("/company/results");
          break;
        }
        case "company_notify": {
          pushBot("Use Company → Notifications to send message templates to candidates.");
          navigate("/company/notifications");
          break;
        }
        case "company_export": {
          pushBot("Export tools are available in Company → Results. Opening…");
          navigate("/company/results");
          break;
        }
        // Admin
        case "admin_view_results": {
          await adminFetchResults();
          pushBot("Opening Admin → Results…");
          navigate("/admin/results");
          break;
        }
        case "admin_manage_tests": {
          pushBot("Opening Admin → Tests…");
          navigate("/admin/tests");
          break;
        }
        case "admin_qbank": {
          pushBot("Opening Admin → Question Bank…");
          navigate("/admin/question-bank");
          break;
        }
        case "admin_users": {
          pushBot("Opening Admin → User Management…");
          navigate("/admin/job-seekers");
          break;
        }
        case "admin_certificates": {
          pushBot("Opening Admin → Certificates…");
          navigate("/admin/certificates");
          break;
        }
        case "admin_audit": {
          pushBot("Opening Admin → Audit Logs…");
          navigate("/admin/logs");
          break;
        }
        case "admin_settings": {
          pushBot("Opening Admin → Settings…");
          navigate("/admin/settings");
          break;
        }
        default: {
          pushBot("Action not recognized yet. I’ll keep improving my skills.");
        }
      }
    } catch (e: any) {
      pushBot(`Error: ${e.message ?? "Something went wrong."}`);
    } finally {
      setTyping(false);
      if (!open) setUnread((u) => u + 1);
    }
  }
  return (
    <>
      <button
        aria-label="Open InterQ Chatbot"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground h-14 w-14 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Open Chatbot</span>
        <span aria-hidden>💬</span>
        {unread > 0 && (
          <span
            aria-label={`${unread} unread`}
            className="absolute -top-1 -right-1 h-6 min-w-6 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
          >
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="InterQ Chatbot"
          className={`fixed ${fullscreen ? "inset-0" : "bottom-24 right-4 w-96 max-w-[95vw] h-[70vh]"} z-50 bg-background border rounded-lg shadow-2xl flex flex-col`}
        >
          <header className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold">InterQ Assistant</div>
            <div className="text-xs text-muted-foreground">Role: {role.toUpperCase().replace("_", " ")}</div>
            <div className="flex items-center gap-2">
              <select
                aria-label="Language"
                className="text-xs border rounded px-1 py-0.5"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
              >
                <option value="en">EN</option>
                <option value="ur">UR</option>
                <option value="ar">AR</option>
              </select>
              <button
                aria-label="Toggle fullscreen"
                className="text-xs border rounded px-2 py-1"
                onClick={() => setFullscreen((v) => !v)}
              >
                {fullscreen ? "Exit" : "Full"}
              </button>
              <button
                aria-label="Open history"
                className="text-xs border rounded px-2 py-1"
                onClick={() => setHistoryOpen((v) => !v)}
              >
                History
              </button>
            </div>
          </header>
          <div className="px-3 py-2 text-xs text-muted-foreground">
            <div className="flex gap-2 overflow-x-auto">
              {["Start an assessment", "View my results", "Schedule interview"].map((s) => (
                <button
                  key={s}
                  className="px-2 py-1 border rounded whitespace-nowrap hover:bg-muted"
                  onClick={() => handleSend(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3" aria-live="polite" aria-busy={typing}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <div>{m.text}</div>
                  {m.payload?.type === "cards" && Array.isArray(m.payload.items) && (
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      {m.payload.items.map((it: any) => (
                        <div key={it.id ?? it.title} className="border rounded p-2 bg-background">
                          <div className="font-medium">{it.title}</div>
                          {it.duration_minutes && (
                            <div className="text-xs text-muted-foreground">{it.duration_minutes} min</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {m.payload?.type === "table" && Array.isArray(m.payload.rows) && m.payload.rows.length > 0 && (
                    <div className="mt-2 overflow-x-auto">
                      <table className="text-xs w-full">
                        <thead>
                          <tr>
                            {Object.keys(m.payload.rows[0] ?? {}).slice(0, 4).map((k: string) => (
                              <th key={k} className="text-left font-semibold pr-2 py-1">
                                {k}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.payload.rows.slice(0, 5).map((r: any, idx: number) => (
                            <tr key={idx}>
                              {Object.values(r)
                                .slice(0, 4)
                                .map((v: any, i: number) => (
                                  <td key={i} className="pr-2 py-1">
                                    {String(v)}
                                  </td>
                                ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="text-[10px] opacity-70 mt-1">
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="text-xs text-muted-foreground">Assistant is typing…</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="border-t p-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {quickActions.map((qa) => (
                <button
                  key={qa.id}
                  className="px-2 py-1 text-xs rounded border hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => handleQuickAction(qa)}
                  aria-label={`Quick action ${qa.label}`}
                >
                  {qa.label}
                </button>
              ))}
            </div>
            {supportMode && (
              <div className="mb-3 border rounded p-2">
                <div className="text-xs mb-2">Create Support Ticket</div>
                <div className="flex items-center gap-2 mb-2">
                  <select
                    aria-label="Issue type"
                    className="border rounded px-2 py-1 text-xs"
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value as any)}
                  >
                    <option value="login">Login</option>
                    <option value="assessment">Assessment</option>
                    <option value="interview">Interview</option>
                    <option value="results">Results</option>
                    <option value="billing">Billing</option>
                    <option value="other">Other</option>
                  </select>
                  <button
                    className="px-2 py-1 text-xs rounded border"
                    onClick={async () => {
                      if (!issueText.trim()) {
                        pushBot("Describe your issue first.");
                        return;
                      }
                      setTyping(true);
                      try {
                        const t = await createSupportTicket(issueType, issueText);
                        pushBot(`Ticket created: ${t.ticketId}. Our support will respond via email.`);
                        setSupportMode(false);
                        setIssueText("");
                      } catch (e: any) {
                        pushBot(`Error: ${e.message ?? "Could not create ticket."}`);
                      } finally {
                        setTyping(false);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
                <textarea
                  aria-label="Describe your issue"
                  className="w-full border rounded p-2 text-sm"
                  rows={3}
                  placeholder="Describe what went wrong…"
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="datetime-local"
                aria-label="Select interview time"
                className="border rounded px-2 py-1 text-xs"
                value={scheduleISO ? scheduleISO.slice(0, 16) : ""}
                onChange={(e) => setScheduleISO(e.target.value ? new Date(e.target.value).toISOString() : "")}
              />
              <button
                className="px-2 py-1 text-xs rounded border"
                onClick={async () => {
                  if (!user) {
                    pushBot("Sign in to schedule.");
                    return;
                  }
                  if (!scheduleISO) {
                    pushBot("Pick a time first.");
                    return;
                  }
                  setTyping(true);
                  try {
                    await requestInterviewBooking(user.id, scheduleISO);
                    pushBot("Interview scheduled or requested.");
                  } catch (e: any) {
                    pushBot(`Error: ${e.message ?? "Could not schedule."}`);
                  } finally {
                    setTyping(false);
                  }
                }}
              >
                Schedule
              </button>
              <label className="text-xs">
                <input
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    setUploading(true);
                    try {
                      const path = `uploads/${uid()}_${f.name}`;
                      await uploadFileToResumes(f, path);
                      pushBot("File uploaded.");
                    } catch (err: any) {
                      pushBot(`Upload error: ${err.message ?? "failed"}`);
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
                <span className="ml-2 border rounded px-2 py-1 cursor-pointer">Upload</span>
              </label>
              {uploading && <span className="text-xs text-muted-foreground">Uploading…</span>}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const t = input;
                setInput("");
                handleSend(t);
              }}
            >
              <input
                aria-label="Type your message"
                className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                placeholder="Ask me to start an assessment, schedule interview…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Send
              </button>
            </form>
          </div>
          {historyOpen && (
            <aside className="absolute top-0 left-0 h-full w-64 bg-background border-r p-3 overflow-y-auto">
              <div className="font-medium mb-2 text-sm">History</div>
              <div className="space-y-1 text-xs">
                {messages
                  .slice()
                  .reverse()
                  .slice(0, 50)
                  .map((m) => (
                    <div key={m.id} className="truncate">
                      {m.role === "user" ? "You: " : "Bot: "}
                      {m.text}
                    </div>
                  ))}
              </div>
            </aside>
          )}
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
