import { motion } from "framer-motion";
import { Stethoscope, DollarSign, Calculator, GraduationCap, ChevronRight } from "lucide-react";

const industries = [
    {
        name: "Healthcare",
        icon: Stethoscope,
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Finance",
        icon: DollarSign,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
    },

    {
        name: "Accounting",
        icon: Calculator,
        image: "https://images.unsplash.com/photo-1554224154-260327c00c4b?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Education",
        icon: GraduationCap,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    },
];

const FutureExpansion = () => {
    return (
        <section className="py-24 bg-background border-y border-border/50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider text-xs uppercase mb-3 block px-3 py-1 bg-primary/10 rounded-full w-fit mx-auto">Roadmap 2025</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Future Expansion</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        InterQ is evolving beyond IT. Soon, we’ll offer specialized AI interviewing solutions for diverse high-impact sectors.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={industry.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Image Header - Compelete Visible */}
                            <div className="h-40 overflow-hidden relative border-b border-border/50">
                                <img
                                    src={industry.image}
                                    alt={industry.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content Footer */}
                            <div className="p-5 flex flex-col items-center flex-1 bg-gradient-to-b from-card to-secondary/20 relative">
                                <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center mb-3 -mt-10 relative z-10 border border-border shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors duration-300">
                                    <industry.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-1">{industry.name}</h3>
                                <div className="w-8 h-1 bg-border rounded-full group-hover:bg-primary/50 transition-colors duration-300" />
                            </div>
                        </motion.div>
                    ))}
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
