import world from '@svg-maps/world';
import { motion } from 'framer-motion';

export const BackgroundGlobe = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none flex items-center justify-end">
      {/* 
        We use strokeDasharray to convert the solid map paths into a beautiful grid of dots! 
      */}
      <svg
        viewBox={world.viewBox}
        className="w-[120%] lg:w-[80%] h-[120%] lg:h-[150%] translate-x-[20%] opacity-20 dark:opacity-40"
        preserveAspectRatio="xMidYMid slice"
      >
        {world.locations.map((loc) => (
          <path
            key={loc.id}
            d={loc.path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="1 6"
            strokeLinecap="round"
            className="text-cyan-600 dark:text-cyan-400"
          />
        ))}

        {/* Swooping Arcs */}
        <g strokeWidth="1" fill="none">
          {/* Arc 1 */}
          <path 
            d="M -100 400 Q 400 300 900 600" 
            stroke="rgba(168, 85, 247, 0.4)" 
            strokeDasharray="4 4"
          />
          {/* Arc 2 */}
          <path 
            d="M 200 800 Q 500 500 1000 200" 
            stroke="rgba(6, 182, 212, 0.4)" 
            strokeDasharray="4 4"
          />
          {/* Arc 3 */}
          <path 
            d="M -50 600 Q 600 700 800 100" 
            stroke="rgba(236, 72, 153, 0.3)" 
            strokeDasharray="4 4"
          />
        </g>
        
        {/* Glowing Nodes on the Arcs */}
        <circle cx="285" cy="358" r="4" fill="#a855f7" className="animate-pulse" />
        <circle cx="600" cy="425" r="3" fill="#06b6d4" className="animate-pulse" />
        <circle cx="485" cy="650" r="4" fill="#ec4899" className="animate-pulse" />
      </svg>
      
      {/* Strong gradient to fade out map on the left side so text is perfectly readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
};
