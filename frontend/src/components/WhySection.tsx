import { ShieldCheck, Award, Zap, Users } from "lucide-react";

export const WhySection = () => {
  return (
    <section className="py-24 bg-background border-b border-gray-200 dark:border-white/5 relative">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-8">
              WHY NEXAVISE CONSULTING
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
              Enterprise <br />
              Resilience <br />
              <span className="text-cyan-400">Simplified</span>
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 leading-relaxed">
              We translate complex regulatory mandates and security vulnerabilities into clear operational checklists. Secure your databases, harden your networks, and maintain robust audit readiness with confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-cyan-400 mb-2">500+</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CLIENTS SECURED</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-[#b48eed] mb-2">99.98%</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ATTACK BLOCKS</span>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 text-center flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-gray-900 dark:text-white mb-2">15+ Yrs</span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">EXPERIENCE</span>
              </div>
            </div>
          </div>

          {/* Right Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Global Compliance Excellence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                End-to-end framework readiness and certification support mapping directly to ISO 27001, GDPR, and India's DPDP Act 2023.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Vetted Industry Veterans</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Our consultants have decades of combined security experience serving finance, healthcare, and enterprise software clients globally.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Rapid Attack Mitigation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                24/7/365 managed SOC capability with rapid alert containment SLA to defend and isolate endpoints within minutes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0e14] border border-gray-200 shadow-sm dark:shadow-none dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Continuous Staff Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Customized security training programs and staff augmentation services to keep your internal teams sharp and fully resourced.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
