"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, LoaderCircle } from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { isSoundEnabled } from "@/hooks/use-sound-enabled";
import { playShepardTone } from "@/lib/sound";
import { scrollShepardSweep } from "@/lib/sound-palette";
import { useTranslation } from "@/i18n/client";

function pad(value: number) {
  return String(Math.round(value)).padStart(4, "0");
}

// How long scrolling must be idle before the bar is considered "settled".
// Scrolling and stopping twice within this window just reschedules the
// wait, so the bar only ever catches up once, covering the net movement.
const SCROLL_SETTLE_MS = 200;
const MIN_ANIMATE_DELTA = 2;

function ScrollProgressLine({ progress }: { progress: number }) {
  const clamped = Math.min(100, Math.max(0, progress));
  const [displayed, setDisplayed] = useState(clamped);
  const [transitionMs, setTransitionMs] = useState(0);
  const displayedRef = useRef(displayed);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    displayedRef.current = displayed;
  }, [displayed]);

  useEffect(() => {
    if (settleTimerRef.current !== undefined) {
      clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = undefined;
      const delta = clamped - displayedRef.current;
      if (Math.abs(delta) < MIN_ANIMATE_DELTA) return;

      const sweep = scrollShepardSweep(delta);
      setTransitionMs(sweep.duration * 1000);
      if (isSoundEnabled()) playShepardTone(sweep);
      setDisplayed(clamped);
    }, SCROLL_SETTLE_MS);

    return () => {
      if (settleTimerRef.current !== undefined) {
        clearTimeout(settleTimerRef.current);
      }
    };
  }, [clamped]);

  return (
    <div className="relative h-4 w-full select-none">
      <div className="bg-border absolute inset-x-0 bottom-0.5 h-1 overflow-hidden rounded-full">
        <div
          style={{
            width: `${displayed}%`,
            transitionDuration: `${transitionMs}ms`,
          }}
          className="bg-foreground h-full rounded-full transition-[width] ease-out"
        />
      </div>

      <span
        className="text-muted-foreground absolute bottom-3.5 -translate-x-1/2 font-mono text-[10px] leading-none transition-[left] ease-out"
        style={{
          left: `${displayed}%`,
          transitionDuration: `${transitionMs}ms`,
        }}
      >
        {Math.round(displayed)}%
      </span>
    </div>
  );
}

export function Footer() {
  const { t, locale } = useTranslation();
  const { x, y } = useMousePosition();
  const progress = useScrollProgress();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dateLabel = now
    ? new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(now)
    : "--/-- --:--";

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full p-2">
      <div
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("footer.scrollProgress")}
        className="container mx-auto px-6"
      >
        <ScrollProgressLine progress={progress} />
      </div>

      <div className="text-muted-foreground container mx-auto flex h-10 items-center justify-between gap-4 px-4 font-mono text-xs">
        <span>
          <span className="sr-only">{t("footer.localTime")}: </span>
          <span aria-hidden="true">{dateLabel}</span>
        </span>

        <span className="hidden sm:inline">
          <span className="sr-only">{t("footer.cursorPosition")}: </span>
          <span aria-hidden="true">
            {pad(x)} X - {pad(y)} Y
          </span>
        </span>

        <span className="flex items-center gap-3" aria-hidden="true">
          <Globe className="size-3.5 transition-transform duration-700 hover:rotate-180" />
          <LoaderCircle className="animation-duration-3000 size-3.5 animate-spin" />
        </span>
      </div>
    </footer>
  );
}
