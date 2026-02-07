import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

interface AudioVisualizerProps {
  isRecording: boolean;
  isActive: boolean;
  className?: string;
}

export function AudioVisualizer({ isRecording, isActive, className = "" }: AudioVisualizerProps) {
  const bars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className={`w-1 bg-primary rounded-full ${
            isRecording ? 'opacity-100' : 'opacity-30'
          }`}
          animate={{
            height: isRecording && isActive 
              ? [8, 32, 16, 40, 24, 48, 16, 32, 8] 
              : [8, 8, 8, 8, 8, 8, 8, 8, 8],
            backgroundColor: isRecording 
              ? ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#3b82f6']
              : ['#6b7280', '#6b7280', '#6b7280', '#6b7280', '#6b7280', '#6b7280', '#6b7280']
          }}
          transition={{
            height: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1,
              ease: "easeInOut"
            },
            backgroundColor: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
              ease: "easeInOut"
            }
          }}
          style={{
            minHeight: '8px',
            maxHeight: '48px'
          }}
        />
      ))}
      
      {/* Recording indicator */}
      {isRecording && (
        <motion.div
          className="absolute w-16 h-16 rounded-full border-2 border-red-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Status icon */}
      <div className="ml-4">
        {isRecording ? (
          <Mic className="h-6 w-6 text-red-500 animate-pulse" />
        ) : (
          <MicOff className="h-6 w-6 text-gray-400" />
        )}
      </div>
    </div>
  );
}