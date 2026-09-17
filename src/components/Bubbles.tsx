"use client";

import { useEffect, useRef } from "react";

type BubbleSpec = {
  x: number; // 0..1
  y: number; // px
  r: number;
  speed: number;
  wobbleAmp: number;
  wobbleSpeed: number;
  phase: number;
  filled: boolean;
  color: string;
};

const COLORS = ["255,107,94", "255,158,44", "27,182,178", "236,61,140", "123,97,232", "143,201,58"];

export default function Bubbles({
  density = 26,
  maxRadius = 9,
  opacity = 0.5,
  className = "",
}: {
  density?: number;
  maxRadius?: number;
  opacity?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    let bubbles: BubbleSpec[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (initial: boolean): BubbleSpec => ({
      x: Math.random(),
      y: initial ? Math.random() * height : height + 20,
      r: 1.5 + Math.random() * maxRadius,
      speed: 0.35 + Math.random() * 0.9,
      wobbleAmp: 6 + Math.random() * 22,
      wobbleSpeed: 0.4 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      filled: Math.random() > 0.72,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const rebuild = () => {
      bubbles = Array.from({ length: density }, () => spawn(true));
    };

    resize();
    rebuild();

    const observer = new ResizeObserver(() => {
      resize();
      rebuild();
    });
    observer.observe(canvas);

    let last = performance.now();
    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.7, 3);
      last = now;
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed * dt * 60 * 0.28;
        if (b.y < -30) {
          bubbles[i] = spawn(false);
          continue;
        }
        const wobble = Math.sin(t * b.wobbleSpeed + b.phase) * b.wobbleAmp;
        const x = b.x * width + wobble;
        const fade = Math.min(1, Math.max(0, (height - (height - b.y)) / height));
        const a = opacity * Math.min(1, fade * 1.6);
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        if (b.filled) {
          ctx.fillStyle = `rgba(${b.color},${a * 0.28})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(${b.color},${a})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
        // glint
        ctx.beginPath();
        ctx.arc(x - b.r * 0.32, b.y - b.r * 0.32, Math.max(b.r * 0.22, 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a * 0.85})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, maxRadius, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
