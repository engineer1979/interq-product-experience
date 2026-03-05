import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, TrendingUp, Shield, CheckCircle2, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-interview.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-20 bg-transparent">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-6%] w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-6%] w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/[0.015] blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                Expert-Led Technical Hiring Platform
              </span>
            </motion.div>

            {/* H1 — SEO-optimized, keyword-rich */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.25rem] fancy-heading leading-[1.1] tracking-tight text-white"
            >
              The Premier Technical Hiring Platform{" "}
              <span className="gradient-text-brand">
                Powered by Experts
              </span>
            </motion.h1>

            {/* Subheading — benefit-led, scannable */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              InterQ replaces unstructured hiring with{" "}
              <strong className="text-white">structured candidate assessments</strong>{" "}
              led by vetted domain experts — so you hire faster, reduce bias, and eliminate bad hires.
            </motion.p>

            {/* Bullet benefits — mobile scannable */}
            <motion.ul
              variants={itemVariants}
              className="flex flex-col gap-2 text-sm sm:text-base text-white/85 w-full max-w-xl mx-auto lg:mx-0"
            >
              {[
                "Structured technical interviews — not gut-feel decisions",
                "Vetted Experts assess candidates across 50+ domains",
                "Detailed evaluation reports delivered within 24 hours",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 pt-1 w-full sm:w-auto"
            >
              <Button
                onClick={() => navigate("/get-started")}
                size="lg"
                variant="premium"
                className="w-full sm:w-auto h-13 px-9 text-base font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => navigate("/#how-it-works")}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-13 px-9 text-base font-medium rounded-xl border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 group"
              >
                <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
                See How It Works
              </Button>
            </motion.div>

            {/* CTA microcopy */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-slate-300 font-medium"
            >
              No sales call required • 5-minute walkthrough of InterQ's hiring platform
            </motion.p>

            {/* Trust strip — compact mobile badges */}
            <motion.div
              variants={itemVariants}
              className="pt-2 w-full"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                {[
                  { icon: Clock, text: "Reduce hiring time by 40%" },
                  { icon: Users, text: "500+ hiring teams" },
                  { icon: Target, text: "Higher hiring accuracy" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white"
                  >
                    <badge.icon className="h-3.5 w-3.5 text-primary" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content — Image Card with floating stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full hidden md:flex justify-center lg:justify-end items-center"
          >
            <div className="relative w-full max-w-[520px] space-y-6">
              {/* Main image card - Clean without overlapping elements */}
              <div className="rounded-2xl overflow-hidden shadow-elegant border border-border/40 bg-card">
                <img
                  src={heroImg}
                  alt="Professional technical interview session conducted by InterQ domain experts in a modern office"
                  className="w-full h-[340px] object-cover"
                  loading="eager"
                />
                {/* Live Analysis Status Bar */}
                <div className="p-4 flex items-center justify-between bg-muted/50 border-t border-border/40">
                  <div>
                    <p className="text-sm font-bold text-foreground">Live Analysis</p>
                    <p className="text-xs text-white/80">Processing candidate…</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-700 text-xs font-bold border border-green-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Active
                  </div>
                </div>
              </div>

              {/* Structured KPI Grid - No overlapping, clean layout */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Candidates Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass-card p-4 rounded-xl shadow-elegant flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">Candidates</p>
                    <p className="text-sm font-bold text-foreground">2,847</p>
                  </div>
                </motion.div>

                {/* Strong Hire Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="glass-card p-4 rounded-xl shadow-elegant flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">Strong Hire</p>
                    <p className="text-sm font-bold text-foreground">87.3%</p>
                  </div>
                </motion.div>

                {/* Hire Rate Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="glass-card p-4 rounded-xl shadow-elegant flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">Hire Rate</p>
                    <p className="text-sm font-bold text-foreground">94.2%</p>
                  </div>
                </motion.div>

                {/* Active Sessions Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="glass-card p-4 rounded-xl shadow-elegant flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">Active</p>
                    <p className="text-sm font-bold text-foreground">24</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
