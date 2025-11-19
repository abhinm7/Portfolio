import HeaderSection from "./components/HeaderSection";

import ProjectSection from "./components/ProjectSection";
import InternshipSection from "./components/InternshipSection";

import ContactSection from "./components/ContactSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";

export default function Home() {
  return (
    <main className="w-full">

      <HeaderSection />
      <SkillsSection />
      <ProjectSection />
      <InternshipSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
