import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, UserCheck, Users, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-blue-600" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Animated shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-white/[0.06] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-white/[0.06] rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10 text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full mb-8 border border-white/20 text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Ready to get started?</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
            Transform Your Interviewing Today
          </h2>

          <p className="text-xl opacity-85 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of companies and professionals enhancing their recruitment process with InterQ.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-stretch sm:items-center">
            <Button
              onClick={() => navigate("/create-interview")}
              size="lg"
              className="h-14 px-8 text-base bg-white text-primary hover:bg-white/90 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300 rounded-xl font-semibold"
            >
              <Briefcase className="mr-2 w-5 h-5" />
              Recruiters: Start Hiring Smarter
            </Button>

            <Button
              onClick={() => navigate("/careers")}
              size="lg"
              className="h-14 px-8 text-base bg-transparent border-2 border-white/40 text-white hover:bg-white/10 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300 rounded-xl font-semibold"
            >
              <UserCheck className="mr-2 w-5 h-5" />
              Candidates: Get Interview Ready
            </Button>

            <Button
              onClick={() => navigate("/solutions?view=enterprise")}
              size="lg"
              className="h-14 px-8 text-base bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/20 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300 rounded-xl font-semibold"
            >
              <Building2 className="mr-2 w-5 h-5" />
              For Organizational Hiring
            </Button>

            <Button
              onClick={() => navigate("/auth?tab=register")}
              size="lg"
              className="h-14 px-8 text-base bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 border border-white/20 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300 rounded-xl font-semibold"
            >
              <Users className="mr-2 w-5 h-5" />
              Experts: Join as Evaluator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
