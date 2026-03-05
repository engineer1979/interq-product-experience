import { motion } from "framer-motion";

const CeoMessage = () => {
    return (
        <section className="py-16 px-4 flex justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full max-w-[700px] overflow-hidden rounded-[2rem] border border-sky-400/20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-[#0A192F]"
            >
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10 p-10 md:p-12 flex flex-col items-center text-center">
                    {/* CEO Portrait (Top-Center) */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 rounded-full border-2 border-white/20 p-1 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                            <img
                                src="/saima-huma-ceo.png"
                                alt="Saima Huma, CEO"
                                className="w-full h-full rounded-full object-cover bg-white/5"
                            />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -bottom-1 right-2 w-4 h-4 bg-sky-400 rounded-full border-2 border-[#0A192F] shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                    </div>

                    {/* Header with Shine Effect */}
                    <h3
                        className="text-[#FFFFFF] text-sm font-bold tracking-[0.25em] uppercase mb-8"
                        style={{
                            textShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 2px rgba(255,255,255,0.9)',
                            fontFamily: "'Outfit', sans-serif"
                        }}
                    >
                        Message from the CEO
                    </h3>

                    {/* Body Content (Off-White for Legibility) */}
                    <p className="text-[#F8F9FA] text-lg md:text-xl leading-relaxed italic font-light max-w-[600px]">
                        "At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together."
                    </p>

                    {/* Signature Section */}
                    <div className="mt-10 pt-8 border-t border-white/10 w-full flex flex-col items-center">
                        <div
                            className="text-[#FFFFFF] font-bold text-xl tracking-tight mb-1"
                            style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        >
                            Saima Huma
                        </div>
                        <div className="text-sky-400 font-semibold tracking-widest text-[11px] uppercase">
                            CEO, InterQ Technologies Inc.
                        </div>
                    </div>
                </div>

                {/* Subtle border reflection line at top */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    );
};

export default CeoMessage;
