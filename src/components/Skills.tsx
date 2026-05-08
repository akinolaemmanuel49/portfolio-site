import { Code2 } from "lucide-react";
import type { Skill } from "../shared/types";

export function Skills({
  sectionsRef,
  skills,
}: {
  sectionsRef: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
  skills: Skill[];
  activeSection: string;
}) {
  return (
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
