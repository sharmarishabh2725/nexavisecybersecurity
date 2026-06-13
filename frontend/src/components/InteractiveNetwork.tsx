import { useEffect, useRef } from 'react';

export const InteractiveNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Globe Settings
    const R = 250; // Sphere radius
    const N = 400; // Number of nodes
    const fov = 800; // Field of view
    
    // Mouse tracking for rotation
    const mouse = { x: 0, y: 0, isHovering: false, targetRx: 0, targetRy: 0 };
    let rx = 0; // Current rotation X
    let ry = 0; // Current rotation Y

    // Base points
    const basePoints: {x: number, y: number, z: number, isThreat: boolean}[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for(let i = 0; i < N; i++){
      const y = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      // ~5% chance to be a red "threat" node
      const isThreat = Math.random() > 0.95;
      basePoints.push({x, y, z, isThreat});
    }

    const init = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Auto rotation + mouse interaction
      if (!mouse.isHovering) {
        mouse.targetRy -= 0.002;
        mouse.targetRx = Math.sin(Date.now() / 5000) * 0.2; 
      }
      
      // Smoothly interpolate current rotation towards target
      rx += (mouse.targetRx - rx) * 0.05;
      ry += (mouse.targetRy - ry) * 0.05;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const projectedPoints = basePoints.map(p => {
        // Rotate around X
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.z * cosX + p.y * sinX;
        
        // Rotate around Y
        const x2 = p.x * cosY - z1 * sinY;
        const z2 = z1 * cosY + p.x * sinY;

        // Project
        const scale = fov / (fov + z2 * R);
        const x2D = (width / 2) + x2 * R * scale;
        const y2D = (height / 2) + y1 * R * scale;

        return { x: x2D, y: y2D, z: z2, scale, isThreat: p.isThreat };
      });

      // Sort by Z for proper rendering order (back to front)
      projectedPoints.sort((a, b) => b.z - a.z);

      // Draw connections (wireframe)
      // Only draw connections for points in the front half to avoid clutter
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (p1.z > 0) continue; // Skip back hemisphere connections

        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.z > 0) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 35 * p1.scale) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 - (dist / (35 * p1.scale)) * 0.3})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Points
      for (let p of projectedPoints) {
        // Alpha fades out as points go to the back
        const alpha = Math.max(0.1, 1 - (p.z + 1) / 2); 
        const size = (p.isThreat ? 2.5 : 1.5) * p.scale;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        
        if (p.isThreat) {
          ctx.fillStyle = `rgba(255, 60, 60, ${alpha})`;
          ctx.shadowColor = `rgba(255, 60, 60, ${alpha})`;
          ctx.shadowBlur = 15 * p.scale;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowColor = `rgba(56, 189, 248, ${alpha})`;
          ctx.shadowBlur = p.z < 0 ? 8 * p.scale : 0;
        }
        
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      
      // Convert mouse position to target rotation
      mouse.targetRy = x * 0.005;
      mouse.targetRx = y * 0.005;
      mouse.isHovering = true;
    };
    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetRx = 0; // Slowly return to upright
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 z-0 cursor-crosshair"
    />
  );
};
