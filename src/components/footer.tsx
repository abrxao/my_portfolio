"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Globe, LoaderCircle } from "lucide-react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useSectionMarks, type SectionMark } from "@/hooks/use-section-marks";
import { isSoundEnabled } from "@/hooks/use-sound-enabled";
import { playShepardTone } from "@/lib/sound";
import { scrollShepardSweep } from "@/lib/sound-palette";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/client";

function pad(value: number) {
  return String(Math.round(value)).padStart(4, "0");
}

// Order matches the sections (and, within Projects, the individual project
// wrappers) rendered in app/[locale]/page.tsx.
const SECTION_IDS = [
  "home",
  "about",
  "project-chamber-orchestra",
  "project-bojogar",
  "project-seelect",
  "other-projects",
  "skills",
] as const;

// How long scrolling must be idle before the bar is considered "settled".
// Scrolling and stopping twice within this window just reschedules the
// wait, so the bar only ever catches up once, covering the net movement.
const SCROLL_SETTLE_MS = 200;
const MIN_ANIMATE_DELTA = 2;

// The two hints show one at a time instead of together, so a fast scroller
// only has to take in one short line at a time. "Scroll" shows first since
// it's the interaction a visitor already knows; it hands off to "drag" as
// soon as they actually scroll (not just on a timer), since a scroll proves
// they've read the first hint and are now looking at the bar move.
const SCROLL_HINT_MS = 4000;
const DRAG_HINT_MS = 5000;

// Grabbing the handle and letting go both ease in with a bit of bounce,
// rather than snapping instantly — only a pointer that's actually moving
// tracks 1:1 with zero lag, so live dragging still feels direct.
const RELEASE_SPRING_MS = 450;
const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 16,
  mass: 0.6,
};

interface Chapter extends SectionMark {
  label: string;
}

function scrollToPercent(percent: number, behavior: ScrollBehavior = "auto") {
  const { scrollHeight, clientHeight } = document.documentElement;
  const max = scrollHeight - clientHeight;
  window.scrollTo({ top: (percent / 100) * max, behavior });
}

function chapterAt(chapters: Chapter[], percent: number) {
  return chapters.reduce<Chapter | undefined>(
    (active, chapter) =>
      percent + 0.001 >= chapter.percent ? chapter : active,
    chapters[0]
  );
}

