import { motion } from "framer-motion";
import { Users, Target, Zap, Heart } from "lucide-react";

const TeamStorySection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Clean background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white to-slate-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-50 to-white rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="InterQ Team Collaboration"
                className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Meet the Team <br /> <span className="text-primary">Behind InterQ</span>
            </h2>
            <p className="text-xl text-foreground font-medium leading-relaxed mb-6">
              At InterQ, we help you hire the right people — without stress or guesswork.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { icon: Target, title: "Focus on What Matters", desc: "Skills over resumes" },
            { icon: Zap, title: "Simplify Hiring", desc: "Faster, fairer process" },
            { icon: Users, title: "Build Confidence", desc: "Trust in every match" },
            { icon: Heart, title: "Human-Centered", desc: "People first approach" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamStorySection;