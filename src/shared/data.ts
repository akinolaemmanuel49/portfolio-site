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
  "Backend-first full-stack developer building clean, scalable systems for real-world use.";

export const categoryOrder = [
  "Language",
  "Frontend",
  "Backend",
  "Cloud/Devops",
  "Database",
  "Version Control",
  "CI/CD",
];

export const skills: Skill[] = [
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Go", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "AWS", category: "Cloud/Devops" },
  { name: "Docker", category: "Cloud/Devops" },
  { name: "PostgresSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "FastAPI", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Fiber", category: "Backend" },
  { name: "Gin", category: "Backend" },
  { name: "Git", category: "Version Control" },
  { name: "GitHub", category: "Version Control" },
  { name: "GitHub Actions", category: "CI/CD" },
];

export const experiences: Experience[] = [
  {
    title: "Full Stack Web Developer",
    company: "UnboxdHQ",
    period: "February, 2025 - January, 2026",
    description:
      "Implemented and maintained features across two core products, delivering improvements in performance and user experience.",
    achievements: [
      {
        product: "Weddn",
        points: [
          "Enhanced the LoveWall feature by implementing video status functionality using Cloudflare Streams, resulting in higher user engagement.",
          "Optimized back-office query performance by implementing pre-calculated documents, reducing processing time from 3–8 minutes to 10–50 seconds.",
          "Delivered full-stack development using MongoDB, Go (Fiber), and React + TypeScript.",
        ],
      },
      {
        product: "Unboxd",
        points: [
          "Fixed critical bugs and optimized image rendering workflows, significantly improving frontend performance and user experience.",
          "Ensured platform stability and reliable delivery of media content.",
          "Developed features using MongoDB, Go (Fiber) backend, and React + TypeScript frontend.",
        ],
      },
    ],
  },
  {
    title: "Full Stack Web Developer",
    company: "ZirroHQ",
    period: "August, 2025 - January, 2026",
    description:
      "Implemented and maintained features for a scalable SaaS e-commerce platform, focusing on performance optimization and backend efficiency.",
    achievements: [
      {
        product: "Zirro",
        points: [
          "Developed and maintained a comprehensive SaaS platform that streamlines business operations, from retail inventory management to client-facing storefronts.",
          "Implemented new features, resolved bugs, and optimized backend performance with emphasis on Go concurrency, enhancing responsiveness and overall efficiency.",
          "Built full-stack solutions using MongoDB, Go (Fiber) backend, and React + TypeScript frontend.",
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
