import Navbar from "@/components/layout/Navbar";
import BootLoader from "@/components/layout/BootLoader";
import Hero from "@/components/hero/Hero";
import AboutSection from "@/components/about/AboutSection";
import CertificatesSection from "@/components/certificates/CertificatesSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TechStackSection from "@/components/arsenal/TechStackSection";
import ContactSection from "@/components/contact/ContactSection";
import { sections } from "@/lib/content";

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
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[40vh] items-center justify-center border-t border-line bg-bg px-6"
            aria-label={section.label}
          ></section>
        ))}
      </main>
    </BootLoader>
  );
}
