import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export const ScrollReveal = ({ children, delay = 0, className = "", id }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        const rect = entry.boundingClientRect;
        
        if (isIntersecting) {
          controls.start({ opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: "easeOut" } });
        } else {
          // If the element's top is above the viewport's top, it went out of view upwards.
          const isAbove = rect.top < 0;
          
          if (isAbove) {
            // Exiting from the top (scrolling down). Go to right.
            controls.start({ opacity: 0, x: 100, transition: { duration: 0.6, ease: "easeOut" } });
          } else {
            // Exiting from the bottom (scrolling up), or hasn't entered yet. Go to left.
            controls.start({ opacity: 0, x: -100, transition: { duration: 0.6, ease: "easeOut" } });
          }
        }
      },
      { threshold: 0.1, rootMargin: "-20px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls, delay]);

  return (
    <motion.div
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -100 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
