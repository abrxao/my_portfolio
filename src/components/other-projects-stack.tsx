"use client";

import { ArrowUpRight, Hammer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
} from "@/components/ui/window-card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTranslation } from "@/i18n/client";
import { cn } from "@/lib/utils";

// Only ever a couple of cards here, so instead of the pinned ScrollStack
// collage used elsewhere, they sit as a superposed stack that grows one card
// at a time. On desktop the cards overlap side by side and hovering one
// grows it; on mobile they overlap top to bottom and a tap grows the active
// one instead, since hover isn't reliable on touch.
export function OtherProjectsStack() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const stack = t("otherProjects.items.rayTracing.stack", {
    returnObjects: true,
  }) as string[];

  const handleEnter = (index: number) => {
    if (isDesktop) setActiveIndex(index);
  };

  const handleLeave = (index: number) => {
    if (isDesktop) {
      setActiveIndex((current) => (current === index ? null : current));
    }
  };

  const handleClick = (index: number) => {
    if (!isDesktop) {
      setActiveIndex((current) => (current === index ? null : index));
    }
  };

  const cardClassName = (index: number) =>
    cn(
      "relative overflow-hidden transition-all duration-500 ease-out",
      activeIndex === index
        ? "h-72 md:h-auto md:flex-[4]"
        : "h-16 md:h-auto md:flex-1",
      index > 0 && "-mt-3 md:mt-0 md:-ml-8"
    );

  return (
    <div className="mx-auto mt-16 flex max-w-3xl flex-col md:mt-24 md:h-72 md:flex-row">
      <div
        className={cardClassName(0)}
        style={{ zIndex: activeIndex === 0 ? 10 : 1 }}
        onMouseEnter={() => handleEnter(0)}
        onMouseLeave={() => handleLeave(0)}
        onClick={() => handleClick(0)}
      >
        <WindowCard className="h-full">
          <WindowCardHeader>ray-tracing-6g.py</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-20 w-full overflow-hidden rounded-md border md:h-24">
              <Image
                src="/ray-tracing-1.webp"
                alt={t("otherProjects.items.rayTracing.imageAlt")}
                fill
                sizes="(min-width: 768px) 500px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("otherProjects.items.rayTracing.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("otherProjects.items.rayTracing.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("otherProjects.items.rayTracing.pitch")}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {stack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <Link
              href="https://biblioteca.sbrt.org.br/articles/4718"
              target="_blank"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {t("otherProjects.readPaperCta")}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </WindowCardContent>
        </WindowCard>
      </div>

      <div
        className={cardClassName(1)}
        style={{ zIndex: activeIndex === 1 ? 10 : 0 }}
        onMouseEnter={() => handleEnter(1)}
        onMouseLeave={() => handleLeave(1)}
        onClick={() => handleClick(1)}
      >
        <WindowCard className="flex h-full flex-col border-dashed">
          <WindowCardHeader>next-build.tsx</WindowCardHeader>
          <WindowCardContent className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Hammer
              className="text-muted-foreground/50 size-6"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("otherProjects.items.nextProject.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("otherProjects.items.nextProject.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("otherProjects.items.nextProject.pitch")}
            </p>
          </WindowCardContent>
        </WindowCard>
      </div>
    </div>
  );
}
