"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ImageViewer } from "@/components/ui/image-viewer";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
  WindowCardLine,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";

// The screens topic walks through the shipped app via a small image
// carousel - these are the actual screenshots, in viewing order.
const SCREEN_IMAGE_SRCS = [
  "/bo-jogar-2.webp",
  "/bo-jogar-3.webp",
  "/bo-jogar-4.webp",
  "/bo-jogar-5.webp",
];

// Same "main card + overlay cards" collage as ProjectsStack/SeelectStack, for
// the BóJogar iOS app.
export function BoJogarStack() {
  const { t } = useTranslation();
  const stack = t("projects.items.boJogar.stack", {
    returnObjects: true,
  }) as string[];
  const scenarioLines = t("projects.items.boJogar.topics.scenario.lines", {
    returnObjects: true,
  }) as string[];
  const audienceLines = t("projects.items.boJogar.topics.audience.lines", {
    returnObjects: true,
  }) as string[];
  const feedLines = t("projects.items.boJogar.topics.feed.lines", {
    returnObjects: true,
  }) as string[];
  const screenImageAlts = t("projects.items.boJogar.topics.screens.images", {
    returnObjects: true,
  }) as string[];
  const screenImages = SCREEN_IMAGE_SRCS.map((src, i) => ({
    src,
    alt: screenImageAlts[i],
  }));

  return (
    <ScrollStack count={5} className="md:min-h-155 md:max-w-5xl">
      {/* Main card: presentation of the project. */}
      <ScrollStackItem
        index={0}
        className="md:inset-x-auto md:top-12 md:left-0 md:w-1/2"
      >
        <WindowCard>
          <WindowCardHeader>bo-jogar.swift</WindowCardHeader>
          <WindowCardContent className="space-y-3">
            <div className="border-border/60 relative h-14 w-full overflow-hidden rounded-md border md:h-16">
              <Image
                src="/bo-jogar-1.webp"
                alt={t("projects.items.boJogar.imageAlt")}
                fill
                sizes="(min-width: 768px) 320px, 90vw"
                className="zoom-150 object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {t("projects.items.boJogar.title")}
              </h3>
              <p className="text-muted-foreground mt-0.5 font-mono text-xs">
                {t("projects.items.boJogar.meta")}
              </p>
            </div>
            <p className="text-sm leading-snug">
              {t("projects.items.boJogar.pitch")}
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

      {/* Topic 1: Maria's scenario - why the app exists. Text only. */}
      <ScrollStackItem
        index={1}
        className="md:inset-x-auto md:top-1/8 md:left-1/3 md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>scenario.md</WindowCardHeader>
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

      {/* Topic 2: who the app is for. Text only. */}
      <ScrollStackItem
        index={2}
        className="md:inset-x-auto md:top-0 md:right-1/8 md:left-auto md:w-1/4"
      >
        <WindowCard>
          <WindowCardHeader>audience.ts</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {audienceLines.map((line, lineIndex) => (
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

      {/* Topic 3: the events feed, the app's core screen. Text only. */}
      <ScrollStackItem
        index={3}
        className="md:inset-x-auto md:top-auto md:bottom-1/8 md:left-1/8 md:w-3/10"
      >
        <WindowCard>
          <WindowCardHeader>feed.swift</WindowCardHeader>
          <WindowCardContent className="space-y-1.5">
            {feedLines.map((line, lineIndex) => (
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

      {/* Topic 4: a carousel through the actual shipped screens, framed like
          a phone screen - no padding, no copy, just the screenshots. */}
      <ScrollStackItem
        index={4}
        className="md:inset-x-auto md:top-0 md:right-1/6 md:bottom-1/5 md:left-auto md:w-55"
      >
        <WindowCard>
          <WindowCardHeader>screens.swift</WindowCardHeader>
          <WindowCardContent className="p-0">
            <ImageViewer
              images={screenImages}
              className="aspect-9/19.5 w-full rounded-none border-0"
              previousLabel={t("gallery.previousImage")}
              nextLabel={t("gallery.nextImage")}
              goToLabel={(imageIndex) =>
                t("gallery.goToImage", { index: imageIndex })
              }
            />
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>
    </ScrollStack>
  );
}
