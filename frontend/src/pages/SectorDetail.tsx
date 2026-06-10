import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Network } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

export const SectorDetail = () => {
  const { sectorId } = useParams();

  // Simple mock data for sectors
  const sectorData: Record<string, { name: string; desc: string; features: string[] }> = {
    finance: {
      name: "Financial Services",
      desc: "Robust cybersecurity frameworks for banks, investment firms, and fintech companies to protect sensitive financial data and ensure compliance with strict regulations.",
      features: ["PCI-DSS Compliance", "Real-time Transaction Monitoring", "Fraud Detection & Prevention", "Secure Cloud Migration"]
    },
    healthcare: {
      name: "Healthcare",
      desc: "Protecting patient records, medical devices, and hospital networks from ransomware and breaches while maintaining strict HIPAA compliance.",
      features: ["HIPAA Compliance Assessments", "Medical Device Security", "Ransomware Defense", "EHR System Protection"]
    },
    technology: {
      name: "Technology",
      desc: "Securing the software development lifecycle, protecting intellectual property, and ensuring cloud infrastructure resilience for tech companies.",
      features: ["DevSecOps Integration", "Source Code Audits", "Cloud Architecture Review", "API Security Testing"]
    },
    government: {
      name: "Government",
      desc: "Defending national infrastructure, public sector networks, and citizen data from state-sponsored attacks and advanced persistent threats.",
      features: ["Zero Trust Architecture", "FISMA/FedRAMP Compliance", "Threat Intelligence", "Incident Response & Forensics"]
    },
    aerospace: {
      name: "Aerospace & Defense",
      desc: "Military-grade security protocols for defense contractors and aerospace organizations, securing classified information and mission-critical systems.",
      features: ["CMMC Compliance", "Supply Chain Security", "ICS/SCADA Protection", "Advanced Threat Hunting"]
    },
    retail: {
      name: "Retail & E-commerce",
      desc: "Safeguarding consumer data, securing e-commerce platforms, and maintaining uptime during peak retail seasons.",
      features: ["Payment Gateway Security", "DDoS Mitigation", "Customer Data Privacy", "Third-party Risk Management"]
    }
  };

  const data = sectorData[sectorId as string] || {
    name: "Sector Not Found",
    desc: "The requested sector could not be found.",
    features: []
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <Link to="/sectors" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sectors
        </Link>
        
        <ScrollReveal className="mb-16 bg-white dark:bg-[#0a0e14] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/5 shadow-lg dark:shadow-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{data.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Security</span></h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            {data.desc}
          </p>
        </ScrollReveal>

        {data.features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.features.map((feature, idx) => {
              const icons = [<Shield />, <Lock />, <Eye />, <Network />];
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex items-start gap-4 p-8 bg-white dark:bg-[#0a0e14] rounded-2xl border border-gray-200 dark:border-white/5 shadow-md dark:shadow-none hover:border-cyan-500/30 transition-all hover:shadow-lg h-full"
                >
                  <div className="text-cyan-500 mt-1">
                    {icons[idx % icons.length]}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tailored implementation for the {data.name.toLowerCase()} industry to ensure maximum resilience and compliance.</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
