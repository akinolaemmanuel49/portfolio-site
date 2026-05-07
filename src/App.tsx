import { useState, useEffect, useRef, useMemo } from "react";
import {
  developer,
  experiences,
  projects,
  skills,
  tagline,
} from "./shared/data";
import { Footer } from "./components/Footer";
import { ThemeButton } from "./components/ThemeButton";
import { Projects } from "./components/Projects";
import type { Star } from "./shared/types";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Nav } from "./components/Nav";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;

    // system preference fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // Stars data — generated once
  const stars: Star = useMemo(() => {
    const generateStars = (
      count: number,
      minSize: number,
      maxSize: number,
      opacity: number,
    ) =>
      Array.from({ length: count }, (_, i) => ({
        id: `star-${i}`,
        size: minSize + Math.random() * (maxSize - minSize),
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 3 + Math.random() * 7,
        opacity,
      }));

    const generateShooting = (count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: `shooting-${i}`,
        top: 5 + Math.random() * 70,
        left: Math.random() * 100,
        delay: i * 0,
        duration: 1.2 + Math.random() * 1.5,
      }));

    return {
      large: generateStars(35, 1, 3, 0.5),
      medium: generateStars(80, 1.5, 4, 0.7),
      small: generateStars(140, 0.8, 2.5, 0.9),
      shooting: generateShooting(20),
    };
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      {/* Theme button positioned in top-right corner */}
      <div className="fixed top-20 right-4 z-50">
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>

      {/* Navigation */}
      <Nav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        developer={developer}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Hero Section */}
      <Hero
        sectionsRef={sectionsRef}
        stars={stars}
        developer={developer}
        tagline={tagline}
        scrollToSection={scrollToSection}
      />

      {/* Skills Section */}
      <Skills
        sectionsRef={sectionsRef}
        skills={skills}
        activeSection={activeSection}
      />

      {/* Experience Section */}
      <Experience sectionsRef={sectionsRef} experiences={experiences} />

      {/* Projects Section */}
      <Projects projects={projects} sectionsRef={sectionsRef} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
