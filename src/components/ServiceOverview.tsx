import React from "react";
import { FileQuestion, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ServiceOverview: React.FC = () => {
    return (
        <section className="container-premium py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500"
            >
                <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                    {/* Left Image */}
                    <div className="relative h-full min-h-[400px] lg:min-h-full overflow-hidden group">
                        <img
                            src="/consultation.jpg"
                            alt="Recruitment consultation"
                            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-transparent pointer-events-none" />
                    </div>

                    {/* Right Content */}
                    <div className="p-12 lg:p-20 flex flex-col justify-center bg-white relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <FileQuestion className="w-64 h-64 text-slate-900" />
                        </div>

                        <h2 className="text-display text-4xl lg:text-5xl font-bold mb-10 text-slate-900 tracking-tight">
                            Our <span className="text-primary">Services</span>
                        </h2>

                        <ul className="space-y-4 relative z-10">
                            {[
                                { name: "Recruitment", desc: "Full-cycle hiring management" },
                                { name: "Talent Screening", desc: "AI-driven candidate validation" },
                                { name: "Interview Scheduling", desc: "Automated calendar coordination" },
                                { name: "Onboarding Support", desc: "Seamless employee integration" }
                            ].map((service, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-default"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-xl text-slate-800 font-bold group-hover:text-primary transition-colors">{service.name}</span>
                                            <span className="text-sm text-slate-500">{service.desc}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ServiceOverview;
