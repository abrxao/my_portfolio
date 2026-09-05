"use client";

import { useTheme } from "next-themes";
import { Bike, BookOpen, Gamepad2, Goal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";
import {
  WindowCard,
  WindowCardContent,
  WindowCardHeader,
  WindowCardLine,
} from "@/components/ui/window-card";
import { useTranslation } from "@/i18n/client";

const HOBBY_ICONS = [Goal, Bike, BookOpen, Gamepad2];

// "Break On Through (To the Other Side)" by The Doors.
const FAVORITE_SONG_SPOTIFY_ID = "6ToM0uwxtPKo9CMpbPGYvM";

export function AboutStack() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const lines = t("presentation.about", { returnObjects: true }) as string[];
  const hobbies = t("presentation.hobbies", {
    returnObjects: true,
  }) as string[];

  return (
    <ScrollStack count={4} className="md:min-h-[560px] md:max-w-4xl">
      {/* Description: left, ~60% width on desktop. Extra right/bottom
          padding leaves room for the overlay cards below to sit on top of
          it without covering the text. */}
      <ScrollStackItem
        index={0}
        className="md:inset-x-auto md:top-0 md:left-0 md:w-[60%]"
      >
        <WindowCard>
          <WindowCardHeader>about-me</WindowCardHeader>
          <WindowCardContent className="space-y-2 pr-12 pb-12 md:pr-24 md:pb-28">
            {lines.map((line, index) => (
              <WindowCardLine key={index} index={index + 1}>
                {line}
              </WindowCardLine>
            ))}
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      <ScrollStackItem
        index={1}
        className="md:inset-x-auto md:top-0 md:right-40 md:w-[30%]"
      >
        <WindowCard>
          <WindowCardHeader>portrait</WindowCardHeader>
          <WindowCardContent className="p-0">
            <Avatar className="aspect-square size-full rounded-none">
              <AvatarImage
                src="/portrait.png"
                alt={t("presentation.portraitAlt")}
                className="object-cover"
              />
              <AvatarFallback className="rounded-none font-mono text-2xl tracking-widest">
                AA
              </AvatarFallback>
            </Avatar>
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      {/* Overlay cards: placeholder positions, meant to be nudged by hand
          to sit over the description's padded area. */}
      <ScrollStackItem
        index={2}
        className="md:inset-x-auto md:top-[42%] md:left-[32%] md:w-[36%]"
      >
        <WindowCard>
          <WindowCardHeader>hobbies</WindowCardHeader>
          <WindowCardContent className="space-y-2">
            {hobbies.map((hobby, index) => {
              const Icon = HOBBY_ICONS[index];
              return (
                <p
                  key={hobby}
                  className="flex items-center gap-3 font-mono text-base leading-relaxed"
                >
                  {Icon && (
                    <Icon
                      className="text-muted-foreground/50 size-4 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span>{hobby}</span>
                </p>
              );
            })}
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>

      <ScrollStackItem
        index={3}
        className="p-8 md:inset-x-auto md:top-auto md:right-[8%] md:left-auto md:w-[50%]"
      >
        <WindowCard>
          <WindowCardHeader>favorite-song</WindowCardHeader>
          <WindowCardContent className="p-0">
            <iframe
              title="Spotify player: Break On Through (To the Other Side) by The Doors"
              src={`https://open.spotify.com/embed/track/${FAVORITE_SONG_SPOTIFY_ID}?theme=${resolvedTheme === "light" ? 1 : 0}`}
              width="100%"
              height={152}
              style={{ borderRadius: 12 }}
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </WindowCardContent>
        </WindowCard>
      </ScrollStackItem>
    </ScrollStack>
  );
}
