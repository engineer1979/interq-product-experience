import { useState, useMemo } from "react";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  HelpCircle,
  Book,
  Settings,
  ShieldCheck,
  Users,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Mail,
  Phone
} from "lucide-react";

const categories = [
  { id: "getting-started", name: "Getting Started", icon: Book, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "assessments", name: "Assessments", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "ai-interviews", name: "AI Interviews", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "account", name: "Account & Billing", icon: Settings, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const faqs = [
  { id: 1, category: "getting-started", q: "What is InterQ?", a: "InterQ is an expert-led technical interview and hiring platform that helps companies identify top engineering talent through structured, professional assessments." },
  { id: 2, category: "getting-started", q: "How does InterQ improve our hiring efficiency?", a: "By outsourcing technical screening to our platform, your internal engineering team can focus on core product development instead of conducting early-stage interviews." },
  { id: 3, category: "assessments", q: "Who conducts the technical interviews?", a: "Interviews are led by seasoned technical experts with deep domain experience to ensure high-quality, unbiased candidate evaluations." },
  { id: 4, category: "ai-interviews", q: "Does InterQ offer AI-based interviews?", a: "Yes, we utilize AI-powered tools for initial matching and technical baseline evaluations to complement our expert-led sessions." },
  { id: 5, category: "ai-interviews", q: "How does the AI-based assessment work?", a: "Our AI analyzes coding patterns and logic in real-time, providing instant data to pre-qualify candidates before they move to a human-led round." },
  { id: 6, category: "assessments", q: "How does expert-led interviewing differ from automated tests?", a: "While AI provides rapid data, our human experts evaluate complex system design thinking and communication skills that automated platforms often miss." },
  { id: 7, category: "assessments", q: "Can the interviews be tailored to our specific tech stack?", a: "Yes, our experts and AI modules can be calibrated to focus on your specific technology requirements and internal standards." },
  { id: 8, category: "assessments", q: "How quickly can we receive an interview report?", a: "We prioritize efficiency, typically delivering detailed evaluation reports and feedback within 24 hours of the session." },
  { id: 9, category: "assessments", q: "What metrics are included in the final hiring report?", a: "Reports provide a breakdown of technical proficiency, problem-solving approaches, and overall fit for the role." },
  { id: 10, category: "assessments", q: 'How does the platform handle technical "red flags"?', a: "Our experts are trained to identify inconsistencies in logic or technical gaps that AI might overlook, providing a layer of human verification." },
  { id: 11, category: "assessments", q: "Can we use InterQ for senior-level engineering roles?", a: "Yes, our expert pool includes specialists capable of conducting advanced system design and architecture rounds for senior positions." },
  { id: 12, category: "getting-started", q: "How do we get started with a pilot or demo?", a: "You can begin by clicking the 'Book a Demo' or 'Get Started' call-to-action found in our hero section or navigation menu." },
  { id: 13, category: "assessments", q: "What should I expect during an expert-led mock interview? (For Candidates)", a: "You will participate in a live session with a professional interviewer, simulating a real-world high-stakes technical round." },
  { id: 14, category: "ai-interviews", q: "What happens during an AI-based interview?", a: "Candidates engage with interactive coding challenges where our AI analyzes technical logic and efficiency." },
  { id: 15, category: "assessments", q: "What kind of feedback will I receive?", a: "You will receive constructive, actionable insights into your performance, highlighting both technical strengths and areas for growth." },
  { id: 16, category: "account", q: "Will my mock interview results be shared with employers?", a: "Independent mock interviews are strictly confidential and used solely for your personal professional development." },
  { id: 17, category: "assessments", q: "What technical domains do your experts cover?", a: "Our pool covers a wide range of specialties, including Frontend, Backend, DevOps, and System Architecture." },
  { id: 18, category: "getting-started", q: "How does InterQ help me land my next role?", a: "By providing realistic practice and expert feedback, we help you refine your skills and increase your confidence for actual hiring rounds." },
  { id: 19, category: "account", q: "Is my data secure on the InterQ platform?", a: "Yes, the website uses HTTPS (TLS/SSL) encryption to ensure all data transmissions are secure." },
  { id: 20, category: "account", q: "Where can I find your legal and privacy policies?", a: "Our Privacy Policy and Terms of Service are linked in the website footer for full transparency." },
  { id: 21, category: "account", q: "Is InterQ compliant with data protection laws?", a: "We aim for compliance with international standards, including global data protection regulations, regarding the collection and storage of user data." },
  { id: 22, category: "account", q: "Does the website use cookies?", a: "Yes, and we provide a cookie consent banner to allow users to manage their preferences." },
  { id: 23, category: "getting-started", q: "How do I reach customer support?", a: "You can contact us via the details provided in our footer or through our 'Contact' sections." },
  { id: 24, category: "assessments", q: "How do you ensure the quality of your expert interviewer pool?", a: "All interviewers undergo a rigorous vetting process to confirm their technical authority and professional assessment capabilities." },
  { id: 55, category: "getting-started", q: "Is the platform accessible on mobile devices?", a: "Yes, our platform is built to be responsive, ensuring a consistent experience across desktop and mobile screens." }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />

      {/* Hero Search Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              How can we <span className="text-gradient">help you?</span>
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-10 max-w-2xl mx-auto">
              Find answers, explore guides, and learn how to get the most out of InterQ.
            </p>

            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for articles, guides, or questions..."
                className="h-14 pl-12 pr-4 text-lg rounded-2xl border-border/50 shadow-elegant hover:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4 light-bg">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 ${selectedCategory === cat.id
                  ? "border-primary bg-primary/10 shadow-lg ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-soft"
                  }`}
              >
                <div className={`w-14 h-14 rounded-xl ${cat.bg} flex items-center justify-center mb-4`}>
                  <cat.icon className={`h-7 w-7 ${cat.color}`} />
                </div>
                <h3 className="font-bold text-sm md:text-base">{cat.name}</h3>
              </motion.button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* FAQ List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  {selectedCategory
                    ? `${categories.find(c => c.id === selectedCategory)?.name} FAQs`
                    : "Frequently Asked Questions"}
                </h2>
                {searchQuery && (
                  <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((f) => (
                      <motion.div
                        key={f.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        layout
                      >
                        <Card className="border-border/50 hover:border-primary/30 transition-all overflow-hidden group">
                          <CardContent className="p-0">
                            <button className="w-full text-left p-6 flex items-start gap-4">
                              <div className="mt-1 flex-shrink-0">
                                <HelpCircle className="h-5 w-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-primary transition-colors">{f.q}</h3>
                                <p className="text-slate-800 font-medium leading-relaxed">
                                  {f.a}
                                </p>
                              </div>
                            </button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 bg-muted/30 rounded-3xl"
                    >
                      <div className="mb-4 flex justify-center">
                        <Search className="h-12 w-12 text-muted-foreground opacity-20" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">No matches found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
                      <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
                        Show all questions
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Support */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0 shadow-xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Still need help?</h3>
                <p className="text-white/80 mb-8 relative z-10 leading-relaxed">
                  Can't find what you're looking for? Our dedicated support team is here to assist you 24/7.
                </p>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 h-12">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                  <Button variant="outline" className="w-full border-white/30 hover:bg-white/10 text-white h-12">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Sales
                  </Button>
                </div>
              </Card>

              <Card className="border-border/50 p-6">
                <h4 className="font-bold mb-4">Popular Guides</h4>
                <div className="space-y-3">
                  {[
                    "Mastering AI Interview Prep",
                    "Advanced Assessment Analytics",
                    "ATS Integration Guide",
                    "Enterprise Security Whitepaper"
                  ].map((guide) => (
                    <button key={guide} className="w-full flex items-center justify-between p-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors group">
                      <span className="group-hover:text-primary transition-colors">{guide}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default HelpCenter;
