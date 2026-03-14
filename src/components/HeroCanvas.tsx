"use client";

import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 134;
const FRAME_PATH = (n: number) =>
  `/images/sequence/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export default function HeroCanvas({
  onScrollProgress,
}: {
  onScrollProgress: (p: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Draw first frame immediately once it's ready
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // object-fit: contain
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = W / H;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      drawW = W;
      drawH = W / imgAspect;
      drawX = 0;
      drawY = (H - drawH) / 2;
    } else {
      drawH = H;
      drawW = H * imgAspect;
      drawX = (W - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX * dpr, drawY * dpr, drawW * dpr, drawH * dpr);
  }, []);

  // Resize canvas for HiDPI
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const heroHeight = container.clientHeight;
      const viewportHeight = window.innerHeight;
      const scrollable = heroHeight - viewportHeight;
      const scrollTop = window.scrollY;
      const progress = Math.min(Math.max(scrollTop / scrollable, 0), 1);

      onScrollProgress(progress);

      const targetFrame = Math.round(progress * (TOTAL_FRAMES - 1));
      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, onScrollProgress]);

  return (
    <div
      ref={containerRef}
      id="hero"
      style={{ height: "800vh", position: "relative" }}
    >
      <div className="canvas-container">
        {/* Dark cinematic gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(232,201,126,0.06) 0%, transparent 55%), linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.4) 100%)",
          }}
        />
        <canvas
          ref={canvasRef}
          id="hero-canvas"
          aria-label="Podcast studio animation"
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
}
