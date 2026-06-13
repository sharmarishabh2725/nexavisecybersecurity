import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AccessibilityBar = () => {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Handle font size adjustments
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--a11y-scale', String(1 + (fontSizeOffset * 0.1)));
  }, [fontSizeOffset]);

  const handleDecreaseFont = () => setFontSizeOffset(prev => Math.max(prev - 1, -2));
  const handleResetFont = () => setFontSizeOffset(0);
  const handleIncreaseFont = () => setFontSizeOffset(prev => Math.min(prev + 2, 3));

  return (
    <>
      {/* Skip to Main Content Link (WCAG requirement) */}
      <a 
        href="#main-content" 
        className="fixed left-4 -translate-y-20 focus:translate-y-4 transition-transform bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background z-[100]"
      >
        Skip to main content
      </a>

      {/* Floating Right Widget */}
      <div 
        className="fixed right-0 top-[100px] z-[100] flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zoom: 'var(--a11y-scale, 1)' } as React.CSSProperties}
      >
        <div className="flex items-center bg-white dark:bg-[#0a0e14] border border-r-0 border-black/10 dark:border-white/10 shadow-2xl rounded-l-2xl overflow-hidden backdrop-blur-xl">
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center overflow-hidden whitespace-nowrap pl-2 space-x-1"
              >
                <button 
                  onClick={handleDecreaseFont}
                  aria-label="Decrease Font Size"
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset < 0 ? 'bg-black/5 dark:bg-white/10 text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                  A-
                </button>
                <button 
                  onClick={handleResetFont}
                  aria-label="Reset Font Size"
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset === 0 ? 'bg-black/5 dark:bg-white/10 text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                  A
                </button>
                <button 
                  onClick={handleIncreaseFont}
                  aria-label="Increase Font Size"
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${fontSizeOffset > 0 ? 'bg-black/5 dark:bg-white/10 text-primary' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                  A+
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="w-12 h-12 flex items-center justify-center font-bold text-lg text-gray-800 dark:text-gray-200 cursor-pointer">
            Aa
          </div>
        </div>
      </div>
    </>
  );
};
