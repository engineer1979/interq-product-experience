import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <EnhancedNavigation />
            <main className="flex-1 container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing or using the InterQ Technologies platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                        <p>InterQ provides a technical interview and candidate assessment platform. Our services facilitate technical evaluations led by vetted domain experts, helping organizations streamline hiring and build exceptional technical teams.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
                        <p>You agree to use our platform strictly for lawful purposes. You must not submit false information, impersonate others during interviews, or interfere with the security and proper functioning of the service.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                        <p>All content on the InterQ platform, including trademarks, assessment questions, and software, is the property of InterQ Technologies Inc. or its licensors. Unauthorized reproduction or distribution is strictly prohibited.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
                        <p>InterQ is not liable for hiring decisions made based on our assessments. Our platform is provided "as is," without warranties of any kind regarding its fitness for a particular purpose.</p>
                    </section>
                </div>
            </main>
            <EnhancedFooter />
        </div>
    );
};

export default TermsOfService;
