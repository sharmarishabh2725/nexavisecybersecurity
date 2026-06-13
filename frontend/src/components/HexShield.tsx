import { useEffect, useRef } from 'react';

interface Hexagon {
  cx: number;
  cy: number;
  pulsePhase: number;
  pulseSpeed: number;
  isNode: boolean;
}

export const HexShield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const hexagons: Hexagon[] = [];
    const size = 35; // Hexagon radius
    const hexWidth = Math.sqrt(3) * size;
    const hexHeight = 2 * size;
    const yOffset = hexHeight * 0.75;
    
    // Wave properties
    let time = 0;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      if (canvas) {
        canvas.width = width;
        canvas.height = height;

        hexagons.length = 0;
        
        // Add padding to ensure grid covers edges during resize
        const padding = size * 2;
        
        for (let row = -1; row * yOffset < height + padding; row++) {
          for (let col = -1; col * hexWidth < width + padding; col++) {
            const cx = col * hexWidth + (row % 2 !== 0 ? hexWidth / 2 : 0);
            const cy = row * yOffset;
            
            hexagons.push({
              cx,
              cy,
              pulsePhase: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + Math.random() * 0.03,
              isNode: Math.random() < 0.05 // 5% of hexes are special glowing nodes
            });
          }
        }
      }
    };

    const drawHexagon = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        // Pointy top hexagons: angle starts at -30 deg
        const angle_deg = 60 * i - 30;
        const angle_rad = Math.PI / 180 * angle_deg;
        const x = cx + r * Math.cos(angle_rad);
        const y = cy + r * Math.sin(angle_rad);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const animate = () => {
      if (!ctx) return;
      time += 1;

      const isDark = document.documentElement.classList.contains('dark');
      
      // We use a solid background to avoid alpha blending overhead and look cleaner
      ctx.fillStyle = isDark ? '#020617' : '#f8fafc'; // slate-950 or slate-50
      ctx.fillRect(0, 0, width, height);

      const baseStrokeColor = isDark ? '255, 255, 255' : '15, 23, 42';
      
      // Cyber colors
      const cyan = '6, 182, 212';   // cyan-500
      const purple = '168, 85, 247'; // purple-500

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];
        hex.pulsePhase += hex.pulseSpeed;

        // Calculate distance from mouse
        const dx = mx - hex.cx;
        const dy = my - hex.cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Ripple Effect Math
        // We create a wave that radiates outward from the mouse
        // dist - time*speed creates a moving ripple
        const rippleDistance = distance - time * 4;
        // A sine wave based on that moving distance creates rings
        let rippleIntensity = Math.sin(rippleDistance * 0.02);
        
        // Only show ripple if mouse is actually on screen and relatively close
        const maxDist = 600;
        let mouseInfluence = 0;
        if (mx > -1000 && distance < maxDist) {
          // Normalize distance: 1 at mouse, 0 at maxDist
          const distFactor = Math.max(0, 1 - (distance / maxDist));
          
          // Combine distance factor with ripple wave
          // Map sine [-1, 1] to [0, 1] and multiply by distance factor
          mouseInfluence = ((rippleIntensity + 1) / 2) * Math.pow(distFactor, 1.5);
        }

        // Base opacity
        let strokeOpacity = isDark ? 0.03 : 0.05;
        let fillOpacity = 0;
        let colorRGB = baseStrokeColor;
        let isGlowing = false;

        if (hex.isNode) {
          // Special nodes pulse independently
          const nodePulse = (Math.sin(hex.pulsePhase) + 1) / 2;
          strokeOpacity += nodePulse * 0.15;
          fillOpacity += nodePulse * 0.05;
          colorRGB = purple;
          isGlowing = true;
        }

        // Apply mouse influence
        if (mouseInfluence > 0) {
          // As mouse wave hits, opacity spikes, color shifts to cyan
          strokeOpacity += mouseInfluence * 0.5;
          fillOpacity += mouseInfluence * 0.15;
          colorRGB = cyan;
          isGlowing = true;
        }

        // Draw the hexagon
        drawHexagon(hex.cx, hex.cy, size - 1.5); // slight gap between hexes

        ctx.strokeStyle = `rgba(${colorRGB}, ${strokeOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (fillOpacity > 0) {
          ctx.fillStyle = `rgba(${colorRGB}, ${fillOpacity})`;
          ctx.fill();
        }

        // Highlight nodes and waves with shadow
        if (isGlowing && (fillOpacity > 0.1 || strokeOpacity > 0.3)) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${colorRGB}, 1)`;
          ctx.stroke(); // Restroke with blur for glow
          ctx.shadowBlur = 0; // Reset
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10 }}
    />
  );
};
