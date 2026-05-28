import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Hero from "../components/Hero";
import ProjectSection from "../components/ProjectSection";
import PlaygroundSection from "../components/PlaygroundSection";
import ExperienceSection from "../components/ExperienceSection";
import WritingSection from "../components/WritingSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import EasterEgg from "../components/EasterEgg";
import ScrollNudge from "../components/ScrollNudge";
import site from "../data/site.json";

const SECTIONS = ["home", "playground", "experience", "writing"];

export default function Home() {
  const [active, setActive] = useState("home");

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const externalUrls = {
    linkedin: site.socials.linkedin,
  };

  return (
    <div className="relative min-h-screen">
      <div className="paper-bg" aria-hidden />
      <Sidebar
        active={active}
        onNavigate={navigateTo}
        externalUrls={externalUrls}
        resumeUrl={site.resume}
      />
      <MobileNav
        active={active}
        onNavigate={navigateTo}
        externalUrls={externalUrls}
        resumeUrl={site.resume}
      />
      <CommandPalette onNavigate={navigateTo} />
      <EasterEgg />
      <ScrollNudge />

      <main className="relative z-10">
        <Hero />
        <ProjectSection />
        <PlaygroundSection />
        <ExperienceSection />
        <WritingSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
