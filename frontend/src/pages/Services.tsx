import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";
import { groupedServices } from "../lib/services-data";
import { ScrollReveal } from "../components/ScrollReveal";

export const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-[1440px]">
        {/* Hero Section */}
        <ScrollReveal className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 text-gray-900 dark:text-white tracking-tight">
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cybersecurity Solutions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From strategic consulting and managed SOC to deep vulnerability assessments and compliance readiness, we secure every layer of your enterprise.
          </p>
        </ScrollReveal>

        {/* Categories and Services */}
        <div className="space-y-32">
          {Object.entries(groupedServices).map(([category, services]) => {
            // Determine an icon for the category header based on the category name
            let CategoryIcon = Icons.Shield;
            switch (category) {
              case "Consulting": CategoryIcon = Icons.Briefcase; break;
              case "VAPT": CategoryIcon = Icons.Crosshair; break;
              case "SOC": CategoryIcon = Icons.Activity; break;
              case "Training": CategoryIcon = Icons.GraduationCap; break;
              case "Compliance": CategoryIcon = Icons.FileCheck; break;
              case "Infrastructure": CategoryIcon = Icons.Server; break;
            }

            return (
              <div key={category} className="scroll-mt-32" id={category.toLowerCase()}>
                {/* Category Header */}
                <ScrollReveal className="flex items-center gap-4 mb-10 border-b border-gray-200 dark:border-white/5 pb-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400">
                    <CategoryIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">{category}</h2>
                    <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">{services.length} Specialized Services</p>
                  </div>
                </ScrollReveal>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, idx) => {
                    const ServiceIcon = (Icons[service.icon as keyof typeof Icons] || Icons.Shield) as React.ElementType;
                    
                    return (
                      <ScrollReveal
                        key={service.id}
                        delay={(idx % 6) * 0.1}
                      >
                        <Link to={`/services/${service.id}`} className="block h-full outline-none">
                          <div className="relative bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden group h-64 shadow-md dark:shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-300">
                            {/* Default State */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-center">
                              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/5 border border-cyan-100 dark:border-cyan-500/10 text-cyan-500 dark:text-cyan-400 w-14 h-14 flex items-center justify-center mb-5">
                                <ServiceIcon className="h-6 w-6" />
                              </div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                                {service.name}
                              </h3>
                            </div>

                            {/* Hover State (Slides in from left) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8 flex flex-col transform -translate-x-[105%] group-hover:translate-x-0 transition-all duration-500 ease-out z-10 opacity-0 group-hover:opacity-100">
                              <div className="flex items-center gap-3 mb-4">
                                <ServiceIcon className="h-6 w-6 text-cyan-100" />
                                <h3 className="text-lg font-bold leading-snug">
                                  {service.name}
                                </h3>
                              </div>
                              <p className="text-sm text-cyan-50 leading-relaxed overflow-y-auto custom-scrollbar pr-2 flex-grow">
                                {service.description}
                              </p>
                              <div className="mt-4 flex items-center text-sm font-bold text-white cursor-pointer group/btn">
                                Explore Details <Icons.ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
