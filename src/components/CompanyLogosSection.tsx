import { motion } from "framer-motion";
import xiLogo from "@/assets/client-xi-website.png";
import sBrandLogo from "@/assets/client-s-brand.png";
import sharkLogo from "@/assets/client-shark-electronics.png";

const clients = [
  { name: "Xi Website (Pvt) Ltd", logo: xiLogo },
  { name: "S-Brand", logo: sBrandLogo },
  { name: "The Shark Electronics", logo: sharkLogo },
];

const CompanyLogosSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 border-y border-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Our Valued Clients
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Powering Hiring for Growing Businesses
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Building long-term partnerships across industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group flex items-center justify-center rounded-xl border border-border bg-card p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-16 md:max-h-20 w-auto object-contain select-none"
                loading="lazy"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogosSection;
