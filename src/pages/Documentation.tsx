import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const docs = [
  { title: "Getting Started", desc: "Quickstart guide for setting up InterQ." },
  { title: "Assessments", desc: "Create and manage assessments for roles." },
  { title: "AI Interviews", desc: "Configure AI interview flows and analysis." },
];

const Documentation = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-muted-foreground">Guides and references for using InterQ</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{d.desc}</p>
                <Button variant="outline" className="mt-4 w-full sm:w-auto">Open</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Documentation;