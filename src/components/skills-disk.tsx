"use client";

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
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

// `color` marks the stacks used most - it tints the icon and gives the card
// a matching glow instead of the default neutral styling. Left unset for a
// stack's official brand color being pure black/white (Next.js, Express)
// which would be invisible on the dark card, using white instead.
const SKILLS: {
  name: string;
  Icon: IconType;
  color?: string;
  description: string;
}[] = [
  {
    name: "Rust",
    Icon: SiRust,
    description: "A memory-safe systems language with no garbage collector.",
  },
  {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    description:
      "A readable, general-purpose language for scripting, data and APIs.",
  },
  {
    name: "Dart",
    Icon: SiDart,
    description: "The language behind Flutter's cross-platform UI.",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    description: "JavaScript with static types, for safer large-scale apps.",
  },
  {
    name: "C++",
    Icon: SiCplusplus,
    description: "A fast, low-level language for performance-critical systems.",
  },
  {
    name: "Java",
    Icon: SiOpenjdk,
    description:
      "A statically typed, object-oriented language running on the JVM.",
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    description: "A component-based library for building user interfaces.",
  },
  {
    name: "Flutter",
    Icon: SiFlutter,
    description: "Google's toolkit for native apps from one Dart codebase.",
  },
  {
    name: "Tauri",
    Icon: SiTauri,
    description: "A Rust-based framework for lightweight native desktop apps.",
  },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#FFFFFF",
    description: "A React framework for server-rendered, full-stack apps.",
  },
  {
    name: "Qt",
    Icon: SiQt,
    description: "A C++ framework for native cross-platform desktop UIs.",
  },
  {
    name: "FastAPI",
    Icon: SiFastapi,
    description: "A fast Python framework for building typed REST APIs.",
  },
  {
    name: "Express",
    Icon: SiExpress,
    color: "#FFFFFF",
    description: "A minimal Node.js framework for HTTP servers and APIs.",
  },
  {
    name: "Django",
    Icon: SiDjango,
    description: "A batteries-included Python web framework.",
  },
  {
    name: "Swift",
    Icon: SiSwift,
    description: "Apple's language for iOS, macOS and SwiftUI apps.",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    color: "#2496ED",
    description: "Packages apps into portable, isolated containers.",
  },
  {
    name: "CrewAI",
    Icon: SiCrewai,
    description: "A framework for orchestrating teams of AI agents.",
  },
  {
    name: "TensorFlow",
    Icon: SiTensorflow,
    description: "A library for building and training machine learning models.",
  },
  {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    description: "Distributed version control for tracking code changes.",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    description: "A powerful open-source relational database.",
  },
  {
    name: "MongoDB",
    Icon: SiMongodb,
    description: "A document-oriented NoSQL database.",
  },
  {
    name: "GitLab CI/CD",
    Icon: SiGitlab,
    color: "#FC6D26",
    description: "Pipelines for automated testing and deployment.",
  },
  {
    name: "Firebase",
    Icon: SiFirebase,
    description: "Google's backend platform for auth, data and hosting.",
  },
];

const CARD_SIZE = 64;

function SkillCard({
  name,
  Icon,
  color,
  description,
}: {
  name: string;
  Icon: IconType;
  color?: string;
  description: string;
}) {
  return (
    <div className="group relative flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "bg-card flex size-14 items-center justify-center rounded-xl border shadow-sm transition-transform duration-300 group-hover:z-10 group-hover:scale-125",
          !color && "border-border/60"
        )}
        style={
          color
            ? { borderColor: color, boxShadow: `0 0 14px ${color}66` }
            : undefined
        }
      >
        <Icon
          className={cn("size-7", !color && "text-foreground/80")}
          style={color ? { color } : undefined}
          aria-hidden="true"
        />
      </div>
      <span
        className={cn(
          "font-mono text-[10px] whitespace-nowrap",
          color ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {name}
      </span>

      <div
        aria-hidden="true"
        className="border-border bg-popover text-popover-foreground pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-36 -translate-x-1/2 rounded-md border px-2.5 py-1.5 text-center text-[10px] leading-snug opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
      >
        {description}
      </div>
    </div>
  );
}

// A ring of skill cards spinning in 3D. Each card is placed around the ring
// via rotateY + translateZ so it always faces outward; backface-visibility
// hides cards once they've rotated past the side edge, giving the floating
// "disk" look instead of a flat carousel.
export function SkillsDisk() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion) {
    return (
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    );
  }

  const count = SKILLS.length;
  const angleStep = 360 / count;
  const radius = Math.round(CARD_SIZE / 2 / Math.tan(Math.PI / count));

  return (
    <div
      className="relative mx-auto h-64 w-full max-w-md overflow-hidden perspective-distant"
      role="img"
      aria-label={SKILLS.map((skill) => skill.name).join(", ")}
    >
      <div
        aria-hidden="true"
        className={cn(
          "animate-skills-spin hover:paused absolute inset-0 transform-3d motion-reduce:animate-none"
        )}
      >
        {SKILLS.map((skill, index) => (
          <div
            key={skill.name}
            className="absolute top-1/2 left-1/2 backface-hidden"
            style={{
              width: CARD_SIZE,
              transform: `translate(-50%, -50%) rotateY(${index * angleStep}deg) translateZ(${radius}px)`,
            }}
          >
            <SkillCard {...skill} />
          </div>
        ))}
      </div>
    </div>
  );
}
