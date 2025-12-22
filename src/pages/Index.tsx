import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
// import CompanyOverview from "@/components/CompanyOverview"; // Removing if not needed, or keeping if user wants the CEO message still. 
// The user prompt didn't explicitly ask to remove it, but "Who We Serve" etc replaces most of it.
// The CEO message was updated earlier, I should probably keep `CompanyOverview` if it contains the "About InterQ" or "CEO Message" that isn't covered elsewhere.
// However, the prompt gives a full structure "1. Hero ... 2. Who We Serve ...".
// I will keep CompanyOverview as "About Us" section if it fits, but the prompt structure is comprehensive. 
// Let's stick to the prompt structure. The prompt implies a full re-structure.
// Wait, the prompt implies "What to add/change". I'll put CompanyOverview after Hero or remove it if redundant. 
// The "CEO" part was specifically asked for in the PREVIOUS turn. I should probably keep it. 
// I will put CompanyOverview after HeroSection and before WhoWeServe as a general "About" intro.
import CompanyOverview from "@/components/CompanyOverview";
import TeamSection from "@/components/TeamSection";
import WhoWeServe from "@/components/WhoWeServe";
import ServiceOverview from "@/components/ServiceOverview"; // This is now "Products"
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
