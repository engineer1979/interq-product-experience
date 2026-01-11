import { motion } from "framer-motion";
import { Stethoscope, DollarSign, Pickaxe, Leaf, GraduationCap, ChevronRight } from "lucide-react";

const industries = [
    { name: "Healthcare", icon: Stethoscope, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Finance", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Mining", icon: Pickaxe, color: "text-amber-600", bg: "bg-amber-600/10" },
    { name: "Sustainability", icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "University", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10" },
];

const FutureExpansion = () => {
    return (
        <section className="py-20 bg-secondary/30 border-y border-border/50">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 block">Looking Ahead</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Future Expansion</h2>
                    <p className="text-muted-foreground text-lg">
                        InterQ is evolving beyond IT. Soon, we’ll offer tailored interviewing solutions in diverse sectors.
                    </p>
                </div>

                <div className="relative">
                    {/* Horizontal Line for Desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                        {industries.map((industry, index) => (
                            <motion.div
                                key={industry.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-background border border-border p-6 rounded-2xl shadow-sm w-full md:w-auto min-w-[160px] flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300"
                            >
                                <div className={`w-16 h-16 rounded-full ${industry.bg} flex items-center justify-center`}>
                                    <industry.icon className={`w-8 h-8 ${industry.color}`} />
                                </div>
                                <h3 className="font-bold text-lg">{industry.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 inline-flex items-center gap-2 text-muted-foreground text-sm bg-background/50 px-4 py-2 rounded-full border border-border">
                    <span>Roadmap 2025-2030</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </section>
    );
};

export default FutureExpansion;
