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
    q: "What is InterQ? (For Companies & Hiring Partners)",
    a: "InterQ is an expert-led technical interview and hiring platform that helps companies identify top engineering talent through structured, professional assessments."
  },
  {
    q: "How does InterQ improve our hiring efficiency?",
    a: "By outsourcing technical screening to our platform, your internal engineering team can focus on core product development instead of conducting early-stage interviews."
  },
  {
    q: "Who conducts the technical interviews?",
    a: "Interviews are led by seasoned technical experts with deep domain experience to ensure high-quality, unbiased candidate evaluations."
  },
  {
    q: "Does InterQ offer AI-based interviews?",
    a: "Yes, we utilize AI-powered tools for initial matching and technical baseline evaluations to complement our expert-led sessions."
  },
  {
    q: "How does the AI-based assessment work?",
    a: "Our AI analyzes coding patterns and logic in real-time, providing instant data to pre-qualify candidates before they move to a human-led round."
  },
  {
    q: "How does expert-led interviewing differ from automated tests?",
    a: "While AI provides rapid data, our human experts evaluate complex system design thinking and communication skills that automated platforms often miss."
  },
  {
    q: "Can the interviews be tailored to our specific tech stack?",
    a: "Yes, our experts and AI modules can be calibrated to focus on your specific technology requirements and internal standards."
  },
  {
    q: "How quickly can we receive an interview report?",
    a: "We prioritize efficiency, typically delivering detailed evaluation reports and feedback within 24 hours of the session."
  },
  {
    q: "What metrics are included in the final hiring report?",
    a: "Reports provide a breakdown of technical proficiency, problem-solving approaches, and overall fit for the role."
  },
  {
    q: 'How does the platform handle technical "red flags"?',
    a: "Our experts are trained to identify inconsistencies in logic or technical gaps that AI might overlook, providing a layer of human verification."
  },
  {
    q: "Can we use InterQ for senior-level engineering roles?",
    a: "Yes, our expert pool includes specialists capable of conducting advanced system design and architecture rounds for senior positions."
  },
  {
    q: "How do we get started with a pilot or demo?",
    a: "You can begin by clicking the 'Book a Demo' or 'Get Started' call-to-action found in our hero section or navigation menu."
  },
  {
    q: "What should I expect during an expert-led mock interview? (For Candidates)",
    a: "You will participate in a live session with a professional interviewer, simulating a real-world high-stakes technical round."
  },
  {
    q: "What happens during an AI-based interview?",
    a: "Candidates engage with interactive coding challenges where our AI analyzes technical logic and efficiency."
  },
  {
    q: "What kind of feedback will I receive?",
    a: "You will receive constructive, actionable insights into your performance, highlighting both technical strengths and areas for growth."
  },
  {
    q: "Will my mock interview results be shared with employers?",
    a: "Independent mock interviews are strictly confidential and used solely for your personal professional development."
  },
  {
    q: "What technical domains do your experts cover?",
    a: "Our pool covers a wide range of specialties, including Frontend, Backend, DevOps, and System Architecture."
  },
  {
    q: "How does InterQ help me land my next role?",
    a: "By providing realistic practice and expert feedback, we help you refine your skills and increase your confidence for actual hiring rounds."
  },
  {
    q: "Is my data secure on the InterQ platform? (Security & Compliance)",
    a: "Yes, the website uses HTTPS (TLS/SSL) encryption to ensure all data transmissions are secure."
  },
  {
    q: "Where can I find your legal and privacy policies?",
    a: "Our Privacy Policy and Terms of Service are linked in the website footer for full transparency."
  },
  {
    q: "Is InterQ compliant with data protection laws?",
    a: "We aim for compliance with international standards, including global data protection regulations, regarding the collection and storage of user data."
  },
  {
    q: "Does the website use cookies?",
    a: "Yes, and we provide a cookie consent banner to allow users to manage their preferences."
  },
  {
    q: "How do I reach customer support?",
    a: "You can contact us via the details provided in our footer or through our 'Contact' sections."
  },
  {
    q: "How do you ensure the quality of your expert interviewer pool?",
    a: "All interviewers undergo a rigorous vetting process to confirm their technical authority and professional assessment capabilities."
  },
  {
    q: "Is the platform accessible on mobile devices?",
    a: "Yes, our platform is built to be responsive, ensuring a consistent experience across desktop and mobile screens."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 light-bg" id="faq">
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
          <h2 className="text-3xl md:text-4xl fancy-heading mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto font-medium">
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
                <AccordionTrigger className="text-left font-bold text-lg text-slate-900 hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-800 text-base font-medium leading-relaxed pb-5">
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
