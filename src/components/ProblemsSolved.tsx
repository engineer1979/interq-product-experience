import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, UserX, Target, Calendar, BarChart, DollarSign, Shield, TrendingUp } from "lucide-react";

const ProblemsSolved = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const problems = [
    { icon: Clock, title: "Slow hiring processes", description: "Eliminate delays with automated assessments" },
    { icon: UserX, title: "Lack of technical expertise", description: "AI-powered technical interview support" },
    { icon: Target, title: "Bias in evaluations", description: "Standardized, objective assessment metrics" },
    { icon: Calendar, title: "Scheduling complexity", description: "Streamlined interview coordination" },
    { icon: BarChart, title: "Inconsistent quality", description: "Uniform evaluation standards" },
    { icon: DollarSign, title: "High interviewer costs", description: "Reduce expenses with automation" },
    { icon: Shield, title: "Assessment fraud", description: "Advanced cheating detection systems" },
    { icon: TrendingUp, title: "Scalability challenges", description: "Grow your hiring without limits" },
  ];

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-destructive/10 rounded-full text-destructive text-sm font-medium mb-6">
            Common Hiring Challenges
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Problems We <span className="text-primary">Solve</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Traditional recruitment faces critical obstacles. InterQ eliminates them with intelligent automation
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elegant hover:border-primary/30 transition-smooth"
            >
              <div className="h-12 w-12 rounded-lg bg-destructive/10 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-smooth">
                <problem.icon className="h-6 w-6 text-destructive group-hover:text-primary transition-smooth" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
              <p className="text-sm text-foreground/60">{problem.description}</p>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-smooth"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolved;
