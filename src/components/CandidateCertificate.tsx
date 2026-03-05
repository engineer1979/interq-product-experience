import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, ShieldCheck, QrCode, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateProps {
    candidateName: string;
    assessmentName: string;
    skills: string;
    score: number | string;
    date: string;
    certificateId: string;
    onClose?: () => void;
}

const CandidateCertificate: React.FC<CertificateProps> = ({
    candidateName,
    assessmentName,
    skills,
    score,
    date,
    certificateId,
    onClose
}) => {
    const handleDownload = () => {
        window.print();
    };

    const handleLinkedInShare = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/verify/" + certificateId)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Certificate Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[800px] aspect-[1.414/1] bg-white shadow-2xl rounded-sm border-[12px] border-[#0F172A] relative overflow-hidden print:shadow-none print:border-black"
                id="certificate-content"
            >
                {/* Decorative Borders */}
                <div className="absolute inset-0 border-[2px] border-[#D4AF37] m-2 pointer-events-none" />

                {/* Corners */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#D4AF37] m-4" />
                <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-[#D4AF37] m-4" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-[#D4AF37] m-4" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[#D4AF37] m-4" />

                {/* Content Section */}
                <div className="h-full flex flex-col items-center justify-between p-12 text-center text-[#0F172A]">
                    {/* Header */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-black text-xl">IQ</div>
                            <span className="text-3xl font-black tracking-tighter text-[#0F172A]">INTERQ</span>
                        </div>
                        <h1 className="text-4xl font-serif italic text-[#D4AF37] font-bold tracking-tight">
                            InterQ Assessment Certificate
                        </h1>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                            This is to certify that
                        </p>
                        <h2 className="text-5xl font-serif font-black text-[#0F172A] min-h-[1.2em]">
                            {candidateName}
                        </h2>
                        <p className="max-w-xl mx-auto text-slate-600 leading-relaxed font-medium">
                            has successfully completed the InterQ professional assessment in <br />
                            <span className="text-[#0F172A] font-bold text-lg">"{assessmentName}"</span>
                        </p>
                        <p className="text-sm text-slate-500 max-w-md mx-auto italic">
                            This certificate validates the candidate's skills in {skills} and performance
                            evaluated through the InterQ expert-led assessment platform.
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="w-full grid grid-cols-3 items-end pt-8">
                        {/* Left: Verification */}
                        <div className="flex flex-col items-start gap-2">
                            <div className="p-1 bg-white border border-slate-200">
                                <QrCode className="w-16 h-16 text-[#0F172A]" />
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono text-left">
                                CERT ID: {certificateId}<br />
                                DATE: {date}<br />
                                SCORE: {score}%
                            </div>
                        </div>

                        {/* Center: Seal */}
                        <div className="flex justify-center">
                            <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] flex flex-col items-center justify-center relative bg-[#D4AF37]/5">
                                <div className="absolute inset-2 border border-[#D4AF37] rounded-full" />
                                <Award className="w-12 h-12 text-[#D4AF37]" />
                                <span className="text-[8px] font-black text-[#D4AF37] mt-1 tracking-widest uppercase">Verified Expert</span>
                            </div>
                        </div>

                        {/* Right: Signature */}
                        <div className="flex flex-col items-end">
                            <div className="w-40 border-b-2 border-[#0F172A] py-2">
                                <span className="font-serif italic text-2xl text-[#0F172A]">Dr. Alex Sterling</span>
                            </div>
                            <p className="text-[10px] font-bold uppercase mt-1 text-slate-500 tracking-wider">
                                Authorized Signature • InterQ CEO
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-45deg] pointer-events-none select-none">
                    <span className="text-9xl font-black text-[#0F172A] whitespace-nowrap">OFFICIAL INTERQ VERIFIED</span>
                </div>
            </motion.div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 no-print mt-4">
                <Button onClick={handleDownload} className="bg-[#0F172A] hover:bg-black text-white px-6 h-12 rounded-xl shadow-lg flex gap-2">
                    <Download className="w-5 h-5" /> Download PDF
                </Button>
                <Button onClick={handleLinkedInShare} className="bg-[#0077B5] hover:bg-[#006097] text-white px-6 h-12 rounded-xl shadow-lg flex gap-2 border-0">
                    <Share2 className="w-5 h-5" /> Share on LinkedIn
                </Button>
                {onClose && (
                    <Button variant="ghost" onClick={onClose} className="px-6 h-12 rounded-xl">
                        Close Preview
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CandidateCertificate;
