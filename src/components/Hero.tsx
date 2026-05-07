import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import type { Developer, Star } from "../shared/types";
import { TypewriterText } from "../shared/components/TypewriterText";

export function Hero({
  sectionsRef,
  stars,
  developer,
  tagline,
  scrollToSection,
}: {
  sectionsRef: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
  stars: Star;
  developer: Developer;
  tagline: string;
  scrollToSection: (sectionId: string) => void;
}) {
  return (
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
        <TypewriterText
          text={developer.name}
          speed={150}
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-8xl
            font-bold
            mb-6
            bg-linear-to-r
            from-cyan-400
            via-blue-500
            to-teal-400
            bg-clip-text
            text-transparent
            animate-slide-up
          "
        />
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
  );
}
