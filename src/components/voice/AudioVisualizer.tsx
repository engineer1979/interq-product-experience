import { motion } from "framer-motion";

interface AudioVisualizerProps {
    state: "speaking" | "listening" | "idle" | "processing" | "completed";
}

export const AudioVisualizer = ({ state }: AudioVisualizerProps) => {
    return (
        <div className="flex items-center justify-center gap-1 h-16">
            {state === "speaking" && (
                <>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                            key={`speak-${i}`}
                            className="w-2 bg-primary rounded-full"
                            animate={{
                                height: [16, 32, 16],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </>
            )}

            {state === "listening" && (
                <>
                    <motion.div
                        className="w-4 h-4 bg-red-500 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <span className="ml-2 text-sm font-medium text-red-500 animate-pulse">
                        Recording...
                    </span>
                </>
            )}

            {state === "processing" && (
                <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={`proc-${i}`}
                            className="w-2 h-2 bg-muted-foreground rounded-full"
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {(state === "idle" || state === "completed") && (
                <div className="w-full h-1 bg-muted rounded-full" />
            )}
        </div>
    );
};
