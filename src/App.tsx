import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Product = lazy(() => import("./pages/Product"));
const Features = lazy(() => import("./pages/Features"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Assessments = lazy(() => import("./pages/Assessments"));
const TakeAssessment = lazy(() => import("./pages/TakeAssessment"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
const PressKit = lazy(() => import("./pages/PressKit"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Blog = lazy(() => import("./pages/Blog"));
const Documentation = lazy(() => import("./pages/Documentation"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const AdminJobs = lazy(() => import("./pages/admin/Jobs"));
const ApplyPage = lazy(() => import("./pages/candidate/Apply"));
const Careers = lazy(() => import("./pages/Careers"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminResults = lazy(() => import("./pages/admin/AdminResults"));
const AdminResultDetail = lazy(() => import("./pages/admin/AdminResultDetail"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const CreateAssessment = lazy(() => import("./pages/CreateAssessment"));
const AssessmentWorkflowPage = lazy(() => import("./pages/AssessmentWorkflowPage"));
const ATSScreening = lazy(() => import("./pages/admin/ATSScreening"));
const CollaborativeScoring = lazy(() => import("./pages/admin/CollaborativeScoring"));
const PipelineDashboard = lazy(() => import("./pages/admin/PipelineDashboard"));
const TestManagement = lazy(() => import("./pages/admin/TestManagement"));
const QuestionBank = lazy(() => import("./pages/admin/QuestionBank"));
const InterviewManagement = lazy(() => import("./pages/admin/InterviewManagement"));
const CompanyManagement = lazy(() => import("./pages/admin/CompanyManagement"));
const JobSeekerManagement = lazy(() => import("./pages/admin/JobSeekerManagement"));
const CertificateManagement = lazy(() => import("./pages/admin/CertificateManagement"));
const ActivityLogs = lazy(() => import("./pages/admin/ActivityLogs"));
const BookSession = lazy(() => import("./pages/BookSession"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const EvaluationReport = lazy(() => import("./pages/EvaluationReport"));
const Guidelines = lazy(() => import("./pages/Guidelines"));
const ExpertPortal = lazy(() => import("./pages/ExpertPortal"));
const CandidatePortal = lazy(() => import("./pages/CandidatePortal"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/product" element={<Product />} />
              <Route path="/features" element={<Features />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessment/:id" element={<TakeAssessment />} />
              <Route path="/assessment-workflow" element={<AssessmentWorkflowPage />} />
              <Route path="/create-assessment" element={<CreateAssessment />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/recruiters" element={<Solutions />} />
              <Route path="/for-recruiters" element={<Solutions />} />
              <Route path="/solutions/enterprise" element={<Solutions />} />
              <Route path="/for-organizational-hiring" element={<Solutions />} />
              <Route path="/solutions/sme" element={<Solutions />} />
              <Route path="/for-smes" element={<Solutions />} />
              <Route path="/solutions/industry" element={<Solutions />} />
              <Route path="/industry-solutions" element={<Solutions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/press-kit" element={<PressKit />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/book-session" element={<BookSession />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/evaluation-report" element={<EvaluationReport />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/expert-portal" element={<ExpertPortal />} />
              <Route path="/candidate-portal" element={<CandidatePortal />} />
              <Route path="/apply/:jobId" element={<ApplyPage />} />
              <Route path="/privacy-policy" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Privacy Policy</h1><p className="text-muted-foreground">Privacy policy content coming soon.</p></div></div>} />
              <Route path="/terms-of-service" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Terms of Service</h1><p className="text-muted-foreground">Terms of service content coming soon.</p></div></div>} />
              <Route path="/cookie-policy" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Cookie Policy</h1><p className="text-muted-foreground">Cookie policy content coming soon.</p></div></div>} />
              <Route path="/gdpr" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">GDPR Compliance</h1><p className="text-muted-foreground">GDPR compliance information coming soon.</p></div></div>} />
              <Route path="/api-docs" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">API Documentation</h1><p className="text-muted-foreground">API documentation coming soon.</p></div></div>} />
              <Route path="/partner-application" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Partner Application</h1><p className="text-muted-foreground">Partner application form coming soon.</p></div></div>} />
              <Route path="/newsletter" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Newsletter Signup</h1><p className="text-muted-foreground">Newsletter signup coming soon.</p></div></div>} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="tests" element={<TestManagement />} />
                <Route path="question-bank" element={<QuestionBank />} />
                <Route path="results" element={<AdminResults />} />
                <Route path="results/:id" element={<AdminResultDetail />} />
                <Route path="interviews" element={<InterviewManagement />} />
                <Route path="certificates" element={<CertificateManagement />} />
                <Route path="companies" element={<CompanyManagement />} />
                <Route path="job-seekers" element={<JobSeekerManagement />} />
                <Route path="logs" element={<ActivityLogs />} />
                <Route path="pipeline" element={<PipelineDashboard />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="ats-screening" element={<ATSScreening />} />
                <Route path="scoring" element={<CollaborativeScoring />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
