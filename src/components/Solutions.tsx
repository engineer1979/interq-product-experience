import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Brain, Users, Zap, Eye, Boxes, Sparkles } from "lucide-react";

const Solutions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const solutions = [
    {
      icon: CheckCircle2,
      title: "Standardized & Unbiased Assessments",
      description: "Remove human bias with consistent, objective evaluation criteria applied to every candidate",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "AI Analytics for Deep Insights",
      description: "Leverage machine learning to uncover patterns, predict performance, and make data-driven hiring decisions",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Quality Candidate Evaluation",
      description: "Comprehensive assessment tools that accurately measure both technical abilities and soft skills",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Zap,
      title: "Combined Scoring System",
      description: "Holistic candidate profiles combining technical competence with communication and problem-solving skills",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Eye,
      title: "End-to-End Transparency",
      description: "Complete visibility into the hiring process with detailed reports and audit trails",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: Boxes,
      title: "Scalable for All Sizes",
      description: "From startups to enterprises, our platform grows with your organization's needs",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: Sparkles,
      title: "Modern Candidate Experience",
      description: "User-friendly interface that candidates love, improving your employer brand",
      gradient: "from-indigo-500 to-indigo-600"
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            Our Solutions
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-primary">InterQ</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Comprehensive recruitment technology that transforms how you discover, assess, and hire top talent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-elegant transition-smooth"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth shadow-elegant`}>
                <solution.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                {solution.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
