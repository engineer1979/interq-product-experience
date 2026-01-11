
import { motion } from "framer-motion";
import { Search, Users, MessageSquare, Briefcase, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Discover requirements",
        desc: "We analyze your needs to find the perfect match."
    },
    {
        icon: Users,
        title: "Shortlist candidates",
        desc: "Rigorous screening for technical & cultural fit."
    },
    {
        icon: MessageSquare,
        title: "Interviews & feedback",
        desc: "Seamless coordination and detailed insights."
    },
    {
        icon: Briefcase,
        title: "Offer & onboarding",
        desc: "Structuring offers and ensuring smooth starts."
    }
];

const HowWeWork = () => {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,182,200,0.05),transparent_40%)] pointer-events-none" />

            <div className="container-premium relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left: Image with Premium Styling */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="rounded-[2rem] overflow-hidden shadow-premium relative z-10 aspect-[4/5] lg:aspect-auto lg:h-[700px] group border-4 border-white">
                            <img
                                src="/hero-interview.jpg"
                                alt="Recruitment consultation meeting in a modern office"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            {/* Overlay Gradient on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                            {/* Floating Badge - Glass Effect */}
                            <div className="absolute bottom-8 left-8 right-8 glass-card p-6 rounded-xl border-l-4 border-primary backdrop-blur-md bg-white/90 shadow-lg">
                                <p className="text-slate-900 font-medium italic text-lg opacity-90">"Efficient process, exceptional results."</p>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-primary/10 rounded-[2.5rem] -z-0 hidden md:block" />
                        <div className="absolute top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Right: Process Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:pl-8"
                    >
                        <div className="mb-12">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                                Our Process
                            </h2>
                            <h3 className="text-display text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                                How We Work
                            </h3>
                        </div>

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <div key={index} className="flex gap-6 group relative">
                                    {/* Connector Line */}
                                    {index !== steps.length - 1 && (
                                        <div className="absolute top-16 left-[28px] w-[2px] h-[calc(100%+2rem)] bg-slate-100 group-last:hidden" />
                                    )}

                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-soft border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-glow-primary">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="pt-2 pb-8">
                                        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{step.title}</h4>
                                        <p className="text-slate-600 leading-relaxed text-balance max-w-md">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <button className="text-slate-900 font-bold text-lg flex items-center gap-2 hover:gap-4 transition-all group py-2">
                                <span className="border-b-2 border-transparent group-hover:border-primary transition-all">Start Hiring Now</span>
                                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default HowWeWork;
