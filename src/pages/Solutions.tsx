import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Building2, Briefcase, Rocket, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Solutions = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("view") || "enterprise";
  const [selectedSolution, setSelectedSolution] = useState(initial);

  useEffect(() => {
    setSearchParams({ view: selectedSolution });
  }, [selectedSolution, setSearchParams]);

  const solutions = {
    enterprise: {
      icon: Building2,
      title: "Organizational hiring Solutions",
      subtitle: "For large organizations with complex hiring needs",
      benefits: [
        "Unlimited assessments and interviews",
        "Custom integration with your ATS",
        "Dedicated account manager",
        "White-label options available",
        "Advanced security & compliance",
        "Custom SLAs and support",
      ],
      useCases: [
        "High-volume hiring campaigns",
        "Multi-location recruitment",
        "Campus recruitment drives",
        "Technical talent acquisition",
      ],
    },
    recruiters: {
      icon: Briefcase,
      title: "For Recruitment Agencies",
      subtitle: "Streamline your candidate evaluation process",
      benefits: [
        "Multi-client management",
        "Branded candidate experience",
        "Bulk assessment creation",
        "Client-specific reporting",
        "Candidate database management",
        "API access for integrations",
      ],
      useCases: [
        "Volume recruitment",
        "Executive search",
        "Contract hiring",
        "Specialized talent sourcing",
      ],
    },
    startups: {
      icon: Rocket,
      title: "For Startups & SMEs",
      subtitle: "Affordable, scalable hiring solutions",
      benefits: [
        "Pay-as-you-grow pricing",
        "Quick setup in minutes",
        "No long-term contracts",
        "Essential features included",
        "Self-service platform",
        "Community support",
      ],
      useCases: [
        "Founding team hiring",
        "Rapid team scaling",
        "Strategic Global Hiring",
        "Freelancer evaluation",
      ],
    },
    teams: {
      icon: Users,
      title: "For HR Teams",
      subtitle: "Empower your internal recruitment",
      benefits: [
        "Team collaboration tools",
        "Hiring workflow automation",
        "Interview scheduling",
        "Candidate tracking",
        "Performance analytics",
        "Integration with HRIS",
      ],
      useCases: [
        "Internal mobility",
        "Department-specific hiring",
        "Graduate programs",
        "Seasonal hiring",
      ],
    },
  };

  const currentSolution = solutions[selectedSolution as keyof typeof solutions];

  return (
    <div className="min-h-screen hero-blue bg-aurora">
      <EnhancedNavigation />

      {/* Hero Section - Clean Image without Text Overlay */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Clean Image without Text Overlay */}
            <div className="mb-10 rounded-3xl overflow-hidden shadow-elegant max-w-6xl mx-auto border border-white/10">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1920"
                alt="Strategic Global Hiring - Professional Team Collaboration"
                className="w-full h-64 md:h-[450px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Text Content Below Image */}
            <div className="max-w-4xl mx-auto">
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40 mb-6 uppercase tracking-[0.2em] font-semibold text-xs">
                Institutional Solution
              </Badge>
              <h1 className="text-4xl md:text-6xl fancy-heading tracking-tighter mb-6 text-white">
                Solutions for <span className="gradient-text-brand">Every</span> Archetype
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Strategic Global Hiring
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto font-medium mb-8">
                Connect with elite talent through our boundaryless meritocratic engine.
              </p>
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
                From hyper-growth startups to institutional global enterprises, InterQ provides the cognitive infrastructure to scale your workforce with mathematical precision.
              </p>
            </div>
          </motion.div>

          {/* Solution Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            {Object.entries(solutions).map(([key, solution]) => (
              <button
                key={key}
                onClick={() => setSelectedSolution(key)}
                aria-pressed={selectedSolution === key}
                className={`p-4 md:p-6 rounded-xl border transition-smooth text-left w-full ${selectedSolution === key
                  ? "border-primary bg-primary/5 shadow-elegant"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-soft"
                  }`}
              >
                <solution.icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${selectedSolution === key ? "text-primary" : "text-white/80"
                  }`} />
                <h3 className="font-semibold text-sm md:text-base mb-1">{solution.title.replace(/^For |^Organizational hiring /, "")}</h3>
              </button>
            ))}
          </div>

          {/* Solution Analysis - Structured Two-Column Layout */}
          <motion.div
            key={selectedSolution}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start"
          >
            {/* Left Column - Solution Overview */}
            <div className="space-y-8">
              {/* Solution Header */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <currentSolution.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentSolution.title}</h2>
                    <p className="text-lg md:text-xl text-white/80 font-medium">{currentSolution.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-white border-b border-white/20 pb-3">Key Benefits</h3>
                <ul className="space-y-4">
                  {currentSolution.benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="text-base md:text-lg leading-relaxed text-white/90">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch pt-4">
                <Button 
                  onClick={() => navigate('/get-started')} 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10" 
                  onClick={() => navigate('/product')}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Use Cases & Additional Info */}
            <div className="space-y-8">
              {/* Perfect For Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">Ideal Use Cases</h3>
                <div className="space-y-4">
                  {currentSolution.useCases.map((useCase, index) => (
                    <motion.div
                      key={useCase}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-smooth"
                    >
                      <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-medium text-base md:text-lg text-white/90">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Custom Solution */}
              <div className="bg-primary/20 border border-primary/30 rounded-2xl p-6 md:p-7 backdrop-blur-sm">
                <h4 className="text-xl font-semibold text-white mb-3">Need a Custom Solution?</h4>
                <p className="text-base text-white/80 mb-4">
                  Our team specializes in creating tailored packages that meet your specific organizational requirements.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-white/40 text-white hover:bg-white/20" 
                  onClick={() => navigate('/get-started')}
                >
                  Contact Enterprise Sales
                </Button>
              </div>
            </div>
          </motion.div>

          {/* ROI Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 md:mt-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Calculate Your ROI</h2>
              <p className="text-sm md:text-base text-white/80 mb-6 md:mb-8">
                See how much time and money you can save with InterQ
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70%</div>
                  <div className="text-xs md:text-sm text-white/80">Time Saved</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$50K+</div>
                  <div className="text-xs md:text-sm text-white/80">Annual Savings</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5x</div>
                  <div className="text-xs md:text-sm text-white/80">Faster Hiring</div>
                </motion.div>
              </div>
              <Button size="lg" className="w-full sm:w-auto">Get Detailed ROI Report</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Solutions;
