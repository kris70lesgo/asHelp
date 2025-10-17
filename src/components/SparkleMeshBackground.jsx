"use client";
import React, { useEffect, useRef } from "react";

const SparkleMeshBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const particles = [];
    const numParticles = 110; // slightly more for denser sparkle field

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 3;
    const spreadX = 420;
    const spreadY = 260;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusX = Math.random() * spreadX;
      const radiusY = Math.random() * spreadY;
      const depth = Math.random(); // depth feel: 0 (near) → 1 (far)
      particles.push({
        x: centerX + Math.cos(angle) * radiusX,
        y: centerY + Math.sin(angle) * radiusY,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: (Math.random() * 0.8 + 0.3) * (1.2 - depth), // depth size control
        alpha: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        depth,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.twinkleSpeed;

        if (Math.abs(p.x - centerX) > spreadX) p.vx *= -1;
        if (Math.abs(p.y - centerY) > spreadY) p.vy *= -1;

        const twinkle = (Math.sin(p.alpha) + 1) / 2;

        // ✨ Premium silver-blue gradient
        const glowIntensity = 0.45 + 0.3 * (1 - p.depth);
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.r * 14
        );
        gradient.addColorStop(
          0,
          `rgba(220,240,255,${glowIntensity * twinkle})`
        );
        gradient.addColorStop(0.4, `rgba(150,200,255,${0.25 * twinkle})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        // apply blur based on depth (for soft far sparkles)
        ctx.shadowColor = `rgba(220,240,255,${0.5 * twinkle})`;
        ctx.shadowBlur = 10 * (1 - p.depth);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    />
  );
};

export default SparkleMeshBackground;
