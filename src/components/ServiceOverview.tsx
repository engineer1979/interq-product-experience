import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileQuestion, Users, Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    {
        title: "Online Assessments",
        description: "Structured MCQs & technical quizzes to filter top candidates efficiently.",
        icon: FileQuestion,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Pair Interviewing",
        description: "Real-time collaborative interviews with domain experts for deep evaluation.",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Real-time Coding",
        description: "Built-in coding environment for technical roles to assess hands-on skills.",
        icon: Code,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
];

const ServiceOverview: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">InterQ Products</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Comprehensive tools designed to cover every aspect of the technical hiring process.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {products.map((p, index) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-full hover:shadow-lg transition-shadow border-border/50 overflow-hidden group">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-lg ${p.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                                    <p.icon className={`w-6 h-6 ${p.color}`} />
                                </div>
                                <CardTitle className="text-xl font-bold">{p.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-6">{p.description}</p>
                                <div className={`flex items-center text-sm font-medium ${p.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServiceOverview;
