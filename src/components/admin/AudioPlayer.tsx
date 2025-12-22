import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
    src: string;
    duration?: number;
}

export function AudioPlayer({ src, duration = 0 }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(duration);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setTotalDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.volume = value[0];
            setVolume(value[0]);
            setIsMuted(value[0] === 0);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume || 0.5;
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const changePlaybackRate = () => {
        const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = rates.indexOf(playbackRate);
        const nextRate = rates[(currentIndex + 1) % rates.length];
        if (audioRef.current) {
            audioRef.current.playbackRate = nextRate;
            setPlaybackRate(nextRate);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <audio ref={audioRef} src={src} />

            {/* Waveform visualization (simplified) */}
            <div className="h-16 flex items-end gap-1 justify-center">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-primary/30 rounded-t transition-all"
                        style={{
                            height: `${Math.random() * 100}%`,
                            opacity: (currentTime / totalDuration) * 50 > i ? 1 : 0.3
                        }}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
                <Slider
                    value={[currentTime]}
                    max={totalDuration || 100}
                    step={0.1}
                    onValueChange={handleSeek}
                    className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(totalDuration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={togglePlay}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={changePlaybackRate}>
                        {playbackRate}x
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                        value={[isMuted ? 0 : volume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="w-24"
                    />
                </div>
            </div>
        </div>
    );
}
