import { Briefcase } from "lucide-react";
import type { Experience } from "../shared/types";

export function Experience({
  sectionsRef,
  experiences,
}: {
  sectionsRef: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
  experiences: Experience[];
}) {
  return (
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
                          <span className="text-cyan-400 shrink-0">▹</span>
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
  );
}
