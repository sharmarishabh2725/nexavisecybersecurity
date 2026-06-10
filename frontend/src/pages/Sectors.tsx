import { Link } from "react-router-dom";
import { Building2, Landmark, HeartPulse, Cpu, Plane, ShoppingCart } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export const Sectors = () => {
  const sectors = [
    { id: "finance", name: "Financial Services", icon: <Landmark className="h-8 w-8" />, desc: "Protecting critical financial infrastructure and ensuring regulatory compliance." },
    { id: "healthcare", name: "Healthcare", icon: <HeartPulse className="h-8 w-8" />, desc: "Securing patient data and maintaining HIPAA compliance in medical systems." },
    { id: "technology", name: "Technology", icon: <Cpu className="h-8 w-8" />, desc: "Securing intellectual property and software supply chains for tech innovators." },
    { id: "government", name: "Government", icon: <Building2 className="h-8 w-8" />, desc: "Defending public sector networks against advanced persistent threats." },
    { id: "aerospace", name: "Aerospace & Defense", icon: <Plane className="h-8 w-8" />, desc: "Military-grade cybersecurity for mission-critical operations and assets." },
    { id: "retail", name: "Retail & E-commerce", icon: <ShoppingCart className="h-8 w-8" />, desc: "Protecting consumer data and preventing payment fraud in digital retail." },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Services by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sectors</span></h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We provide specialized cybersecurity solutions tailored to the unique threats and compliance requirements of your industry.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <ScrollReveal
              key={sector.id}
              delay={idx * 0.1}
            >
              <Link to={`/sectors/${sector.id}`} className="block h-full">
                <div className="bg-white dark:bg-[#0a0e14] border border-black/5 dark:border-white/5 hover:border-cyan-500/30 p-8 rounded-3xl transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] group h-full">
                  <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-500 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">{sector.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};
