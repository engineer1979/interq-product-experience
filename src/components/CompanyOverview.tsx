import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Award, Lightbulb, TrendingUp } from "lucide-react";

const CompanyOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { icon: Lightbulb, label: "Innovation", color: "text-blue-500" },
    { icon: TrendingUp, label: "Efficiency", color: "text-green-500" },
    { icon: Award, label: "Integrity", color: "text-purple-500" },
    { icon: Target, label: "Excellence", color: "text-orange-500" },
    { icon: Eye, label: "Transparency", color: "text-cyan-500" },
  ];

  return (
    <section ref={ref} className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary">InterQ Enterprise Inc</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Leading the transformation of recruitment through innovative AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 shadow-soft border border-border"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-foreground/70">
              Streamline hiring through AI-driven interviews and assessments, making recruitment faster, 
              fairer, and more effective for organizations worldwide
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 shadow-soft border border-border"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-foreground/70">
              To become the leading AI recruitment platform across North America, Middle East and beyond, 
              setting new standards in hiring excellence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 shadow-soft border border-border"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Who We Serve</h3>
            <p className="text-foreground/70">
              From SMEs to large enterprises, we provide scalable recruitment solutions that adapt to 
              your unique hiring needs and organizational growth
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Our Core Values</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 bg-card rounded-full shadow-soft border border-border"
              >
                <value.icon className={`h-5 w-5 ${value.color}`} />
                <span className="font-medium">{value.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverview;
