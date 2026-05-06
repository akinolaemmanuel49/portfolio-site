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

export type Star = {
  large: {
    id: string;
    size: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
  }[];
  medium: {
    id: string;
    size: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
  }[];
  small: {
    id: string;
    size: number;
    top: number;
    left: number;
    delay: number;
    duration: number;
    opacity: number;
  }[];
  shooting: {
    id: string;
    top: number;
    left: number;
    delay: number;
    duration: number;
  }[];
};

export type Developer = {
  name: string;
  description: string;
  github: string;
  linkedin: string;
  email: string;
};
