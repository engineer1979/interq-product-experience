import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, User, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/jobseeker");
    }
  }, [user, navigate]);

  const clearMessages = () => {
    setError("");
    setResetSent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (mode === "login") {
        const result = await signIn(email, password);
        if (result.error) setError(result.error.message);
      } else if (mode === "signup") {
        const result = await signUp(email, password, fullName);
        if (result.error) setError(result.error.message);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/interq-logo.png" alt="InterQ" className="h-12 object-contain" />
          </div>

          <AnimatePresence mode="wait">
            {/* Forgot Password View */}
            {mode === "forgot" ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  onClick={() => { setMode("login"); clearMessages(); }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to sign in
                </button>

                <h1 className="text-2xl font-bold text-center mb-1">Reset Password</h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  Enter your email and we'll send you a reset link.
                </p>

                {resetSent ? (
                  <div className="flex flex-col items-center py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-emerald-600" />
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">Reset link sent!</p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      Check your email at <span className="font-medium text-foreground">{email}</span> for a password reset link.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-xl"
                      onClick={() => { setMode("login"); clearMessages(); }}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <Label htmlFor="reset-email">Email address</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="reset-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/10 rounded-xl px-4 py-3">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <Button type="submit" className="w-full rounded-xl h-11" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                )}
              </motion.div>
            ) : (
              /* Login / Signup View */
              <motion.div
                key="auth"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-2xl font-bold text-center mb-1">Welcome to InterQ</h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {mode === "login" ? "Sign in to your account" : "Create your account"}
                </p>

                {/* Pill Tab Switcher */}
                <div className="flex bg-muted rounded-full p-1 mb-6">
                  <button
                    onClick={() => { setMode("login"); clearMessages(); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      mode === "login"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setMode("signup"); clearMessages(); }}
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                      mode === "signup"
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="pl-10 rounded-xl"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="auth-email">Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div>
                      <Label htmlFor="signup-role">I am a</Label>
                      <select
                        id="signup-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Select your role</option>
                        <option value="admin">Admin</option>
                        <option value="company">Company</option>
                        <option value="job_seeker">Job Seeker</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auth-password">Password</Label>
                      {mode === "login" && (
                        <button
                          type="button"
                          onClick={() => { setMode("forgot"); clearMessages(); }}
                          className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="auth-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="pl-10 rounded-xl"
                      />
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        required
                        className="mt-1 rounded border-input"
                      />
                      <Label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed">
                        I agree to the{" "}
                        <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                        <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>
                      </Label>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/10 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full rounded-xl h-11" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {loading
                      ? mode === "login" ? "Signing in..." : "Creating account..."
                      : mode === "login" ? "Sign In" : "Create Account"
                    }
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()} InterQ. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
