import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Building2, ArrowRight, Shield } from "lucide-react";
import interqLogo from "@/assets/interq-logo.png";

const industries = [
  "Technology", "Finance & Banking", "Healthcare", "Education",
  "Manufacturing", "Retail & E-Commerce", "Consulting", "Legal",
  "Real Estate", "Telecommunications", "Pharmaceuticals", "Other",
];

const companySizes = [
  "1-10", "11-50", "51-200", "201-500", "501-1000", "1000+",
];

export default function CompanySignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "", companyEmail: "", adminName: "", password: "", confirmPassword: "",
    industry: "", companySize: "", termsAccepted: false,
  });

  const updateForm = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.termsAccepted) {
      toast({ title: "Please accept terms & privacy policy", variant: "destructive" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.companyEmail,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/company`,
          data: { full_name: form.adminName },
        },
      });
      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("User creation failed");

      // 2. Create company
      const { data: company, error: companyError } = await (supabase as any)
        .from("companies")
        .insert({
          name: form.companyName,
          email: form.companyEmail,
          industry: form.industry,
          company_size: form.companySize,
          created_by: userId,
        })
        .select("id")
        .single();
      if (companyError) throw companyError;

      // 3. Add as company admin member
      await (supabase as any).from("company_members").insert({
        company_id: company.id,
        user_id: userId,
        role: "admin",
      });

      // 4. Set user role to company
      await (supabase as any).from("user_roles").insert({
        user_id: userId,
        role: "company",
      });

      // 5. Log audit
      await (supabase as any).from("audit_logs").insert({
        company_id: company.id,
        user_id: userId,
        action: "company_created",
        entity_type: "company",
        entity_id: company.id,
        details: { company_name: form.companyName },
      });

      toast({ title: "Company registered!", description: "Please check your email to verify your account." });
      navigate("/company");
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src={interqLogo} alt="InterQ" className="h-10 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Create Your Company Workspace</h1>
          <p className="text-muted-foreground mt-2">Set up your hiring command center in minutes</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <div className="flex items-center gap-4 mb-2">
              {[1, 2].map(s => (
                <div key={s} className={`flex items-center gap-2 ${s <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{s}</div>
                  <span className="text-sm font-medium hidden sm:inline">{s === 1 ? 'Account' : 'Company'}</span>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Admin Full Name</Label>
                  <Input placeholder="John Doe" value={form.adminName} onChange={e => updateForm("adminName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Work Email</Label>
                  <Input type="email" placeholder="john@company.com" value={form.companyEmail} onChange={e => updateForm("companyEmail", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e => updateForm("password", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={e => updateForm("confirmPassword", e.target.value)} />
                </div>
                <Button className="w-full" onClick={() => {
                  if (!form.adminName || !form.companyEmail || !form.password) {
                    toast({ title: "Please fill all fields", variant: "destructive" });
                    return;
                  }
                  setStep(2);
                }}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input placeholder="Acme Corp" value={form.companyName} onChange={e => updateForm("companyName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select value={form.industry} onValueChange={v => updateForm("industry", v)}>
                    <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>{industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select value={form.companySize} onValueChange={v => updateForm("companySize", v)}>
                    <SelectTrigger><SelectValue placeholder="Number of employees" /></SelectTrigger>
                    <SelectContent>{companySizes.map(s => <SelectItem key={s} value={s}>{s} employees</SelectItem>)}</SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Checkbox id="terms" checked={form.termsAccepted} onCheckedChange={v => updateForm("termsAccepted", v)} />
                  <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the <a href="/terms-of-service" className="text-primary underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button className="flex-1" onClick={handleSubmit} disabled={loading || !form.companyName || !form.industry}>
                    {loading ? "Creating..." : "Create Workspace"}
                    <Building2 className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" /> Your data is encrypted and secure
                </div>
              </>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <a href="/auth" className="text-primary font-medium hover:underline">Sign in</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
