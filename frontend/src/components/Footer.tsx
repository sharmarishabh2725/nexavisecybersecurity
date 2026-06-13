import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Mail } from 'lucide-react';

// Custom Linkedin Icon
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
// Custom Instagram Icon
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

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
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <footer className="bg-slate-100 dark:bg-[#0a0e14] pt-16 pb-16 border-t border-black/5 dark:border-white/5" style={{ zoom: 'var(--a11y-scale, 1)' } as React.CSSProperties}>
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Total Visitors Top Center */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Total Visitors:</span>
            <span className="text-gray-900 dark:text-white text-sm font-mono font-bold tracking-wider">{visitorCount.toLocaleString()}</span>
          </div>
        </div>

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
              <li><a href="/login" className="hover:text-gray-900 dark:text-white transition-colors font-bold">Admin Portal</a></li>
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
        <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Nexavise Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2.5 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 group">
              <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors p-2.5 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 group">
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:nexaviseconsulting@gmail.com" className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2.5 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 group">
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};
