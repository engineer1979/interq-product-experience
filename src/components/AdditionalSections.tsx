import React from "react";
import InfoSection from "./InfoSection";
import { Shield, Database, Layout, Library, Headset } from "lucide-react";

const AdditionalSections: React.FC = () => {
    return (
        <section className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoSection
                    title="Data Collection"
                    description="We collect comprehensive data points during interviews to provide deep insights into candidate performance."
                    icon={Database}
                />
                <InfoSection
                    title="Security Assurance"
                    description="Organizational-grade security measures to protect your data and candidate privacy at every step."
                    icon={Shield}
                />
                <InfoSection
                    title="Assessment Platform"
                    description="A robust platform for conducting various types of technical and behavioral assessments."
                    icon={Layout}
                />
                <InfoSection
                    title="Skill Tests Library"
                    description="Access a vast library of pre-built skill tests, including specialized React assessments."
                    icon={Library}
                />
                <InfoSection
                    title="Customer Support"
                    description="24/7 dedicated support to help you with any queries or issues during the process."
                    icon={Headset}
                />
            </div>
        </section>
    );
};

export default AdditionalSections;
