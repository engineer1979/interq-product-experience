import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  {
    id: 1,
    category: "getting-started",
    q: "How do I create an assessment?",
    a: "To create an assessment, navigate to the 'Assessments' tab in your dashboard, click the 'Create New' button, and follow the setup wizard to define your role requirements, select question sets, and configure passing thresholds."
  },
  {
    id: 2,
    category: "ai-interviews",
    q: "How are AI interviews scored?",
    a: "Our AI platform evaluates candidates based on three primary pillars: Technical Correctness (matching against target skills), Communication Clarity (articulation and pace), and Behavioral Alignment. The final score is a weighted average of these factors."
  },
  {
    id: 3,
    category: "assessments",
    q: "Can I invite candidates via email?",
    a: "Yes! You can either upload a CSV of candidate emails for bulk invitation, or generate a unique shareable link that can be posted on job boards. Candidates will receive an automated invitation with their unique credentials."
  },
  {
    id: 4,
    category: "account",
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, AMEX), wire transfers for enterprise plans, and regional payment methods in the Middle East and North America."
  },
  {
    id: 5,
    category: "ai-interviews",
    q: "Is the AI interview bias-free?",
    a: "InterQ is built with fairness first. Our models are trained on diverse datasets and audited regularly to ensure they evaluate purely on merit and competency, ignoring factors like gender, ethnicity, or background."
  },
  {
    id: 6,
    category: "getting-started",
    q: "Do I need to install any software?",
    a: "No, InterQ is entirely cloud-based. Both recruiters and candidates can access the platform through any modern web browser without any installations required."
  },
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
      <Navigation />

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
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
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
      <section className="py-12 px-4">
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
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{f.q}</h3>
                                <p className="text-muted-foreground leading-relaxed">
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

      <Footer />
    </div>
  );
};

export default HelpCenter;