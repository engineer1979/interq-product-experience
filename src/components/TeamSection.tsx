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
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-foreground relative overflow-hidden">
            {/* Clean background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white to-slate-50 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-slate-50 to-white rounded-full blur-3xl opacity-60" />
            </div>
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                            Meet the Team Behind InterQ
                        </h2>
                        <p className="text-muted-foreground text-xl leading-relaxed">
                            The talent, expertise, and passion driving our platform's success.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                                delay: index * 0.15, 
                                duration: 0.7,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="h-full"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <Card className="team-member-card h-full bg-white/95 hover:bg-white backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center p-8">
                                {/* Image Container - Professional clean white background */}
                                <div className="team-member-image-wrapper relative mb-8">
                                    <div className="team-image-container w-full h-full relative group">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="team-image w-full h-full object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                                            loading="eager"
                                            decoding="async"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.classList.remove('team-image');
                                                target.classList.add('team-image-cover');
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col w-full">
                                    <h3 className="text-2xl font-bold mb-2 text-slate-800 tracking-tight">{member.name}</h3>
                                    <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wider px-4 border-b pb-4 border-slate-200">
                                        {member.role}
                                    </p>

                                    <p className="text-slate-600 leading-relaxed mb-6 px-2 text-base">
                                        {member.bio}
                                    </p>

                                    <div className="mt-auto pt-4 flex flex-col items-center gap-4">
                                        <p className="italic text-base text-slate-700 font-medium leading-relaxed max-w-xs">"{member.quote}"</p>

                                        <div className="flex gap-3 mt-2">
                                            {member.socials.linkedin && (
                                                <a href={member.socials.linkedin} className="text-slate-500 hover:text-blue-600 transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md p-3 rounded-full group border border-slate-200 hover:border-blue-300">
                                                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                </a>
                                            )}
                                            {member.socials.twitter && (
                                                <a href={member.socials.twitter} className="text-slate-500 hover:text-sky-500 transition-all duration-300 bg-white/80 hover:bg-white shadow-sm hover:shadow-md p-3 rounded-full group border border-slate-200 hover:border-sky-300">
                                                    <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
