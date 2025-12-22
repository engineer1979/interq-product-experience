import { motion } from "framer-motion";

const images = [
  { src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80&auto=format&fit=crop", caption: "AI & Data" },
  { src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop", caption: "Team Collaboration" },
  { src: "https://images.unsplash.com/photo-1551288049-bebda4f72896?w=800&q=80&auto=format&fit=crop", caption: "Cloud Infrastructure" },
];

const TechShowcase = () => (
  <section className="py-16 px-4">
    <div className="container mx-auto max-w-7xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Technology In Action</h2>
        <p className="text-muted-foreground">A glimpse of the tech powering InterQ</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div key={img.src} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden border border-border shadow-soft">
            <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-56 object-cover" />
            <div className="p-4">
              <p className="text-sm text-muted-foreground">{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechShowcase;