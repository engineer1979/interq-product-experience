import EnhancedNavigation from "@/components/EnhancedNavigation";
import HeroSection from "@/components/HeroSection";
import TeamStorySection from "@/components/TeamStorySection";
import CompanyOverview from "@/components/CompanyOverview";
import TeamSection from "@/components/TeamSection";
import WhoWeServe from "@/components/WhoWeServe";
import ServiceOverview from "@/components/ServiceOverview";
import AIAdvantage from "@/components/AIAdvantage";
import FutureExpansion from "@/components/FutureExpansion";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import DataPrivacySection from "@/components/DataPrivacySection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import EnhancedFooter from "@/components/EnhancedFooter";
import AnimatedBackground from "@/components/AnimatedBackground";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <EnhancedNavigation />
      <div className="animate-fade-in hero-blue bg-aurora">
        <HeroSection />
      </div>

      {/* 2. Social Proof */}
      <div className="animate-fade-in section-blue-dark">
        <TestimonialsSection />
      </div>

      {/* 3. How It Works */}
      <div className="animate-fade-in section-blue-light">
        <HowItWorks />
      </div>

      {/* 4. Features & Overviews */}
      <div className="animate-fade-in section-blue-dark">
        <ServiceOverview />
      </div>
      <div className="animate-fade-in section-blue-light">
        <AIAdvantage />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <WhoWeServe />
      </div>
      <div className="animate-fade-in section-blue-light">
        <DataPrivacySection />
      </div>

      {/* 5. Pricing */}
      <div className="animate-fade-in section-blue-dark">
        <PricingSection />
      </div>

      {/* Additional Company Info */}
      <div className="animate-fade-in section-blue-light">
        <TeamStorySection />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <CompanyOverview />
      </div>
      <div className="animate-fade-in section-blue-light">
        <TeamSection />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <FutureExpansion />
      </div>

      {/* 6. FAQ */}
      <div className="animate-fade-in section-blue-light">
        <FAQSection />
      </div>

      {/* 7. Final CTA */}
      <div className="animate-fade-in section-blue-dark">
        <FinalCTA />
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Index;
