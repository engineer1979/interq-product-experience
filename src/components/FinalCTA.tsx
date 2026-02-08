import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Briefcase, UserCheck, Users, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-blue-500 to-accent opacity-100 dark:opacity-90" />

            {/* Animated Shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-semibold tracking-wide">Ready to get started?</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
                        Transform Your Interviewing Today
                    </h2>

                    <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto font-light">
                        Join thousands of companies and professionals enhancing their recruitment process with InterQ.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                        <Button
                            onClick={() => navigate('/create-interview')}
                            size="lg"
                            className="h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg bg-white text-primary hover:bg-white/90 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300"
                        >
                            <Briefcase className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                            Recruiters: Start Hiring Smarter
                        </Button>

                        <Button
                            onClick={() => navigate('/careers')}
                            size="lg"
                            className="h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300"
                        >
                            <UserCheck className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                            Candidates: Get Interview Ready
                        </Button>

                        <Button
                            onClick={() => navigate('/solutions?view=enterprise')}
                            size="lg"
                            className="h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 border border-white/20 shadow-xl hover:shadow-2xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300"
                        >
                            <Building2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                            For Organizational Hiring
                        </Button>

                        <Button
                            onClick={() => navigate('/auth?tab=register')}
                            size="lg"
                            className="h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg bg-accent text-white hover:bg-accent/90 border border-white/20 shadow-xl w-full sm:w-auto hover:-translate-y-1 transition-all duration-300"
                        >
                            <Users className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                            Interviewers: Join as Evaluator
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
