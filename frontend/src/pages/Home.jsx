import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div
      className="min-h-screen selection:bg-[#7c3aed]/30 selection:text-white"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
