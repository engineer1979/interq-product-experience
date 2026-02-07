import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const cases = [
  { title: "Organizational Hiring", desc: "Reduced time-to-hire by 35% across regions." },
  { title: "Campus Recruitment", desc: "Automated screening for 10k+ candidates." },
  { title: "Technical Interviews", desc: "Improved evaluation quality with AI feedback." },
];

const CaseStudies = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-muted-foreground">Real outcomes from teams using InterQ</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{c.desc}</p>
                <Button variant="outline" className="mt-4 w-full sm:w-auto">View</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CaseStudies;