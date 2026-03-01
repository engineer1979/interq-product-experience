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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <EnhancedNavigation />
      <div className="animate-fade-in hero-blue bg-aurora">
        <HeroSection />
      </div>
      {/* Clients section removed per request */}
      <div className="animate-fade-in section-blue-dark">
        <TeamStorySection />
      </div>
      <div className="animate-fade-in section-blue-light">
        <CompanyOverview />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <TeamSection />
      </div>
      <div className="animate-fade-in section-blue-light">
        <WhoWeServe />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <ServiceOverview />
      </div>
      <div className="animate-fade-in section-blue-light">
        <AIAdvantage />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <FutureExpansion />
      </div>
      <div className="animate-fade-in section-blue-light">
        <HowItWorks />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <TestimonialsSection />
      </div>
      <div className="animate-fade-in section-blue-light">
        <DataPrivacySection />
      </div>
      <div className="animate-fade-in section-blue-dark">
        <FAQSection />
      </div>
      <div className="animate-fade-in section-blue-light">
        <FinalCTA />
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Index;
