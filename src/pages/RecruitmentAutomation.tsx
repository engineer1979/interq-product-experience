
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, Users, Shield, Zap, BarChart, FileCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const RecruitmentAutomation = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
                                    Recruitment Automation Software
                                </span>
                                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                                    Hire Faster with <span className="text-blue-600">Intelligent Automation</span>
                                </h1>
                                <p className="text-lg text-slate-800 font-medium leading-relaxed mb-8 max-w-xl">
                                    Streamline your entire hiring process from application to offer. Eliminate manual tasks, reduce time-to-hire, and secure top talent before your competitors do.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 h-14 text-base font-semibold shadow-lg shadow-blue-600/20">
                                        Get Started Free
                                    </Button>
                                    <Button variant="outline" size="lg" className="border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl px-8 h-14 text-base font-semibold">
                                        View Demo
                                    </Button>
                                </div>
                            </motion.div>
                            <div className="flex items-center gap-6 text-sm text-slate-500 pt-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>14-day free trial</span>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            className="lg:w-1/2 relative"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative z-10">
                                <img
                                    src="/recruitment-automation-hero.png"
                                    alt="Recruitment Automation Dashboard"
                                    className="w-full h-auto rounded-2xl shadow-2xl border border-slate-100"
                                />
                            </div>
                            {/* Decorative Blobs */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "40%", label: "Reduction in Time-to-Hire" },
                            { value: "2x", label: "Quality of Hire Improvement" },
                            { value: "65%", label: "Less Admin Work" },
                            { value: "98%", label: "Candidate Satisfaction" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                <div className="text-sm lg:text-base text-slate-800 font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Zig-Zag */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 lg:px-8 space-y-24">
                    {/* Feature 1 */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm aspect-video flex items-center justify-center">
                                {/* Placeholder for feature graphic */}
                                <div className="text-slate-300 flex flex-col items-center">
                                    <Layers className="w-16 h-16 mb-4" />
                                    <span className="font-semibold text-slate-400">Workflow Automation Graphic</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Automate Repetitive Tasks</h2>
                            <p className="text-lg text-slate-800 font-medium leading-relaxed mb-6">
                                Stop wasting time on manual data entry and scheduling. Let our intelligent automation handle the busywork so you can focus on connecting with people.
                            </p>
                            <ul className="space-y-4">
                                {["Automated interview scheduling", "Instant candidate screening", "Auto-triggered email sequences"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="lg:w-1/2">
                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Collaborative Hiring</h2>
                            <p className="text-lg text-slate-800 font-medium leading-relaxed mb-6">
                                Keep your entire hiring team aligned. Share candidate profiles, gather feedback in real-time, and make collaborative decisions without the email chaos.
                            </p>
                            <ul className="space-y-4">
                                {["Centralized candidate database", " collaborative scorecards", "Real-time activity feed"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="rounded-3xl border border-slate-100 shadow-lg overflow-hidden aspect-video relative group">
                                <img
                                    src="/interview-meeting.jpg"
                                    alt="Collaborative technical interview meeting"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 lg:py-32 bg-slate-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Everything You Need to Hire</h2>
                        <p className="text-lg text-slate-600">Powerful tools designed to simplify every stage of your recruitment process.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Clock, title: "Time-Saving Workflows", desc: "Build custom workflows that trigger actions automatically based on candidate status." },
                            { icon: Shield, title: "Compliance & Security", desc: "Enterprise-grade security and GDPR compliance built-in to protect sensitive data." },
                            { icon: BarChart, title: "Advanced Analytics", desc: "Gain insights into your hiring funnel with unparalleled reporting and dashboards." },
                            { icon: FileCheck, title: "Resume Parsing", desc: "Automatically extract candidate details from resumes and populate profiles instantly." },
                            { icon: Zap, title: "Instant Messaging", desc: "Communicate with candidates directly through the platform via SMS or WhatsApp." },
                            { icon: Layers, title: "Integration Ready", desc: "Seamlessly connect with your favorite HRIS, calendar, and productivity tools." }
                        ].map((feature, i) => (
                            <Card key={i} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CardContent className="p-8">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-800 font-medium leading-relaxed">{feature.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {[
                            { q: "How does the automation setup work?", a: "Our platform comes with pre-built templates for common hiring flows. You can customize these triggers and actions using our visual workflow builder in minutes." },
                            { q: "Can I integrate with my existing HRIS?", a: "Yes, we support native integrations with major HRIS platforms like Workday, BambooHR, and ADP, as well as Zapier for custom connections." },
                            { q: "Is there a limit to the number of users?", a: "Our Enterprise plans offer unlimited user seats so you can involve your entire hiring team without extra costs." }
                        ].map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-100">
                                <AccordionTrigger className="text-lg font-semibold text-slate-800 py-6 hover:text-blue-600 transition-colors text-left">
                                    {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-800 font-medium pb-6 leading-relaxed">
                                    {faq.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-blue-600 text-white text-center">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-8">Ready to modernize your hiring?</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                        Join thousands of companies using InterQ to build better teams, faster.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-10 h-14 text-lg font-bold">
                            Start Free Trial
                        </Button>
                        <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-10 h-14 text-lg font-bold">
                            Talk to Sales
                        </Button>
                    </div>
                </div>
            </section >

            <Footer />
        </div >
    );
};

export default RecruitmentAutomation;
