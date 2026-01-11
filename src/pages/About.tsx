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
              About <span className="gradient-primary bg-clip-text text-transparent">InterQ</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to transform recruitment through AI, making hiring faster, fairer, and more efficient for organizations worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">InterQ Enterprise Inc</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded with a vision to revolutionize the recruitment industry, InterQ combines cutting-edge AI technology with deep industry expertise to deliver unparalleled hiring solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                <strong className="text-foreground">Our Mission:</strong> Streamline hiring through AI-driven interviews and assessments, making recruitment efficient, unbiased, and scalable.
              </p>
              <p className="text-lg text-muted-foreground">
                <strong className="text-foreground">Our Vision:</strong> To become the leading AI recruitment platform across North America, Middle East and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted rounded-2xl h-96 flex items-center justify-center"
            >
              <Users className="w-32 h-32 text-primary/20" />
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-elegant transition-smooth"
                >
                  <value.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
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

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-elegant"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
