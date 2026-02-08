import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const InterviewSummary: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Interview Summary</h2>
            <Card className="max-w-4xl mx-auto shadow-xl border-t-4 border-t-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <CheckCircle size={120} />
                </div>

                <CardHeader className="text-center pb-2 border-b border-border/50 bg-secondary/10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-background shadow-lg overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
                                    alt="Antiva Kumar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-background" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">Antiva Kumar</CardTitle>
                            <p className="text-muted-foreground text-sm flex items-center justify-center gap-2 mt-1">
                                <span>Senior Frontend Developer</span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span>25 June 2023</span>
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8 pt-8">
                    {/* Interviewer Details */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-secondary/20 rounded-xl max-w-lg mx-auto border border-border/50">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border">
                            <img
                                src="https://i.pravatar.cc/150?u=ralph"
                                alt="Ralph Blinker"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-muted-foreground">Conducted by</p>
                            <div className="font-semibold flex items-center gap-2">
                                Ralph Blinker
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">Netflix</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4">
                        <Badge variant="secondary" className="px-4 py-2 text-base flex items-center gap-2 bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-5 h-5 fill-green-600 text-white" />
                            Recommendation: Strong Hire
                        </Badge>
                        <p className="text-center text-muted-foreground max-w-xl mx-auto">
                            "Antiva demonstrated exceptional problem-solving skills and deep understanding of React patterns. Cultural fit is aligned with our core values."
                        </p>
                    </div>

                    <div className="flex justify-center pt-4">
                        <Button className="w-full sm:w-auto px-8 gradient-primary font-semibold shadow-soft hover:shadow-glow transition-all">
                            View Full Report
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default InterviewSummary;