function ScrollProgressLine({
  progress,
  chapters,
  scrollHint,
  dragHint,
  ariaLabel,
}: {
  progress: number;
  chapters: Chapter[];
  scrollHint?: string;
  dragHint?: string;
  ariaLabel?: string;
}) {
  const clamped = Math.min(100, Math.max(0, progress));
  const [displayed, setDisplayed] = useState(clamped);
  const [transitionMs, setTransitionMs] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const displayedRef = useRef(displayed);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const animationEndTimerRef = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const trackRef = useRef<HTMLDivElement>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [scrubPercent, setScrubPercent] = useState(clamped);
  const [hintStage, setHintStage] = useState<"scroll" | "drag" | "hidden">(
    () => (scrollHint ? "scroll" : "drag")
  );
  const [justReleased, setJustReleased] = useState(false);
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    displayedRef.current = displayed;
  }, [displayed]);

  useEffect(() => {
    if (isScrubbing) return;

    if (settleTimerRef.current !== undefined) {
      clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = undefined;
      const delta = clamped - displayedRef.current;
      if (Math.abs(delta) < MIN_ANIMATE_DELTA) return;

      const sweep = scrollShepardSweep(delta);
      const durationMs = sweep.duration * 1000;
      setTransitionMs(durationMs);
      if (isSoundEnabled()) playShepardTone(sweep);
      setDisplayed(clamped);

      setIsAnimating(true);
      if (animationEndTimerRef.current !== undefined) {
        clearTimeout(animationEndTimerRef.current);
      }
      animationEndTimerRef.current = setTimeout(
        () => setIsAnimating(false),
        durationMs
      );
    }, SCROLL_SETTLE_MS);

    return () => {
      if (settleTimerRef.current !== undefined) {
        clearTimeout(settleTimerRef.current);
      }
    };
  }, [clamped, isScrubbing]);

  useEffect(
    () => () => {
      if (animationEndTimerRef.current !== undefined) {
        clearTimeout(animationEndTimerRef.current);
      }
      if (releaseTimerRef.current !== undefined) {
        clearTimeout(releaseTimerRef.current);
      }
    },
    []
  );

  // "scroll" hands off to "drag" either once its timer runs out, or as soon
  // as the visitor actually scrolls — whichever comes first.
  useEffect(() => {
    if (hintStage !== "scroll" || !scrollHint) return;
    const timer = setTimeout(() => setHintStage("drag"), SCROLL_HINT_MS);
    return () => clearTimeout(timer);
  }, [hintStage, scrollHint]);

  useEffect(() => {
    if (hintStage !== "scroll") return;
    const handleScroll = () => setHintStage("drag");
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      once: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hintStage]);

  useEffect(() => {
    if (hintStage !== "drag" || !dragHint) return;
    const timer = setTimeout(() => setHintStage("hidden"), DRAG_HINT_MS);
    return () => clearTimeout(timer);
  }, [hintStage, dragHint]);

  const percentFromClientX = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return clamped;
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(100, Math.max(0, ratio * 100));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setHintStage("hidden");
    if (releaseTimerRef.current !== undefined) {
      clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = undefined;
    }
    setJustReleased(false);
    const percent = percentFromClientX(event.clientX);
    setIsScrubbing(true);
    setHasMoved(false);
    setScrubPercent(percent);
    scrollToPercent(percent);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return;
    if (!hasMoved) setHasMoved(true);
    const percent = percentFromClientX(event.clientX);
    setScrubPercent(percent);
    scrollToPercent(percent);
  };

  const endScrub = () => {
    if (!isScrubbing) return;
    setDisplayed(scrubPercent);
    setIsScrubbing(false);
    setHasMoved(false);
    setJustReleased(true);
    if (releaseTimerRef.current !== undefined) {
      clearTimeout(releaseTimerRef.current);
    }
    releaseTimerRef.current = setTimeout(() => {
      releaseTimerRef.current = undefined;
      setJustReleased(false);
    }, RELEASE_SPRING_MS);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (chapters.length === 0) return;
    const activeChapter = chapterAt(chapters, clamped);
    const index = chapters.findIndex(
      (chapter) => chapter.id === activeChapter?.id
    );

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setHintStage("hidden");
      scrollToPercent(
        chapters[Math.min(chapters.length - 1, index + 1)].percent,
        "smooth"
      );
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setHintStage("hidden");
      scrollToPercent(chapters[Math.max(0, index - 1)].percent, "smooth");
    } else if (event.key === "Home") {
      event.preventDefault();
      setHintStage("hidden");
      scrollToPercent(0, "smooth");
    } else if (event.key === "End") {
      event.preventDefault();
      setHintStage("hidden");
      scrollToPercent(100, "smooth");
    }
  };

  const effectivePercent = isScrubbing ? scrubPercent : displayed;
  const activeChapter = chapterAt(chapters, effectivePercent);
  const showTooltip = isScrubbing || isAnimating || justReleased;

  const isLiveTracking = isScrubbing && hasMoved;
  const positionTransition = isLiveTracking
    ? { duration: 0 }
    : isScrubbing || justReleased
      ? SPRING_TRANSITION
      : { duration: transitionMs / 1000, ease: "easeOut" as const };

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-valuetext={activeChapter?.label}
      className={cn(
        "relative h-4 w-full touch-none cursor-grab select-none",
        isScrubbing && "cursor-grabbing"
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endScrub}
      onPointerCancel={endScrub}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-border absolute inset-x-0 bottom-0.5 h-1 overflow-hidden rounded-full">
        <motion.div
          animate={{ width: `${effectivePercent}%` }}
          transition={positionTransition}
          className="bg-foreground h-full rounded-full"
        />
      </div>

      {chapters.slice(1).map((chapter) => (
        <span
          key={chapter.id}
          aria-hidden="true"
          className="bg-background absolute bottom-0.5 h-1 w-px"
          style={{ left: `${chapter.percent}%` }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        animate={{ left: `${effectivePercent}%` }}
        transition={positionTransition}
        className="bg-foreground pointer-events-none absolute top-3 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-sm"
      />

      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 4, left: `${effectivePercent}%` }}
            animate={{ opacity: 1, y: 0, left: `${effectivePercent}%` }}
            exit={{ opacity: 0, y: 4 }}
            transition={{
              ...positionTransition,
              opacity: { duration: 0.15 },
              y: { duration: 0.15 },
            }}
            className="text-muted-foreground pointer-events-none absolute bottom-3.5 -translate-x-1/2 font-mono text-[10px] leading-none whitespace-nowrap"
          >
            {Math.round(effectivePercent)}%
            {activeChapter ? ` · ${activeChapter.label}` : ""}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {hintStage !== "hidden" && (
          <motion.p
            key={hintStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground/60 pointer-events-none absolute inset-x-0 bottom-full mb-2 text-center text-[10px]"
          >
            {hintStage === "scroll" ? scrollHint : dragHint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  const { t, locale } = useTranslation();
  const { x, y } = useMousePosition();
  const progress = useScrollProgress();
  const marks = useSectionMarks(SECTION_IDS);
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

  const chapterLabels = [
    t("footer.sections.home"),
    t("footer.sections.about"),
    t("projects.items.chamberOrchestra.title"),
    t("projects.items.boJogar.title"),
    t("projects.items.seelect.title"),
    t("footer.sections.otherProjects"),
    t("footer.sections.skills"),
  ];
  const chapters: Chapter[] = marks.map((mark, index) => ({
    ...mark,
    label: chapterLabels[index],
  }));

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full p-2">
      <div className="container mx-auto px-6">
        <ScrollProgressLine
          progress={progress}
          chapters={chapters}
          scrollHint={t("footer.scrollHint")}
          dragHint={t("footer.dragHint")}
          ariaLabel={t("footer.scrollProgress")}
        />
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
