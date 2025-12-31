import { motion } from "framer-motion";
import { Briefcase, UserCheck, Users, Calendar, Video, FileText, Lock, Award, Code, Monitor } from "lucide-react";

const WhoWeServe = () => {
    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8">
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
                        className="bg-card border border-border rounded-xl p-6 shadow-lg"
                    >
                        <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                            <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">For Employers</h3>
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
                    </motion.div>

                    {/* Candidates */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-lg relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                        <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 relative z-10">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4 relative z-10">For Candidates</h3>
                        <ul className="space-y-3 relative z-10">
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
                    </motion.div>

                    {/* Interviewers */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-lg"
                    >
                        <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                            <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">For Interviewers</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-muted-foreground">
                                <Users className="h-5 w-5 text-purple-500 shrink-0" />
                                <span>Join network of expert interviewers</span>
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
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
