import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserCheck, Briefcase, Zap, Globe, Cpu } from "lucide-react";
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-0 bg-white">
      {/* Abstract Background Elements - Premium Light Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] bg-gradient-to-br from-primary/10 to-blue-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[50%] bg-gradient-to-tr from-orange-100 to-amber-50 rounded-full blur-[80px] opacity-60" />
      </div>

      <div className="container-premium relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-left max-w-2xl relative z-20 mx-auto lg:mx-0"
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Recruitment Evolved
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-display text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 text-balance tracking-tight"
              >
                Hire Smarter.
                <br />
                <span className="text-primary">Get Hired Faster.</span>
              </motion.h1>
            </div>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-lg text-balance"
            >
              InterQ Recruitment Company connects top talent with growing businesses using AI-driven precision matching.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Button
                onClick={() => navigate('/create-interview')}
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-2xl shadow-premium btn-premium bg-slate-900 hover:bg-slate-800 text-white border-0 w-full sm:w-auto"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Hire Talent
              </Button>

              <Button
                onClick={() => navigate('/careers')}
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all w-full sm:w-auto"
              >
                <UserCheck className="mr-2 h-5 w-5" />
                Submit CV
              </Button>
            </motion.div>

            {/* Trust Signals / Benefits */}
            <motion.div
              variants={itemVariants}
              className="pt-8 border-t border-slate-100 mt-8"
            >
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Why Top Companies Trust Us</p>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-tight">AI Matching Speed</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-tight">Global Remote Talent</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-tight">48h Hiring Turnaround</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Content - Visual Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center relative h-full min-h-[600px] perspective-1000"
          >
            {/* New Blob Background Image */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <img
                src="/hero-blobs.png"
                alt="Abstract organic shapes"
                className="w-[120%] h-[120%] object-contain opacity-80 animate-pulse-slow scale-110"
              />
            </div>

            {/* Main Feature - Instagram/Video Mockup */}
            <div className="relative w-full max-w-[400px] transform transition-transform hover:rotate-1 duration-700">
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-10 z-20 glass-card p-4 rounded-2xl flex items-center gap-3 w-48 shadow-premium"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><UserCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Candidate Status</div>
                  <div className="text-sm font-bold text-slate-900">Interview Ready</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-20 z-20 glass-card p-4 rounded-2xl flex items-center gap-3 w-48 shadow-premium"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Briefcase className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">New Job Posted</div>
                  <div className="text-sm font-bold text-slate-900">Product Designer</div>
                </div>
              </motion.div>

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white ring-1 ring-slate-900/5">
                <iframe
                  src="https://www.instagram.com/p/DFsGakVJIyn/embed/captioned/?cr=1&v=14&wp=675&rd=https%3A%2F%2Fwww.instagram.com&rp=%2F#%7B%22ci%22%3A0%2C%22os%22%3A1586.5%2C%22ls%22%3A436.40000000596046%2C%22le%22%3A1582.4000000059605%7D"
                  className="w-full aspect-[3/5] bg-white scale-[1.02]"
                  title="InterQ Recruitment Video"
                  style={{ border: 0 }}
                  scrolling="no"
                  allowFullScreen
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
