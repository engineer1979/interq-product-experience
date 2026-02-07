import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Target, Eye, Heart, Zap, Users, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TeamSection from "@/components/TeamSection";

const About = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const values = [
    { icon: Target, title: "Innovation", description: "Pushing boundaries in AI-driven recruitment" },
    { icon: Zap, title: "Efficiency", description: "Streamlining every step of the hiring process" },
    { icon: Heart, title: "Integrity", description: "Transparent, unbiased evaluation for all" },
    { icon: Users, title: "Excellence", description: "Delivering world-class recruitment solutions" },
    { icon: Eye, title: "Transparency", description: "Clear processes and honest communication" },
    { icon: Globe, title: "Global Reach", description: "Serving clients across North America, Middle East and beyond" },
  ];

  const timeline = [
    { year: "2023", event: "InterQ Founded", description: "Started with a vision to revolutionize recruitment" },
    { year: "2023 Q3", event: "MCQ Platform Launch", description: "Launched comprehensive assessment library" },
    { year: "2024 Q1", event: "AI Interviews", description: "Introduced AI-powered video interviewing" },
    { year: "2024 Q2", event: "3,400+ Skills", description: "Reached 3,400+ skills across 2,500+ job roles" },
    { year: "2024 Q4", event: "Global Expansion", description: "Expanding to Middle East and beyond" },
    { year: "2025", event: "Future Ready", description: "White-labeling and advanced AI features coming" },
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hire Smarter. Get hired faster.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              InterQ is an AI-powered assessment platform built to fix what traditional hiring gets wrong. We replace resumes, biased interviews, and gut decisions with objective, skill-based evaluations — so companies identify real talent, faster and fairer. 
              <br /><br />
              InterQ is an AI-powered assessment platform built to fix what traditional hiring gets wrong. We replace resumes, biased interviews, and gut decisions with objective, skill-based evaluations so companies identify real talent, faster and fairer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <TeamSection />

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To streamline hiring through AI-driven interviews and assessments, making recruitment efficient, unbiased, and scalable for organizations worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To become the leading AI recruitment platform across North America, Middle East and beyond, transforming how organizations identify and hire talent through objective, skill-based evaluations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values - Fixed Accordion */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <value.icon className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">How we got here</p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                      <div className="text-primary font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="font-semibold mb-2">{item.event}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  </div>
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
              <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
