"use client";

import { useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface VideoTextProps {
  text: string;
  videoSrc: string;
  className?: string;
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function VideoText({ text, videoSrc, className = "" }: VideoTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeId = useMemo(() => extractYouTubeId(videoSrc), [videoSrc]);
  const isYouTube = !!youtubeId;

  /* Removed manual GSAP playback logic as video source is pre-looped */

  useEffect(() => {
    if (isYouTube || !canvasRef.current || !videoRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    const container = containerRef.current;

    if (!ctx) return;

    // Ensure video plays
    video.play().catch(() => {
      // Autoplay policy might block unmuted video, but ours is muted
    });
    const render = () => {
      if (!ctx || !canvas || !container) return; // Safety check

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (Math.abs(canvas.width - rect.width * dpr) > 0.1 || Math.abs(canvas.height - rect.height * dpr) > 0.1) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw video
      // Check if video has dimensions
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = rect.width / rect.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (videoAspect > canvasAspect) {
          drawHeight = rect.height;
          drawWidth = drawHeight * videoAspect;
          drawX = (rect.width - drawWidth) / 2;
          drawY = 0;
        } else {
          drawWidth = rect.width;
          drawHeight = drawWidth / videoAspect;
          drawX = 0;
          drawY = (rect.height - drawHeight) / 2;
        }

        ctx.drawImage(video, drawX, drawY, drawWidth, drawHeight);
      }

      // Apply text mask
      ctx.globalCompositeOperation = "destination-in";
      ctx.font = `900 ${rect.height * 0.85}px Antonio, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, rect.width / 2, rect.height / 2);

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over";

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

  }, [text, isYouTube]);

  // For YouTube, use CSS mask approach with a fallback image
  if (isYouTube) {
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <h1
          className="font-antonio font-black leading-[0.8] tracking-tighter"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {text}
        </h1>
        {/* Hidden iframe for animation - overlayed with blend mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ mixBlendMode: "lighten" }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&disablekb=1&vq=hd1080`}
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400%] h-[400%]"
            style={{ border: "none", opacity: 0 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} title={text}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />
    </div>
  );
}
