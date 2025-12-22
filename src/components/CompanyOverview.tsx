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
    <div>
      <section ref={ref} className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              About <span className="text-gradient">InterQ Enterprise Inc</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Leading the transformation of recruitment through innovative AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 border border-white/10"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                Streamline hiring through AI-driven interviews and assessments, making recruitment faster,
                fairer, and more effective for organizations worldwide
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 border border-white/10"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the leading AI recruitment platform across North America, Middle East and beyond,
                setting new standards in hiring excellence
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 border border-white/10"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Who We Serve</h3>
              <p className="text-muted-foreground">
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
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 px-6 py-3 glass rounded-full hover:bg-white/20 transition-smooth cursor-default border border-white/10"
                >
                  <value.icon className={`h-5 w-5 ${value.color}`} />
                  <span className="font-medium">{value.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/10 shrink-0">
                  <img
                    src="/saima-huma-ceo.png"
                    alt="Saima Huma, CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">A Message from Our CEO</h3>
                  <div className="font-semibold text-primary text-lg">
                    Saima Huma
                  </div>
                  <div className="text-sm text-muted-foreground">
                    CEO, InterQ Technologies Incorporation
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 italic relative">
                <span className="text-6xl text-primary/10 absolute -top-4 -left-2 font-serif">"</span>
                At InterQ, we believe hiring should be fair, transparent, and focused on real skills. Too often, resumes or automated assessments overlook talent, while organizations struggle to make confident hiring decisions. Our platform combines experienced human interviewers with smart technology, giving candidates a real chance to shine and employers clear insights to hire smarter. Built on Canadian hiring standards and designed to scale globally, InterQ is expanding beyond technology into sectors like healthcare, finance, and education, always with fairness, trust, and real-world impact at the center.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyOverview;
