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

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Meet the Team Behind InterQ
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            At InterQ, we help you hire the right people — without stress or guesswork.
          </p>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p>
              Our team of builders and problem-solvers saw how slow, unfair, and confusing hiring had become. Good candidates were getting missed, and we knew there had to be a better way. So we created InterQ to make hiring simpler, fairer, and clearer.
            </p>

            <p>
              We focus on what really matters: how someone thinks, solves problems, and performs real work, not just their resume or interview skills. This helps companies find people who can succeed in the job and helps candidates show their true ability.
            </p>

            <p>
              Behind the scenes, we make sure everything is easy to use, understand, and trust. We're here to save you time, reduce mistakes, and help everyone feel confident, one great match at a time.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Focus on What Matters</h3>
              <p className="text-sm text-muted-foreground">Skills over resumes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Simplify Hiring</h3>
              <p className="text-sm text-muted-foreground">Faster, fairer process</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Build Confidence</h3>
              <p className="text-sm text-muted-foreground">Trust in every match</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Human-Centered</h3>
              <p className="text-sm text-muted-foreground">People first approach</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamStorySection;