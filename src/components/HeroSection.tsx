import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, UserCheck, Briefcase, Users, Code, Video, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-12 bg-background transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -60, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              Fair, Scalable &<br />
              <span className="text-gradient">Insightful Interviews</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              InterQ connects companies, candidates, and expert interviewers on one platform. Conduct fair, scalable, and insightful interviews with advanced assessments and real-time evaluations.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => navigate('/create-interview')}
                size="lg"
                className="gradient-primary text-primary-foreground shadow-lg shadow-primary/20 h-14 px-8 text-lg w-full sm:w-auto rounded-xl hover:scale-105 transition-transform"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Hire with InterQ
              </Button>

              <Button
                onClick={() => navigate('/careers')}
                size="lg"
                variant="secondary"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-lg shadow-secondary/20 h-14 px-8 text-lg w-full sm:w-auto rounded-xl hover:scale-105 transition-transform"
              >
                <UserCheck className="mr-2 h-5 w-5" />
                Join as Candidate
              </Button>

              <Button
                onClick={() => navigate('/auth?tab=register')}
                size="lg"
                variant="outline"
                className="border-2 border-primary/20 text-foreground hover:bg-primary/5 h-14 px-8 text-lg w-full sm:w-auto rounded-xl hover:scale-105 transition-transform"
              >
                <Users className="mr-2 h-5 w-5" />
                Expert Interviewer
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Instagram Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
          >
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[110%] bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />

              <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden transform hover:rotate-1 transition-transform duration-500">
                <iframe
                  src="https://www.instagram.com/reel/DFsGakVJIyn/embed"
                  className="w-full aspect-[9/16] border-none"
                  title="InterQ Instagram Reel"
                  allow="encrypted-media"
                  scrolling="no"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
