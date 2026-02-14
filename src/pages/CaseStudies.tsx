import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Terminal,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Clock,
  Target
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const cases = [
  {
    id: "org-hiring",
    title: "Organizational Hiring",
    desc: "Reduced time-to-hire by 35% across regions.",
    icon: Building2,
    gradient: "from-blue-500 to-indigo-600",
    challenge: "Fragmented hiring processes across multiple geographic regions led to inconsistent candidate quality and inefficient resource allocation.",
    solution: "Implemented InterQ's unified assessment platform, standardizing evaluation criteria and centralizing the hiring workflow for the entire global team.",
    results: [
      "35% reduction in average time-to-hire",
      "22% improvement in first-year employee retention",
      "Standardized scoring across 12 countries"
    ],
    stats: [
      { label: "Efficiency", value: "+40%" },
      { label: "Cost Savings", value: "$250k+" }
    ]
  },
  {
    id: "campus-recruitment",
    title: "Campus Recruitment",
    desc: "Automated screening for 10k+ candidates.",
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-600",
    challenge: "Handling a high volume of over 10,000 campus applications within a tight 2-week window during peak recruitment season.",
    solution: "Utilized InterQ's automated AI-powered MCQ assessments to filter candidates based on core competencies before the interview stage.",
    results: [
      "100% automated initial screening process",
      "Identified top 5% talent within 48 hours",
      "Zero manual grading errors"
    ],
    stats: [
      { label: "Automated", value: "100%" },
      { label: "Time Saved", value: "85%" }
    ]
  },
  {
    id: "technical-interviews",
    title: "Technical Interviews",
    desc: "Improved evaluation quality with AI feedback.",
    icon: Terminal,
    gradient: "from-emerald-500 to-teal-600",
    challenge: "Significant variance in technical interview quality and objectivity among different internal interview teams.",
    solution: "Adopted InterQ's Pair Interviewing platform with built-in coding environments and real-time AI performance monitoring.",
    results: [
      "45% increase in technical interview consistency",
      "Reduced candidate drop-off rate by 18%",
      "Enhanced expert feedback quality"
    ],
    stats: [
      { label: "Consistency", value: "+45%" },
      { label: "Satisfaction", value: "92%" }
    ]
  },
];

const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              Success Stories
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering <span className="text-gradient">Better Hiring</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real outcomes from organizations that transformed their recruitment process using InterQ's AI-driven platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl glass-card">
                  <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <c.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-smooth">{c.title}</h3>
                    <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">{c.desc}</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {c.stats.map(stat => (
                        <div key={stat.label}>
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => setSelectedCase(c)}
                      variant="outline"
                      className="group/btn border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-semibold transition-all duration-300"
                    >
                      View Full Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${selectedCase.gradient} flex items-center justify-center mb-4`}>
                  <selectedCase.icon className="w-6 h-6 text-white" />
                </div>
                <DialogTitle className="text-3xl font-bold">{selectedCase.title}</DialogTitle>
                <DialogDescription className="text-lg">
                  How InterQ transformed recruitment at scale.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 py-6">
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Target className="w-5 h-5 text-primary" />
                    The Challenge
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    The Solution
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                  <h4 className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary">
                    <BarChart3 className="w-5 h-5" />
                    Key Results
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {selectedCase.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button onClick={() => setSelectedCase(null)} variant="default">
                    Close Details
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CaseStudies;