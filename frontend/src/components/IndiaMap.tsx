import India from "@svg-maps/india";
import { motion } from "framer-motion";

export const IndiaMap = ({ className }: { className?: string }) => {
  // Approximate coordinates for Mumbai in this specific viewBox
  const mumbaiX = 155; 
  const mumbaiY = 435;

  return (
    <div className={`relative ${className || 'w-full max-w-[500px] mx-auto'}`}>
      <svg 
        viewBox={India.viewBox} 
        className="w-full h-auto drop-shadow-sm dark:drop-shadow-lg"
        fill="currentColor"
      >
        <g className="india-states">
          {India.locations.map((location: any) => (
            <path
              key={location.id}
              id={location.id}
              name={location.name}
              d={location.path}
              className="fill-gray-200 dark:fill-white/10 stroke-gray-300 dark:stroke-white/20 hover:fill-gray-300 dark:hover:fill-white/20 hover:stroke-gray-400 dark:hover:stroke-white/30 transition-colors duration-300 stroke-[1]"
            />
          ))}
        </g>

        {/* Mumbai Marker Animation */}
        <g>
          {/* Pulsating outer ring */}
          <motion.circle
            cx={mumbaiX}
            cy={mumbaiY}
            r="12"
            fill="currentColor"
            className="text-gray-900 dark:text-gray-200/40 dark:text-white/20"
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner dot */}
          <circle
            cx={mumbaiX}
            cy={mumbaiY}
            r="4"
            className="fill-gray-900 dark:fill-white"
          />
          {/* Label */}
          <text 
            x={mumbaiX + 15} 
            y={mumbaiY + 5} 
            className="fill-gray-900 dark:fill-white text-[18px] font-bold font-display uppercase tracking-widest drop-shadow-sm"
          >
            Mumbai
          </text>
          
          <path 
            d={`M${mumbaiX+12},${mumbaiY} L${mumbaiX+30},${mumbaiY-20} L${mumbaiX+120},${mumbaiY-20}`}
            fill="none"
            className="stroke-gray-900 dark:stroke-white stroke-[2]"
          />
          <text
            x={mumbaiX + 125}
            y={mumbaiY - 25}
            className="fill-gray-900 dark:fill-white text-[12px] font-bold font-mono tracking-wider"
          >
            HQ // ACTIVE
          </text>
        </g>
      </svg>
    </div>
  );
};
