import { Code2 } from "lucide-react";
import { useRef, useState } from "react";
import type { Skill } from "../shared/types";
import { categoryOrder } from "../shared/data";

type Props = {
  sectionsRef: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
  skills: Skill[];
};

export function Skills({ sectionsRef, skills }: Props) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const grouped = skills.reduce(
    (acc, skill) => {
      (acc[skill.category] ||= []).push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  // Flatten skills in category order
  const orderedSkills = categoryOrder.flatMap(
    (category) => grouped[category] || [],
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
    const card = cardRefs.current[name];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 30;
    const rotateX = (0.5 - y) * 30;
    const intensity =
      Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2)) * 2;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;

    card.style.boxShadow = `
      ${(x - 0.5) * 20}px
      ${(y - 0.5) * 20}px
      30px
      rgba(34, 211, 238, ${0.15 + intensity * 0.1})
    `;

    card.style.borderColor = `rgba(34, 211, 238, ${0.3 + intensity * 0.2})`;
  };

  const reset = (name: string) => {
    const card = cardRefs.current[name];
    if (!card) return;

    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.boxShadow = "";
    card.style.borderColor = "";
    setHoveredSkill(null);
  };

  return (
    <section
      id="skills"
      ref={(el) => {
        sectionsRef.current.skills = el;
      }}
      className="py-20 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Code2 className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl md:text-5xl font-bold">
            Skills & Technologies
          </h2>
        </div>

        {/* Single grid with all skills in category order */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {orderedSkills.map((skill) => (
            <div
              key={skill.name}
              onMouseMove={(e) => {
                handleMove(e, skill.name);
                setHoveredSkill(skill.name);
              }}
              onMouseLeave={() => reset(skill.name)}
              className="relative flex justify-center"
            >
              <div
                ref={(el) => {
                  cardRefs.current[skill.name] = el;
                }}
                className="
                  flex
                  items-center
                  justify-center
                  w-full
                  aspect-square
                  bg-white/70
                  dark:bg-slate-800/60
                  border-2
                  border-slate-200
                  dark:border-slate-700
                  backdrop-blur-xl
                  transition-all
                  duration-150
                  ease-out
                  will-change-transform
                  cursor-pointer
                  mb-10
                "
                style={{
                  borderRadius: 0,
                  transition:
                    "transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.1s ease-out",
                }}
              >
                <img
                  src={`/assets/icons/${skill.name}.png`}
                  alt={skill.name}
                  className="
                    w-20
                    h-20
                    object-contain
                    pointer-events-none
                  "
                  style={{ borderRadius: 0 }}
                />
              </div>

              {/* Tooltip that appears on hover */}
              {hoveredSkill === skill.name && (
                <div
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    -translate-x-1/2
                    px-2
                    py-1
                    bg-slate-900
                    dark:bg-slate-700
                    text-white
                    text-xs
                    font-medium
                    whitespace-nowrap
                    pointer-events-none
                    z-10
                  "
                  style={{ borderRadius: 0 }}
                >
                  {skill.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
