import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Camera, CameraOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaceDetectionProps {
  enabled: boolean;
  onViolation: (message: string) => void;
}

export function FaceDetection({ enabled, onViolation }: FaceDetectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(true);
  const checkIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
          setCameraError(null);
          
          // Start face detection checks
          checkIntervalRef.current = setInterval(() => {
            checkFacePresence();
          }, 5000); // Check every 5 seconds
        }
      } catch (error) {
        console.error('Camera access denied:', error);
        setCameraError('Camera access is required for this assessment');
        onViolation('Camera access denied');
      }
    };

    startCamera();

    return () => {
      // Cleanup camera and detection
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [enabled, onViolation]);

  const checkFacePresence = () => {
    // Basic face detection simulation
    // In production, integrate with actual face detection API
    const detected = videoRef.current && videoRef.current.readyState === 4;
    
    if (!detected) {
      setFaceDetected(false);
      onViolation('Face not detected - please ensure your face is visible');
    } else {
      setFaceDetected(true);
    }
  };

  if (!enabled) return null;

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="relative">
          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-40 h-30 rounded-lg bg-muted"
              />
              <div className="absolute top-2 right-2">
                {faceDetected ? (
                  <Camera className="w-5 h-5 text-green-500" />
                ) : (
                  <CameraOff className="w-5 h-5 text-destructive" />
                )}
              </div>
            </>
          ) : (
            <div className="w-40 h-30 rounded-lg bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4" />
            <span className="font-semibold">Proctoring Active</span>
          </div>
          
          {cameraError ? (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{cameraError}</AlertDescription>
            </Alert>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your camera is being monitored to ensure test integrity. 
              Please keep your face visible throughout the assessment.
            </p>
          )}

          {!faceDetected && cameraActive && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Face not detected! Please position yourself in front of the camera.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Card>
  );
}