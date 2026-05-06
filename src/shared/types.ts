export type Skill = {
  name: string;
  level: number;
  category: string;
};

export type Achievement = {
  product: string;
  points: string[];
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: Achievement[];
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};
