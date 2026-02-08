import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Terminal,
  Settings,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  ChevronRight,
  Code,
  Layers,
  FileText
} from "lucide-react";

const sidebarLinks = [
  { group: "Foundation", items: ["Quickstart", "Core Concepts", "Architecture"] },
  { group: "Assessments", items: ["Creating Tests", "Question Library", "Anti-Cheat"] },
  { group: "AI Interviews", items: ["Flow Setup", "Sentiment Analysis", "Scoring Logic"] },
  { group: "Integration", items: ["REST API", "Webhooks", "ATS Integration"] },
  { group: "Privacy", items: ["GDPR Compliance", "Data Retention"] },
];

const docs = [
  {
    id: 1,
    title: "Quickstart Guide",
    desc: "Get InterQ up and running in under 5 minutes with our step-by-step setup guide.",
    category: "Foundation",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    id: 2,
    title: "Developing Custom Question Sets",
    desc: "Learn how to use our DSL to create complex, multi-stage technical assessments.",
    category: "Assessments",
    icon: Code,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: 3,
    title: "AI Interview Calibration",
    desc: "Fine-tune the AI scoring models to align perfectly with your organization's hiring bar.",
    category: "AI Interviews",
    icon: Layers,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: 4,
    title: "API Reference v2.0",
    desc: "Complete documentation for our RESTful API endpoints for seamless workflow integration.",
    category: "Integration",
    icon: Terminal,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    id: 5,
    title: "Anti-Cheat Mechanisms",
    desc: "Deep dive into our proctoring engine, behavioral analysis, and plagiarism detection.",
    category: "Assessments",
    icon: ShieldCheck,
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    id: 6,
    title: "Candidate Management",
    desc: "Managing high-volume applicants using our advanced filtering and batch processing tools.",
    category: "Foundation",
    icon: Users,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDocs = useMemo(() => {
    return docs.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto max-w-7xl pt-32 pb-20 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search docs..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary h-10 rounded-xl"
                />
              </div>

              <div className="space-y-6">
                {sidebarLinks.map((group) => (
                  <div key={group.group}>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 pl-2">
                      {group.group}
                    </h4>
                    <ul className="space-y-1">
                      {group.items.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => setSelectedCategory(group.group)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${selectedCategory === group.group
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                          >
                            {item}
                            {selectedCategory === group.group && <ChevronRight className="h-3 w-3" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 p-6">
                <h5 className="font-bold text-sm mb-2">Need help?</h5>
                <p className="text-xs text-muted-foreground mb-4">Can't find the documentation you need?</p>
                <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => window.location.href = '/help-center'}>
                  Join Discord
                </Button>
              </Card>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Everything you need to build, scale, and manage your hiring workflow with InterQ.
              </p>
            </motion.div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
              <AnimatePresence mode="popLayout">
                {filteredDocs.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group h-full flex flex-col hover:border-primary/50 hover:shadow-elegant transition-all duration-300 overflow-hidden">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className={`w-12 h-12 rounded-xl ${doc.bg} flex items-center justify-center mb-6`}>
                          <doc.icon className={`h-6 w-6 ${doc.color}`} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-md">
                            {doc.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                          {doc.desc}
                        </p>
                        <Button variant="ghost" className="p-0 h-auto font-bold text-primary group-hover:translate-x-2 transition-transform self-start">
                          Learn more <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* API Status Section */}
            <Card className="border-border/50 bg-muted/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-background rounded-2xl shadow-sm border border-border/50">
                  <Terminal className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">API Status</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">All Systems Operational</span>
                  </div>
                </div>
              </div>
              <Button onClick={() => window.location.href = '/api-docs'} className="shadow-lg h-12 px-8 rounded-xl font-bold">
                API Documentation
              </Button>
            </Card>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;