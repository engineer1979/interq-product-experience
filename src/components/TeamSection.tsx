import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
import { Card } from "@/components/ui/card";

const team = [
    {
        name: "Saima Huma",
        role: "CEO & Founder",
        image: "/saima-huma-ceo.png",
        bio: "Visionary leader with over 15 years of experience in recruitment technology. Driving InterQ's mission to revolutionize hiring with fairness and AI.",
        quote: "Innovation is the key to unlocking potential.",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Sohana Akter",
        role: "Chief Operating Officer (COO)",
        image: "/sohana-akter.png",
        bio: "Operational strategist ensuring InterQ's vision becomes reality. Sohana optimizes workflows and drives organizational excellence across all departments.",
        quote: "Efficiency is doing things right.",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Muhammad Jalal",
        role: "Chief Information Officer (CIO)",
        image: "/muhammad-jalal.png",
        bio: "Driving digital transformation and information strategy. Muhammad ensures InterQ's infrastructure is secure, scalable, and ahead of the curve.",
        quote: "Information is the currency of the future.",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Abdul Qadir",
        role: "Director of Marketing and Technology Implementation",
        image: "/abdul-qadir.png",
        bio: "Expert in bridging the gap between innovative technology and market adoption. Abdul ensures seamless implementation of InterQ's solutions.",
        quote: "Technology is only as powerful as its execution.",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        name: "Atikur Rahman",
        role: "Director of Operations and Maintenance",
        image: "/atikur-rahman.png",
        bio: "Ensuring operational excellence and system reliability. Atikur oversees the maintenance and optimization of our physical and digital infrastructure.",
        quote: "Reliability is the foundation of trust.",
        socials: {
            linkedin: "#"
        }
    }
];

const TeamSection = () => {
    return (
        <section className="py-24 bg-background text-foreground">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet the Team Behind InterQ</h2>
                    <p className="text-muted-foreground text-lg">
                        The talent, expertise, and passion driving our platform's success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Card className="h-full border-border/50 bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center p-8">
                                {/* Image Container */}
                                <div className="relative w-[200px] h-[200px] mb-8 shrink-0">
                                    <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-background shadow-lg ring-1 ring-border relative group">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Subtle overlay on hover */}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col w-full">
                                    <h3 className="text-2xl font-bold mb-2 text-foreground">{member.name}</h3>
                                    <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wide px-4 border-b pb-4 border-border/50">
                                        {member.role}
                                    </p>

                                    <p className="text-muted-foreground leading-relaxed mb-6 px-2">
                                        {member.bio}
                                    </p>

                                    <div className="mt-auto pt-4 flex flex-col items-center gap-4">
                                        <p className="italic text-sm text-foreground/80 font-medium">"{member.quote}"</p>

                                        <div className="flex gap-4 mt-2">
                                            {member.socials.linkedin && (
                                                <a href={member.socials.linkedin} className="text-muted-foreground hover:text-blue-600 transition-colors bg-secondary/50 p-2 rounded-full hover:bg-secondary">
                                                    <Linkedin className="w-5 h-5" />
                                                </a>
                                            )}
                                            {member.socials.twitter && (
                                                <a href={member.socials.twitter} className="text-muted-foreground hover:text-sky-500 transition-colors bg-secondary/50 p-2 rounded-full hover:bg-secondary">
                                                    <Twitter className="w-5 h-5" />
                                                </a>
                                            )}
                                            {/* Github was mainly for engineers, can re-add if needed for specific roles */}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
