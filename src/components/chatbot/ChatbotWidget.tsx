import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
} from "@/services/chatbot/actions";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const STORAGE_KEY = "interq_chatbot_conversation";

export function ChatbotWidget() {
  const { session, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [typing, setTyping] = useState(false);
  const [role, setRole] = useState<UserRole>("guest");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        setMessages(data.messages ?? []);
        setRole(data.role ?? "guest");
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, role }));
  }, [messages, role]);

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

  async function handleSend(text: string) {
    if (!text.trim()) return;
    pushUser(text);
    setTyping(true);
    try {
      const t = text.toLowerCase();
      if (t.includes("assessment") && t.includes("start")) {
        pushBot("Opening assessments…");
        navigate("/assessments");
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
            pushBot(
              `Here are some assessments:\n${top
                .map((a: any) => `• ${a.title} (${a.duration_minutes ?? 30} min)`)
                .join("\n")}\nOpening the assessments page…`
            );
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
          pushBot("Opening Help Center…");
          navigate("/help-center");
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
          pushBot(
            pipeline.length
              ? `Pipeline has ${pipeline.length} candidate(s). Opening candidates view…`
              : "No candidates in your pipeline yet."
          );
          navigate("/company/candidates");
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
          className="fixed bottom-24 right-4 z-50 w-96 max-w-[95vw] h-[70vh] bg-background border rounded-lg shadow-2xl flex flex-col"
        >
          <header className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold">InterQ Assistant</div>
            <div className="text-xs text-muted-foreground">
              Role: {role.toUpperCase().replace("_", " ")}
            </div>
          </header>
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
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;
