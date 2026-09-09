"use client";

import { ArrowUpRight, GitGraphIcon, Hammer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { StackedCarousel } from "@/components/ui/stacked-carousel";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";

// Only ever a couple of cards here, so instead of the pinned ScrollStack
// collage used elsewhere, they sit in a drag-to-flip stacked deck that grows
// one card at a time as more side projects show up.
export function OtherProjectsStack() {
  const { t } = useTranslation();
  const stack = t("otherProjects.items.rayTracing.stack", {
    returnObjects: true,
  }) as string[];
  const sudokuStack = t("otherProjects.items.sudoku.stack", {
    returnObjects: true,
  }) as string[];
  const tortoiseStack = t("otherProjects.items.tortoise.stack", {
    returnObjects: true,
  }) as string[];

  return (
    <StackedCarousel
      className="mt-16 md:mt-24"
      ariaLabel={t("otherProjects.punchline")}
      items={[
        <WindowCard key="ray-tracing">
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
        </WindowCard>,

        <WindowCard key="sudoku">
          <WindowCardHeader>sudoku_assistant.cpp</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-20 w-full overflow-hidden rounded-md border md:h-24">
              <Image
                src="/sudoku-1.webp"
                alt={t("otherProjects.items.sudoku.imageAlt")}
                fill
                sizes="(min-width: 768px) 500px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("otherProjects.items.sudoku.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("otherProjects.items.sudoku.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("otherProjects.items.sudoku.pitch")}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {sudokuStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <Link
              href="https://github.com/abrxao/sudoku"
              target="_blank"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              {t("otherProjects.viewCodeCta")}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </WindowCardContent>
        </WindowCard>,

        <WindowCard key="tortoise">
          <WindowCardHeader>tortoise_world.py</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-20 w-full overflow-hidden rounded-md border md:h-24">
              <Image
                src="/tortoise-1.webp"
                alt={t("otherProjects.items.tortoise.imageAlt")}
                fill
                sizes="(min-width: 768px) 500px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("otherProjects.items.tortoise.title")}
              </h3>
              <p className="text-muted-foreground flex flex-wrap font-mono text-xs">
                {t("otherProjects.items.tortoise.meta")}{" "}
                <Link
                  href="https://github.com/pauloDiego-sudo"
                  target="_blank"
                  className="text-primary inline-flex items-center gap-0.5 pl-1 hover:underline"
                >
                  <GitGraphIcon className="size-3" />
                  {t("otherProjects.items.tortoise.collaborator")}
                </Link>
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("otherProjects.items.tortoise.pitch")}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {tortoiseStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </WindowCardContent>
        </WindowCard>,

        <WindowCard key="next-build" className="flex flex-col border-dashed">
          <WindowCardHeader>next-build.tsx</WindowCardHeader>
          <WindowCardContent className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
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
        </WindowCard>,
      ]}
    />
  );
}
