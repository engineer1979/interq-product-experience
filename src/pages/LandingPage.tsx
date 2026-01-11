import React from "react";
import { Helmet } from "react-helmet-async";
import HowItWorks from "@/components/HowItWorks";
import ServiceOverview from "@/components/ServiceOverview";
import InterviewSummary from "@/components/InterviewSummary";
import ServiceDetails from "@/components/ServiceDetails";
import AdditionalSections from "@/components/AdditionalSections";

const LandingPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Interview Outsourcing Service – Save Your Engineering Bandwidth</title>
                <meta
                    name="description"
                    content="Outsource technical interviews in two simple steps. Reduce hiring friction and get detailed reports instantly."
                />
            </Helmet>
            <main className="min-h-screen bg-background text-foreground">
                {/* Hero section is already part of existing Home page, reuse it here for consistency */}
                {/* If a dedicated Hero component is needed, it can be imported similarly */}
                <section className="container mx-auto px-4 py-12 md:py-20">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                        Save your engineering bandwidth
                    </h1>
                    <p className="text-lg md:text-xl text-center text-muted-foreground mb-8">
                        Outsource your interviews in just 2 simple steps
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/create-interview"
                            className="btn-primary px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg transition-colors text-base md:text-lg w-full md:w-auto text-center"
                        >
                            Request now
                        </a>
                    </div>
                </section>
                <HowItWorks />
                <ServiceOverview />
                <InterviewSummary />
                <ServiceDetails />
                <AdditionalSections />
            </main>
        </>
    );
};

export default LandingPage;
