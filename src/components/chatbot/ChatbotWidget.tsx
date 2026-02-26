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
import { Bot, Send, Maximize2, Minimize2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

  function extractSiteText(): { text: string; source: string }[] {
    const nodes = Array.from(document.querySelectorAll("main, section, article, header, footer"));
    const chunks: { text: string; source: string }[] = [];
    nodes.forEach((el, i) => {
      const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (txt.length > 120) {
        chunks.push({ text: txt.slice(0, 4000), source: (el.getAttribute("aria-label") || el.tagName || `section-${i}`).toLowerCase() });
      }
    });
    return chunks;
  }

  function score(a: string, b: string) {
    const aw = a.toLowerCase().split(/\W+/).filter(Boolean);
    const bw = b.toLowerCase().split(/\W+/).filter(Boolean);
    const set = new Set(bw);
    let s = 0;
    for (const w of aw) if (set.has(w)) s += 1;
    return s / Math.max(aw.length, 1);
  }

  function knowledgeAnswer(query: string) {
    const corpus = extractSiteText();
    if (!corpus.length) return null;
    const ranked = corpus
      .map((c) => ({ c, s: score(query, c.text) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3);
    if (!ranked.length) return null;
    const summary = ranked.map((r) => {
      const idx = r.c.text.toLowerCase().indexOf(query.toLowerCase().split(/\W+/)[0] || "");
      const start = Math.max(0, idx - 120);
      const end = Math.min(r.c.text.length, (idx > 0 ? idx : 0) + 240);
      return `• ${r.c.text.slice(start, end)}…`;
    }).join("\n");
    const links = Array.from(document.querySelectorAll('a[href^="/"]'))
      .slice(0, 8)
      .map((a) => ({ href: a.getAttribute("href") || "/", label: (a.textContent || "").trim() }))
      .filter((l) => l.label.length > 0);
    return { summary, links };
  }

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
        const ans = knowledgeAnswer(text);
        if (ans) {
          pushBot(`Here’s what I found based on current page content:\n${ans.summary}`, { type: "links", links: ans.links });
        } else {
          pushBot("I’ll help you navigate. Try: Features, Product, Pricing, Integrations, Case Studies, Contact.");
        }
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
      <motion.button
        aria-label="Open InterQ Chat Assistant"
        className="fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-glow ring-2 ring-primary/40 bg-[var(--gradient-primary)] text-white flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="sr-only">Open Chat Assistant</span>
        <Bot className="h-7 w-7 drop-shadow" />
        {unread > 0 && (
          <span
            aria-label={`${unread} unread`}
            className="absolute -top-1 -right-1 h-6 min-w-6 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center"
          >
            {unread}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="InterQ Chat Assistant"
            className={`fixed ${fullscreen ? "inset-0" : "bottom-24 right-6 w-[28rem] max-w-[95vw] h-[70vh]"} z-50 flex flex-col rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl bg-white/10`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
          >
            <header className="px-4 py-3 bg-[var(--gradient-primary)] text-white rounded-t-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center ring-1 ring-white/30">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="font-semibold">InterQ AI Assistant</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Toggle fullscreen"
                  className="h-7 w-7 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center"
                  onClick={() => setFullscreen((v) => !v)}
                >
                  {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  aria-label="Close chat"
                  className="h-7 w-7 rounded bg-white/20 hover:bg-white/30 flex items-center justify-center"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div className="px-3 py-2 text-xs text-white/80 bg-white/5 border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto">
                {["Features", "Product", "Pricing", "Integrations", "Case Studies", "Contact"].map((s) => (
                  <button
                    key={s}
                    className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 whitespace-nowrap"
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
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-md ${
                      m.role === "user"
                        ? "bg-white text-foreground"
                        : "bg-primary/15 border border-primary/20 text-white"
                    }`}
                  >
                    <div>{m.text}</div>
                    {(m.payload as any)?.type === "cards" && Array.isArray((m.payload as any).items) && (
                      <div className="mt-2 grid grid-cols-1 gap-2">
                        {(m.payload as any).items.map((it: any) => (
                          <div key={it.id ?? it.title} className="rounded-xl p-2 bg-white/10 border border-white/20">
                            <div className="font-medium text-white">{it.title}</div>
                            {it.duration_minutes && (
                              <div className="text-xs text-white/70">{it.duration_minutes} min</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {(m.payload as any)?.type === "table" && Array.isArray((m.payload as any).rows) && (m.payload as any).rows.length > 0 && (
                      <div className="mt-2 overflow-x-auto">
                        <table className="text-xs w-full text-white/90">
                          <thead>
                            <tr>
                              {Object.keys((m.payload as any).rows[0] ?? {}).slice(0, 4).map((k: string) => (
                                <th key={k} className="text-left font-semibold pr-2 py-1">
                                  {k}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {(m.payload as any).rows.slice(0, 5).map((r: any, idx: number) => (
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
                    {(m.payload as any)?.type === "links" && Array.isArray((m.payload as any).links) && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(m.payload as any).links.slice(0, 5).map((l: any, i: number) => (
                          <a key={i} href={l.href} className="text-xs underline decoration-white/40 hover:text-white">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                    <div className="text-[10px] opacity-70 mt-1">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-center gap-1 text-white/70">
                  <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "120ms" }} />
                  <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "240ms" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-white/10 p-3 bg-white/5 rounded-b-2xl">
              <div className="flex flex-wrap gap-2 mb-2">
                {quickActions.map((qa) => (
                  <button
                    key={qa.id}
                    className="px-2 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-white/30"
                    onClick={() => handleQuickAction(qa)}
                    aria-label={`Quick action ${qa.label}`}
                  >
                    {qa.label}
                  </button>
                ))}
                <button
                  className="ml-auto px-2 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                  onClick={() => setHistoryOpen((v) => !v)}
                  aria-label="Toggle history"
                >
                  History
                </button>
                <div className="text-xs text-white/60">Role: {role.toUpperCase().replace("_", " ")}</div>
              </div>
              {supportMode && (
                <div className="mb-3 border border-white/20 rounded-xl p-2 bg-white/10">
                  <div className="text-xs mb-2 text-white/90">Create Support Ticket</div>
                  <div className="flex items-center gap-2 mb-2">
                    <select
                      aria-label="Issue type"
                      className="border border-white/20 bg-white/10 text-white rounded px-2 py-1 text-xs"
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
                      className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
                    className="w-full border border-white/20 bg-white/10 text-white rounded p-2 text-sm placeholder-white/50"
                    rows={3}
                    placeholder="Describe what went wrong…"
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                  />
                </div>
              )}
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const t = input;
                  setInput("");
                  handleSend(t);
                }}
              >
                <select
                  aria-label="Language"
                  className="text-xs border border-white/20 bg-white/10 text-white rounded px-2 py-1"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                >
                  <option value="en">EN</option>
                  <option value="ur">UR</option>
                  <option value="ar">AR</option>
                </select>
                <input
                  aria-label="Type your message"
                  className="flex-1 border border-white/20 bg-white/10 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/60"
                  placeholder="Ask about Features, Pricing, Integrations…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-full bg-[var(--gradient-primary)] text-white text-sm shadow-glow hover:brightness-110"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              {historyOpen && (
                <aside className="mt-2 max-h-32 overflow-y-auto text-xs text-white/80 space-y-1">
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
                </aside>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatbotWidget;
