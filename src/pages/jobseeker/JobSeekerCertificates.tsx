import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, ExternalLink, Copy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const gradeColor = (grade: string) => {
  switch (grade) {
    case "Excellence": return "bg-amber-500/10 text-amber-700 border-amber-300";
    case "Distinction": return "bg-primary/10 text-primary border-primary/30";
    default: return "bg-green-500/10 text-green-700 border-green-300";
  }
};

const JobSeekerCertificates = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["js-certs", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await (supabase as any).from("job_seeker_certificates").select("*").eq("user_id", user.id).order("issued_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", description: "Certificate ID copied to clipboard." });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><Award className="w-6 h-6 text-amber-500" /> Your Certificates</h2>
        <p className="text-sm text-muted-foreground">{certificates.length} certificates earned</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
      ) : certificates.length === 0 ? (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <Award className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No certificates yet</h3>
            <p className="text-sm text-muted-foreground">Complete assessments and interviews to earn InterQ certificates.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {certificates.map((cert: any) => (
            <Card key={cert.id} className="shadow-soft hover:shadow-elegant transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{cert.certificate_name}</h3>
                      <p className="text-xs text-muted-foreground">{new Date(cert.issued_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[10px] border", gradeColor(cert.grade || "Completed"))}>
                    {cert.grade || "Completed"}
                  </Badge>
                </div>

                {cert.score && (
                  <div className="mb-4 p-3 rounded-lg bg-muted/30 text-center">
                    <p className="text-2xl font-bold text-primary">{cert.score}%</p>
                    <p className="text-xs text-muted-foreground">Final Score</p>
                  </div>
                )}

                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 mb-4">
                  <span className="text-xs text-muted-foreground flex-1 font-mono truncate">ID: {cert.unique_code}</span>
                  <button onClick={() => copyCode(cert.unique_code)} className="p-1 hover:bg-muted rounded">
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default JobSeekerCertificates;
