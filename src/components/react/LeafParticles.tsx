import { useEffect, useRef } from "react";

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  opacity: number;
}

const COUNT = 12;

function createLeaf(width: number, height: number, randomY = false): Leaf {
  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -(Math.random() * 60),
    vx: (Math.random() - 0.5) * 0.6,
    vy: 0.5 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
    opacity: 0.1 + Math.random() * 0.15,
  };
}

export function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Leaf[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = Array.from({ length: COUNT }, () =>
        createLeaf(canvas.width, canvas.height, true)
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

      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(107,143,94,1)";

      for (const p of particlesRef.current) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.8 + p.phase) * 0.4;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(Math.round(p.x), Math.round(p.y));
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(0, 0, 3, 1);
        ctx.restore();

        if (p.y > canvas.height + 10 || p.x < -10 || p.x > canvas.width + 10) {
          p.y = -(Math.random() * 40);
          p.x = Math.random() * canvas.width;
          p.phase = Math.random() * Math.PI * 2;
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
