"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
  WindowCardLine,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";

// Same "main card + overlay cards" collage as AboutStack. Positions below are
// hand-picked to spread the four topic cards around the central one on
// desktop; nudge the percentages if a card ever collides with another.
export function ProjectsStack() {
  const { t } = useTranslation();
  const stack = t("projects.items.chamberOrchestra.stack", {
    returnObjects: true,
  }) as string[];
  const triggerLines = t(
    "projects.items.chamberOrchestra.topics.trigger.lines",
    {
      returnObjects: true,
    }
  ) as string[];
  const ragLines = t("projects.items.chamberOrchestra.topics.rag.lines", {
    returnObjects: true,
  }) as string[];
  const agentsLines = t("projects.items.chamberOrchestra.topics.agents.lines", {
    returnObjects: true,
  }) as string[];
  const resultsLines = t(
    "projects.items.chamberOrchestra.topics.results.lines",
    {
      returnObjects: true,
    }
  ) as string[];

  return (
    <ScrollStack count={5} className="md:min-h-155 md:max-w-5xl">
      {/* Main card: presentation of the project. */}
      <ScrollStackItem
        index={0}
        className="md:inset-x-auto md:top-12 md:left-1/3 md:w-1/2"
      >
        <WindowCard>
          <WindowCardHeader>chamber-orchestra.tsx</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-20 w-full overflow-hidden rounded-md border md:h-24">
              <Image
                src="/chamber-orchestra-1.webp"
                alt={t("projects.items.chamberOrchestra.imageAlt")}
                fill
                sizes="(min-width: 768px) 500px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("projects.items.chamberOrchestra.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("projects.items.chamberOrchestra.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("projects.items.chamberOrchestra.pitch")}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {stack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Topic 1: the Jira webhook trigger. Text only. */}
      <ScrollStackItem
        index={1}
        className="md:inset-x-auto md:top-0 md:left-0 md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>webhook-trigger.ts</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {triggerLines.map((line, lineIndex) => (
              <WindowCardLine
                key={lineIndex}
                index={lineIndex + 1}
                className="text-sm leading-snug"
              >
                {line}
              </WindowCardLine>
            ))}
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Topic 2: the RAG vector-search layer. Text only. */}
      <ScrollStackItem
        index={2}
        className="md:inset-x-auto md:top-0 md:right-1/8 md:left-auto md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>rag-engine.ts</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {ragLines.map((line, lineIndex) => (
              <WindowCardLine
                key={lineIndex}
                index={lineIndex + 1}
                className="text-sm leading-snug"
              >
                {line}
              </WindowCardLine>
            ))}
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Topic 3: the seven-agent crew that builds Device Manager. */}
      <ScrollStackItem
        index={3}
        className="md:inset-x-auto md:top-auto md:bottom-1/8 md:left-1/8 md:w-3/10"
      >
        <WindowCard>
          <WindowCardHeader>agent-crew.yaml</WindowCardHeader>
          <WindowCardContent className="space-y-2.5">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/chamber-orchestra-4.webp"
                alt={t(
                  "projects.items.chamberOrchestra.topics.agents.imageAlt"
                )}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div className="space-y-1.5">
              {agentsLines.map((line, lineIndex) => (
                <WindowCardLine
                  key={lineIndex}
                  index={lineIndex + 1}
                  className="text-sm leading-snug"
                >
                  {line}
                </WindowCardLine>
              ))}
            </div>
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Topic 4: shipped result. */}
      <ScrollStackItem
        index={4}
        className="md:inset-x-auto md:top-auto md:right-1/4 md:bottom-1/5 md:left-auto md:w-[30%]"
      >
        <WindowCard>
          <WindowCardHeader>device-manager.tsx</WindowCardHeader>
          <WindowCardContent className="space-y-2.5">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/chamber-orchestra-5.webp"
                alt={t(
                  "projects.items.chamberOrchestra.topics.results.imageAlt"
                )}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div className="space-y-1.5">
              {resultsLines.map((line, lineIndex) => (
                <WindowCardLine
                  key={lineIndex}
                  index={lineIndex + 1}
                  className="text-sm leading-snug"
                >
                  {line}
                </WindowCardLine>
              ))}
            </div>
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>
    </ScrollStack>
  );
}
