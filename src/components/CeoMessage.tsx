import { motion } from "framer-motion";

const CeoMessage = () => {
    return (
        <section className="py-16 px-4 flex justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-sky-400/30 shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)] bg-[#0A192F]"
            >
                {/* Metallic Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10 p-10 flex flex-col items-center text-center">
                    {/* CEO Portrait (Top-Center) with Cyan Glow */}
                    <div className="relative mb-8">
                        <div className="w-28 h-28 rounded-full border-2 border-sky-400/40 p-1.5 shadow-[0_0_30px_rgba(56,189,248,0.4)] bg-[#0A192F]">
                            <img
                                src="/saima-huma-ceo.png"
                                alt="Saima Huma, CEO"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        {/* Decorative digital pulse accent */}
                        <div className="absolute -bottom-1 right-3 w-5 h-5 bg-sky-400 rounded-full border-2 border-[#0A192F] shadow-[0_0_15px_rgba(56,189,248,0.6)] animate-pulse" />
                    </div>

                    {/* Header with Metallic Shine Effect */}
                    <h3
                        className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-8"
                        style={{
                            textShadow: '0 0 10px rgba(56,189,248,0.3)',
                            background: 'linear-gradient(to bottom, #FFFFFF 0%, #E0E0E0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '0.3em'
                        }}
                    >
                        MESSAGE FROM THE CEO
                    </h3>

                    {/* Body Content (Pure White for maximum contrast) */}
                    <p
                        className="text-white text-base md:text-lg leading-relaxed italic font-medium"
                        style={{ color: '#FFFFFF !important' }}
                    >
                        "At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together."
                    </p>

                    {/* Signature Section */}
                    <div className="mt-10 pt-8 border-t border-sky-400/20 w-full flex flex-col items-center">
                        <div
                            className="text-white font-bold text-xl tracking-tight mb-1"
                            style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)', color: '#FFFFFF !important' }}
                        >
                            Saima Huma
                        </div>
                        <div
                            className="text-sky-300 font-bold tracking-[0.1em] text-[10px] uppercase"
                            style={{ color: '#7dd3fc !important' }}
                        >
                            CEO, InterQ Technologies Inc.
                        </div>
                    </div>
                </div>

                {/* Top Shine Line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
            </motion.div>
        </section>
    );
};

export default CeoMessage;
