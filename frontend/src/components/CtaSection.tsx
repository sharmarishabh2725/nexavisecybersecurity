export const CtaSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-[3rem] p-16 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-cyan-400 mb-6 tracking-tight">
            Looking for a custom project quote?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Submit your system architecture size, regulatory requirements, or penetration testing scope target, and receive a proposal within 4 hours.
          </p>
          <button className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-300 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
};
