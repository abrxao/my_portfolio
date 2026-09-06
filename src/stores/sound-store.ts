import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SoundStore {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

// Shared across every component instance: a header mute toggle must affect
// hover/click/scroll sounds fired from anywhere else on the page. Persisted
// so the preference survives reloads - though the browser's AudioContext
// itself always starts locked again regardless (see useSoundEnabled).
export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      enabled: false,
      setEnabled: (enabled) => set({ enabled }),
    }),
    { name: "sound-enabled" }
  )
);

// Reads the current mute state outside of React (event handlers in
// non-component modules like the Button/scroll-stack sound wiring).
export function isSoundEnabled(): boolean {
  return useSoundStore.getState().enabled;
}
