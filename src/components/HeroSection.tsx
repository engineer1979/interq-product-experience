import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { UserCheck, Briefcase, Users, Zap, CheckCircle2, Globe, BarChart3, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32 pb-16 bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -60, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-8 text-center lg:text-left items-center lg:items-start"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-foreground/90 block sm:inline">Measure what matters. </span>
              <span className="text-primary block sm:inline">Hire with confidence.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl lg:max-w-xl mx-auto lg:mx-0"
            >
              InterQ connects companies, candidates, and expert interviewers on one platform. Conduct fair, scalable, and insightful interviews with advanced assessments and real-time evaluations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-5 pt-2 w-full"
            >
              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/get-started')}
                  size="lg"
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base sm:text-lg rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-foreground text-background hover:bg-foreground/90 border-0"
                >
                  Request a Demo
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => {
                    if (window.location.pathname === '/') {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#how-it-works');
                    }
                  }}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base sm:text-lg rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
                >
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
          >
            <div className="relative z-10 w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[550px]">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

              <div className="relative bg-card border border-border rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-700 p-8 sm:p-12">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full -ml-12 -mb-12 blur-xl" />

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Fast-Track Hiring</h3>
                      <p className="text-sm text-muted-foreground">Automated workflows active</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Analyzing Intent</span>
                      <span className="text-primary">70% Complete</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background border border-border shadow-sm">
                      <div className="text-2xl font-bold text-foreground">150+</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Assessments</div>
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-border shadow-sm">
                      <div className="text-2xl font-bold text-primary">2.5k</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Candidates</div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex -space-x-3 overflow-hidden">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted border border-border" />
                      ))}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-background">
                        +12
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground italic">Recruited this week via AI</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
