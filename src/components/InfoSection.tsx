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
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
};

export default InfoSection;
