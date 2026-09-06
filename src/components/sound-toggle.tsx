"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSoundEnabled } from "@/hooks/use-sound-enabled";
import { isAudioUnlocked, onAudioUnlocked } from "@/lib/sound";
import { useTranslation } from "@/i18n/client";

export function SoundToggle() {
  const [enabled, setEnabled] = useSoundEnabled();
  const { t } = useTranslation();
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // A fresh page load always starts with a locked AudioContext, even for a
  // returning visitor whose "enabled" preference was already true - nothing
  // is actually audible until a real click/keypress unlocks it. Track that
  // separately so the hint reflects "will you actually hear anything right
  // now", not just the stored preference.
  useEffect(() => {
    const sync = () => setAudioUnlocked(isAudioUnlocked());
    sync();
    return onAudioUnlocked(sync);
  }, []);

  const showHint = !dismissed && (!enabled || !audioUnlocked);

  return (
    <Popover open={showHint} onOpenChange={(open) => setDismissed(!open)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
          <span className="sr-only">
            {enabled ? t("sound.mute") : t("sound.unmute")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto px-3 py-2 text-sm text-nowrap"
      >
        {t("sound.hint")}
      </PopoverContent>
    </Popover>
  );
}
