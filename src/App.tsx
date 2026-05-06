import { useState, useEffect, useRef, useMemo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  developer,
  experiences,
  projects,
  skills,
  tagline,
} from "./shared/data";
import { Footer } from "./components/Footer";
import { ThemeButton } from "./components/ThemeButton";

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
  const stars = useMemo(() => {
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
        top: 20 + Math.random() * 60,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 2 + Math.random() * 3,
      }));

    return {
      large: generateStars(20, 1, 3, 0.4),
      medium: generateStars(40, 1.5, 4, 0.6),
      small: generateStars(60, 0.8, 2.5, 0.8),
      shooting: generateShooting(3),
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
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="hidden md:block text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
              aria-label="Go to home section"
            >
              {developer.name}
            </button>

            <button
              onClick={() => scrollToSection("hero")}
              className={`md:hidden flex items-center gap-2 transition-colors ${
                activeSection === "hero"
                  ? "text-cyan-400"
                  : "text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              aria-label="Go to home section"
            >
              <span className="px-3.75">Home</span>
            </button>

            <div
              className="hidden md:flex gap-6"
              role="navigation"
              aria-label="Main navigation"
            >
              {["skills", "experience", "projects"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-cyan-400"
                      : "text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  aria-label={`Go to ${section} section`}
                  aria-current={activeSection === section ? "page" : undefined}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col gap-4">
                {["skills", "experience", "projects"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize text-left py-2 px-4 rounded-lg transition-colors ${
                      activeSection === section
                        ? "text-cyan-400 bg-slate-800 dark:bg-slate-800"
                        : "text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                    aria-label={`Go to ${section} section`}
                    aria-current={
                      activeSection === section ? "page" : undefined
                    }
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={(el) => {
          sectionsRef.current["hero"] = el;
        }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16"
      >
        {/* Stars background - now visible in both modes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large stars */}
          <div className="absolute inset-0">
            {stars.large.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  opacity: star.opacity,
                  boxShadow: `0 0 12px 4px rgba(96, 165, 250, 0.7)`,
                }}
              />
            ))}
          </div>

          {/* Medium stars */}
          <div className="absolute inset-0">
            {stars.medium.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full animate-twinkle"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  background: `radial-gradient(circle, rgba(34,211,238,0.9) 0%, rgba(59,130,246,0.6) 50%, transparent 70%)`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>

          {/* Small sparkling stars */}
          <div className="absolute inset-0">
            {stars.small.map((star) => (
              <div
                key={star.id}
                className="absolute bg-cyan-300 rounded-full animate-sparkle"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  boxShadow: `
                    0 0 8px 2px rgba(34, 211, 238, 0.9),
                    0 0 14px 4px rgba(59, 130, 246, 0.7)
                  `,
                  opacity: star.opacity,
                }}
              />
            ))}
          </div>

          {/* Shooting stars - adjusted for light mode visibility */}
          <div className="absolute inset-0">
            {stars.shooting.map((star) => (
              <div
                key={star.id}
                className="absolute bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-shooting-star"
                style={{
                  width: "140px",
                  height: "2px",
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  opacity: 0.7,
                  // Add a subtle white glow in light mode
                  filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-20 text-center px-4 sm:px-6 animate-fade-in rounded-2xl p-6 sm:p-8 md:p-12 mx-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-blue-500 to-teal-400 bg-clip-text text-transparent animate-slide-up">
            {developer.name}
          </h1>
          <p
            className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-gray-300 mb-6 sm:mb-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {developer.description}
          </p>
          <p
            className="text-base sm:text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-12 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {tagline}
          </p>
          <div
            className="flex gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 dark:bg-slate-800/80 hover:bg-cyan-500 transition-all hover:scale-110 duration-300 backdrop-blur-sm rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 text-slate-800 dark:text-white"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/80 dark:bg-slate-800/80 hover:bg-blue-500 transition-all hover:scale-110 duration-300 backdrop-blur-sm rounded-lg hover:shadow-lg hover:shadow-blue-500/30 text-slate-800 dark:text-white"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href={`mailto:${developer.email}`}
              className="p-3 bg-white/80 dark:bg-slate-800/80 hover:bg-teal-500 transition-all hover:scale-110 duration-300 backdrop-blur-sm rounded-lg hover:shadow-lg hover:shadow-teal-500/30 text-slate-800 dark:text-white"
              aria-label="Send email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
          <button
            onClick={() => scrollToSection("skills")}
            className="animate-bounce hover:scale-110 transition-transform"
            aria-label="Scroll to skills section"
          >
            <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </button>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={(el) => {
          sectionsRef.current.skills = el;
        }}
        className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <Code2
              className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Skills & Expertise
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {skill.name}
                  </h3>
                  <span className="text-xs sm:text-sm text-cyan-400 bg-cyan-400/10 px-2 sm:px-3 py-1 self-start sm:self-auto">
                    {skill.category}
                  </span>
                </div>
                <div className="relative h-2 sm:h-3 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                    style={{
                      width:
                        activeSection === "skills" ? `${skill.level}%` : "0%",
                    }}
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}%`}
                  />
                </div>
                <div className="mt-2 text-right text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {skill.level}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={(el) => {
          sectionsRef.current.experience = el;
        }}
        className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 bg-slate-100/50 dark:bg-slate-800/30"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <Briefcase
              className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Work Experience
            </h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-cyan-400 to-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-700 dark:text-gray-300">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Briefcase
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base">{exp.period}</span>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                  {exp.description}
                </p>

                <div className="space-y-6">
                  {exp.achievements.map((ach, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-base sm:text-lg font-semibold text-cyan-500 dark:text-cyan-300">
                        {ach.product}
                      </h4>
                      <ul className="space-y-2 pl-2">
                        {ach.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-slate-600 dark:text-gray-300 text-sm sm:text-base"
                          >
                            <span className="text-cyan-400 mt-1.5 shrink-0">
                              ▹
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={(el) => {
          sectionsRef.current.projects = el;
        }}
        className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8 sm:mb-12">
            <Code2
              className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400"
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Featured Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <article
                key={index}
                className="group relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white dark:from-slate-900 to-transparent opacity-60" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row gap-2 justify-between">
                    {project.liveUrl && (
                      <button
                        className="flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all text-sm sm:text-base cursor-pointer"
                        aria-label={`View ${project.title} project`}
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}

                    {project.githubUrl && (
                      <button
                        className="flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all text-sm sm:text-base cursor-pointer"
                        aria-label={`View ${project.title} project github`}
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <span>View Github</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
