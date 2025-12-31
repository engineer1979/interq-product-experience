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
              <span className="text-foreground/90">Fair, Scalable &</span>
              <br />
              <span className="text-primary">Insightful Interviews</span>
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
                  onClick={() => navigate('/create-interview')}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 gradient-primary text-primary-foreground border-0"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Hire with InterQ
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/careers')}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  <UserCheck className="mr-2 h-5 w-5" />
                  Join as Candidate
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} className="w-full sm:w-auto">
                <Button
                  onClick={() => navigate('/auth?tab=register')}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Expert Interviewer
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
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

              <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                {/* Custom Header Overlay to replace existing logo */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-between px-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <img
                      src="/interq-logo.png"
                      alt="InterQ Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <span className="font-bold text-sm text-foreground/80">InterQ</span>
                  </div>
                  {/* Social Icons in Header */}
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Video Embed */}
                <div className="pt-16 pb-0"> {/* Padding top to account for header */}
                  <iframe
                    src="https://www.instagram.com/reel/DFsGakVJIyn/embed"
                    className="w-full aspect-[9/16] border-none"
                    title="InterQ Instagram Reel"
                    allow="encrypted-media"
                    scrolling="no"
                  />
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
