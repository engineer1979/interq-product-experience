import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileQuestion, Users, Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    title: "Online Assessments",
    description: "Structured MCQs & technical quizzes to filter top candidates efficiently.",
    icon: FileQuestion,
  },
  {
    title: "Pair Interviewing",
    description: "Real-time collaborative interviews with domain experts for deep evaluation.",
    icon: Users,
  },
  {
    title: "Real-time Coding",
    description: "Built-in coding environment for technical roles to assess hands-on skills.",
    icon: Code,
  },
];

const ServiceOverview: React.FC = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Our Products
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-foreground">InterQ Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive tools designed to cover every aspect of the technical hiring process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50 overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/12 group-hover:scale-105">
                    <p.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{p.description}</p>
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
