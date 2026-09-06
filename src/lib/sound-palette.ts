import type { ShepardSweep, Tone } from "./sound";

export const hoverTick: Tone = {
  type: "sine",
  freq: 720,
  duration: 0.05,
  gain: 0.05,
};

export const clickTone: Tone = {
  type: "triangle",
  freq: 480,
  freqTo: 300,
  duration: 0.08,
  gain: 0.09,
};

export const cardEnter: Tone = {
  type: "sine",
  freq: 440,
  freqTo: 660,
  duration: 0.12,
  gain: 0.07,
};

export const cardExit: Tone = {
  type: "sine",
  freq: 500,
  freqTo: 320,
  duration: 0.09,
  gain: 0.05,
};

// Sized to the whole settled scroll gesture: `delta` is the total progress
// (0-100) covered since the bar last caught up, direction picks whether the
// layered sweep glides up or down, and both duration and loudness scale
// with how far the bar has to travel.
export function scrollShepardSweep(delta: number): ShepardSweep {
  const magnitude = Math.min(Math.abs(delta) / 100, 1);
  return {
    direction: delta >= 0 ? 1 : -1,
    duration: 0.3 + magnitude * 0.5,
    gain: 0.035 + magnitude * 0.025,
  };
}
