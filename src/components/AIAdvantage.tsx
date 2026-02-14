import { motion } from "framer-motion";
import { Brain, Calendar, ShieldCheck, UserCheck, FileText, Layers } from "lucide-react";

const advantages = [
  {
    icon: Brain,
    title: "AI-Powered Skills Assessments",
    description: "Evaluate actual abilities, not just CV claims, with adaptive AI testing.",
  },
  {
    icon: Calendar,
    title: "Automated Scheduling",
    description: "No more back-and-forth emails. Seamlessly sync calendars.",
  },
  {
    icon: UserCheck,
    title: "Bias Mitigation",
    description: "Reduce unconscious bias by up to 25% in screening with standardized metrics.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    description: "Prevent impersonation or unfair practices with advanced proctoring.",
  },
  {
    icon: FileText,
    title: "Comprehensive Profiles",
    description: "View skills, communication, and culture fit together in one report.",
  },
  {
    icon: Layers,
    title: "Seamless Integration",
    description: "Connect easily with your existing ATS and HR tools for a unified workflow.",
  },
];

const AIAdvantage = () => {
  return (
    <section className="py-28 bg-muted/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Why InterQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            The <span className="text-gradient">AI-Powered</span> Advantage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Leverage cutting-edge technology to make smarter, faster, and fairer hiring decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 p-7 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-13 h-13 rounded-xl bg-primary/8 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/12 group-hover:scale-105">
                <adv.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2.5 text-foreground group-hover:text-primary transition-colors duration-300">{adv.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAdvantage;
