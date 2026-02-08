import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Code, Settings, Users, BarChart3, Shield, Globe } from "lucide-react";

const Integrations = () => {
  const navigate = useNavigate();

  const integrations = [
    {
      category: "ATS Systems",
      tools: [
        { name: "Greenhouse", logo: "🌱", status: "available" },
        { name: "Lever", logo: "🔧", status: "available" },
        { name: "Workday", logo: "💼", status: "available" },
        { name: "Taleo", logo: "📋", status: "available" },
        { name: "iCIMS", logo: "🎯", status: "available" },
        { name: "SmartRecruiters", logo: "🚀", status: "available" }
      ]
    },
    {
      category: "HRIS Systems",
      tools: [
        { name: "BambooHR", logo: "🎋", status: "available" },
        { name: "ADP", logo: "💰", status: "available" },
        { name: "Gusto", logo: "🌟", status: "available" },
        { name: "Rippling", logo: "🌊", status: "available" },
        { name: "Namely", logo: "📛", status: "available" },
        { name: "Zenefits", logo: "🧘", status: "available" }
      ]
    },
    {
      category: "Communication",
      tools: [
        { name: "Slack", logo: "💬", status: "available" },
        { name: "Microsoft Teams", logo: "🏢", status: "available" },
        { name: "Google Workspace", logo: "📧", status: "available" },
        { name: "Zoom", logo: "📹", status: "available" },
        { name: "WebEx", logo: "🌐", status: "available" },
        { name: "Discord", logo: "🎮", status: "coming-soon" }
      ]
    },
    {
      category: "Analytics & BI",
      tools: [
        { name: "Tableau", logo: "📊", status: "available" },
        { name: "Power BI", logo: "📈", status: "available" },
        { name: "Google Analytics", logo: "📉", status: "available" },
        { name: "Mixpanel", logo: "🎯", status: "available" },
        { name: "Looker", logo: "👀", status: "available" },
        { name: "Domo", logo: "🏠", status: "coming-soon" }
      ]
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "One-Click Setup",
      description: "Connect your tools in minutes with our pre-built integrations"
    },
    {
      icon: Settings,
      title: "Custom Configurations",
      description: "Tailor integrations to match your specific workflow needs"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption and audit logs"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Keep everyone aligned with automated notifications and updates"
    },
    {
      icon: BarChart3,
      title: "Unified Analytics",
      description: "Consolidate data across all your tools for comprehensive insights"
    },
    {
      icon: Globe,
      title: "Global Compatibility",
      description: "Works with tools used worldwide, supporting multiple languages"
    }
  ];

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
              Seamless Integrations
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect InterQ with your existing tools and workflows. Our pre-built integrations 
              ensure smooth data flow and enhanced productivity across your entire tech stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/get-started')}
              >
                Request Integration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/api-docs')}
              >
                View API Docs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Integration Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of connected systems working together seamlessly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-primary mb-4">
                    <feature.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Supported Integrations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We integrate with the tools you already use and love.
            </p>
          </motion.div>

          <div className="space-y-12">
            {integrations.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">{category.category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + categoryIndex * 0.1 + toolIndex * 0.05 }}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tool.logo}</span>
                          <span className="font-medium">{tool.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.status === 'available' && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs font-medium">Available</span>
                            </div>
                          )}
                          {tool.status === 'coming-soon' && (
                            <div className="flex items-center gap-1 text-yellow-600">
                              <div className="h-2 w-2 bg-yellow-600 rounded-full animate-pulse" />
                              <span className="text-xs font-medium">Coming Soon</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Custom Integration?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team can build custom integrations for your specific tools and workflows. 
              Get in touch to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/contact')}
              >
                Contact Integration Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/api-docs')}
              >
                Build Your Own
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;