import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Building2,
  UserCircle,
  ArrowRight,
  Mail,
  Lock,
  Sparkles
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // Default role for signup
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { signIn, user, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
          data: { role: role }
        },
      });
      if (error) throw error;
      setMagicLinkSent(true);
      toast({
        title: "Magic Link Sent!",
        description: "Check your email for the login link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    setLoading(true);
    const demoCreds = {
      admin: { email: "admin@demo.com", pass: "demo123" },
      recruiter: { email: "recruiter@demo.com", pass: "demo123" },
      enterprise: { email: "enterprise@demo.com", pass: "demo123" },
      candidate: { email: "candidate@demo.com", pass: "demo123" },
    };

    const creds = demoCreds[role as keyof typeof demoCreds];

    toast({
      title: `Setting up ${role} demo...`,
      description: "Connecting to secure environment...",
    });

    try {
      // 1. Try to Login first
      const { error: signInError } = await signIn(creds.email, creds.pass);

      if (signInError) {
        // 2. If Login fails (likely user doesn't exist), try to SignUp
        console.log("Demo login failed, attempting to create user...", signInError);

        const { error: signUpError } = await supabase.auth.signUp({
          email: creds.email,
          password: creds.pass,
          options: {
            data: { full_name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}` }
          }
        });

        if (signUpError) throw signUpError;

        // 3. After create, try login again immediately
        const { error: retryError } = await signIn(creds.email, creds.pass);
        if (retryError) {
          // If still fails, it might be requiring email verification
          toast({
            title: "Demo Account Created",
            description: "Please check if email verification is required, or try again.",
            variant: "default",
          });
          return;
        }
      }

      toast({
        title: "Welcome!",
        description: `Logged in as ${role} demo user.`,
      });
      navigate("/");

    } catch (error: any) {
      console.error("Demo auth error:", error);

      // Fallback for Network/AdBlocker issues: Use Guest Mode
      if (error.message?.includes("fetch") || error.message?.includes("Network")) {
        console.log("Network error detected, switching to offline guest mode");
        toast({
          title: "Network Offline",
          description: "Switching to offline demo mode...",
        });

        if (loginAsGuest) {
          setTimeout(() => {
            loginAsGuest(role, creds.email);
          }, 1000);
          return;
        }
      }

      let msg = "Could not access demo account.";
      if (error.message?.includes("fetch")) msg = "Network error: Unable to connect to authentication server.";

      toast({
        title: "Demo Login Failed",
        description: msg,
        variant: "destructive",
      });
    } finally {
      if (!loading) setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    toast({
      title: "Guest Mode",
      description: "Entering assessment as guest...",
    });
    // Redirect to a specific guest route or assessments page
    navigate("/assessments");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

        {/* Left Side: Welcome & Value Prop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-8 pr-12"
        >
          <div>
            <img src="/interq-logo.png" alt="InterQ Logo" className="h-10 mb-6" />
            <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-4 text-balance">
              The Intelligent Way to <span className="text-primary">Hire & Get Hired.</span>
            </h1>
            <p className="text-xl text-slate-600">
              Experience the future of recruitment with AI-driven assessments, interviews, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "One-Click Demos", icon: Sparkles },
              { label: "Magic Link Login", icon: Mail },
              { label: "Guest Access", icon: UserCircle },
              { label: "Secure Platform", icon: Shield },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] shadow-premium border border-slate-100 p-8 md:p-10 relative overflow-hidden"
        >
          {/* Decorative Aurora Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Sign in to InterQ</h2>
            <p className="text-slate-500">Choose your preferred way to access the platform.</p>
          </div>

          <Tabs defaultValue="magic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="magic" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Magic Link</TabsTrigger>
              <TabsTrigger value="password" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="magic" className="space-y-4">
              {!magicLinkSent ? (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 border-slate-200"
                      required
                      type="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role (Optional)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Admin', 'Recruiter', 'Enterprise', 'Candidate'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r.toLowerCase())}
                          className={`text-xs py-2 rounded-lg border transition-all ${role === r.toLowerCase() ? 'bg-primary/10 border-primary text-primary font-medium' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base btn-premium bg-slate-900 hover:bg-slate-800">
                    {loading ? "Sending..." : "Send Magic Link"}
                  </Button>
                </form>
              ) : (
                <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
                  <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-900 mb-2">Check your email</h3>
                  <p className="text-green-700">We sent a magic login link to <span className="font-semibold">{email}</span></p>
                  <Button variant="link" onClick={() => setMagicLinkSent(false)} className="mt-4 text-green-800">Use a different email</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-slate-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl bg-slate-50 border-slate-200"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base btn-premium">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-medium tracking-wider">Or try a one-click demo</span></div>
          </div>

          {/* Demo Roles Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => handleDemoLogin('admin')} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all group text-left">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform"><Shield className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Admin</div>
                <div className="text-[10px] text-slate-500">System control</div>
              </div>
            </button>

            <button onClick={() => handleDemoLogin('recruiter')} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all group text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><Users className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Recruiter</div>
                <div className="text-[10px] text-slate-500">Assessments</div>
              </div>
            </button>

            <button onClick={() => handleDemoLogin('enterprise')} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all group text-left">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform"><Building2 className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Enterprise</div>
                <div className="text-[10px] text-slate-500">Org management</div>
              </div>
            </button>

            <button onClick={() => handleDemoLogin('candidate')} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all group text-left">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform"><UserCircle className="w-5 h-5" /></div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">Candidate</div>
                <div className="text-[10px] text-slate-500">Take test</div>
              </div>
            </button>
          </div>

          <div className="text-center">
            <button onClick={handleGuestAccess} className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center justify-center mx-auto gap-2 transition-colors">
              Just want to explore? <span className="text-primary flex items-center underline decoration-primary/30 underline-offset-4">Continue as Guest <ArrowRight className="w-3 h-3 ml-1" /></span>
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
