"use client";

import { useEffect } from "react";
import { unlockAudio } from "@/lib/sound";
import { useSoundStore } from "@/stores/sound-store";

export { isSoundEnabled } from "@/stores/sound-store";

export function useSoundEnabled(): [boolean, (next: boolean) => void] {
  const enabled = useSoundStore((state) => state.enabled);
  const setEnabled = useSoundStore((state) => state.setEnabled);

  // Unlocks the AudioContext on the first trusted user gesture. Only
  // attached while sound is enabled, so a muted user's first interaction
  // never spins up an AudioContext at all.
  useEffect(() => {
    if (!enabled) return;
    const handler = () => unlockAudio();
    window.addEventListener("pointerdown", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [enabled]);

  return [enabled, setEnabled];
}
