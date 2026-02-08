import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Star, Zap, Shield, Globe, Mail, Phone, Building, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Partners = () => {
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrate InterQ with your existing HR tech stack",
      icon: Zap,
      color: "text-blue-500",
      benefits: ["API Access", "Technical Support", "Co-marketing Opportunities"]
    },
    {
      title: "Consulting Partners",
      description: "Offer InterQ as part of your HR consulting services",
      icon: Users,
      color: "text-green-500",
      benefits: ["Reseller Rights", "Training Programs", "Revenue Sharing"]
    },
    {
      title: "Implementation Partners",
      description: "Help clients deploy and optimize InterQ solutions",
      icon: Shield,
      color: "text-purple-500",
      benefits: ["Implementation Support", "Certification Programs", "Client Referrals"]
    }
  ];

  const successStories = [
    {
      company: "TechCorp Solutions",
      type: "Technology Partner",
      testimonial: "Integrating InterQ with our ATS system has reduced our time-to-hire by 40%. The API is robust and well-documented.",
      results: "40% faster hiring, 25% cost reduction",
      logo: "🚀"
    },
    {
      company: "HR Consulting Group",
      type: "Consulting Partner",
      testimonial: "Our clients love the AI-powered assessments. It's become a key differentiator in our service offerings.",
      results: "150% increase in client satisfaction",
      logo: "📈"
    },
    {
      company: "Global Recruiters",
      type: "Implementation Partner",
      testimonial: "The implementation process was seamless. InterQ's team provided excellent support throughout.",
      results: "95% client retention rate",
      logo: "🌍"
    }
  ];

  const partnerRequirements = [
    "Established business with proven track record",
    "Experience in HR technology or consulting",
    "Commitment to customer success",
    "Technical capabilities for integration",
    "Sales and marketing resources"
  ];

  const partnerBenefits = [
    "Competitive commission structure",
    "Comprehensive training programs",
    "Marketing and sales support",
    "Dedicated partner manager",
    "Early access to new features",
    "Co-branded marketing materials"
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
              Partner with InterQ
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing network of partners and help organizations transform their hiring processes. 
              Together, we can build the future of recruitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/partner-application')}
              >
                Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/contact')}
              >
                Contact Partner Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the partnership model that best fits your business and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div 
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPartner(partner.title)}
                >
                  <div className={`${partner.color} mb-4`}>
                    <partner.icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {partner.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {partner.description}
                  </p>
                  <div className="space-y-2">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partner Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our partners about their experience working with InterQ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{story.logo}</div>
                  <div>
                    <h3 className="font-semibold">{story.company}</h3>
                    <p className="text-sm text-muted-foreground">{story.type}</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{story.testimonial}"
                </p>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm font-medium text-primary">{story.results}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Benefits Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Partner Requirements</h3>
              <div className="space-y-4">
                {partnerRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <p className="text-muted-foreground">{requirement}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-6">Partner Benefits</h3>
              <div className="space-y-4">
                {partnerBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Ready to Partner with Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our growing network of partners and help organizations transform their hiring processes. 
              Let's build the future of recruitment together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/partner-application')}
              >
                Apply to Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => navigate('/contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Partner Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;