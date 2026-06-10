import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919720772035"; // Indian country code + number
  const name = "Astik Saxena";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi ${name}, I am interested in Nexavise's cybersecurity services and would like to connect.`)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl mb-4 w-72 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Nexavise Support</h4>
                  <p className="text-white/80 text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    Typically replies instantly
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-5 bg-gray-50 dark:bg-[#0f151f] flex flex-col gap-4">
              <div className="bg-white dark:bg-[#1a2235] p-3 rounded-xl rounded-tl-sm border border-gray-100 dark:border-white/5 shadow-sm inline-block self-start max-w-[90%] relative">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Hi there! 👋 I'm <strong>{name}</strong> from Nexavise. How can I help you secure your digital infrastructure today?
                </p>
                <span className="text-[10px] text-gray-400 mt-2 block text-right">Just now</span>
              </div>
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#25D366]/20 mt-2 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Start Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebd5a] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 text-white transition-colors relative z-50 group"
        aria-label="Contact us on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="group-hover:scale-110 transition-transform"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
        
        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-[#0a0e14] rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
};
