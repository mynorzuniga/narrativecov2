import {
  BODY_STYLES,
  DISPLAY_STYLES,
  FONT_WEIGHTS,
  HEADING_STYLES,
  TYPOGRAPHY_FONT,
} from "@/lib/typography/scale";

type TypeStyle = {
  id: string;
  label: string;
  size: string;
};

function TypeStyleGroup({
  styles,
  previewText,
  leading = "tight",
}: {
  styles: readonly TypeStyle[];
  previewText: (style: TypeStyle) => string;
  leading?: "tight" | "normal";
}) {
  const leadingClass = leading === "normal" ? "leading-normal" : "leading-tight";
  return (
    <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200">
      {styles.map((style) => (
        <div key={style.id} className="p-6">
          <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold text-zinc-900">{style.label}</h3>
            <code className="font-mono text-xs text-zinc-500">{style.size}</code>
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FONT_WEIGHTS.map((fontWeight) => (
              <li
                key={`${style.id}-${fontWeight.id}`}
                className="flex min-w-0 flex-col gap-2"
              >
                <div className="text-xs font-medium text-zinc-500">
                  <span className="block text-zinc-700">{fontWeight.label}</span>
                  <span className="font-mono font-normal">{fontWeight.weight}</span>
                </div>
                <p
                  className={`${leadingClass} text-foreground`}
                  style={{
                    fontSize: style.size,
                    fontWeight: fontWeight.weight,
                  }}
                >
                  {previewText(style)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function TypographyTab() {
  return (
    <div className="font-serif">
      <div className="mb-10">
        <h2 className="font-sans text-lg font-semibold text-foreground">Typography</h2>
        <p className="mt-1 font-sans text-sm text-zinc-500">
          Font family{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
            {TYPOGRAPHY_FONT}
          </code>
        </p>
      </div>

      <section className="mb-12">
        <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Display
        </h3>
        <TypeStyleGroup
          styles={DISPLAY_STYLES}
          previewText={(style) => style.label}
        />
      </section>

      <section className="mb-12">
        <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Headings
        </h3>
        <TypeStyleGroup
          styles={HEADING_STYLES}
          previewText={(style) => style.label}
        />
      </section>

      <section>
        <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Body
        </h3>
        <TypeStyleGroup
          styles={BODY_STYLES}
          leading="normal"
          previewText={() =>
            "The quick brown fox jumps over the lazy dog."
          }
        />
      </section>
    </div>
  );
}
