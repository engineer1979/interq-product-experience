import React from "react";
import { FileText, Users, Calendar, Video, FileBarChart } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: FileText, title: "Post Role", description: "Employer posts role & requirements." },
  { icon: Users, title: "Candidate Invitations", description: "Candidates apply or get invited." },
  { icon: Calendar, title: "Automated Scheduling", description: "Interview is scheduled automatically." },
  { icon: Video, title: "Expert Interview", description: "Expert conducts online session (coding / MCQs / pair interview)." },
  { icon: FileBarChart, title: "Detailed Report", description: "AI-enhanced evaluation report delivered." },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">How It Works</h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 z-0 hidden md:block" />
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border z-0 md:hidden" />

          <div className="space-y-14 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                {/* Icon Bubble */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg ring-4 ring-background ml-[9px] md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-sm">{index + 1}</span>
                </div>

                {/* Content Card */}
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-14" : "md:text-left md:pl-14"}`}>
                  <div className="bg-card border border-border/50 p-6 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 group">
                    <div className={`flex items-center gap-3 mb-2.5 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <step.icon className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
