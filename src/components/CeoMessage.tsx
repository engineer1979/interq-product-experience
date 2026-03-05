import { motion } from "framer-motion";

const CeoMessage = () => {
    return (
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-elegant border border-white/10 relative">
            {/* Premium Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] to-[#1c1c1c]" />

            {/* Subtle Texture Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* CEO Portrait */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl ring-8 ring-primary/5">
                        <img
                            src="/saima-huma-ceo.png"
                            alt="Saima Huma, CEO"
                            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </motion.div>

                {/* Message Content */}
                <div className="flex-1 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-widest uppercase mb-6 opacity-90" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            Message from the CEO
                        </h3>

                        <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-medium mb-8 text-shadow-sm">
                            "At InterQ, our mission has always been to create meaningful technology that drives real impact. We believe in building long-term partnerships, staying curious, and pushing boundaries to help our clients succeed in a rapidly evolving digital world. Thank you for trusting InterQ as your technology partner—we look forward to building the future together."
                        </p>

                        <div className="space-y-1">
                            <div className="text-white font-bold text-xl">— Saima Huma</div>
                            <div className="text-primary/80 font-semibold tracking-wide text-sm uppercase">CEO, InterQ Technologies Inc.</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CeoMessage;
