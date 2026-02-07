import Navigation from "@/components/Navigation";
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
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TeamStorySection />
      <CompanyOverview />
      <TeamSection />
      <WhoWeServe />
      <ServiceOverview />
      <AIAdvantage />
      <FutureExpansion />
      <HowItWorks />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
