import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft, Download, Star, CheckCircle, AlertCircle,
  Calendar, Clock, User, MessageSquare, TrendingUp, Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { cn } from "@/lib/utils";

const reportData = {
  candidateName: "Alex Johnson",
  expertName: "Dr. Sarah Mitchell",
  sessionDate: "February 10, 2026",
  sessionTime: "10:00 AM - 10:45 AM",
  sessionType: "Technical Interview — Data Science",
  overallScore: 87,
  recommendation: "Hire" as "Hire" | "Consider" | "Not Recommended",
  strengths: [
    "Strong understanding of machine learning fundamentals",
    "Excellent communication of complex technical concepts",
    "Demonstrated practical experience with production ML systems",
    "Good problem-solving approach with structured thinking",
  ],
  improvements: [
    "Could improve knowledge of distributed systems architecture",
    "Needs more exposure to real-time data processing pipelines",
    "Should practice system design questions for large-scale applications",
  ],
  expertComments:
    "Alex showed strong technical depth in ML/AI topics and communicated solutions clearly. Their experience with production systems is evident. I recommend moving forward with a focus on evaluating system design capabilities in the next round.",
  categories: [
    { name: "Technical Skills", score: 90, rating: 5 },
    { name: "Problem Solving", score: 85, rating: 4 },
    { name: "Communication", score: 92, rating: 5 },
    { name: "System Design", score: 78, rating: 4 },
    { name: "Culture Fit", score: 80, rating: 4 },
  ],
};

const getRecommendationStyle = (rec: string) => {
  switch (rec) {
    case "Hire":
      return "bg-green-500/10 text-green-700 border-green-500/20";
    case "Consider":
      return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
    default:
      return "bg-red-500/10 text-red-700 border-red-500/20";
  }
};

const EvaluationReport = () => {
  const navigate = useNavigate();

  const handleDownloadPDF = () => {
    const content = JSON.stringify(reportData, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `evaluation-report-${reportData.candidateName.replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-3">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <h1 className="text-3xl font-bold">Evaluation Report</h1>
                <p className="text-muted-foreground mt-1">Detailed assessment summary</p>
              </div>
              <Button onClick={handleDownloadPDF} className="shadow-soft">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>

            {/* Overview Card */}
            <Card className="shadow-elegant border-2 border-primary/10 mb-6">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Candidate</p>
                        <p className="font-bold">{reportData.candidateName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Expert</p>
                        <p className="font-bold">{reportData.expertName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-bold">{reportData.sessionDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-bold">{reportData.sessionTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score & Recommendation */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-soft">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                  <div className="relative w-32 h-32 mx-auto mb-3">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      <circle
                        cx="60" cy="60" r="52" fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        strokeDasharray={`${(reportData.overallScore / 100) * 327} 327`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{reportData.overallScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn("w-5 h-5", s <= Math.round(reportData.overallScore / 20) ? "fill-yellow-400 text-yellow-400" : "text-muted")}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">Recommendation</p>
                  <Badge className={cn("text-lg px-4 py-2 font-bold border", getRecommendationStyle(reportData.recommendation))}>
                    {reportData.recommendation === "Hire" && <CheckCircle className="w-5 h-5 mr-2" />}
                    {reportData.recommendation === "Consider" && <AlertCircle className="w-5 h-5 mr-2" />}
                    {reportData.recommendation}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-4">{reportData.sessionType}</p>
                </CardContent>
              </Card>
            </div>

            {/* Category Scores */}
            <Card className="shadow-soft mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Detailed Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportData.categories.map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={cn("w-3.5 h-3.5", s <= (cat as any).rating ? "fill-yellow-400 text-yellow-400" : "text-muted")} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-primary">{cat.score}%</span>
                      </div>
                    </div>
                    <Progress value={cat.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Strengths & Improvements */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-soft border-green-500/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reportData.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-yellow-500/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-yellow-700">
                    <AlertCircle className="w-5 h-5" /> Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reportData.improvements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Expert Comments */}
            <Card className="shadow-soft mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" /> Expert Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border border-primary/20 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">SM</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/30 p-4 rounded-xl flex-1">
                    <p className="text-sm font-medium mb-1">{reportData.expertName}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reportData.expertComments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator className="my-6" />
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      <EnhancedFooter />
    </div>
  );
};

export default EvaluationReport;
