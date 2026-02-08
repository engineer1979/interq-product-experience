import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { Zap, ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16 bg-background">
      {/* Sophisticated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Professional Office Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03] grayscale contrast-125"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] animate-pulse-subtle" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[80px] animate-pulse-subtle delay-1000" />
        {/* Grid pattern overlay for tech feel */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-8 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
                The Future of Hiring
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white"
            >
              Measure what <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">matters most.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Conduct fair, scalable, and insightful interviews with InterQ's autonomous hiring engine. From first screen to final offer, hire with mathematical confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Button
                onClick={() => navigate('/get-started')}
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 bg-primary hover:bg-primary/90 text-white"
              >
                Start Hiring Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => navigate('/#how-it-works')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-base font-medium rounded-lg border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 group"
              >
                <Play className="mr-2 h-4 w-4 fill-slate-900 group-hover:fill-slate-900/80 transition-colors" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`} />
                ))}
              </div>
              <span>Trusted by 500+ hiring teams</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Modern Glass Card Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
          >
            {/* Abstract Decorative blob behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-500/10 to-transparent blur-3xl -z-10" />

            <div className="relative w-full max-w-[500px]">
              <div className="glass-card p-6 sm:p-8 backdrop-blur-xl bg-white/60 border border-white/60 shadow-2xl rounded-2xl relative overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: 'skewX(-20deg) translateX(-150%)' }} />

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Zap size={20} className="fill-current" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Live Analysis</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Processing Candidate...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-bold border border-green-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Active
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-600">Technical Proficiency</span>
                      <span className="text-slate-900 font-bold">92%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-slate-600">Communication Clarity</span>
                      <span className="text-slate-900 font-bold">88%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "88%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Floating Elements mimicking AI processing */}
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/50 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">AI</div>
                      <div className="h-2 w-12 bg-slate-200 rounded-full" />
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">IQ</div>
                      <div className="h-2 w-16 bg-slate-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 glass px-4 py-3 rounded-xl border-l-4 border-l-primary shadow-lg max-w-[180px]"
              >
                <p className="text-xs font-bold text-slate-500 mb-1">Recommendation</p>
                <p className="text-sm font-bold text-slate-900">Strong Hire</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
