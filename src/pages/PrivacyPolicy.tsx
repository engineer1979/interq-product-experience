import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <EnhancedNavigation />
            <main className="flex-1 container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>Welcome to InterQ Technologies. We respect your privacy and are committed to protecting your personal data in compliance with applicable international data protection laws. This policy outlines how we collect, use, and safeguard your information.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <p>We may collect personal data that you provide directly to us, including but not limited to your name, email address, professional history, interview responses, and technical assessment results. We also collect automated information such as IP addresses, browser types, and usage data to improve our services.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p>We use your data to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Facilitate technical interviews and candidate assessments.</li>
                            <li>Provide hiring recommendations to our clients.</li>
                            <li>Improve our AI and platform services.</li>
                            <li>Comply with legal and compliance obligations where applicable.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Security</h2>
                        <p>We do not sell your personal data. We only share information with explicit consent, such as providing your interview results to prospective employers you apply for. We implement robust, industry-standard security measures (including AES-256 encryption) to protect your data from unauthorized access.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                        <p>Under applicable international privacy laws, you have the right to access, rectify, or erase your personal data. You may also withdraw consent or object to certain processing activities. To exercise these rights, please contact us at contact@interq.com.</p>
                    </section>
                </div>
            </main>
            <EnhancedFooter />
        </div>
    );
};

export default PrivacyPolicy;
