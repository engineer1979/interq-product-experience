import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Briefcase, Rocket, Users } from "lucide-react";

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState("enterprise");

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
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {Object.entries(solutions).map(([key, solution]) => (
              <button
                key={key}
                onClick={() => setSelectedSolution(key)}
                className={`p-6 rounded-xl border transition-smooth text-left ${
                  selectedSolution === key
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <solution.icon className={`w-8 h-8 mb-3 ${
                  selectedSolution === key ? "text-primary" : "text-muted-foreground"
                }`} />
                <h3 className="font-semibold mb-1">{solution.title.replace(/^For |^Enterprise /, "")}</h3>
              </button>
            ))}
          </div>

          {/* Solution Details */}
          <motion.div
            key={selectedSolution}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div>
              <div className="mb-8">
                <currentSolution.icon className="w-16 h-16 text-primary mb-4" />
                <h2 className="text-4xl font-bold mb-2">{currentSolution.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSolution.subtitle}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {currentSolution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button size="lg">Book Demo</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
                <h3 className="text-2xl font-semibold mb-6">Perfect For</h3>
                <div className="space-y-4">
                  {currentSolution.useCases.map((useCase) => (
                    <div key={useCase} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="font-medium">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-primary/10 border border-primary/20 rounded-2xl p-6">
                <h4 className="font-semibold mb-2">Need a custom solution?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team can create a tailored package that meets your specific requirements.
                </p>
                <Button variant="outline" size="sm">Contact Sales</Button>
              </div>
            </div>
          </motion.div>

          {/* ROI Calculator */}
          <div className="mt-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Calculate Your ROI</h2>
              <p className="text-muted-foreground mb-8">
                See how much time and money you can save with InterQ
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">70%</div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </div>
                <div className="bg-card rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">$50K+</div>
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                </div>
                <div className="bg-card rounded-xl p-6">
                  <div className="text-4xl font-bold text-primary mb-2">5x</div>
                  <div className="text-sm text-muted-foreground">Faster Hiring</div>
                </div>
              </div>
              <Button size="lg">Get Detailed ROI Report</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
