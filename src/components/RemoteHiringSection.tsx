import { motion } from "framer-motion";

const RemoteHiringSection = () => {
    return (
        <section className="relative py-28 bg-slate-900 overflow-hidden group">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/remote-call.jpg"
                    alt="Recruiter conducting a video interview call"
                    className="w-full h-full object-cover opacity-40 transition-transform duration-[2s] group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40 mix-blend-multiply" />
                {/* Accent glow */}
                <div className="absolute top-0 left-1/4 w-1/2 h-full bg-primary/20 blur-[100px] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl text-left"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                            Remote Hiring <span className="text-primary italic">Made Easy</span>
                        </h2>
                        <p className="text-xl text-slate-200 font-light leading-relaxed max-w-xl text-balance">
                            We coordinate interviews and candidate screening across time zones, ensuring seamless global team expansion.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <div className="glass-panel-dark px-6 py-3 rounded-xl flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                <span className="text-white font-medium">Global Reach</span>
                            </div>
                            <div className="glass-panel-dark px-6 py-3 rounded-xl flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse delay-75"></span>
                                <span className="text-white font-medium">24/7 Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Supporting "Card" Image as requested (using hero-resume as variation or crop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block w-80 h-48 lg:w-96 lg:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative"
                    >
                        <img
                            src="/hero-resume.jpg"
                            alt="Online interview dashboard"
                            className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <p className="text-white font-medium">Live Interview Session</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default RemoteHiringSection;
