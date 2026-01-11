import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServiceDetails: React.FC = () => {
    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Outsource Interviews</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Feature</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Interviews happen asynchronously conducted by vetted interviewers.</p>
                    </CardContent>
                </Card>
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Benefit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Detailed report of candidate performance available in minutes.</p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-center mt-8 space-x-4">
                <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
                    Get started
                </Button>
                <Button variant="outline">
                    Explore outsource interviews
                </Button>
            </div>
        </section>
    );
};

export default ServiceDetails;
