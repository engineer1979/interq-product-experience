import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Users, Calendar, Video, FileBarChart } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        icon: FileText,
        title: "Post Role",
        description: "Employer posts role & requirements."
    },
    {
        icon: Users,
        title: "Candidate Invitations",
        description: "Candidates apply or get invited."
    },
    {
        icon: Calendar,
        title: "Automated Scheduling",
        description: "Interview is scheduled automatically."
    },
    {
        icon: Video,
        title: "Expert Interview",
        description: "Expert interviewer conducts online session (coding / MCQs / pair interview)."
    },
    {
        icon: FileBarChart,
        title: "Detailed Report",
        description: "AI-enhanced evaluation report delivered."
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>

            <div className="relative max-w-4xl mx-auto">
                {/* Vertical Line */}
                <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0 hidden md:block" />
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border z-0 md:hidden" />

                <div className="space-y-12 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                        >
                            {/* Icon Bubble */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg ring-4 ring-background ml-[9px] md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                                <span className="text-sm">{index + 1}</span>
                            </div>

                            {/* Content Card */}
                            <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                                <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                                        <step.icon className="w-5 h-5 text-primary" />
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>

                            {/* Empty space for the other side of the timeline on desktop */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
