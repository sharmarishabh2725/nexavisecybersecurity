import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, Phone, ShieldCheck, User, Calendar, Briefcase, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [signupStep, setSignupStep] = useState(1);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [company, setCompany] = useState('');
  
  const [phone, setPhone] = useState('');
  const [phoneMode, setPhoneMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'signup' && signupStep === 1) {
      // Move to step 2 for additional info
      setSignupStep(2);
      return;
    }

    setLoading(true);

    try {
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY === 'YOUR_ANON_KEY_HERE') {
        throw new Error('Supabase ANON_KEY is missing in frontend/.env file!');
      }

      if (mode === 'signup' && signupStep === 2) {
        // Automatically assign 'visitor' role and store extra user_metadata
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { 
              role: 'visitor',
              full_name: fullName,
              age: age,
              company: company
            }
          }
        });
        if (error) throw error;
        if (data?.user?.identities?.length === 0) {
          throw new Error('Email is already registered!');
        }
        setSuccessMsg('Account created! Please check your email to verify (if enabled).');
        setTimeout(() => { window.location.href = '/'; }, 2000);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccessMsg('Welcome back! Redirecting to dashboard...');
        setTimeout(() => { window.location.href = '/'; }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setError('');
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY === 'YOUR_ANON_KEY_HERE') {
        throw new Error('Supabase ANON_KEY is missing in frontend/.env file!');
      }
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Failed to initialize Google login. Ensure API keys are set in your Supabase dashboard.');
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY === 'YOUR_ANON_KEY_HERE') {
        throw new Error('Supabase ANON_KEY is missing in frontend/.env file!');
      }
      const { error } = await supabase.auth.signInWithOtp({ phone });
      if (error) throw error;
      setSuccessMsg('OTP sent to your phone! (Assuming Twilio is configured in Supabase)');
    } catch (err: any) {
      setError(err.message || 'Failed to send SMS. Ensure Twilio is configured in your Supabase dashboard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex bg-white dark:bg-[#0a0e14]">
      {/* Left Pane - Branding & Graphic */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-50 dark:bg-black/20 overflow-hidden border-r border-black/5 dark:border-white/5">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="orb orb-blue w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[0] opacity-20" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShieldCheck className="w-16 h-16 text-cyan-500 mb-8" />
            <h1 className="text-4xl xl:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Secure Access to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cybersecurity Hub</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg">
              Join our network to access premium enterprise security tools, manage your vulnerabilities, and connect with our 24/7 SOC team.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"></div> Military Grade</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> End-to-End Encrypted</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="w-full max-w-md relative">
          <ScrollReveal>
            <div className="text-center mb-8 relative">
              {mode === 'signup' && signupStep === 2 && (
                <button 
                  onClick={() => setSignupStep(1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              )}
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                {mode === 'signin' ? 'Welcome Back' : (signupStep === 1 ? 'Create an Account' : 'Personal Details')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {mode === 'signin' ? 'Enter your credentials to access your dashboard.' : (signupStep === 1 ? 'Sign up to access the Nexavise security portal.' : 'Tell us a bit about yourself to complete registration.')}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-50 dark:bg-[#25D366]/10 border border-green-200 dark:border-[#25D366]/20 text-green-700 dark:text-[#25D366] p-4 rounded-xl flex items-center justify-center gap-3 mb-6 text-sm font-bold"
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <p>{successMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!successMsg && (
              <>
                {/* OAUTH & PHONE BUTTONS ONLY ON SIGNIN OR STEP 1 SIGNUP */}
                {(mode === 'signin' || (mode === 'signup' && signupStep === 1)) && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <button onClick={handleGoogleAuth} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-bold text-sm transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button onClick={() => { setPhoneMode(!phoneMode); setError(''); }} className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-bold text-sm transition-colors">
                        <Phone className="w-5 h-5 text-blue-500" />
                        Phone SMS
                      </button>
                    </div>

                    {phoneMode && (
                      <form onSubmit={handlePhoneAuth} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 mb-8">
                        <div>
                          <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="tel" 
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>
                        <button 
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold py-4 px-6 rounded-xl transition-colors mt-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                        >
                          {loading ? 'Sending...' : 'Send SMS Code'}
                        </button>
                      </form>
                    )}

                    {!phoneMode && (
                      <div className="relative flex items-center py-2 mb-8">
                        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Or continue with email</span>
                        <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                      </div>
                    )}
                  </>
                )}

                {/* Email Form with Multiple Steps */}
                {!phoneMode && (
                  <form onSubmit={handleEmailAuth} className="relative overflow-hidden w-full">
                    <AnimatePresence mode="wait" initial={false}>
                      {/* STEP 1: EMAIL & PASSWORD */}
                      {(mode === 'signin' || (mode === 'signup' && signupStep === 1)) && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                placeholder="you@company.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                                placeholder="••••••••"
                              />
                            </div>
                          </div>

                          <button 
                            disabled={loading}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white font-bold py-4 px-6 rounded-xl transition-colors mt-8 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 group"
                          >
                            <span>{loading ? 'Authenticating...' : (mode === 'signin' ? 'Sign In' : 'Next Step')}</span>
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                          </button>
                        </motion.div>
                      )}

                      {/* STEP 2: PERSONAL DETAILS (ONLY FOR SIGNUP) */}
                      {mode === 'signup' && signupStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Age</label>
                            <div className="relative">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input 
                                type="number" 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                                min="18"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Company / Work</label>
                            <div className="relative">
                              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input 
                                type="text" 
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                required
                                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                              />
                            </div>
                          </div>

                          <button 
                            disabled={loading}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white font-bold py-4 px-6 rounded-xl transition-colors mt-8 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 group"
                          >
                            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
                            {!loading && <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                )}

                {/* Toggle Mode */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                      onClick={() => { 
                        setMode(mode === 'signin' ? 'signup' : 'signin'); 
                        setSignupStep(1);
                        setError(''); 
                        setPhoneMode(false); 
                      }}
                      className="font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
