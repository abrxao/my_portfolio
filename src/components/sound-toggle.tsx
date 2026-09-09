"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSoundEnabled } from "@/hooks/use-sound-enabled";
import { useTranslation } from "@/i18n/client";

export function SoundToggle() {
  const [enabled, setEnabled] = useSoundEnabled();
  const { t } = useTranslation();

  return (
    <Button variant="outline" size="icon" onClick={() => setEnabled(!enabled)}>
      {enabled ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      <span className="sr-only">
        {enabled ? t("sound.mute") : t("sound.unmute")}
      </span>
    </Button>
  );
}
