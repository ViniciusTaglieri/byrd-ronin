import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  opacityOffset: number;
  color: string;
}

interface Props {
  count?: number;
  colors?: string[];
  className?: string;
}

function createParticle(width: number, height: number, colors: string[], randomY = false): Particle {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 60,
    size: Math.random() < 0.5 ? 2 : 4,
    speed: 0.3 + Math.random() * 0.5,
    opacity: 0.15 + Math.random() * 0.3,
    opacityOffset: Math.random() * Math.PI * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

export function PixelParticles({
  count,
  colors = ["#49c2f2", "#bfb52c", "#f8fafc"],
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const particleCount = count ?? (isMobile ? 25 : 60);

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(canvas.width, canvas.height, colors, true),
      );
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    window.addEventListener("resize", onResize);

    let frameCount = 0;

    function draw() {
      if (!canvas || !ctx) return;
      animRef.current = requestAnimationFrame(draw);
      if (document.visibilityState === "hidden") return;
      if (reducedMotion) return;

      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        const pulse = Math.sin(frameCount * 0.02 + p.opacityOffset) * 0.08;
        const alpha = Math.max(0, Math.min(1, p.opacity + pulse));

        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);

        if (p.y < -10) {
          p.y = canvas.height + Math.random() * 40;
          p.x = Math.random() * canvas.width;
        }
      }

      ctx.globalAlpha = 1;
    }

    draw();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") draw();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
