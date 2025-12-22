import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Building2, Briefcase, Rocket, Users } from "lucide-react";

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
      title: "Enterprise Solutions",
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
        "Remote hiring",
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solutions for <span className="gradient-primary bg-clip-text text-transparent">Every</span> Organization
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a startup, recruitment agency, or enterprise - we have the perfect solution for your hiring needs
            </p>
          </motion.div>

          {/* Solution Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
            {Object.entries(solutions).map(([key, solution]) => (
              <button
                key={key}
                onClick={() => setSelectedSolution(key)}
                aria-pressed={selectedSolution === key}
                className={`p-4 md:p-6 rounded-xl border transition-smooth text-left w-full ${
                  selectedSolution === key
                    ? "border-primary bg-primary/5 shadow-elegant"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-soft"
                }`}
              >
                <solution.icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-3 ${
                  selectedSolution === key ? "text-primary" : "text-muted-foreground"
                }`} />
                <h3 className="font-semibold text-sm md:text-base mb-1">{solution.title.replace(/^For |^Enterprise /, "")}</h3>
              </button>
            ))}
          </div>

          {/* Solution Details */}
          <motion.div
            key={selectedSolution}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            <div>
              <div className="mb-6 md:mb-8">
                <currentSolution.icon className="w-12 h-12 md:w-16 md:h-16 text-primary mb-3 md:mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentSolution.title}</h2>
                <p className="text-lg md:text-xl text-muted-foreground">{currentSolution.subtitle}</p>
              </div>

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Key Benefits</h3>
                <ul className="space-y-3 md:space-y-4">
                  {currentSolution.benefits.map((benefit, index) => (
                    <motion.li 
                      key={benefit} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      </div>
                      <span className="text-base md:text-lg leading-relaxed">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button onClick={() => navigate('/get-started')} size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-7 sm:px-9 text-base sm:text-lg">Book Demo</Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-7 sm:px-9 text-base sm:text-lg" onClick={() => navigate('/product')}>Learn More</Button>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Perfect For</h3>
                <div className="space-y-3 md:space-y-4">
                  {currentSolution.useCases.map((useCase, index) => (
                    <motion.div 
                      key={useCase} 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 md:p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">{useCase}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-8 bg-primary/10 border border-primary/20 rounded-2xl p-5 md:p-6">
                <h4 className="font-semibold mb-2 text-base md:text-lg">Need a custom solution?</h4>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Our team can create a tailored package that meets your specific requirements.
                </p>
                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => navigate('/get-started')}>Contact Sales</Button>
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
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                See how much time and money you can save with InterQ
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70%</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Time Saved</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$50K+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Annual Savings</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-card rounded-xl p-5 md:p-6 shadow-soft"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5x</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Faster Hiring</div>
                </motion.div>
              </div>
              <Button size="lg" className="w-full sm:w-auto">Get Detailed ROI Report</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
