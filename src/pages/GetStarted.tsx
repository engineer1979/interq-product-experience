import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Award, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const GetStarted = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to InterQ!",
      description: "Your account has been created successfully.",
    });
    navigate('/auth');
  };

  const expectations = [
    "Get a personalized demo of InterQ",
    "Hear proven customer success stories",
    "Learn about pricing for your use case",
    "Explore InterQ's features in real-time",
  ];

  const companyLogos = [
    { name: "Company 1" },
    { name: "Company 2" },
    { name: "Company 3" },
    { name: "Company 4" },
    { name: "Company 5" },
  ];

  const badges = [
    { icon: Shield, label: "SOC 2 Certified" },
    { icon: Award, label: "ISO 27001" },
    { icon: Lock, label: "GDPR Compliant" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Book Your <span className="gradient-primary bg-clip-text text-transparent">30-minute</span>
              <br />
              InterQ's Personalized Demo.
            </h1>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Expectations */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-primary font-semibold text-lg mb-6 uppercase tracking-wide">
                  What to Expect:
                </h3>
                <div className="space-y-4">
                  {expectations.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-lg text-foreground">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8">
                <h4 className="text-foreground font-semibold mb-6">
                  Trusted by 5,000+ Recruiters Worldwide
                </h4>
                <div className="grid grid-cols-3 gap-6 items-center">
                  {companyLogos.map((logo, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-4 h-20 flex items-center justify-center shadow-soft"
                    >
                      <span className="text-muted-foreground text-sm">{logo.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Leaders */}
              <div className="pt-4">
                <h4 className="text-foreground font-semibold mb-6">
                  Trusted by Industry Leaders Worldwide
                </h4>
                <div className="flex gap-4 flex-wrap">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2 shadow-soft"
                    >
                      <badge.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-medium mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-12"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Work Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm font-medium mb-2 block">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-12"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12"
                      placeholder="Create a password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-semibold">
                    Get Started Free
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>

                  <div className="text-center pt-4">
                    <span className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <a href="#" className="text-primary font-semibold hover:underline">
                        Sign in
                      </a>
                    </span>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  ✨ Start your <span className="font-semibold text-foreground">14-day free trial</span> today
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              Protecting Your Data with the Highest Standards
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              InterQ is committed to enterprise-grade security and compliance, ensuring your hiring data remains safe and confidential.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-medium">Bank-level Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-primary" />
                <span className="font-medium">Secure Data Centers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-medium">Industry Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
