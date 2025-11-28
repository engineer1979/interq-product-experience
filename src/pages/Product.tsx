import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileQuestion, Video, BarChart3, Shield, Zap, Users } from "lucide-react";

const Product = () => {
  const [activeTab, setActiveTab] = useState("assessments");

  const features = [
    {
      icon: FileQuestion,
      title: "MCQ Assessments",
      description: "3,400+ skills tested across 2,500+ job roles with intelligent question banks",
      tab: "assessments",
    },
    {
      icon: Video,
      title: "AI Video Interviews",
      description: "Real-time AI analysis of communication, confidence, and technical skills",
      tab: "interviews",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into candidate performance with visual dashboards",
      tab: "analytics",
    },
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
              The Complete <span className="gradient-primary bg-clip-text text-transparent">AI Recruitment</span> Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From assessments to interviews to analytics - everything you need to hire the best talent, powered by AI
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setActiveTab(feature.tab)}
                className="bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-elegant transition-smooth cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="interviews">AI Interviews</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="assessments">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Smart MCQ Assessments</h2>
                  <ul className="space-y-4">
                    {[
                      "3,400+ pre-built skills assessments",
                      "Custom test creation with AI assistance",
                      "Anti-cheating measures built-in",
                      "Automated grading and scoring",
                      "Mobile-friendly test interface",
                      "Real-time progress tracking",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8" size="lg">
                    Try Assessment Demo
                  </Button>
                </div>
                <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
                  <FileQuestion className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
                  <Video className="w-32 h-32 text-primary/20" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-6">AI-Powered Video Interviews</h2>
                  <ul className="space-y-4">
                    {[
                      "Real-time AI analysis of responses",
                      "Communication & confidence scoring",
                      "Technical skill evaluation",
                      "Fraud detection with multi-factor checks",
                      "Automated feedback generation",
                      "Customizable interview questions",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8" size="lg">
                    Watch Interview Demo
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Deep Analytics & Insights</h2>
                  <ul className="space-y-4">
                    {[
                      "Real-time performance dashboards",
                      "Candidate comparison tools",
                      "Skill gap analysis",
                      "Hiring funnel metrics",
                      "Export reports in multiple formats",
                      "Custom analytics views",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8" size="lg">
                    Explore Analytics
                  </Button>
                </div>
                <div className="bg-muted rounded-2xl h-96 flex items-center justify-center">
                  <BarChart3 className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose InterQ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and SOC 2 compliance for your data",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Reduce hiring time by 70% with automated workflows",
              },
              {
                icon: Users,
                title: "Scalable",
                description: "From 10 to 10,000 candidates - we scale with you",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <benefit.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
