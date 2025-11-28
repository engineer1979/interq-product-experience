import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              AI-Powered Recruitment Platform
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Redefining Recruitment,{" "}
              <span className="text-primary">Empowering Excellence</span>
            </h1>
            
            <p className="text-xl text-foreground/70 leading-relaxed">
              AI-driven interview platform delivering outsourced interviews, real-time assessments, 
              and automated evaluations across North America, Middle East and beyond
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary shadow-elegant text-base">
                Book Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Start Free Trial
                <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">3,400+</div>
                <div className="text-sm text-foreground/60">Skills Assessed</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div>
                <div className="text-3xl font-bold text-foreground">2,500+</div>
                <div className="text-sm text-foreground/60">Job Roles</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elegant aspect-[9/16] max-w-md mx-auto">
              <iframe
                src="https://www.instagram.com/reel/DFsGakVJIyn/embed"
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
