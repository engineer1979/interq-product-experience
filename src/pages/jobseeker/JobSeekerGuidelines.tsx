import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Shield, Clock, AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "Assessment Guidelines",
    icon: BookOpen,
    items: [
      "Complete each assessment within the allotted time limit",
      "Do not use external help or references unless explicitly allowed",
      "Ensure a stable internet connection before starting",
      "Do not switch tabs or windows during proctored tests",
      "Answer all questions honestly — your integrity matters",
      "Progress is saved automatically; submit before the timer ends",
    ],
  },
  {
    title: "Interview Guidelines",
    icon: Clock,
    items: [
      "Join the interview session 5 minutes early",
      "Use a professional, quiet environment with good lighting",
      "Have your resume and job description ready for reference",
      "Test your camera and microphone before the session",
      "Be prepared to discuss your skills, experience, and goals",
      "Listen carefully and ask clarifying questions when needed",
    ],
  },
  {
    title: "Code of Conduct",
    icon: Shield,
    items: [
      "Be honest and authentic in all responses",
      "Maintain professional communication at all times",
      "Respect the expert's time and feedback",
      "Report any technical issues immediately",
      "Do not share assessment content with others",
      "Cheating or plagiarism will result in disqualification",
    ],
  },
  {
    title: "Fairness & Privacy",
    icon: AlertTriangle,
    items: [
      "All assessments are scored objectively and consistently",
      "Your data is encrypted and stored securely (AES-256)",
      "You control what companies can see via privacy settings",
      "Results are confidential unless you choose to share them",
      "InterQ follows GDPR-aligned data protection practices",
      "You can request data deletion at any time",
    ],
  },
];

const JobSeekerGuidelines = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold">Guidelines & Instructions</h2>
        <p className="text-sm text-muted-foreground mt-1">Please review before starting any assessment or interview</p>
      </div>

      {sections.map((section) => (
        <Card key={section.title} className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <section.icon className="w-5 h-5 text-primary" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default JobSeekerGuidelines;
