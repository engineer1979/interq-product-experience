import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap, Shield, BarChart3, Users, Code } from "lucide-react";
import { useNavigate as useRouterNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  const routerNavigate = useRouterNavigate();

  const features = [
    {
      icon: Star,
      title: "AI-Powered Assessments",
      description: "Intelligent skill evaluation with adaptive questioning and real-time analysis.",
      color: "text-yellow-500",
      href: "/assessments"
    },
    {
      icon: Users,
      title: "Smart Interviewing",
      description: "Automated video interviews with AI-powered candidate evaluation and scoring.",
      color: "text-blue-500",
      href: "/ai-interview"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive hiring metrics, performance tracking, and predictive insights.",
      color: "text-green-500",
      href: "/analytics"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance, GDPR ready, with end-to-end encryption and data protection.",
      color: "text-purple-500",
      href: "/security"
    },
    {
      icon: Zap,
      title: "Seamless Integrations",
      description: "Connect with 50+ ATS, HRIS, and productivity tools for streamlined workflows.",
      color: "text-orange-500",
      href: "/integrations"
    },
    {
      icon: Code,
      title: "Developer API",
      description: "RESTful API with comprehensive documentation for custom integrations.",
      color: "text-red-500",
      href: "/api-docs"
    }
  ];

  const handleFeatureClick = (href: string) => {
    routerNavigate(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Platform Features
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the comprehensive suite of AI-powered tools that transform how organizations 
              identify, assess, and hire top talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => routerNavigate('/get-started')}
              >
                Book Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => routerNavigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Hire Smarter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with intuitive design to deliver 
              an unparalleled hiring experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div 
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => handleFeatureClick(feature.href)}
                >
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Future of Hiring?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of organizations that trust InterQ for their hiring needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => routerNavigate('/get-started')}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => routerNavigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;