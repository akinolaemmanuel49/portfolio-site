import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "../shared/types";

export function Projects({
  projects,
  sectionsRef,
}: {
  projects: Project[];
  sectionsRef: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
}) {
  return (
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
  );
}
