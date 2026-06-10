import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    // Connect to the local backend server
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      // Check if this is the first time the user has visited in this session
      const isNewVisit = !sessionStorage.getItem('visited');
      socket.emit('register_visit', { isNewVisit });
      
      if (isNewVisit) {
        sessionStorage.setItem('visited', 'true');
      }
    });

    // Listen for real-time stats updates from the server
    socket.on('stats_update', (data) => {
      setVisitorCount(data.totalVisitors);
      setActiveUsers(data.activeUsers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <footer className="bg-background pt-20 pb-20 border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="col-span-1">
            <div className="flex items-center cursor-pointer mb-8">
              <img src="/logo.png" alt="Nexavise Consulting" className="h-32 w-auto object-contain scale-[2] origin-left dark:invert-0 dark:hue-rotate-0 invert hue-rotate-180 transition-all duration-300" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-[13px] leading-relaxed max-w-xs">
              Enterprise-grade cybersecurity consulting services protecting businesses worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-[13px] tracking-wider uppercase mb-8">SERVICES</h4>
            <ul className="space-y-5 text-[13px] text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Cybersecurity Consulting</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Penetration Testing (VAPT)</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Compliance Services</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">SOC as a Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Privacy Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-[13px] tracking-wider uppercase mb-8">COMPANY</h4>
            <ul className="space-y-5 text-[13px] text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Blog</a></li>
              <li><a href="/login" className="hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors font-bold">Admin Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold text-[13px] tracking-wider uppercase mb-8">LEGAL</h4>
            <ul className="space-y-5 text-[13px] text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-900 dark:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-black/5 dark:border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Nexavise Consulting. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Live Active Users */}
            <div className="flex items-center gap-2 bg-[#25D366]/10 px-4 py-2 rounded-full border border-[#25D366]/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-widest">Active Now:</span>
              <span className="text-[#25D366] text-sm font-mono font-bold tracking-wider">{activeUsers}</span>
            </div>
            
            {/* Total Global Visitors */}
            <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10">
              <span className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Total Visitors:</span>
              <span className="text-cyan-600 dark:text-cyan-400 text-sm font-mono font-bold tracking-wider">{visitorCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
