import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ArrowLeft,
    Download,
    Star,
    CheckCircle,
    AlertCircle,
    Calendar,
    Clock,
    User,
    Mail,
    Fingerprint,
    Code2,
    Terminal,
    ChevronRight,
    TrendingUp,
    Award,
    CircleCheck,
    CircleX,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Monitor,
    Cpu,
    Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import { cn } from "@/lib/utils";

const reportData = {
    candidate: {
        name: "Alex Sterling",
        email: "alex.sterling@example.com",
        invitationId: "INV-2026-X89J2",
        startTime: "Feb 23, 2026, 10:15 AM",
        reportTime: "Feb 23, 2026, 12:45 PM",
        status: "Shortlisted" as "Shortlisted" | "Rejected" | "On Hold",
    },
    assessmentSummary: {
        sectionName: "Programming",
        totalQuestions: 3,
        overallScore: 240,
        maxScore: 300,
        timeTaken: "84 mins",
    },
    questions: [
        {
            number: "Q1",
            title: "Binary Tree Path Sum",
            attempted: "Yes",
            score: "80/80",
            testCases: "15/15",
            status: "Passed",
            code: `function hasPathSum(root, targetSum) {
  if (!root) return false;
  
  if (!root.left && !root.right) {
    return targetSum === root.val;
  }
  
  return hasPathSum(root.left, targetSum - root.val) || 
         hasPathSum(root.right, targetSum - root.val);
}`,
            testCaseDetails: [
                { id: 1, status: "Passed", marks: 10, input: "[5,4,8,11,null,13,4,7,2,null,null,null,1], 22" },
                { id: 2, status: "Passed", marks: 10, input: "[1,2,3], 5" },
                { id: 3, status: "Passed", marks: 10, input: "[], 0" },
                { id: 4, status: "Passed", marks: 50, input: "Large Tree (Hidden)" },
            ]
        },
        {
            number: "Q2",
            title: "Optimized LRU Cache",
            attempted: "Yes",
            score: "100/100",
            testCases: "25/25",
            status: "Passed",
            code: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}`,
            testCaseDetails: [
                { id: 1, status: "Passed", marks: 20, input: "Basic Operations" },
                { id: 2, status: "Passed", marks: 30, input: "Capacity Eviction" },
                { id: 3, status: "Passed", marks: 50, input: "Concurrent Access Simulation" },
            ]
        },
        {
            number: "Q3",
            title: "System Design: Notification Service",
            attempted: "Yes",
            score: "60/120",
            testCases: "4/10",
            status: "Partial",
            code: `// High level implementation of a notification router
class NotificationService {
  async send(user, message) {
    const preferences = await this.getUserPrefs(user);
    if (preferences.email) await this.sendEmail(user.email, message);
    // TODO: Add Push notification support
  }
}`,
            testCaseDetails: [
                { id: 1, status: "Passed", marks: 20, input: "Email Routing" },
                { id: 2, status: "Failed", marks: 0, input: "Retry Logic Policy" },
                { id: 3, status: "Failed", marks: 0, input: "Rate Limiting" },
                { id: 4, status: "Passed", marks: 40, input: "Basic Scaling" },
            ]
        }
    ],
    liveEvaluation: {
        technicalKnowledge: { rating: 4, comments: "Deep understanding of React and Node.js. Demonstrated good knowledge of microservices." },
        problemSolving: { rating: 5, comments: "Very structured approach. Broke down the LRU cache problem efficiently before coding." },
        codingSkills: { rating: 4, comments: "Clean code with meaningful variable names. Follows SOLID principles." },
        communicationSkills: { rating: 5, comments: "Explained the 'why' behind architectural choices very clearly. Proactive in asking clarifying questions." },
        systemDesign: { rating: 3, comments: "Understands basics but needs work on database partitioning and consistency models." },
        behavioral: "Professional and collaborative. Showed high ownership during the debugging exercise.",
        strengths: ["Clean coding practices", "High analytical ability", "Strong React/TS foundation"],
        areasOfImprovement: ["Low-level system design details", "Distributed database knowledge"],
    },
    recommendation: {
        rating: 4.5,
        choice: "Strong Hire" as "Strong Hire" | "Hire" | "Hold" | "No Hire",
        justification: [
            "Alex Sterling is an exceptional candidate for the Senior Full Stack Role. Their performance in the programming assessment (80% score) demonstrates strong algorithmic thinking and practical implementation skills, especially in complex data structure challenges.",
            "During the live interview, Alex displayed superior communication skills, explaining complex technical decisions with ease. Their clean coding style and adherence to best practices differentiate them from other candidates at this level. While there is room for growth in high-level system design specifics, their core foundations are solid.",
            "Specifically, their solution to the LRU Cache challenge was optimal and well-explained. We recommend proceeding to the final culture fit round with a high degree of confidence in their technical competency."
        ]
    }
};

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "passed": return "text-green-500 bg-green-500/10 border-green-500/20";
        case "partial": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        case "failed": return "text-red-500 bg-red-500/10 border-red-500/20";
        case "shortlisted": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
        case "strong hire": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "hire": return "text-green-500 bg-green-500/10 border-green-500/20";
        case "hold": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
        case "no hire": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
        case "on hold": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        case "rejected": return "text-red-500 bg-red-500/10 border-red-500/20";
        default: return "text-slate-500 bg-slate-500/10 border-slate-500/20";
    }
};

const ProfessionalEvaluationReport = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
            <EnhancedNavigation />

            <div className="pt-28 pb-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Action Bar */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent -ml-2">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Candidate Evaluation Report</h1>
                                    <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-0.5 border", getStatusColor(reportData.candidate.status))}>
                                        {reportData.candidate.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="hidden sm:flex border-slate-200 dark:border-slate-800">
                                    <Download className="w-4 h-4 mr-2" /> Export to CSV
                                </Button>
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                                    <Download className="w-4 h-4 mr-2" /> Download Detailed PDF
                                </Button>
                            </div>
                        </div>

                        {/* 1. HEADER SECTION */}
                        <Card className="border-none shadow-premium bg-white dark:bg-slate-900 overflow-hidden">
                            <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-center">
                                            <Avatar className="w-14 h-14 border-2 border-slate-100 dark:border-slate-800 shadow-md">
                                                <AvatarFallback className="bg-slate-100 text-slate-900 font-bold text-lg dark:bg-slate-800 dark:text-white">
                                                    {reportData.candidate.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Candidate Name</p>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{reportData.candidate.name}</h3>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase mb-1">Candidate Email</p>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                                <span className="text-sm font-medium">{reportData.candidate.email}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium uppercase mb-1">Invitation ID</p>
                                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                                <Fingerprint className="w-4 h-4 text-slate-400" />
                                                <span className="text-sm font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{reportData.candidate.invitationId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 md:border-l md:pl-8 border-slate-100 dark:border-slate-800">
                                        <div className="flex gap-3">
                                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <Calendar className="w-5 h-5 text-indigo-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assessment Start Time</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{reportData.candidate.startTime}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <Clock className="w-5 h-5 text-indigo-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Report Generated At</p>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{reportData.candidate.reportTime}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 lg:border-l lg:pl-8 border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                                        <div className="text-center md:text-left">
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Final Status</p>
                                            <Badge className={cn("px-6 py-2 text-sm font-bold shadow-sm", getStatusColor(reportData.candidate.status))}>
                                                {reportData.candidate.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. SECTION SUMMARY */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-1 shadow-premium bg-white dark:bg-slate-900 border-none">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <Terminal className="w-5 h-5 text-primary" /> Section Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{reportData.assessmentSummary.overallScore}</h4>
                                            <p className="text-sm text-slate-500">Total Score out of {reportData.assessmentSummary.maxScore}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary">80%</p>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Overall Percentile</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>Completion Progress</span>
                                            <span>100%</span>
                                        </div>
                                        <Progress value={100} className="h-2 bg-slate-100 dark:bg-slate-800" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Section Name</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{reportData.assessmentSummary.sectionName}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Total Questions</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{reportData.assessmentSummary.totalQuestions}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Time Spent</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{reportData.assessmentSummary.timeTaken}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Response Time</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">28 mins</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 3. QUESTION-WISE BREAKDOWN */}
                            <Card className="lg:col-span-2 shadow-premium bg-white dark:bg-slate-900 border-none overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-primary" /> Question-wise Breakdown
                                        </CardTitle>
                                        <Badge variant="outline" className="font-normal border-slate-200 dark:border-slate-800">
                                            Technical Focus: Data Structures & Systems
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                                            <TableRow className="border-slate-100 dark:border-slate-800">
                                                <TableHead className="w-[80px] font-bold">No.</TableHead>
                                                <TableHead className="font-bold">Question Title</TableHead>
                                                <TableHead className="text-center font-bold">Attempted</TableHead>
                                                <TableHead className="text-center font-bold">Test Cases</TableHead>
                                                <TableHead className="text-right font-bold">Score</TableHead>
                                                <TableHead className="text-right font-bold">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reportData.questions.map((q) => (
                                                <TableRow key={q.number} className="border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                                    <TableCell className="font-medium text-slate-500">{q.number}</TableCell>
                                                    <TableCell className="font-bold text-slate-900 dark:text-white">{q.title}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Badge variant="secondary" className="font-medium bg-slate-100 dark:bg-slate-800">{q.attempted}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-center font-medium font-mono text-xs">{q.testCases}</TableCell>
                                                    <TableCell className="text-right font-bold text-primary">{q.score}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Badge className={cn("px-2.5 py-0.5 text-[10px] uppercase font-bold", getStatusColor(q.status))}>
                                                            {q.status === 'Passed' && <CircleCheck className="w-3 h-3 mr-1" />}
                                                            {q.status === 'Partial' && <Zap className="w-3 h-3 mr-1" />}
                                                            {q.status === 'Failed' && <CircleX className="w-3 h-3 mr-1" />}
                                                            {q.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* 4. CODE SNAPSHOT & 5. TEST CASE SUMMARY */}
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Detailed Technical Review</h2>
                        <div className="space-y-6">
                            {reportData.questions.map((q, idx) => (
                                <Card key={idx} className="border-none shadow-premium bg-white dark:bg-slate-900 overflow-hidden">
                                    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x dark:divide-slate-800">
                                        {/* Left: Code Snippet */}
                                        <div className="lg:w-2/3 p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10">
                                                        <Code2 className="w-4 h-4 text-indigo-500" />
                                                    </div>
                                                    <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-tight text-sm">
                                                        {q.number}. {q.title} - Submitted Code
                                                    </h3>
                                                </div>
                                                <Badge variant="outline" className="text-xs border-slate-200">Language: JavaScript</Badge>
                                            </div>
                                            <div className="relative group">
                                                <pre className="p-4 rounded-xl bg-[#1E1E1E] text-slate-300 font-mono text-sm overflow-x-auto border border-slate-800 max-h-[400px]">
                                                    <code>{q.code}</code>
                                                </pre>
                                                <Button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 hover:bg-slate-700 h-8 px-3 text-xs">
                                                    Copy Code
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Right: Test Cases */}
                                        <div className="lg:w-1/3 p-6 bg-slate-50/50 dark:bg-slate-800/10 space-y-4">
                                            <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-wider text-slate-500">
                                                <Cpu className="w-4 h-4" /> Test Case Summary
                                            </CardTitle>
                                            <div className="space-y-3">
                                                {q.testCaseDetails.map((tc) => (
                                                    <div key={tc.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-900 w-6 h-6 flex items-center justify-center rounded-full border dark:border-slate-700">#{tc.id}</span>
                                                            <div className="overflow-hidden max-w-[120px]">
                                                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{tc.input}</p>
                                                                <p className="text-[10px] text-slate-500 font-medium">Weight: {tc.marks} pts</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={cn("text-[10px] font-bold", tc.status === 'Passed' ? "text-green-500" : "text-red-500")}>
                                                                {tc.status === 'Passed' ? `+${tc.marks}` : '0'} pts
                                                            </span>
                                                            {tc.status === 'Passed' ?
                                                                <CircleCheck className="w-4 h-4 text-green-500" /> :
                                                                <CircleX className="w-4 h-4 text-red-500" />
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* 6. LIVE INTERVIEW EVALUATION SECTION */}
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Live Interview Evaluation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-none shadow-premium bg-white dark:bg-slate-900 divide-y dark:divide-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-primary" /> Technical Core Competencies
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="p-6 space-y-6">
                                        {[
                                            { label: "Technical Knowledge", data: reportData.liveEvaluation.technicalKnowledge },
                                            { label: "Problem Solving Ability", data: reportData.liveEvaluation.problemSolving },
                                            { label: "Coding Skills", data: reportData.liveEvaluation.codingSkills },
                                            { label: "Communication Skills", data: reportData.liveEvaluation.communicationSkills },
                                            { label: "System Design", data: reportData.liveEvaluation.systemDesign },
                                        ].map((skill, i) => (
                                            <div key={i} className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{skill.label}</span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(s => (
                                                            <Star key={s} className={cn("w-3.5 h-3.5", s <= skill.data.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-700")} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed italic">"{skill.data.comments}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card className="border-none shadow-premium bg-white dark:bg-slate-900 overflow-hidden">
                                    <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
                                        <CardTitle className="text-base font-bold flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-indigo-500" /> Behavioral Assessment
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                                            {reportData.liveEvaluation.behavioral}
                                        </p>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="border-none shadow-premium bg-green-50/50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/20">
                                        <CardHeader className="p-4 pb-0">
                                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400 flex items-center gap-1.5">
                                                <ThumbsUp className="w-3 h-3" /> Strengths
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-3">
                                            <ul className="space-y-2">
                                                {reportData.liveEvaluation.strengths.map((s, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                        <div className="mt-1 w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-none shadow-premium bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20">
                                        <CardHeader className="p-4 pb-0">
                                            <CardTitle className="text-xs font-bold uppercase tracking-widest text-orange-700 dark:text-orange-400 flex items-center gap-1.5">
                                                <ThumbsDown className="w-3 h-3" /> Area of Improv.
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-3">
                                            <ul className="space-y-2">
                                                {reportData.liveEvaluation.areasOfImprovement.map((s, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                        <div className="mt-1 w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>

                        {/* 7. FINAL RECOMMENDATION */}
                        <Card className="border-none shadow-premium bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white overflow-hidden">
                            <div className="p-8 relative">
                                <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -mr-12 -mt-12 blur-3xl pointer-events-none" />

                                <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                                    <div className="lg:w-1/3 text-center lg:text-left space-y-4">
                                        <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-400">Final Recommendation</h2>
                                        <div>
                                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Hiring Recommendation</p>
                                            <div className="inline-block p-1 rounded-full bg-white/10 backdrop-blur-md">
                                                <Badge className={cn("px-8 py-3 text-lg font-bold shadow-xl border-none", getStatusColor(reportData.recommendation.choice))}>
                                                    {reportData.recommendation.choice}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center lg:items-start gap-1">
                                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Overall Rating (out of 5)</p>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} className={cn("w-6 h-6", s <= reportData.recommendation.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20")} />
                                                ))}
                                            </div>
                                            <p className="text-sm font-bold text-white/60 uppercase tracking-tighter mt-1">{reportData.recommendation.rating}/5.0</p>
                                        </div>
                                    </div>

                                    <div className="lg:w-2/3 space-y-4 border-l border-white/10 lg:pl-12">
                                        <CardTitle className="text-xl font-bold text-indigo-300">Summary Justification</CardTitle>
                                        <div className="space-y-4 text-slate-300 leading-relaxed">
                                            {reportData.recommendation.justification.map((p, i) => (
                                                <p key={i} className="text-sm md:text-base">{p}</p>
                                            ))}
                                        </div>
                                        <div className="pt-6 flex justify-end">
                                            <div className="text-right">
                                                <p className="font-bold text-white">Lead Assessment Expert</p>
                                                <p className="text-xs text-slate-400 italic">Verified by InterQ AI Compliance Module & Senior Review Board</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Footer Actions */}
                        <div className="flex justify-center pt-8">
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md text-center leading-relaxed">
                                © 2026 InterQ Product Experience. This report contains confidential assessment data for internal recruitment purposes only. All technical assessments are verified for authenticity and plagiarism.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <EnhancedFooter />
        </div>
    );
};

export default ProfessionalEvaluationReport;
