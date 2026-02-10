import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Users Say</h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border p-8 rounded-2xl shadow-lg relative"
                    >
                        <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10" />
                        <p className="text-lg italic text-muted-foreground mb-6 relative z-10 pt-4">
                            "InterQ saved us from losing top talent due to scheduling delays. The automated system ensures every good candidate gets a fair shot."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="font-bold text-foreground">HR Manager</span>
                                <span className="text-sm text-primary">TechCo</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border p-8 rounded-2xl shadow-lg relative"
                    >
                        <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10" />
                        <p className="text-lg italic text-muted-foreground mb-6 relative z-10 pt-4">
                            "I love conducting interviews here — flexible, structured, and professional. It allows me to focus on evaluating skills rather than logistics."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="font-bold text-foreground">Senior Software Engineer</span>
                                <span className="text-sm text-primary">Interviewer</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
