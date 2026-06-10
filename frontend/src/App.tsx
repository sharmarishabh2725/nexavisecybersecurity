import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AccessibilityBar } from "./components/AccessibilityBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Sectors } from "./pages/Sectors";
import { SectorDetail } from "./pages/SectorDetail";
import { WhyUs } from "./pages/WhyUs";
import { Login } from "./pages/Login";
import { Helmet } from 'react-helmet-async';
import { CustomCursor } from "./components/CustomCursor";
import { LocationProvider } from "./contexts/LocationContext";
import { LocationModal } from "./components/LocationModal";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden selection:bg-cyan-500/30 transition-colors duration-300">
        <Helmet>
        <title>Nexavise | Enterprise Cybersecurity Hub</title>
        <meta name="description" content="Comprehensive GRC advisory, VAPT testing, and managed SOC." />
      </Helmet>
      
      <CustomCursor />
      <AccessibilityBar />
      <Navbar />
      <LocationModal />
      <WhatsAppWidget />

      <main id="main-content" className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/sectors/:sectorId" element={<SectorDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
    </LocationProvider>
    </AuthProvider>
  );
}

export default App;
