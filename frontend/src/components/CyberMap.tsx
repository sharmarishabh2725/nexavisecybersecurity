import { useEffect, useRef, useState } from 'react';
import india from '@svg-maps/india';

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

interface Threat {
  id: number;
  x: number;
  y: number;
  progress: number;
  pulseOffset: number;
  autoSolveSpeed: number;
  label: string;
  fact: string;
  stateName: string;
}

const allCyberFacts = [
  { label: 'Ransomware', fact: 'Attacks increased 78% this year.' },
  { label: 'Data Breach', fact: 'Global average cost is $4.45M.' },
  { label: 'Phishing', fact: '3 billion malicious emails sent daily.' },
  { label: 'DDoS Attack', fact: 'Traffic volumes hitting record terabytes.' },
  { label: 'Zero-Day Exploit', fact: 'Unpatched vulnerability detected.' },
  { label: 'IoT Compromise', fact: 'Malware attacks jumped by 400%.' },
  { label: 'Insider Threat', fact: 'Unauthorized access sequence blocked.' }
];

// Extract valid geographic coordinates from the SVG paths to guarantee threats spawn exactly on land
const validMapPoints = india.locations.map(loc => {
  const match = loc.path.match(/m\s*([0-9.]+),([0-9.]+)/i);
  if (match) {
    return { x: parseFloat(match[1]), y: parseFloat(match[2]), stateName: loc.name };
  }
  return null;
}).filter((p): p is {x: number, y: number, stateName: string} => p !== null);

