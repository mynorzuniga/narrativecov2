function isLightColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.65;
}

import { Star } from "@phosphor-icons/react";
import { ICON_SIZE_PX } from "@/lib/icons/scale";

type Shade = { shade: number; hex: string };

type ColorPaletteProps = {
  name: string;
  baseColor: string;
  baseShade: number;
  shades: readonly Shade[];
  copiedKey: string | null;
  onCopy: (key: string, hex: string) => void;
  columns?: number;
};

export function ColorPalette({
  name,
  baseColor,
  baseShade,
  shades,
  copiedKey,
  onCopy,
  columns = 11,
}: ColorPaletteProps) {
  const gridColsClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 5
        ? "sm:grid-cols-3 lg:grid-cols-5"
        : "sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11";

  return (
    <section className="mb-16 last:mb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">{name}</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Base color{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
            {baseColor}
          </code>
        </p>
      </div>

      <div className={`grid grid-cols-2 gap-3 ${gridColsClass}`}>
        {shades.map(({ shade, hex }) => {
          const isBase = shade === baseShade;
          const light = isLightColor(hex);
          const copyKey = `${name}-${shade}`;
          const showCopied = copiedKey === copyKey;

          return (
            <button
              key={shade}
              type="button"
              onClick={() => onCopy(copyKey, hex)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border border-zinc-200 text-left transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              aria-label={`Copy ${hex}`}
            >
              {showCopied && (
                <span
                  role="status"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white shadow-sm"
                >
                  copied
                </span>
              )}

              <div
                className="relative flex h-24 flex-col p-3 sm:h-28"
                style={{ backgroundColor: hex }}
              >
                <span
                  className={[
                    "font-mono text-xs",
                    light ? "text-zinc-800" : "text-white/90",
                  ].join(" ")}
                >
                  {hex}
                </span>
                {isBase && (
                  <span
                    className={[
                      "mt-2 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      light
                        ? "bg-white/80 text-zinc-900"
                        : "bg-black/25 text-white",
                    ].join(" ")}
                  >
                    <Star size={ICON_SIZE_PX.sm} weight="fill" aria-hidden />
                    Base
                  </span>
                )}
              </div>
              <div className="bg-white px-3 py-2.5">
                <span className="text-sm font-medium text-zinc-900">{shade}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
