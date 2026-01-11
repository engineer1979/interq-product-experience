import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileQuestion, Video, BarChart3, Shield, Zap, Users } from "lucide-react";

const Product = () => {
  const [activeTab, setActiveTab] = useState("assessments");
  const navigate = useNavigate();

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
      <section className="pt-32 pb-20 gradient-hero">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-display text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              The Complete <span className="text-primary">AI Recruitment</span> Platform
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
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
                onClick={() => {
                  setActiveTab(feature.tab);
                  if (feature.tab === "assessments") navigate('/assessments');
                  if (feature.tab === "interviews") navigate('/ai-interview');
                  if (feature.tab === "analytics") navigate('/interviews');
                }}
                className="glass-card hover:bg-white p-8 rounded-2xl cursor-pointer group transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-24">
        <div className="container-premium">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-16 bg-slate-100/50 p-1 rounded-xl">
              <TabsTrigger value="assessments" className="rounded-lg text-base py-3">Assessments</TabsTrigger>
              <TabsTrigger value="interviews" className="rounded-lg text-base py-3">AI Interviews</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg text-base py-3">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="assessments">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-display text-4xl font-bold mb-8 text-slate-900">Smart MCQ Assessments</h2>
                  <ul className="space-y-4">
                    {[
                      "3,400+ pre-built skills assessments",
                      "Custom test creation with AI assistance",
                      "Anti-cheating measures built-in",
                      "Automated grading and scoring",
                      "Mobile-friendly test interface",
                      "Real-time progress tracking",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4 text-slate-700 font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-10 btn-premium py-6 px-8 text-lg" onClick={() => navigate('/assessments')}>
                    Try Assessment Demo
                  </Button>
                </div>
                <div className="rounded-3xl h-[500px] overflow-hidden shadow-premium group border-4 border-white">
                  <img
                    src="/assessment-visual.jpg"
                    alt="Team discussing assessment results"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="bg-slate-50 rounded-3xl h-[500px] flex items-center justify-center border-4 border-white shadow-inner">
                  <Video className="w-32 h-32 text-primary/20" />
                </div>
                <div>
                  <h2 className="text-display text-4xl font-bold mb-8 text-slate-900">AI-Powered Video Interviews</h2>
                  <ul className="space-y-4">
                    {[
                      "Real-time AI analysis of responses",
                      "Communication & confidence scoring",
                      "Technical skill evaluation",
                      "Fraud detection with multi-factor checks",
                      "Automated feedback generation",
                      "Customizable interview questions",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4 text-slate-700 font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-10 btn-premium py-6 px-8 text-lg" onClick={() => navigate('/ai-interview')}>
                    Watch Interview Demo
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-display text-4xl font-bold mb-8 text-slate-900">Deep Analytics & Insights</h2>
                  <ul className="space-y-4">
                    {[
                      "Real-time performance dashboards",
                      "Candidate comparison tools",
                      "Skill gap analysis",
                      "Hiring funnel metrics",
                      "Export reports in multiple formats",
                      "Custom analytics views",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-4 text-slate-700 font-medium">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-10 btn-premium py-6 px-8 text-lg" onClick={() => navigate('/interviews')}>
                    Explore Analytics
                  </Button>
                </div>
                <div className="bg-slate-50 rounded-3xl h-[500px] flex items-center justify-center border-4 border-white shadow-inner">
                  <BarChart3 className="w-32 h-32 text-primary/20" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-24 bg-slate-50/50">
        <div className="container-premium">
          <h2 className="text-display text-4xl font-bold text-center mb-16 text-slate-900">Why Choose InterQ?</h2>
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
              <div key={benefit.title} className="glass-card bg-white p-8 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                <benefit.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
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
