import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, ExternalLink, Copy, Eye, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import CandidateCertificate from "@/components/CandidateCertificate";

const demoCertificates = [
  {
    id: "CERT-2026-8842",
    unique_code: "CERT-2026-8842",
    certificate_name: "System Design Challenge",
    skills: "React, System Design, Scalability",
    score: 85,
    issued_at: "2026-02-15T10:00:00Z",
    grade: "Distinction"
  },
];

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
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const { data: dbCertificates = [], isLoading } = useQuery({
    queryKey: ["js-certs", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data } = await (supabase as any).from("job_seeker_certificates").select("*").eq("user_id", user.id).order("issued_at", { ascending: false });
      return data || [];
    },
    enabled: !!user?.id,
  });

  const certificates = dbCertificates.length > 0 ? dbCertificates : demoCertificates;
  const userName = user?.email?.split("@")[0] || "Job Seeker";

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
        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert: any) => (
            <Card key={cert.id} className="shadow-soft border-border hover:border-primary/50 transition-all group overflow-hidden">
              <div className="aspect-[1.414/1] bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-border">
                {/* Shrunken Preview */}
                <div className="scale-[0.35] origin-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <CandidateCertificate
                    candidateName={userName}
                    assessmentName={cert.certificate_name}
                    skills={cert.skills || "Technical Proficiency"}
                    score={cert.score}
                    date={new Date(cert.issued_at).toLocaleDateString()}
                    certificateId={cert.unique_code}
                  />
                </div>
                <div className="absolute inset-0 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setSelectedCert(cert)} className="shadow-xl">
                      <Eye className="w-4 h-4 mr-2" /> View Certificate
                    </Button>
                    <Button variant="secondary" onClick={() => copyCode(cert.unique_code)} className="shadow-xl bg-white/90 backdrop-blur-sm">
                      <Copy className="w-4 h-4 mr-2" /> Copy ID
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-[#0F172A]">{cert.certificate_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">ID: {cert.unique_code} • Issued {new Date(cert.issued_at).toLocaleDateString()}</p>
                  </div>
                  <Badge className={cn("text-[10px] border", gradeColor(cert.grade || "Completed"))}>
                    {cert.grade || "Completed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Certificate Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="max-w-[850px] w-full mt-auto mb-auto bg-white rounded-2xl shadow-2xl relative">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-primary transition-colors flex items-center gap-2 font-bold"
              >
                <X className="w-6 h-6" /> Close
              </button>
              <div className="p-8">
                <CandidateCertificate
                  candidateName={userName}
                  assessmentName={selectedCert.certificate_name}
                  skills={selectedCert.skills || "Technical Proficiency"}
                  score={selectedCert.score}
                  date={new Date(selectedCert.issued_at).toLocaleDateString()}
                  certificateId={selectedCert.unique_code}
                  onClose={() => setSelectedCert(null)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobSeekerCertificates;
