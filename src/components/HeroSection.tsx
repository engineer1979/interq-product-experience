import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserCheck, Briefcase, Users, Linkedin, Facebook, Instagram } from "lucide-react";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-12 bg-background">
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

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-left"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
            >
              <span className="text-foreground/90">Measure what matters.</span>
              <br />
              <span className="text-primary">Hire with confidence.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              InterQ connects companies, candidates, and expert interviewers on one platform. Conduct fair, scalable, and insightful interviews with advanced assessments and real-time evaluations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start pt-2"
            >
              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/get-started')}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 bg-foreground text-background hover:bg-foreground/90 border-0"
                >
                  Request a Demo
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/how-it-works')}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 border-2 border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5"
                >
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
          >
            <div className="relative z-10 w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px]">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

              <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                {/* Demo Button - Prominently placed */}
                <div className="absolute top-4 right-4 z-20">
                  <Button
                    onClick={() => navigate('/get-started')}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    Demo
                  </Button>
                </div>

                {/* Professional Remote Hiring Image */}
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Remote Hiring Made Easy - Professional business team"
                    className="w-full h-64 md:h-80 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="/interq-logo.png"
                          alt="InterQ Logo"
                          className="h-6 w-auto object-contain"
                        />
                        <span className="font-bold text-sm text-foreground">InterQ</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Making remote hiring seamless and efficient</p>
                    </div>
                  </div>
                </div>

                {/* Key Features Overlay */}
                <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Global Talent</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Seamless Process</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>AI-Powered</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Real-time Insights</span>
                    </div>
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
