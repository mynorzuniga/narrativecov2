"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ColorPalette } from "@/components/design-system/color-palette";
import {
  AMBER_BASE_SHADE,
  AMBER_COLOR,
  AMBER_SHADES,
} from "@/lib/colors/amber";
import {
  CREAM_BASE_SHADE,
  CREAM_COLOR,
  CREAM_SHADES,
} from "@/lib/colors/cream";
import {
  CHARCOAL_BASE_SHADE,
  CHARCOAL_COLOR,
  CHARCOAL_SHADES,
} from "@/lib/colors/charcoal";
import {
  OXBLOOD_INK_BASE_SHADE,
  OXBLOOD_INK_COLOR,
  OXBLOOD_INK_SHADES,
} from "@/lib/colors/oxblood-ink";

const COPIED_TOOLTIP_MS = 1200;

export function ColorTab() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = useCallback(async (_key: string, hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedKey(_key);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedKey(null), COPIED_TOOLTIP_MS);
    } catch {
      // Clipboard unavailable — fail silently
    }
  }, []);

  return (
    <div>
      <ColorPalette
        name="Oxblood Ink"
        baseColor={OXBLOOD_INK_COLOR}
        baseShade={OXBLOOD_INK_BASE_SHADE}
        shades={OXBLOOD_INK_SHADES}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />
      <ColorPalette
        name="Charcoal"
        baseColor={CHARCOAL_COLOR}
        baseShade={CHARCOAL_BASE_SHADE}
        shades={CHARCOAL_SHADES}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />
      <ColorPalette
        name="Amber"
        baseColor={AMBER_COLOR}
        baseShade={AMBER_BASE_SHADE}
        shades={AMBER_SHADES}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />
      <ColorPalette
        name="Cream"
        baseColor={CREAM_COLOR}
        baseShade={CREAM_BASE_SHADE}
        shades={CREAM_SHADES}
        columns={3}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />
    </div>
  );
}
