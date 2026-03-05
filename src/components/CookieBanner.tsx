import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const CookieBanner = () => {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if the user has already consented
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setShowConsent(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setShowConsent(false);
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 md:p-6 shadow-lg z-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with global data protection standards.
            </div>
            <div className="flex gap-4">
                <Button variant="outline" onClick={handleDecline}>Decline</Button>
                <Button onClick={handleAccept}>Accept All</Button>
            </div>
        </div>
    );
};
