'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onMouseOut = () => { mouseX = -9999; mouseY = -9999; };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });

    const COUNT = 70;
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };
    const pts: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const LINE_DIST = 130;
    const LINE_DIST_SQ = LINE_DIST * LINE_DIST;
    const MOUSE_DIST_SQ = 120 * 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lines between nearby particles — use squared distance to avoid sqrt
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < LINE_DIST_SQ) {
            const d = Math.sqrt(dSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,255,218,${0.12 * (1 - d / LINE_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,218,${p.alpha})`;
        ctx.fill();

        // Mouse repulsion — cheap squared check first
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdSq = mdx * mdx + mdy * mdy;
        if (mdSq < MOUSE_DIST_SQ) {
          const md = Math.sqrt(mdSq);
          p.vx -= (mdx / md) * 0.06;
          p.vy -= (mdy / md) * 0.06;
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx = (p.vx / speed) * 1.5; p.vy = (p.vy / speed) * 1.5; }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }

      animId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}
