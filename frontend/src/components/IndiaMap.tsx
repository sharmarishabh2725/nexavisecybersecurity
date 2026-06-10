import India from "@svg-maps/india";
import { motion } from "framer-motion";

export const IndiaMap = ({ className }: { className?: string }) => {
  // Approximate coordinates for Mumbai in this specific viewBox
  const mumbaiX = 155; 
  const mumbaiY = 435;

  return (
    <div className={`relative opacity-80 hover:opacity-100 transition-opacity duration-500 ${className || 'w-full max-w-[500px] mx-auto'}`}>
      <svg 
        viewBox={India.viewBox} 
        className="w-full h-auto drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] dark:drop-shadow-[0_0_20px_rgba(34,211,238,0.15)]"
        fill="currentColor"
      >
        <g className="india-states">
          {India.locations.map((location: any, index: number) => (
            <motion.path
              key={location.id}
              id={location.id}
              name={location.name}
              d={location.path}
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: index * 0.02, ease: "easeOut" }}
              className="text-transparent dark:text-[#0f151f] stroke-cyan-400/60 dark:stroke-cyan-500/30 hover:fill-cyan-50 dark:hover:fill-cyan-500/20 hover:stroke-cyan-400 transition-all duration-300 stroke-[1]"
            />
          ))}
        </g>

        {/* Mumbai Marker Animation */}
        <motion.g 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          {/* Pulsating outer ring */}
          <motion.circle
            cx={mumbaiX}
            cy={mumbaiY}
            r="12"
            fill="currentColor"
            className="text-cyan-500/40 dark:text-cyan-400/20"
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner dot */}
          <circle
            cx={mumbaiX}
            cy={mumbaiY}
            r="4"
            className="fill-cyan-600 dark:fill-cyan-400"
          />
          {/* Label */}
          <text 
            x={mumbaiX + 15} 
            y={mumbaiY + 5} 
            className="fill-cyan-600 dark:fill-cyan-400 text-[18px] font-bold font-display uppercase tracking-widest dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          >
            Mumbai
          </text>
          
          <motion.path 
            d={`M${mumbaiX+12},${mumbaiY} L${mumbaiX+30},${mumbaiY-20} L${mumbaiX+120},${mumbaiY-20}`}
            fill="none"
            className="stroke-cyan-500 dark:stroke-cyan-500/50 stroke-[2] dark:stroke-[1.5]"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          />
          <motion.text
            x={mumbaiX + 125}
            y={mumbaiY - 25}
            className="fill-cyan-700 dark:fill-cyan-100 text-[12px] font-bold dark:font-normal font-mono tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            HQ // ACTIVE
          </motion.text>
        </motion.g>
      </svg>
    </div>
  );
};
