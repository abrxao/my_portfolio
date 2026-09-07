"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
  WindowCardLine,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";
import Image from "next/image";

// Same "main card + overlay cards" collage as ProjectsStack, for the SEELECT
// case study.
export function SeelectStack() {
  const { t } = useTranslation();
  const stack = t("projects.items.seelect.stack", {
    returnObjects: true,
  }) as string[];
  const apiLines = t("projects.items.seelect.topics.api.lines", {
    returnObjects: true,
  }) as string[];
  const infraLines = t("projects.items.seelect.topics.infra.lines", {
    returnObjects: true,
  }) as string[];
  const checkinLines = t("projects.items.seelect.topics.checkin.lines", {
    returnObjects: true,
  }) as string[];
  const certificatesLines = t(
    "projects.items.seelect.topics.certificates.lines",
    { returnObjects: true }
  ) as string[];

  return (
    <ScrollStack count={5} className="md:min-h-155 md:max-w-5xl">
      {/* Main card: presentation of the project. */}
      <ScrollStackItem
        index={0}
        className="md:inset-x-auto md:top-12 md:left-0 md:w-1/2"
      >
        <WindowCard>
          <WindowCardHeader>seelect.tsx</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/seelect-1.webp"
                alt={t("projects.items.seelect.imageAlt")}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("projects.items.seelect.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("projects.items.seelect.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("projects.items.seelect.pitch")}
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

      {/* Topic 1: registration, auth and payments API. Text only. */}
      <ScrollStackItem
        index={1}
        className="md:inset-x-auto md:top-1/8 md:left-1/3 md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>api.ts</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {apiLines.map((line, lineIndex) => (
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

      {/* Topic 2: zero-budget, self-hosted backend infra. Text only. */}
      <ScrollStackItem
        index={2}
        className="md:inset-x-auto md:top-0 md:right-1/8 md:left-auto md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>infra.yaml</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {infraLines.map((line, lineIndex) => (
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

      {/* Topic 3: live attendance / check-in tracking. */}
      <ScrollStackItem
        index={3}
        className="md:inset-x-auto md:top-auto md:bottom-1/8 md:left-1/8 md:w-3/10"
      >
        <WindowCard>
          <WindowCardHeader>check-in.tsx</WindowCardHeader>
          <WindowCardContent className="space-y-2.5">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/seelect-4.webp"
                alt={t("projects.items.seelect.topics.checkin.imageAlt")}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div className="space-y-1.5">
              {checkinLines.map((line, lineIndex) => (
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

      {/* Topic 4: automatic certificate generation. */}
      <ScrollStackItem
        index={4}
        className="md:inset-x-auto md:top-auto md:right-1/6 md:bottom-1/5 md:left-auto md:w-[30%]"
      >
        <WindowCard>
          <WindowCardHeader>certificates.py</WindowCardHeader>
          <WindowCardContent className="space-y-2.5">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/seelect-5.webp"
                alt={t("projects.items.seelect.topics.certificates.imageAlt")}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div className="space-y-1.5">
              {certificatesLines.map((line, lineIndex) => (
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
