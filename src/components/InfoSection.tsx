import React from "react";
import { LucideIcon } from "lucide-react";

interface InfoSectionProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, description, icon: Icon, className }) => {
    return (
        <div className={`p-6 bg-card rounded-lg shadow-sm border ${className}`}>
            {Icon && (
                <div className="mb-4 text-primary">
                    <Icon className="w-8 h-8" />
                </div>
            )}
            <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
            <p className="text-slate-700 font-medium leading-relaxed">{description}</p>
        </div>
    );
};

export default InfoSection;
