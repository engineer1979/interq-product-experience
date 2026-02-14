import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Server, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Lock, title: "AES-256 Encryption", desc: "All data encrypted at rest and in transit with industry-standard protocols." },
  { icon: Server, title: "Secure Infrastructure", desc: "SOC 2 compliant hosting with continuous monitoring and threat detection." },
  { icon: UserCheck, title: "Role-Based Access", desc: "Granular permissions ensure only authorized users access sensitive data." },
  { icon: FileCheck, title: "GDPR-Aligned Practices", desc: "Full compliance with international data protection standards." },
  { icon: Eye, title: "Confidential Interviews", desc: "Interview recordings and evaluations are handled under strict NDA protocols." },
  { icon: Shield, title: "Regular Audits", desc: "Third-party security assessments and penetration testing performed quarterly." },
];

const DataPrivacySection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Your Data Is Secure
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Enterprise-Grade Security & Privacy
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            InterQ is built with security at its core — protecting candidate, company, and expert data at every level.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-elegant transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/privacy-policy" className="text-primary hover:underline text-sm font-medium">
            Read our full Privacy Policy →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DataPrivacySection;
