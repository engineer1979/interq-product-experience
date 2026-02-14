import EnhancedNavigation from "@/components/EnhancedNavigation";
import HeroSection from "@/components/HeroSection";
import CompanyLogosSection from "@/components/CompanyLogosSection";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <HeroSection />
      <CompanyLogosSection />
      <TeamStorySection />
      <CompanyOverview />
      <TeamSection />
      <WhoWeServe />
      <ServiceOverview />
      <AIAdvantage />
      <FutureExpansion />
      <HowItWorks />
      <TestimonialsSection />
      <DataPrivacySection />
      <FAQSection />
      <FinalCTA />
      <EnhancedFooter />
    </div>
  );
};

export default Index;
