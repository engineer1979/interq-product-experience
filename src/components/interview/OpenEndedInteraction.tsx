import { Button } from "@/components/ui/button";
import { AudioVisualizer } from "@/components/voice/AudioVisualizer";
import { Mic, Square, Loader2 } from "lucide-react";

interface OpenEndedInteractionProps {
  status: 'question' | 'listening' | 'processing';
  startRecording: () => void;
  stopRecording: () => void;
  stream: MediaStream | null;
}

export function OpenEndedInteraction({ status, startRecording, stopRecording, stream }: OpenEndedInteractionProps) {
  if (status === 'listening') {
    return (
      <div className="space-y-8 flex flex-col items-center">
        <AudioVisualizer stream={stream} isRecording={true} isActive={true} />
        <Button onClick={stopRecording} size="lg" variant="destructive" className="rounded-full w-16 h-16">
          <Square />
        </Button>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="h-[148px] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="font-bold text-xs uppercase tracking-widest text-primary animate-pulse">Processing Answer</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 h-[1ahd] justify-center">
      <p className="text-muted-foreground text-center">Click the mic to begin your answer.</p>
      <Button onClick={startRecording} size="lg" className="rounded-full w-24 h-24 shadow-glow">
        <Mic className="h-10 w-10" />
      </Button>
    </div>
  );
}
