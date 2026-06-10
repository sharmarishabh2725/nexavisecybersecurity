import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Shield, Activity, FileText } from "lucide-react";
import * as Icons from "lucide-react";
import { allServicesData } from "../lib/services-data";

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isEvenCycle = (currentIndex / 2) % 2 === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % allServicesData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute inset-0 z-[1] cyber-grid opacity-20 pointer-events-none" />
      
      <div className="orb orb-blue w-[800px] h-[800px] -top-[200px] -left-[200px] z-[1] opacity-50" />

      <div className="container mx-auto px-6 relative z-10 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-8"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>NEXT-GEN CYBERSECURITY HUB</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white"
            >
              Enterprise-Grade <br />
              Cybersecurity & <br />
              <span className="text-cyan-400">Compliance</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mb-10 leading-relaxed font-medium"
            >
              Comprehensive GRC advisory, VAPT testing, managed SOC, privacy regulations compliance, and active threat telemetry. 53 custom cyber services unified into one predictive portal.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-400 text-black font-bold text-[15px] hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Explore 53 Services <ArrowRight className="h-4 w-4" />
              </button>
              <button className="px-8 py-3.5 rounded-full bg-transparent text-gray-900 dark:text-white font-bold text-[15px] border border-white/20 hover:bg-black/5 dark:bg-white/5 transition-colors">
                Live Command Center
              </button>
            </motion.div>

            {/* Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-lg">
                <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">ISO CERTIFIED</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">27001 & 27701</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-lg">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">AUDIT ATTESTED</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">SOC 2 Type II</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-lg">
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">PRIVACY READY</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">GDPR & DPDP</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-lg">
                <div className="h-12 w-12 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-teal-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-wider mb-1.5">THREAT DETECTION</p>
                  <p className="text-gray-900 dark:text-white font-bold text-sm">99.9% Mitigated</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Visuals) */}
          <div className="relative block h-[450px] lg:h-[600px] w-full mt-12 lg:mt-0">
            {/* Expanding Concentric rings (Radar Waves) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
               <ShieldCheck className="w-16 h-16 text-cyan-400 opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
            
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.1)] w-[200px] h-[200px]"
                initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: [1, 1.25, 3.5], opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.1, 1],
                  delay: i * (4/3),
                }}
              />
            ))}

            {/* Rotating Top Card (Service 1) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`wrapper1-${currentIndex}`}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-10 ${isEvenCycle ? 'left-0' : 'right-0'} w-full max-w-[300px] sm:max-w-[340px] z-20`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-[#0a0e14]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      {(() => {
                        const IconComponent = (Icons[allServicesData[currentIndex].icon as keyof typeof Icons] || Icons.Shield) as React.ElementType;
                        return <IconComponent className="h-5 w-5 text-cyan-400" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{allServicesData[currentIndex].category}</h3>
                      <h4 className="text-sm text-gray-900 dark:text-white font-bold leading-tight mt-1">{allServicesData[currentIndex].name}</h4>
                    </div>
                  </div>
                  
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 mt-4 border border-black/5 dark:border-white/5">
                    <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {allServicesData[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Rotating Bottom Card (Service 2) */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`wrapper2-${currentIndex}`}
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={`absolute bottom-10 ${isEvenCycle ? 'right-0' : 'left-0'} w-full max-w-[300px] sm:max-w-[340px] z-20`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-[#0a0e14]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                      {(() => {
                        const IconComponent = (Icons[allServicesData[(currentIndex + 1) % allServicesData.length].icon as keyof typeof Icons] || Icons.Shield) as React.ElementType;
                        return <IconComponent className="h-5 w-5 text-cyan-400" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{allServicesData[(currentIndex + 1) % allServicesData.length].category}</h3>
                      <h4 className="text-sm text-gray-900 dark:text-white font-bold leading-tight mt-1">{allServicesData[(currentIndex + 1) % allServicesData.length].name}</h4>
                    </div>
                  </div>
                  
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 mt-4 border border-black/5 dark:border-white/5">
                    <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {allServicesData[(currentIndex + 1) % allServicesData.length].description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};
