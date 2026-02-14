import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    text: "InterQ saved us from losing top talent due to scheduling delays. The automated system ensures every good candidate gets a fair shot.",
    name: "HR Manager",
    company: "TechCo",
  },
  {
    text: "I love conducting interviews here — flexible, structured, and professional. It allows me to focus on evaluating skills rather than logistics.",
    name: "Senior Software Engineer",
    company: "Expert",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">What Our Users Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 p-8 rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/8" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-base text-muted-foreground mb-8 relative z-10 leading-relaxed italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{t.name[0]}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-sm">{t.name}</span>
                  <span className="text-xs text-primary font-medium">{t.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
