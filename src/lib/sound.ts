let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  try {
    ctx = new Ctor();
  } catch {
    ctx = null;
  }
  return ctx;
}

const unlockListeners = new Set<() => void>();

// The "sound enabled" preference and the browser's actual AudioContext
// state are independent: a returning visitor can load the page with sound
// enabled while the context is still locked (fresh page load = fresh
// context, regardless of what was chosen last time), and nothing will
// audibly play until a real gesture unlocks it. This lets UI react to that
// distinction instead of assuming "enabled" means "audible".
export function isAudioUnlocked(): boolean {
  return ctx !== null && ctx.state === "running";
}

export function onAudioUnlocked(listener: () => void): () => void {
  unlockListeners.add(listener);
  return () => unlockListeners.delete(listener);
}

export function unlockAudio() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  if (audioCtx.state === "running") {
    unlockListeners.forEach((listener) => listener());
    return;
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume().then(() => {
      if (audioCtx.state === "running") {
        unlockListeners.forEach((listener) => listener());
      }
    });
  }
}

export interface Tone {
  type: OscillatorType;
  freq: number;
  freqTo?: number;
  duration: number;
  gain: number;
}

// Each call builds and tears down its own oscillator/gain pair so rapid
// repeated triggers (e.g. fast hovering) never accumulate live nodes.
export function playTone(tone: Tone) {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state !== "running") return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.type = tone.type;
  osc.frequency.setValueAtTime(tone.freq, now);
  if (tone.freqTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      tone.freqTo,
      now + tone.duration
    );
  }

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(tone.gain, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };

  osc.start(now);
  osc.stop(now + tone.duration + 0.02);
}

const sampleBuffers = new Map<string, Promise<AudioBuffer | null>>();

function loadSample(
  audioCtx: AudioContext,
  url: string
): Promise<AudioBuffer | null> {
  const cached = sampleBuffers.get(url);
  if (cached) return cached;

  const load = fetch(url)
    .then((res) => res.arrayBuffer())
    .then((data) => audioCtx.decodeAudioData(data))
    .catch(() => null);
  sampleBuffers.set(url, load);
  return load;
}

// For pre-recorded one-shots (a real swipe/whoosh sample) rather than the
// synthesized Tone/ShepardSweep above. Buffers are fetched once and cached
// by URL; each call still gets its own source/gain pair so rapid repeated
// triggers never fight over playback state.
export function playSample(url: string, gain = 1) {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state !== "running") return;

  void loadSample(audioCtx, url).then((buffer) => {
    if (!buffer) return;
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    source.buffer = buffer;
    gainNode.gain.value = gain;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.onended = () => {
      source.disconnect();
      gainNode.disconnect();
    };
    source.start();
  });
}

export interface ShepardSweep {
  direction: 1 | -1;
  duration: number;
  gain: number;
}

// Octave-spaced sine layers gliding together (each ending exactly one
// octave from where it started) so the pitch reads as continuously
// rising/falling rather than a single tone sweeping between two notes -
// the same layering trick a Shepard tone uses, sized to one finite pass
// rather than an endless loop.
const SHEPARD_LAYERS = [
  { freq: 200, weight: 0.35 },
  { freq: 300, weight: 1 },
  { freq: 400, weight: 1 },
  { freq: 500, weight: 0.35 },
];

export function playShepardTone({ direction, duration, gain }: ShepardSweep) {
  const audioCtx = getContext();
  if (!audioCtx || audioCtx.state !== "running") return;

  const now = audioCtx.currentTime;
  const attack = Math.min(0.03, duration / 4);
  const release = Math.min(0.05, duration / 4);

  const master = audioCtx.createGain();
  master.connect(audioCtx.destination);
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(gain, now + attack);
  master.gain.setValueAtTime(gain, now + duration - release);
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  for (const { freq, weight } of SHEPARD_LAYERS) {
    const osc = audioCtx.createOscillator();
    const layerGain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(
      direction > 0 ? freq * 2 : freq / 2,
      now + duration
    );
    layerGain.gain.setValueAtTime(weight, now);
    osc.connect(layerGain);
    layerGain.connect(master);
    osc.onended = () => {
      osc.disconnect();
      layerGain.disconnect();
    };
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  setTimeout(() => master.disconnect(), (duration + 0.05) * 1000);
}
