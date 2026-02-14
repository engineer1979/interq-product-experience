import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is InterQ?",
    a: "InterQ is a structured technical interview platform that connects hiring teams with vetted domain experts. We conduct expert-led candidate assessments across 50+ skill areas, delivering detailed evaluation reports within 24 hours.",
  },
  {
    q: "How does expert-led interviewing work?",
    a: "Companies submit a job description and select a skill domain. InterQ matches the role with a vetted expert who conducts a structured, bias-reduced technical interview. Results include a scorecard covering technical skills, problem solving, communication, and cultural fit.",
  },
  {
    q: "How is InterQ different from assessment-only tools?",
    a: "Unlike automated assessment platforms, InterQ pairs candidates with real domain experts for live, structured interviews. This provides deeper evaluation of problem-solving approach, communication skills, and practical experience — not just test scores.",
  },
  {
    q: "Is candidate and company data secure?",
    a: "Yes. InterQ uses AES-256 encryption, role-based access control, and GDPR-aligned data practices. All interview sessions are handled through secure infrastructure with strict confidentiality protocols.",
  },
  {
    q: "How fast can interviews be scheduled?",
    a: "Interviews can typically be scheduled within 24–48 hours. Our platform offers real-time expert availability with interactive calendar booking for immediate scheduling.",
  },
  {
    q: "How are Experts vetted?",
    a: "Every expert undergoes a multi-step vetting process including credential verification, domain competency assessment, structured interview training, and ongoing performance review to ensure consistently high-quality evaluations.",
  },
  {
    q: "Do candidates receive feedback after their interview?",
    a: "Yes. Each candidate receives a detailed evaluation report covering strengths, areas for improvement, and expert commentary — helping both the hiring team and the candidate understand the assessment outcome.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Common questions about our expert-led technical interview platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 shadow-soft data-[state=open]:shadow-elegant transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
