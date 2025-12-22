import { motion } from "framer-motion";
import { Brain, Calendar, ShieldCheck, UserCheck, FileText } from "lucide-react";

const advantages = [
    {
        icon: Brain,
        title: "AI-Powered Skills Assessments",
        description: "Evaluate actual abilities, not just CV claims, with adaptive AI testing.",
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        icon: Calendar,
        title: "Automated Scheduling",
        description: "No more back-and-forth emails. Seamlessly sync calendars.",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: UserCheck,
        title: "Bias Mitigation",
        description: "Reduce unconscious bias by up to 25% in screening with standardized metrics.",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        icon: ShieldCheck,
        title: "Fraud Detection",
        description: "Prevent impersonation or unfair practices with advanced proctoring.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        icon: FileText,
        title: "Comprehensive Profiles",
        description: "View skills, communication, and culture fit together in one report.",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    }
];

const AIAdvantage = () => {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        The <span className="text-gradient">AI-Powered</span> Advantage
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Leverage cutting-edge technology to make smarter, faster, and fairer hiring decisions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advantages.map((adv, index) => (
                        <motion.div
                            key={adv.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${adv.bg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                <adv.icon className={`h-6 w-6 ${adv.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{adv.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {adv.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Visual Filler for 6th slot or centered 5th item handling if needed, 
                        but 5 items in 3 cols leaves one blank. 
                        Let's add a "Learn More" card or center the last one.
                        Actually, 5 items grid layout: 
                        Let's make the last one span 2 cols on tablet or center it? 
                        Grid auto flow is fine.
                    */}
                </div>
            </div>
        </section>
    );
};

export default AIAdvantage;
