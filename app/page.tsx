import HeaderSection from "./components/HeaderSection";
import ProjectSection from "./components/ProjectSection";
import InternshipSection from "./components/InternshipSection";
import CertificateSection from "./components/CertificateSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeaderSection />
      <ProjectSection />
      <InternshipSection />
      <CertificateSection />
      <ContactSection />
    </main>
  );
}
