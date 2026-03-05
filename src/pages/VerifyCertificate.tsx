import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calendar, User, FileCheck, ExternalLink, Globe, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VerifyCertificate = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [certData, setCertData] = useState<any>(null);

    useEffect(() => {
        // Simulate API verification
        const timer = setTimeout(() => {
            // For demo purposes, we accept any ID starting with CERT-2026
            if (id?.startsWith("CERT-2026")) {
                setIsValid(true);
                setCertData({
                    id: id,
                    candidateName: "John Doe",
                    assessmentName: "System Design Challenge",
                    date: "Feb 15, 2026",
                    score: 85,
                    issuer: "InterQ Official Certification",
                    verifyStatus: "Verified & Active"
                });
            }
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-8 left-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">IQ</div>
                    <span className="font-bold text-xl tracking-tighter">INTERQ</span>
                </Link>
            </div>

            <div className="max-w-2xl w-full">
                {loading ? (
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="font-medium text-slate-600">Verifying secure certificate data...</p>
                    </div>
                ) : isValid ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                                <ShieldCheck className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-black text-[#0F172A] mb-2">Authenticated Certificate</h1>
                            <p className="text-slate-500">This certificate is verified as authentic by InterQ Corporation.</p>
                        </div>

                        <Card className="border-0 shadow-2xl overflow-hidden rounded-3xl">
                            <div className="bg-[#0F172A] p-8 text-white flex justify-between items-center">
                                <div>
                                    <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 mb-3">
                                        {certData.verifyStatus}
                                    </Badge>
                                    <h2 className="text-2xl font-bold">{certData.assessmentName}</h2>
                                </div>
                                <Award className="w-12 h-12 text-[#D4AF37]" />
                            </div>

                            <CardContent className="p-8 space-y-8 bg-white">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                            <User className="w-3 h-3" /> Candidate
                                        </p>
                                        <p className="text-lg font-bold text-slate-800">{certData.candidateName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Issue Date
                                        </p>
                                        <p className="text-lg font-bold text-slate-800">{certData.date}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                            <FileCheck className="w-3 h-3" /> Certificate ID
                                        </p>
                                        <p className="text-lg font-mono font-bold text-primary">{certData.id}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                                            <Globe className="w-3 h-3" /> Verification Source
                                        </p>
                                        <p className="text-lg font-bold text-slate-800">InterQ.ai Network</p>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                                    <div className="text-center italic text-slate-500 text-sm max-w-sm">
                                        "InterQ professional assessments are conducted under strict expert supervision
                                        to ensure technical integrity and skill validation."
                                    </div>
                                    <Button asChild className="rounded-xl px-8 h-12 shadow-lg shadow-primary/20">
                                        <Link to="/">Explore InterQ Platform <ExternalLink className="w-4 h-4 ml-2" /></Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm">
                            <ShieldCheck className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900">Verification Failed</h1>
                        <p className="text-slate-500">We could not find a valid certificate associated with ID: <br /><span className="font-mono font-bold text-red-600">{id}</span></p>
                        <Button asChild variant="outline" className="rounded-xl">
                            <Link to="/">Return to Home</Link>
                        </Button>
                    </div>
                )}
            </div>

            <p className="mt-12 text-slate-400 text-sm font-medium">InterQ Verification Systems v1.0 • Secure Validation Engine</p>
        </div>
    );
};

export default VerifyCertificate;
