import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const faqs = [
  { q: "How do I create an assessment?", a: "Go to Assessments and click Create. Configure role, questions, and scoring." },
  { q: "How are AI interviews scored?", a: "InterQ analyzes responses for clarity, correctness, and communication to generate a score." },
  { q: "Can I invite candidates via email?", a: "Yes, generate a link or invite directly from the interview or assessment page." },
];

const HelpCenter = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground">Search guides and FAQs</p>
        </div>
        <div className="max-w-2xl mx-auto mb-10 flex gap-3">
          <Input placeholder="Search help articles" className="h-12" />
          <Button className="h-12">Search</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground">{f.a}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default HelpCenter;