import { motion } from "framer-motion";
import { Stethoscope, DollarSign, Calculator, GraduationCap, ChevronRight } from "lucide-react";

const industries = [
  {
    name: "Healthcare",
    icon: Stethoscope,
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
  },
  {
    name: "Finance",
    icon: DollarSign,
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
  },
  {
    name: "Accounting",
    icon: Calculator,
    image: "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
  },
  {
    name: "Education",
    icon: GraduationCap,
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
  },
];

const FutureExpansion = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.015)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Roadmap 2025
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Future Expansion</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            InterQ is evolving beyond IT. Soon, we'll offer specialized AI interviewing solutions for diverse high-impact sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 group flex flex-col h-full hover:-translate-y-1"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
              </div>

              <div className="p-5 flex flex-col items-center flex-1 relative">
                <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-3 -mt-10 relative z-10 border border-border shadow-soft group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  <industry.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1">{industry.name}</h3>
                <div className="w-8 h-0.5 bg-border rounded-full group-hover:bg-primary/50 group-hover:w-12 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-card px-5 py-2.5 rounded-full border border-border/50 shadow-soft">
            <span>Roadmap 2025-2030</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureExpansion;
