import { motion } from "framer-motion";

const logos = [
  "TechCorp", "InnovateLabs", "GlobalHR", "TalentFirst",
  "HireScale", "CodeBridge", "RecruitPro", "SkillForge",
];

const CompanyLogosSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider mb-10">
          Trusted by Leading Hiring Teams
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {logos.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center h-12 rounded-lg text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors font-bold text-sm tracking-wide select-none"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogosSection;
