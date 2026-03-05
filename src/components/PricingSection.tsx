import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
    const navigate = useNavigate();

    return (
        <section id="pricing" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-slate-700 font-medium">
                        Choose the plan that fits your hiring needs. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Starter Plan */}
                    <div className="border border-border rounded-2xl p-8 bg-card flex flex-col">
                        <h3 className="text-2xl font-bold mb-2 text-slate-900">Startup</h3>
                        <p className="text-slate-700 mb-6 font-medium">Perfect for small teams and fast-growing startups.</p>
                        <div className="text-3xl font-bold mb-6">
                            Flexible Pricing
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-slate-800 font-medium">
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Up to 20 Assessments/mo</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> 5 Live InterQ Expert Interviews</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Basic ATS Integration</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Email Support</li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => navigate("/contact")}>Request Pricing</Button>
                    </div>

                    {/* Scale Plan */}
                    <div className="border-2 border-primary rounded-2xl p-8 bg-card flex flex-col relative transform md:-translate-y-4 shadow-xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-slate-950">Scale</h3>
                        <p className="text-slate-800 mb-6 font-semibold">For high-volume hiring and scaling technical teams.</p>
                        <div className="text-3xl font-bold mb-6">
                            Get Custom Estimate
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-slate-900 font-semibold">
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Unlimited Assessments</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> 25 Live InterQ Expert Interviews</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Advanced ATS Integrations</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Priority Support</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Executive Hiring Documentation</li>
                        </ul>
                        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => navigate("/contact")}>Contact for Quote</Button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="border border-border rounded-2xl p-8 bg-card flex flex-col">
                        <h3 className="text-2xl font-bold mb-2 text-slate-900">Enterprise</h3>
                        <p className="text-slate-700 mb-6 font-medium">Custom solutions for large organizations.</p>
                        <div className="text-3xl font-bold mb-6">
                            Price Based on Scope
                        </div>
                        <ul className="space-y-4 mb-8 flex-1 text-slate-800 font-medium">
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Tailored Assessment Limit</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Dedicated Success Manager</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> Custom Engineering Rubrics</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> White-labeling Options</li>
                            <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 font-bold" /> 24/7 Phone Support</li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => navigate("/contact")}>Contact Sales</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
