import type { Skill, Experience, Project, Developer } from "./types";

export const developer: Developer = {
  name: "Akinola Abiodun E.",
  description:
    "Backend-focused web developer with hands-on experience building and maintaining production services in Go and TypeScript. Strong in API design, system architecture, and debugging complex business logic. Growing expertise in AWS and cloud-native deployment, with a consistent focus on clarity, maintainability, and measurable impact.",
  github: "https://github.com/akinolaemmanuel49",
  linkedin: "https://www.linkedin.com/in/akinola-emmanuel/",
  email: "akinolaemmanuel49@gmail.com",
};

export const tagline =
  "Backend-first Full-Stack Developer building clean, scalable systems for real-world use.";

export const skills: Skill[] = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Language" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Python", level: 75, category: "Language" },
  { name: "Golang", level: 85, category: "Language" },
  { name: "AWS", level: 65, category: "Cloud" },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer",
    company: "ReWrite Agency",
    period: "February, 2025 - January, 2026",
    description:
      "Worked across multiple products, building scalable web applications, implementing features, fixing bugs, and optimizing backend and frontend performance.",
    achievements: [
      {
        product: "Zirro",
        points: [
          "Developed and maintained a SaaS platform to streamline business processes, from retail inventory management to client-facing storefronts.",
          "Implemented features, fixed bugs, and optimized backend performance with a focus on concurrency in Go, improving responsiveness and efficiency.",
          "Worked with MongoDB, Go (Fiber) backend, and React + TypeScript frontend for full-stack development.",
        ],
      },
      {
        product: "Weddn",
        points: [
          "Enhanced the LoveWall with video status functionality using Cloudflare Streams, increasing user engagement.",
          "Optimized back-office query performance, reducing processing time from 3–8 minutes to 10–50 seconds using pre-calculated documents.",
          "Maintained full-stack development using MongoDB, Go (Fiber), and React + TypeScript.",
        ],
      },
      {
        product: "Unboxd",
        points: [
          "Focused on bug fixing and optimizing image rendering workflows to improve frontend performance and user experience.",
          "Ensured platform stability and smooth delivery of media content.",
          "Worked with MongoDB, Go (Fiber) backend, and React + TypeScript frontend.",
        ],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Ọjà – Multi-Tenant E-Commerce Platform",
    description:
      "A full-stack showcase of multi-tenant architecture: separate tenant workspaces with isolated data, custom subdomains, visual storefront designer, session-based auth (HTTP-only cookies with revocation), group/role permissions, and product/variant management. Built using React for the frontend and FastAPI for the backend.",
    tech: [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "HTTP-only Sessions",
      "Multi-Tenancy",
    ],
    image:
      "https://res.cloudinary.com/dikkedkzf/image/upload/v1771089909/Screenshot_61_q8mwz2.png",
    githubUrl: "https://github.com/akinolaemmanuel49/oja",
  },
];
