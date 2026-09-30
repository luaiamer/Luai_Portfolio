import Navbar from "@/components/layout/Navbar";
import BootLoader from "@/components/layout/BootLoader";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import CertificatesSection from "@/components/certificates/CertificatesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechStackSection from "@/components/arsenal/TechStackSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <BootLoader>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <CertificatesSection />
        <TechStackSection />
        <ContactSection />
      </main>
    </BootLoader>
  );
}