export const CyberMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const threatsRef = useRef<Threat[]>([]);
  const [activeThreats, setActiveThreats] = useState<Threat[]>([]);
  const [hoveredThreatId, setHoveredThreatId] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let threatSpawnInterval: NodeJS.Timeout;

    const arcs: Arc[] = [];
    const threats = threatsRef.current;
    
    let threatIdCounter = 0;

    const colors = [
      'rgba(6, 182, 212, 1)', // Cyan
      'rgba(236, 72, 153, 1)', // Pink
      'rgba(168, 85, 247, 1)'  // Purple
    ];

    const init = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    const getMapTransform = () => {
      const svg = svgRef.current;
      if (!svg || !canvasRef.current) return null;
      
      const rect = svg.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();

      const mapWidth = 612; // viewBox width
      const mapHeight = 696; // viewBox height
      
      // Calculate how the SVG is scaled via preserveAspectRatio="xMidYMid meet"
      const scale = Math.min(rect.width / mapWidth, rect.height / mapHeight);
      const renderWidth = mapWidth * scale;
      const renderHeight = mapHeight * scale;
      
      // Calculate offsets relative to the canvas
      const offsetX = (rect.left - canvasRect.left) + (rect.width - renderWidth) / 2;
      const offsetY = (rect.top - canvasRect.top) + (rect.height - renderHeight) / 2;

      return { scale, offsetX, offsetY };
    };

    const syncThreatsToState = () => {
      setActiveThreats([...threats]);
    };

    const spawnThreat = (count: number = 1) => {
      if (validMapPoints.length === 0) return;
      
      const transform = getMapTransform();
      if (!transform) return;
      const { scale, offsetX, offsetY } = transform;

      for (let i = 0; i < count; i++) {
        const point = validMapPoints[Math.floor(Math.random() * validMapPoints.length)];
        const randomFact = allCyberFacts[Math.floor(Math.random() * allCyberFacts.length)];

        threats.push({
          id: ++threatIdCounter,
          x: offsetX + point.x * scale,
          y: offsetY + point.y * scale,
          progress: 0,
          pulseOffset: Math.random() * Math.PI * 2,
          // 60 fps * 10 seconds = 600 frames (100 / 600 = 0.166)
          // 60 fps * 25 seconds = 1500 frames (100 / 1500 = 0.066)
          autoSolveSpeed: 0.06 + Math.random() * 0.1,
          label: randomFact.label,
          fact: randomFact.fact,
          stateName: point.stateName
        });
      }
      syncThreatsToState();
    };

    const createArc = () => {
      if (validMapPoints.length < 2) return;
      const transform = getMapTransform();
      if (!transform) return;
      const { scale, offsetX, offsetY } = transform;
      
      const p1 = validMapPoints[Math.floor(Math.random() * validMapPoints.length)];
      let p2 = validMapPoints[Math.floor(Math.random() * validMapPoints.length)];
      while(p1 === p2) p2 = validMapPoints[Math.floor(Math.random() * validMapPoints.length)];

      const startX = offsetX + p1.x * scale;
      const startY = offsetY + p1.y * scale;
      const endX = offsetX + p2.x * scale;
      const endY = offsetY + p2.y * scale;

      const dx = endX - startX;
      const dy = endY - startY;
      const midX = startX + dx / 2;
      const midY = startY + dy / 2;
      const arcOffset = Math.sqrt(dx*dx + dy*dy) * 0.3;
      const controlX = midX - (dy / Math.sqrt(dx*dx + dy*dy)) * arcOffset;
      const controlY = midY + (dx / Math.sqrt(dx*dx + dy*dy)) * arcOffset - 100;

      arcs.push({
        startX, startY, endX, endY, controlX, controlY,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    let lastThreatCount = 0;

    const animate = (time: number) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');

      // Draw arcs
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.progress += arc.speed;

        if (arc.progress > 1) {
          arcs.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(arc.startX, arc.startY);
        ctx.quadraticCurveTo(arc.controlX, arc.controlY, arc.endX, arc.endY);
        ctx.strokeStyle = arc.color.replace('1)', isDark ? '0.15)' : '0.25)');
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const t = arc.progress;
        const currentX = Math.pow(1 - t, 2) * arc.startX + 2 * (1 - t) * t * arc.controlX + Math.pow(t, 2) * arc.endX;
        const currentY = Math.pow(1 - t, 2) * arc.startY + 2 * (1 - t) * t * arc.controlY + Math.pow(t, 2) * arc.endY;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = arc.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = arc.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(arc.endX, arc.endY, 4, 0, Math.PI * 2);
        ctx.fillStyle = arc.color.replace('1)', `${t})`);
        ctx.shadowBlur = 10;
        ctx.shadowColor = arc.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw and update threats
      for (let i = threats.length - 1; i >= 0; i--) {
        const threat = threats[i];
        
        threat.progress += threat.autoSolveSpeed;

        if (threat.progress >= 100) {
          threats.splice(i, 1);
          continue;
        }

        const pulse = Math.sin(time / 200 + threat.pulseOffset) * 0.5 + 0.5; 

        ctx.beginPath();
        ctx.arc(threat.x, threat.y, 4 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${0.7 + pulse * 0.3})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ef4444';
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(threat.x, threat.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (threat.progress > 0) {
          ctx.beginPath();
          ctx.arc(threat.x, threat.y, 18, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * (threat.progress / 100)));
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw connector line
        const boxHeight = 65;
        const boxY = threat.y - boxHeight - 20;
        ctx.beginPath();
        ctx.moveTo(threat.x, threat.y - 18);
        ctx.lineTo(threat.x, boxY + boxHeight);
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (threats.length !== lastThreatCount) {
        syncThreatsToState();
        lastThreatCount = threats.length;
      }

      if (Math.random() < 0.01 && arcs.length < 5) {
        createArc();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    init();
    for(let i=0; i<3; i++) createArc();
    
    // Automatically maintain between 3-5 threats on screen at any time
    threatSpawnInterval = setInterval(() => {
      const currentCount = threatsRef.current.length;
      if (currentCount < 5) {
        const targetCount = 3 + Math.floor(Math.random() * 3); // Randomly 3, 4, or 5
        const toSpawn = targetCount - currentCount;
        if (toSpawn > 0) {
          spawnThreat(toSpawn);
        }
      }
    }, 4000); // Check every 4 seconds
    
    // Don't spawn immediately to ensure SVG has rendered and rects are valid
    setTimeout(() => spawnThreat(3), 500); 

    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearInterval(threatSpawnInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };

    let hoveredId = null;
    for (const t of threatsRef.current) {
      const dx = x - t.x;
      const dy = y - t.y;
      if (Math.sqrt(dx * dx + dy * dy) < 80) {
        hoveredId = t.id;
        break;
      }
    }
    setHoveredThreatId(hoveredId);
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
    setHoveredThreatId(null);
  };

  return (
    <div className="w-full h-full absolute inset-0 z-0 opacity-80 overflow-hidden pointer-events-auto">
      {/* SVG Map Container */}
      <svg 
        ref={svgRef}
        viewBox={india.viewBox} 
        className="absolute inset-y-0 right-0 w-full lg:w-[50%] h-[90%] my-auto opacity-30 dark:opacity-20 pointer-events-none z-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {india.locations.map(loc => (
          <path 
            key={loc.id} 
            d={loc.path} 
            className="fill-slate-400 dark:fill-slate-500 hover:fill-blue-500 transition-colors duration-500"
          />
        ))}
      </svg>
      
      {/* Canvas Layer */}
      <canvas 
        ref={canvasRef} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 w-full h-full z-10"
      />
      
      {/* Crisp HTML Popups for Threats */}
      {activeThreats.map(threat => {
        return (
          <div 
            key={threat.id}
            className="absolute z-20 pointer-events-none bg-white/90 dark:bg-slate-900/90 border border-red-500/50 rounded-lg p-4 shadow-xl backdrop-blur-sm animate-in fade-in zoom-in duration-300"
            style={{
              left: threat.x - 130, 
              top: threat.y - 95,   
              width: 260,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-red-600 dark:text-red-400 font-bold text-xs tracking-widest uppercase truncate">
                {threat.label} - {threat.stateName}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
              {threat.fact}
            </p>
          </div>
        );
      })}
    </div>
  );
};
