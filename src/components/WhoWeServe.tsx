import { motion } from "framer-motion";
import { Briefcase, UserCheck, Users, Calendar, Video, FileText, Lock, Award, Code, Monitor } from "lucide-react";

const WhoWeServe = () => {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
                    <p className="text-muted-foreground text-lg">
                        Tailored solutions for every stakeholder in the recruitment ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Employers */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                                alt="Employers"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold">For Employers</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <FileText className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span>Real-time evaluation reports</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Video className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span>Recorded interviews & playback</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Code className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span>MCQs, coding, software assessments</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Calendar className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span>Automated booking & scheduling</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Candidates */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all relative"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
                                alt="Candidates"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <UserCheck className="h-5 w-5 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold">For Candidates</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Calendar className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>Seamless scheduling</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Monitor className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>Practice interviews & prep guides</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Award className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>Showcase real skills with assessments</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Lock className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>Fair environment with fraud detection</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Interviewers */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
                    >
                        <div className="h-52 overflow-hidden relative">
                            <div className="absolute inset-0 bg-purple-900/10 group-hover:bg-transparent transition-colors z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
                                alt="Experts"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Users className="h-5 w-5 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold">For Experts</h3>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Users className="h-5 w-5 text-purple-500 shrink-0" />
                                    <span>Join network of domain experts</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Video className="h-5 w-5 text-purple-500 shrink-0" />
                                    <span>Conduct interviews in your specialization</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Calendar className="h-5 w-5 text-purple-500 shrink-0" />
                                    <span>Flexible scheduling & pay per session</span>
                                </li>
                                <li className="flex items-start gap-3 text-muted-foreground">
                                    <Award className="h-5 w-5 text-purple-500 shrink-0" />
                                    <span>Grow your profile as trusted evaluator</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
