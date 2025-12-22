import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const posts = [
  { title: "AI in Recruitment", excerpt: "How AI transforms hiring workflows and candidate evaluation." },
  { title: "Scaling Assessments", excerpt: "Best practices for high-volume technical assessments." },
  { title: "Interview Insights", excerpt: "Structuring interviews for fairness and consistency." },
];

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground">Insights on AI recruiting, assessments, and interviewing</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                <Button variant="outline" className="mt-4 w-full sm:w-auto">Read</Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Blog;