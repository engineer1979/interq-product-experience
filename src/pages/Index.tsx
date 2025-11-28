import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CompanyOverview from "@/components/CompanyOverview";
import ProblemsSolved from "@/components/ProblemsSolved";
import Solutions from "@/components/Solutions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CompanyOverview />
      <ProblemsSolved />
      <Solutions />
      <Footer />
    </div>
  );
};

export default Index;
