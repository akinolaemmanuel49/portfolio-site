import { Menu, X } from "lucide-react";
import type { Developer } from "../shared/types";

export function Nav({
  activeSection,
  scrollToSection,
  developer,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  activeSection: string;
  scrollToSection: (section: string) => void;
  developer: Developer;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}) {
  return (
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
                  aria-current={activeSection === section ? "page" : undefined}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
