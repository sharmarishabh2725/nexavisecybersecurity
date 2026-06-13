import { useEffect, useRef } from 'react';
import world from '@svg-maps/world';

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  isSpecial: boolean;
}

interface Arc {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX: number;
  controlY: number;
  progress: number;
  speed: number;
  color: string;
}

export const InteractiveGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const dots: Dot[] = [];
    const arcs: Arc[] = [];
    
    // The exact viewBox dimensions from @svg-maps/world
    const mapWidth = 1009;
    const mapHeight = 665;
    const dotSpacing = 12;

    const colors = [
      'rgba(6, 182, 212, 1)',   // Cyan
      'rgba(236, 72, 153, 1)',  // Pink
      'rgba(168, 85, 247, 1)'   // Purple
    ];

    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;

    const initMap = () => {
      // 1. Combine all world paths into a single Path2D object for fast checking
      const worldPath = new Path2D();
      world.locations.forEach(loc => {
        worldPath.addPath(new Path2D(loc.path));
      });

      // 2. Sample the viewBox with a grid to see which points land inside landmasses
      const validPoints: {x: number, y: number}[] = [];
      for (let x = 0; x < mapWidth; x += dotSpacing) {
        for (let y = 0; y < mapHeight; y += dotSpacing) {
          // Stagger rows slightly for a nicer hex-like dot grid
          const staggerX = x + ((y / dotSpacing) % 2 === 0 ? 0 : dotSpacing / 2);
          if (ctx.isPointInPath(worldPath, staggerX, y)) {
            validPoints.push({ x: staggerX, y });
          }
        }
      }
      return validPoints;
    };

    const validMapPoints = initMap();

    const init = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;

        // Calculate scale to make the map fill the right side of the screen
        // We want it slightly oversized and shifted right to match the image layout
        scale = Math.min(width / mapWidth, height / mapHeight) * 1.5;
        offsetX = width * 0.3; // Shift right by 30%
        offsetY = (height - mapHeight * scale) / 2;

        dots.length = 0;
        validMapPoints.forEach(p => {
          const bx = offsetX + p.x * scale;
          const by = offsetY + p.y * scale;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            targetX: bx,
            targetY: by,
            isSpecial: Math.random() < 0.005 // Rare nodes glow independently
          });
        });
      }
    };

    const createArc = () => {
      if (dots.length < 2) return;
      const p1 = dots[Math.floor(Math.random() * dots.length)];
      let p2 = dots[Math.floor(Math.random() * dots.length)];
      // Ensure the arc goes a decent distance
      while (Math.abs(p1.baseX - p2.baseX) < 200) {
        p2 = dots[Math.floor(Math.random() * dots.length)];
      }

      const startX = p1.baseX;
      const startY = p1.baseY;
      const endX = p2.baseX;
      const endY = p2.baseY;

      const dx = endX - startX;
      const dy = endY - startY;
      const midX = startX + dx / 2;
      const midY = startY + dy / 2;
      const arcOffset = Math.sqrt(dx*dx + dy*dy) * 0.25;
      const controlX = midX - (dy / Math.sqrt(dx*dx + dy*dy)) * arcOffset;
      const controlY = midY + (dx / Math.sqrt(dx*dx + dy*dy)) * arcOffset - 150; // Curve upwards

      arcs.push({
        startX, startY, endX, endY, controlX, controlY,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    let time = 0;

    const animate = () => {
      if (!ctx) return;
      time++;
      
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? '#020617' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const interactRadius = 150;

      // Draw Arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.progress += arc.speed;

        if (arc.progress > 1) {
          arcs.splice(i, 1);
          continue;
        }

        // Draw the path line faintly
        ctx.beginPath();
        ctx.moveTo(arc.startX, arc.startY);
        ctx.quadraticCurveTo(arc.controlX, arc.controlY, arc.endX, arc.endY);
        ctx.strokeStyle = arc.color.replace('1)', isDark ? '0.1)' : '0.2)');
        ctx.lineWidth = 1;
        ctx.stroke();

        // Calculate current position of the traveling data packet
        const t = arc.progress;
        const currentX = Math.pow(1 - t, 2) * arc.startX + 2 * (1 - t) * t * arc.controlX + Math.pow(t, 2) * arc.endX;
        const currentY = Math.pow(1 - t, 2) * arc.startY + 2 * (1 - t) * t * arc.controlY + Math.pow(t, 2) * arc.endY;

        // Draw the glowing data packet
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = arc.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = arc.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Reset target to base
        dot.targetX = dot.baseX;
        dot.targetY = dot.baseY;

        // Check mouse interaction
        const dx = mx - dot.baseX;
        const dy = my - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let color = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(100, 116, 139, 0.4)'; // slate
        let radius = 1.2;

        if (dist < interactRadius && mx > -1000) {
          // Repel away from mouse
          const force = (interactRadius - dist) / interactRadius;
          dot.targetX = dot.baseX - (dx / dist) * force * 15;
          dot.targetY = dot.baseY - (dy / dist) * force * 15;
          
          // Light up!
          color = 'rgba(6, 182, 212, 1)'; // Cyan
          radius = 1.8 + force;
        } else if (dot.isSpecial) {
          // Special nodes pulse independently
          const pulse = (Math.sin(time / 40 + i) + 1) / 2;
          color = `rgba(236, 72, 153, ${0.4 + pulse * 0.6})`; // Pink
          radius = 1.5 + pulse;
        }

        // Ease towards target
        dot.x += (dot.targetX - dot.x) * 0.1;
        dot.y += (dot.targetY - dot.y) * 0.1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        
        if (dist < interactRadius || dot.isSpecial) {
           ctx.shadowBlur = 8;
           ctx.shadowColor = color;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Randomly spawn arcs
      if (Math.random() < 0.015 && arcs.length < 8) {
        createArc();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    
    // Spawn initial arcs
    for(let i=0; i<5; i++) createArc();
    
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
  };

  return (
    <div className="w-full h-full absolute inset-0 z-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 w-full h-full z-10"
      />
      {/* Soft gradient mask so text is readable on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent pointer-events-none z-20 dark:from-[#020617] dark:via-[#020617]/70" />
    </div>
  );
};
