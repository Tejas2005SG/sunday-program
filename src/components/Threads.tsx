"use client";

import { useEffect, useRef } from "react";

type ThreadsProps = {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const rgbFromUnit = (color: [number, number, number], alpha: number) => {
  const r = Math.round(clamp01(color[0]) * 255);
  const g = Math.round(clamp01(color[1]) * 255);
  const b = Math.round(clamp01(color[2]) * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Threads({
  color = [0.32, 0.15, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const mouse = { x: 0.5, y: 0.5 };

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!enableMouseInteraction) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = clamp01((event.clientX - rect.left) / rect.width);
      mouse.y = clamp01((event.clientY - rect.top) / rect.height);
    };

    const lineCount = 8;
    const baseAmplitude = 16 + amplitude * 18;
    const distanceFactor = 1 + distance * 0.15;

    const draw = (time: number) => {
      const t = time * 0.001;
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1.5;
      context.globalCompositeOperation = "lighter";

      for (let i = 0; i < lineCount; i += 1) {
        const yBase = ((i + 1) / (lineCount + 1)) * height;
        const phase = t * 1.2 + i * 0.6;
        const amp = baseAmplitude * distanceFactor * (0.7 + i * 0.05);
        const mouseOffset = enableMouseInteraction
          ? (mouse.y - 0.5) * amp * 1.2
          : 0;

        context.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const wave1 = Math.sin(x * 0.012 + phase) * amp;
          const wave2 = Math.sin(x * 0.02 + phase * 1.4) * (amp * 0.45);
          const y = yBase + wave1 + wave2 + mouseOffset;
          if (x === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        const alpha = 0.18 + i * 0.02;
        context.strokeStyle = rgbFromUnit(color, alpha);
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (enableMouseInteraction) {
      parent.addEventListener("mousemove", onMouseMove);
    }

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMouseMove);
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
