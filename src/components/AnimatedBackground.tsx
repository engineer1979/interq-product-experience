import { memo } from "react";

const AnimatedBackground = memo(function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full blur-[120px] opacity-60"
           style={{ background: "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.25), rgba(34,211,238,0) 60%)" }} />
      <div className="absolute -bottom-32 -left-24 w-[520px] h-[520px] rounded-full blur-[110px] opacity-50"
           style={{ background: "radial-gradient(circle at 70% 70%, rgba(34,211,238,0.20), rgba(34,211,238,0) 60%)" }} />
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.5)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
    </div>
  );
});

export default AnimatedBackground;
