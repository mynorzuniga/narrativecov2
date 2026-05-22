"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { REM_BASE_PX, SIZING_SCALE } from "@/lib/sizing/scale";

const COPIED_TOOLTIP_MS = 1200;

export function SizingTab() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copyValue = useCallback(async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedLabel(label);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedLabel(null), COPIED_TOOLTIP_MS);
    } catch {
      // Clipboard unavailable — fail silently
    }
  }, []);

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground">Spacing scale</h2>
        <p className="mt-1 text-sm text-zinc-500">
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
            1rem = {REM_BASE_PX}px
          </code>
          <span className="mx-2 text-zinc-300">·</span>
          Increments of{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
            0.25rem
          </code>{" "}
          (4px)
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <div className="grid grid-cols-[minmax(5rem,auto)_minmax(4rem,auto)_1fr] items-center gap-x-6 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
          <span>Rem</span>
          <span>Px</span>
          <span>Preview</span>
        </div>

        <ul className="divide-y divide-zinc-200">
          {SIZING_SCALE.map(({ rem, px, remLabel }) => {
            const copyKey = remLabel;
            const showCopied = copiedLabel === copyKey;

            return (
              <li key={remLabel}>
                <button
                  type="button"
                  onClick={() => copyValue(copyKey, remLabel)}
                  className="relative grid w-full grid-cols-[minmax(5rem,auto)_minmax(4rem,auto)_1fr] items-center gap-x-6 px-4 py-3 text-left transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-400"
                  aria-label={`Copy ${remLabel}`}
                >
                  {showCopied && (
                    <span
                      role="status"
                      className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-sm"
                    >
                      copied
                    </span>
                  )}

                  <span className="font-mono text-sm text-zinc-900">{remLabel}</span>
                  <span className="font-mono text-sm text-zinc-500">{px}px</span>
                  <div className="flex min-h-6 items-center">
                    <div
                      className="h-4 rounded-sm bg-zinc-800"
                      style={{ width: remLabel }}
                      aria-hidden
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
