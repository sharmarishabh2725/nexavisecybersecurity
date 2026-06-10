import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Helmet } from "react-helmet-async";
import { IndiaMap } from "../components/IndiaMap";
import { motion, AnimatePresence } from "framer-motion";

export const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <Helmet>
        <title>Contact | Nexavise</title>
        <meta name="description" content="Get in touch with Nexavise for enterprise cybersecurity solutions." />
      </Helmet>
      
      <div className="absolute inset-0 z-[0] cyber-grid opacity-20 pointer-events-none" />
      <div className="orb orb-blue w-[500px] h-[500px] top-[10%] right-[-100px] z-[0] opacity-30" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <ScrollReveal className="text-center lg:text-left mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto lg:mx-0">
            Ready to secure your digital infrastructure? Our team of cybersecurity experts is standing by to discuss your needs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Form + Contact Details */}
          <div className="flex flex-col gap-8">
            {/* Contact Form */}
            <ScrollReveal 
              className="bg-white/80 dark:bg-[#0a0e14]/80 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-2xl relative z-20"
            >
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">Send a Message</h2>
              
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 dark:bg-[#25D366]/10 border border-green-200 dark:border-[#25D366]/20 text-green-700 dark:text-[#25D366] p-4 rounded-xl flex items-center gap-3 mb-6"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Message sent successfully! We'll be in touch soon.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 mb-6"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">Failed to send message. Please ensure the database is running.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Message</label>
                  <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full min-h-[120px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white font-bold py-4 px-6 rounded-xl transition-colors mt-4 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                >
                  <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </ScrollReveal>

            {/* Smaller Contact Details Under Form */}
            <ScrollReveal delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Email Us</h3>
                <a href="mailto:nexaviseconsulting@gmail.com" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 transition-colors break-all">nexaviseconsulting@gmail.com</a>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Call Us</h3>
                <a href="tel:+919720772035" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 transition-colors">+91 9720772035</a>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-[#0a0e14]/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Visit Us</h3>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">Mumbai, India</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Animated India Map */}
          <div className="hidden lg:flex items-center justify-center relative h-[700px] z-10">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-[120%] right-[-25%] h-full flex items-center justify-center"
            >
              <IndiaMap className="w-full h-auto text-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};
