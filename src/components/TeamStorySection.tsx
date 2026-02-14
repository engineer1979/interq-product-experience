import { motion } from "framer-motion";
import { Users, Target, Zap, Heart } from "lucide-react";

const values = [
  { icon: Target, title: "Focus on What Matters", desc: "Skills over resumes" },
  { icon: Zap, title: "Simplify Hiring", desc: "Faster, fairer process" },
  { icon: Users, title: "Build Confidence", desc: "Trust in every match" },
  { icon: Heart, title: "Human-Centered", desc: "People first approach" },
];

const TeamStorySection = () => {
  return (
    <section className="py-28 px-4 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant border border-border/40">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                alt="InterQ Team Collaboration"
                className="w-full h-80 object-cover hover:scale-[1.03] transition-transform duration-700"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Meet the Team <br /> <span className="text-primary">Behind InterQ</span>
            </h2>
            <p className="text-xl text-foreground font-medium leading-relaxed mb-6">
              At InterQ, we help you hire the right people — without stress or guesswork.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                Our team of builders and problem-solvers saw how slow, unfair, and confusing hiring had become. Good candidates were getting missed, and we knew there had to be a better way.
              </p>
              <p>
                So we created InterQ to make hiring simpler, fairer, and clearer. We focus on what really matters: how someone thinks, solves problems, and performs real work.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-7 bg-card rounded-2xl border border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 group"
            >
              <div className="w-13 h-13 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamStorySection;
