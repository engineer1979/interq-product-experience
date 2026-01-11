import { motion } from "framer-motion";

const RemoteHiringSection = () => {
    return (
        <section className="relative py-32 bg-slate-900 overflow-hidden group">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                    src="/remote-call.jpg"
                    alt="Recruiter conducting a video interview call"
                    className="w-full h-full object-cover opacity-30 transition-transform duration-[3000ms] group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/50" />
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] mix-blend-screen" />
            </div>

            <div className="container-premium relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-left"
                    >
                        <h2 className="text-display text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">
                            Remote Hiring <span className="text-primary italic">Made Easy</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-xl text-balance mb-8">
                            We coordinate interviews and candidate screening across time zones, ensuring seamless global team expansion without the operational headache.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="glass-panel-dark px-6 py-4 rounded-xl flex items-center gap-3 border-white/5 hover:border-primary/50 transition-colors">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-white font-medium">Global Reach</span>
                            </div>
                            <div className="glass-panel-dark px-6 py-4 rounded-xl flex items-center gap-3 border-white/5 hover:border-primary/50 transition-colors">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 delay-300"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                <span className="text-white font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Supporting "Card" Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full opacity-50 animate-pulse-slow"></div>
                        <div className="w-[450px] h-[300px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative transform rotate-3 group-hover:rotate-0 transition-all duration-700">
                            <img
                                src="/hero-resume.jpg"
                                alt="Online interview dashboard"
                                className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                                <div>
                                    <p className="text-primary text-sm font-bold uppercase tracking-wider mb-1">Live Session</p>
                                    <p className="text-white text-xl font-semibold">Technical Assessment</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RemoteHiringSection;
