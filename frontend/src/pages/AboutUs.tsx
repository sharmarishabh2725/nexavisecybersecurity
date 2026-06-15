import { motion } from "framer-motion";
import { useData } from "../contexts/DataContext";
import { Helmet } from "react-helmet-async";
import { ScrollReveal } from "../components/ScrollReveal";

export const AboutUs = () => {
  const { aboutInfo, teamMembers, loading } = useData();

  if (loading) return <div className="min-h-screen bg-white dark:bg-[#0a0e14] pt-32"></div>;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0e14]">
      <Helmet>
        <title>About Us | Nexavise</title>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-50 dark:bg-[#05080c] border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 z-[0] cyber-grid opacity-20 dark:opacity-10 pointer-events-none" />
        <div className="orb orb-cyan w-[800px] h-[800px] top-[-300px] right-[-200px] z-[0] opacity-30 dark:opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-6">
              {aboutInfo?.title || 'About Nexavise'}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {aboutInfo?.description || 'We are dedicated to providing the highest level of enterprise cybersecurity solutions globally.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-display mb-4">
                Our Leadership
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Meet the experts who drive our vision and secure the future of our clients.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers?.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <div className="max-w-[340px] mx-auto w-full bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl group hover:border-cyan-500/50 transition-all duration-300">
                  <div className="aspect-[4/5] transition-all duration-500 ease-in-out overflow-hidden relative">
                    <img 
                      src={member.image_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80'} 
                      alt={member.name}
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1 group-hover:text-cyan-500 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          {(!teamMembers || teamMembers.length === 0) && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No team members found. Add some in the Admin Dashboard!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
