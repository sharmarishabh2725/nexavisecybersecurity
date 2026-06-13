import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const DataMesh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const particles: Particle[] = [];
    const particleCount = 80;
    const linkRadius = 150;
    const mouseLinkRadius = 200;

    const init = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;

        // Re-initialize particles on resize so they distribute evenly
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 0.5
          });
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      // Subtle premium colors: Cyan/Slate
      const dotColor = isDark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(100, 116, 139, 0.3)';
      const lineColorBase = isDark ? '148, 163, 184' : '100, 116, 139';
      const highlightColor = '6, 182, 212'; // Cyan-500

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // Check distance to mouse
        const dxMouse = mousePos.current.x - p.x;
        const dyMouse = mousePos.current.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseLinkRadius) {
          const opacity = (1 - distMouse / mouseLinkRadius) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.strokeStyle = `rgba(${highlightColor}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Check distance to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkRadius) {
            // Lines closer to the mouse get the highlight color!
            const distMouseP2 = Math.sqrt(
              Math.pow(mousePos.current.x - p2.x, 2) + Math.pow(mousePos.current.y - p2.y, 2)
            );
            
            const isNearMouse = distMouse < mouseLinkRadius || distMouseP2 < mouseLinkRadius;
            const opacity = (1 - dist / linkRadius) * (isNearMouse ? 0.4 : 0.15);
            const rgb = isNearMouse ? highlightColor : lineColorBase;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
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
    </div>
  );
};
