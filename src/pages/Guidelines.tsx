import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Briefcase, CheckCircle } from "lucide-react";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";

const sections = [
  {
    icon: Award,
    title: "For Experts",
    color: "text-primary",
    items: [
      "Follow the structured evaluation framework for every interview",
      "Maintain unbiased assessment — evaluate skills, not backgrounds",
      "Use the standardized scoring rubric (1–5 scale) consistently",
      "Provide actionable feedback in the strengths and improvement sections",
      "Submit evaluation reports within 24 hours of the session",
      "Maintain strict confidentiality of all candidate information",
    ],
  },
  {
    icon: Users,
    title: "For Candidates",
    color: "text-green-600",
    items: [
      "Maintain professional conduct throughout the interview session",
      "Prepare technically for the role and domain specified",
      "Ensure a stable internet connection and quiet environment",
      "Join the session 5 minutes before the scheduled time",
      "Have a valid photo ID ready for identity verification",
      "Be prepared to share your screen if requested for coding tasks",
    ],
  },
  {
    icon: Briefcase,
    title: "For Companies",
    color: "text-blue-600",
    items: [
      "Submit accurate and detailed job descriptions for each role",
      "Specify required skill domains and seniority level clearly",
      "Follow the structured review process for evaluation reports",
      "Provide timely feedback on candidate hiring decisions",
      "Respect confidentiality of expert identities and scoring methods",
      "Use the platform's built-in tools for scheduling and communication",
    ],
  },
];

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-14">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Platform Guidelines</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Standards and expectations for all participants on the InterQ platform to ensure fair, structured, and professional evaluations.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <Card key={i} className="shadow-soft border border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className={`w-5 h-5 ${section.color}`} />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default Guidelines;
