import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tooltip Component for Accessible descriptions
const Tooltip = ({ children, content }: { children: ReactNode, content: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 whitespace-nowrap bg-foreground text-background text-[11px] font-medium px-2.5 py-1.5 rounded-md shadow-lg z-[100] pointer-events-none"
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AccessibilityBar = () => {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  // Handle font size adjustments
  useEffect(() => {
    const root = document.documentElement;
    // Base font size is 14px as per index.css, scaling proportionally via percentages
    const baseSize = 100; 
    const newSize = baseSize + (fontSizeOffset * 10);
    root.style.fontSize = `${newSize}%`;
  }, [fontSizeOffset]);

  const handleDecreaseFont = () => setFontSizeOffset(prev => Math.max(prev - 1, -2));
  const handleResetFont = () => setFontSizeOffset(0);
  const handleIncreaseFont = () => setFontSizeOffset(prev => Math.min(prev + 2, 3));

  return (
    <div className="w-full bg-card border-b border-black/5 dark:border-white/5 py-1.5 px-4 sm:px-6 relative z-[100] text-foreground transition-colors duration-300" role="toolbar" aria-label="Accessibility Settings">
      <div className="max-w-[1440px] mx-auto flex items-center justify-end text-xs font-medium">
        
        {/* Skip to Main Content Link (WCAG requirement) */}
        <a 
          href="#main-content" 
          className="absolute left-4 -translate-y-20 focus:translate-y-0 transition-transform bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background z-[100]"
        >
          Skip to main content
        </a>



        {/* Right Side Controls */}
        <div className="flex items-center space-x-1 sm:space-x-3">

          {/* Font Size Controls */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-full p-0.5">
            <Tooltip content="Decrease Font Size">
              <button 
                onClick={handleDecreaseFont}
                aria-label="Decrease Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset < 0 ? 'bg-card shadow-sm text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
              >
                A-
              </button>
            </Tooltip>
            
            <Tooltip content="Reset Font Size">
              <button 
                onClick={handleResetFont}
                aria-label="Reset Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset === 0 ? 'bg-card shadow-sm text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
              >
                A
              </button>
            </Tooltip>

            <Tooltip content="Increase Font Size">
              <button 
                onClick={handleIncreaseFont}
                aria-label="Increase Font Size"
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset > 0 ? 'bg-card shadow-sm text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
              >
                A+
              </button>
            </Tooltip>
          </div>



        </div>
      </div>
    </div>
  );
};
