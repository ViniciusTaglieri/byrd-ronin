import { useEffect, useRef } from "react";

interface Shuriken {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  rotation: number;
  opacity: number;
  color: string;
}

const COLORS = ["rgba(73,194,242,0.18)", "rgba(191,181,44,0.12)"];
const COUNT = 7;

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  const points = 4;
  const outerR = size;
  const innerR = size * 0.4;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points + rotation;
    ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
}

function createShuriken(width: number, height: number, randomY = false): Shuriken {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : height + Math.random() * 60,
    size: Math.floor(4 + Math.random() * 7),
    speed: 0.3 + Math.random() * 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    opacity: 0.5 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function ShurikenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Shuriken[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () =>
        createShuriken(canvas.width, canvas.height, true)
      );
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    window.addEventListener("resize", onResize);

    function draw() {
      if (!canvas || !ctx) return;
      animRef.current = requestAnimationFrame(draw);
      if (document.visibilityState === "hidden") return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.vx;
        p.rotation += 0.012 * p.speed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        drawStar(ctx, Math.round(p.x), Math.round(p.y), p.size, p.rotation);
        ctx.fill();
        ctx.restore();

        if (p.y < -p.size * 2) {
          p.y = canvas.height + Math.random() * 40;
          p.x = Math.random() * canvas.width;
          p.rotation = Math.random() * Math.PI * 2;
        }
      }
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
