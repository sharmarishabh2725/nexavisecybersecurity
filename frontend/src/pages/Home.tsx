import { HeroSection } from "../components/HeroSection";
import { GatewaySection } from "../components/GatewaySection";
import { WhySection } from "../components/WhySection";
import { CtaSection } from "../components/CtaSection";
import { ScrollReveal } from "../components/ScrollReveal";

export const Home = () => {

  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <GatewaySection />
      </ScrollReveal>
      <ScrollReveal>
        <WhySection />
      </ScrollReveal>
      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </>
  );
};
