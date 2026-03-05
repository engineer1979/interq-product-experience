import { motion } from "framer-motion";

const CeoMessage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm mx-auto group shadow-2xl rounded-3xl overflow-hidden border border-white/10 relative"
        >
            {/* Deep Midnight Blue Solid Background */}
            <div className="absolute inset-0 bg-[#0F172A]" />

            {/* Subtle Metallic Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 p-8 flex flex-col items-center text-center">
                {/* Compact CEO Portrait */}
                <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                        <img
                            src="/saima-huma-ceo.png"
                            alt="Saima Huma, CEO"
                            className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    {/* Status light or subtle accent */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-[#0F172A] shadow-glow" />
                </div>

                {/* Message Content */}
                <div className="space-y-4">
                    <h3
                        className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2"
                        style={{
                            textShadow: '0 0 8px rgba(255,255,255,0.4)',
                            background: 'linear-gradient(to right, #fff, #cbd5e1, #fff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: '#FFFFFF !important'
                        }}
                    >
                        Message from the CEO
                    </h3>

                    <p
                        className="text-white text-base leading-relaxed font-normal italic"
                        style={{ color: '#FFFFFF !important' }}
                    >
                        "At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together."
                    </p>

                    <div className="pt-4 border-t border-white/5">
                        <div
                            className="text-white font-bold text-lg tracking-tight"
                            style={{ textShadow: '0 0 5px rgba(255,255,255,0.2)', color: '#FFFFFF !important' }}
                        >
                            Saima Huma
                        </div>
                        <div
                            className="text-primary/90 font-semibold tracking-wide text-[10px] uppercase"
                            style={{ color: 'hsl(var(--primary)) !important' }}
                        >
                            CEO, InterQ Technologies Inc.
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CeoMessage;
