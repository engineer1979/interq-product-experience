import { motion } from "framer-motion";
import { Briefcase, UserCheck, Users, Calendar, Video, FileText, Lock, Award, Code, Monitor } from "lucide-react";

const cards = [
  {
    title: "For Employers",
    icon: Briefcase,
    accent: "primary",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    features: [
      { icon: FileText, text: "Real-time evaluation reports" },
      { icon: Video, text: "Recorded interviews & playback" },
      { icon: Code, text: "MCQs, coding, software assessments" },
      { icon: Calendar, text: "Automated booking & scheduling" },
    ],
  },
  {
    title: "For Candidates",
    icon: UserCheck,
    accent: "primary",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    features: [
      { icon: Calendar, text: "Seamless scheduling" },
      { icon: Monitor, text: "Practice interviews & prep guides" },
      { icon: Award, text: "Showcase real skills with assessments" },
      { icon: Lock, text: "Fair environment with fraud detection" },
    ],
  },
  {
    title: "For Experts",
    icon: Users,
    accent: "primary",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    features: [
      { icon: Users, text: "Join network of domain experts" },
      { icon: Video, text: "Conduct interviews in your specialization" },
      { icon: Calendar, text: "Flexible scheduling & pay per session" },
      { icon: Award, text: "Grow your profile as trusted evaluator" },
    ],
  },
];

const WhoWeServe = () => {
  return (
    <section className="py-28 bg-muted/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.015)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
            Our Audience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-foreground">Who We Serve</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tailored solutions for every stakeholder in the recruitment ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-card border border-border/50 rounded-2xl shadow-soft overflow-hidden group hover:shadow-elegant transition-all duration-300"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-3.5">
                  {card.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <feature.icon className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
