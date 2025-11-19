import ContactSection from "./components/sections/ContactSection";
import EducationSection from "./components/sections/EducationSection";
import HeaderSection from "./components/sections/HeaderSection";
import InternshipSection from "./components/sections/InternshipSection";
import ProjectSection from "./components/sections/ProjectSection";
import SkillsSection from "./components/sections/SkillsSection";


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
