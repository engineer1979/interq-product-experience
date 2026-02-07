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
const Assessments = lazy(() => import("./pages/Assessments"));
const TakeAssessment = lazy(() => import("./pages/TakeAssessment"));
const AIInterview = lazy(() => import("./pages/AIInterview"));
const InterviewBrowser = lazy(() => import("./pages/InterviewBrowser"));
const CreateInterview = lazy(() => import("./pages/CreateInterview"));
const TakeInterview = lazy(() => import("./pages/TakeInterview"));
const LiveInterview = lazy(() => import("./pages/LiveInterview"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Pricing = lazy(() => import("./pages/Pricing"));
const About = lazy(() => import("./pages/About"));
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
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessment/:id" element={<TakeAssessment />} />
              <Route path="/assessment-workflow" element={<AssessmentWorkflowPage />} />
              <Route path="/create-assessment" element={<CreateAssessment />} />
              <Route path="/ai-interview" element={<AIInterview />} />
              <Route path="/interviews" element={<InterviewBrowser />} />
              <Route path="/create-interview" element={<CreateInterview />} />
              <Route path="/interview/:id" element={<TakeInterview />} />
              <Route path="/live-interview" element={<LiveInterview />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/apply/:jobId" element={<ApplyPage />} />
              <Route path="/privacy-policy" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Privacy Policy</h1><p className="text-muted-foreground">Privacy policy content coming soon.</p></div></div>} />
              <Route path="/terms-of-service" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Terms of Service</h1><p className="text-muted-foreground">Terms of service content coming soon.</p></div></div>} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="results" element={<AdminResults />} />
                <Route path="results/:id" element={<AdminResultDetail />} />
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
