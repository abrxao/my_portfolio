import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiCrewai,
  SiDart,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGitlab,
  SiMongodb,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiQt,
  SiReact,
  SiRust,
  SiSwift,
  SiTauri,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

export const CARD_SIZE = 64;

// `color` marks the stacks used most - it tints the icon and gives the card
// a matching glow instead of the default neutral styling. Left unset for a
// stack's official brand color being pure black/white (Next.js, Express)
// which would be invisible on the dark card, using white instead.
export const SKILLS: {
  name: string;
  Icon: IconType;
  color?: string;
}[] = [
  {
    name: "Rust",
    Icon: SiRust,
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
  },
  {
    name: "Dart",
    Icon: SiDart,
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
  },
  {
    name: "Java",
    Icon: SiOpenjdk,
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Flutter",
    Icon: SiFlutter,
  },
  {
    name: "Tauri",
    Icon: SiTauri,
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#FFFFFF",
  },
  {
    name: "Qt",
    Icon: SiQt,
  },
  {
    name: "FastAPI",
    Icon: SiFastapi,
  },
  {
    name: "Express",
    Icon: SiExpress,
    color: "#FFFFFF",
  },
  {
    name: "Django",
    Icon: SiDjango,
  },
  {
    name: "Swift",
    Icon: SiSwift,
  },
  {
    name: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
  },
  {
    name: "CrewAI",
    Icon: SiCrewai,
  },
  {
    name: "TensorFlow",
    Icon: SiTensorflow,
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
  },
  {
    name: "GitLab CI/CD",
    Icon: SiGitlab,
    color: "#FC6D26",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
  },
];
