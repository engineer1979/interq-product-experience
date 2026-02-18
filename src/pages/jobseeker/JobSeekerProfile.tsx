import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, MapPin, Linkedin, Plus, X, Save, Briefcase, GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const JobSeekerProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["js-profile-edit", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await (supabase as any).from("profiles").select("*").eq("id", user.id).single();
      return data;
    },
    enabled: !!user?.id,
  });

  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    location: "",
    country: "",
    linkedin_url: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        phone_number: profile.phone_number || "",
        location: profile.location || "",
        country: profile.country || "",
        linkedin_url: profile.linkedin_url || "",
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await (supabase as any).from("profiles").update(data).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["js-profile-edit"] });
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleSave = () => {
    updateProfile.mutate({
      full_name: form.full_name,
      phone_number: form.phone_number,
      location: form.location,
      country: form.country,
      linkedin_url: form.linkedin_url,
      skills: form.skills,
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm({ ...form, skills: [...form.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold">Your Profile</h2>

      {/* Avatar & Name */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {form.full_name?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-lg">{form.full_name || "Your Name"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="name"><User className="w-3 h-3 inline mr-1" />Full Name</Label>
              <Input id="name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="mt-1" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone"><Mail className="w-3 h-3 inline mr-1" />Phone</Label>
                <Input id="phone" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="location"><MapPin className="w-3 h-3 inline mr-1" />Location</Label>
                <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="linkedin"><Linkedin className="w-3 h-3 inline mr-1" />LinkedIn</Label>
                <Input id="linkedin" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="shadow-soft">
        <CardHeader><CardTitle className="text-lg">Skills</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {form.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1 gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)}><X className="w-3 h-3" /></button>
              </Badge>
            ))}
            {form.skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button variant="outline" size="icon" onClick={addSkill}><Plus className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={updateProfile.isPending} className="w-full sm:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {updateProfile.isPending ? "Saving..." : "Save Profile"}
      </Button>
    </motion.div>
  );
};

export default JobSeekerProfile;
