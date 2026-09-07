"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
  WindowCardLine,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";

// Same "main card + overlay cards" collage as ProjectsStack/SeelectStack, for
// the Ray Tracing paper.
export function RayTracingStack() {
  const { t } = useTranslation();
  const stack = t("science.items.rayTracing.stack", {
    returnObjects: true,
  }) as string[];
  const scenarioLines = t("science.items.rayTracing.topics.scenario.lines", {
    returnObjects: true,
  }) as string[];
  const mobilityLines = t("science.items.rayTracing.topics.mobility.lines", {
    returnObjects: true,
  }) as string[];
  const channelLines = t("science.items.rayTracing.topics.channel.lines", {
    returnObjects: true,
  }) as string[];
  const resultsLines = t("science.items.rayTracing.topics.results.lines", {
    returnObjects: true,
  }) as string[];

  return (
    <ScrollStack count={5} className="md:min-h-155 md:max-w-5xl">
      <ScrollStackItem
        index={0}
        className="md:inset-x-auto md:top-1/3 md:right-0 md:w-1/2"
      >
        <WindowCard>
          <WindowCardHeader>ray-tracing-6g.py</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("science.items.rayTracing.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("science.items.rayTracing.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("science.items.rayTracing.pitch")}
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
              {t("science.readPaperCta")}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Topic 1: real geographical area + 3D scene. Text only. */}
      <ScrollStackItem
        index={1}
        className="md:inset-x-auto md:top-0 md:left-0 md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>scenario.py</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {scenarioLines.map((line, lineIndex) => (
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

      {/* Topic 2: UE mobility simulation. Text only. */}
      <ScrollStackItem
        index={2}
        className="md:inset-x-auto md:top-0 md:right-1/8 md:left-auto md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>mobility.py</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {mobilityLines.map((line, lineIndex) => (
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

      {/* Topic 3: ray-traced channel generation. Text only. */}
      <ScrollStackItem
        index={3}
        className="md:inset-x-auto md:top-auto md:bottom-1/8 md:left-1/8 md:w-3/10"
      >
        <WindowCard>
          <WindowCardHeader>channel-model.py</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {channelLines.map((line, lineIndex) => (
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

      {/* Topic 4: findings from the Fortaleza evaluation. Text only. */}
      <ScrollStackItem
        index={4}
        className="md:inset-x-auto md:top-auto md:left-1/4 md:w-[30%]"
      >
        <WindowCard>
          <WindowCardHeader>results.ipynb</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {resultsLines.map((line, lineIndex) => (
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
    </ScrollStack>
  );
}
