import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const InterviewSummary: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Interview Summary</h2>
            <Card className="max-w-3xl mx-auto shadow-lg">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-2xl font-semibold">Antiva Kumar</CardTitle>
                    <p className="text-muted-foreground">25 June 2023</p>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p>
                        Interviewer: <strong>Ralph Blinker</strong> (Senior Software Engineer at Netflix)
                    </p>
                    <div className="flex items-center justify-center">
                        <Badge variant="secondary" className="flex items-center gap-2 bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4" /> Strong yes
                        </Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                        Generate Report
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
};

export default InterviewSummary;
