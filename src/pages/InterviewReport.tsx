import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Star,
  Target,
  Clock,
  BarChart,
  User,
  FileText,
} from "lucide-react";

// --- MOCK DATA ---
// This data simulates a completed interview analysis.
const reportData = {
  candidate: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  interview: {
    id: "a1b2c3d4",
    role: "Senior Frontend Engineer",
    date: "October 26, 2023",
  },
  summary: {
    overall_score: 82.5,
    role_fit: "Strong",
    ai_recommendation: "Proceed to Technical Round",
    strengths: [
      "Deep practical knowledge of React Hooks and performance optimization.",
      "Clear, structured communication when explaining complex topics.",
      "Provided specific, relevant examples from past projects.",
    ],
    weaknesses: [
      "Slightly rapid speaking pace could be moderated.",
      "Limited discussion on alternative state management libraries.",
      "Could provide more detail on teamwork and collaboration.",
    ],
  },
  competencies: [
    { skill: "React & Hooks", score: 92 },
    { skill: "Performance Optimization", score: 88 },
    { skill: "System Design", score: 75 },
    { skill: "Communication", score: 85 },
    { skill: "Problem Solving", score: 78 },
  ],
  question_breakdown: [
    {
      id: 1,
      question: "Describe your experience with React Hooks.",
      score: 88,
      transcript_preview: "Um, so, I've used React Hooks extensively in my last role. I worked on a project where we migrated a large class-based component tree to functional components with hooks...",
      ai_feedback: {
        what_went_well: "Excellent, detailed explanation with a concrete example.",
        what_to_improve: "Missed an opportunity to discuss the trade-offs between `useMemo` and `useCallback`.",
        suggested_answer: "A top-tier answer would also touch on custom hooks for reusable logic and how they improve code maintainability."
      }
    },
    {
      id: 2,
      question: "How would you optimize a slow-loading web page?",
      score: 76,
      transcript_preview: "Well, I'd first look at the Network tab in DevTools to see what's taking so long. Probably large images, or maybe the JavaScript bundle is too big. I'd compress images and maybe use code-splitting.",
      ai_feedback: {
        what_went_well: "Correctly identified common performance bottlenecks.",
        what_to_improve: "The answer was a bit generic. It could be strengthened by mentioning more advanced techniques.",
        suggested_answer: "A more thorough answer would cover the Critical Rendering Path, lazy loading non-essential assets, leveraging browser caching, and using a CDN."
      }
    },
  ],
};

// --- SUB-COMPONENTS ---

const ReportHeader = ({ summary, interview, candidate }) => (
  <Card className="mb-6 bg-gradient-to-r from-primary/5 to-transparent">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle className="text-3xl font-bold">{interview.role}</CardTitle>
        <p className="text-muted-foreground">
          Interview Report for {candidate.name}
        </p>
      </div>
      <div className="text-right">
        <div className="text-5xl font-extrabold text-primary">
          {summary.overall_score}%
        </div>
        <p className="text-muted-foreground">Overall Score</p>
      </div>
    </CardHeader>
  </Card>
);

const SummarySection = ({ summary }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="text-green-500" /> Strengths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {summary.strengths.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="text-amber-500" /> Areas for Improvement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {summary.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </CardContent>
    </Card>
    <Card className="flex flex-col justify-center items-center bg-muted/50">
      <CardHeader className="text-center">
         <p className="text-sm font-medium text-muted-foreground">Role Fit</p>
        <p className="text-2xl font-bold">{summary.role_fit}</p>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm font-medium text-muted-foreground">AI Recommendation</p>
        <p className="text-lg font-semibold text-primary">{summary.ai_recommendation}</p>
      </CardContent>
    </Card>
  </div>
);

const CompetencyChart = ({ competencies }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart /> Competency Analysis
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {competencies.map((skill) => (
          <div key={skill.skill}>
            <div className="flex justify-between mb-1">
              <p className="font-medium">{skill.skill}</p>
              <p className="text-sm font-bold text-primary">{skill.score}%</p>
            </div>
            <Progress value={skill.score} />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const QuestionBreakdown = ({ questions }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText /> Detailed Question Analysis
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="border-b pb-4 last:border-b-0">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg">{q.question}</h4>
            <Badge variant={q.score > 80 ? "default" : "secondary"}>Score: {q.score}</Badge>
          </div>
          <p className="text-sm text-muted-foreground italic mb-4">"{q.transcript_preview}"</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-bold text-green-800 mb-1">What Went Well</h5>
              <p className="text-green-700">{q.ai_feedback.what_went_well}</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <h5 className="font-bold text-amber-800 mb-1">What to Improve</h5>
              <p className="text-amber-700">{q.ai_feedback.what_to_improve}</p>
            </div>
            <div className="bg-sky-50 p-3 rounded-lg">
              <h5 className="font-bold text-sky-800 mb-1">Suggested Answer</h5>
              <p className="text-sky-700">{q.ai_feedback.suggested_answer}</p>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);


// --- MAIN PAGE COMPONENT ---

export default function InterviewReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Interview Report</h1>
            <Button onClick={() => navigate('/interviews')}>
                Back to Dashboard
            </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportHeader 
            summary={reportData.summary} 
            interview={reportData.interview} 
            candidate={reportData.candidate} 
        />
        <SummarySection summary={reportData.summary} />
        <CompetencyChart competencies={reportData.competencies} />
        <QuestionBreakdown questions={reportData.question_breakdown} />
      </main>
    </div>
  );
}

// Note: To use this page, you would need to add it to your router configuration, for example:
// <Route path="/report/:sessionId" element={<InterviewReport />} />
