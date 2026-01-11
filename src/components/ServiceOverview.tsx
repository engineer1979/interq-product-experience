import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileQuestion, Users, Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    {
        title: "Online Assessments",
        description: "Structured MCQs & technical quizzes to filter top candidates efficiently.",
        icon: FileQuestion,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        title: "Pair Interviewing",
        description: "Real-time collaborative interviews with domain experts for deep evaluation.",
        icon: Users,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        title: "Real-time Coding",
        description: "Built-in coding environment for technical roles to assess hands-on skills.",
        icon: Code,
        color: "text-primary",
        bg: "bg-primary/10"
    },
];

const ServiceOverview: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-premium hover:shadow-2xl transition-shadow duration-500">
                <div className="grid lg:grid-cols-2 gap-0 items-center">
                    {/* Left Image */}
                    <div className="relative h-full min-h-[400px] overflow-hidden group">
                        <img
                            src="/consultation.jpg"
                            alt="Recruitment consultation meeting in a modern office"
                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                    </div>

                    {/* Right Content */}
                    <div className="p-12 lg:p-20 bg-white">
                        <h2 className="text-4xl font-bold mb-10 text-slate-900 tracking-tight">Services</h2>
                        <ul className="space-y-6">
                            {[
                                "Recruitment",
                                "Talent Screening",
                                "Interview Scheduling",
                                "Onboarding Support"
                            ].map((service, i) => (
                                <li key={i} className="flex items-center gap-5 text-xl text-slate-700 font-medium group cursor-default">
                                    <div className="w-3 h-3 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                                    <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceOverview;
