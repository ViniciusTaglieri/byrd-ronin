import { useEffect, useRef } from "react";

interface CanvasHandlers {
  resize: () => void;
  draw: () => void;
}

export function useCanvasAnimation(
  setup: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => CanvasHandlers,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { resize, draw: renderFrame } = setup(canvas, ctx);

    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);

    function loop() {
      animRef.current = requestAnimationFrame(loop);
      if (document.visibilityState !== "hidden") renderFrame();
    }
    loop();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        cancelAnimationFrame(animRef.current);
        loop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return canvasRef;
}
