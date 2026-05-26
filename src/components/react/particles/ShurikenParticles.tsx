import { useRef } from "react";
import { useCanvasAnimation } from "../../../lib/useCanvasAnimation";

interface ShurikenColor {
  fill: string;
  glow: string;
}

interface Shuriken {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  rotation: number;
  opacity: number;
  color: ShurikenColor;
}

const COLORS: ShurikenColor[] = [
  { fill: "rgba(73,194,242,0.35)", glow: "#49c2f2" },
  { fill: "rgba(191,181,44,0.30)", glow: "#bfb52c" },
];
const COUNT = 8;

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
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
    size: Math.floor(3 + Math.random() * 5),
    speed: 0.2 + Math.random() * 0.2,
    vx: (Math.random() - 0.5) * 0.2,
    rotation: Math.random() * Math.PI * 2,
    opacity: 0.25 + Math.random() * 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export function ShurikenParticles() {
  const particlesRef = useRef<Shuriken[]>([]);

  const canvasRef = useCanvasAnimation((canvas, ctx) => ({
    resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () =>
        createShuriken(canvas.width, canvas.height, true),
      );
    },
    draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.y -= p.speed;
        p.x += p.vx;
        p.rotation += 0.012 * p.speed;

        const fadeZone = canvas.height * 0.2;
        const fadeFactor = p.y < fadeZone ? Math.max(0, p.y / fadeZone) : 1;
        const alpha = p.opacity * fadeFactor;

        if (alpha <= 0) {
          p.y = canvas.height + Math.random() * 40;
          p.x = Math.random() * canvas.width;
          p.rotation = Math.random() * Math.PI * 2;
          continue;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color.glow;
        ctx.shadowBlur = p.size * 1.5;
        ctx.fillStyle = p.color.fill;
        drawStar(ctx, Math.round(p.x), Math.round(p.y), p.size, p.rotation);
        ctx.fill();
        ctx.restore();

        if (p.y < -p.size) {
          p.y = canvas.height + Math.random() * 40;
          p.x = Math.random() * canvas.width;
          p.rotation = Math.random() * Math.PI * 2;
        }
      }
    },
  }));

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
