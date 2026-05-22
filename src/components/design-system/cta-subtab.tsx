import { CtaButton } from "@/components/cta-button";

const CTA_VARIANTS = [
  { variant: "primary" as const, label: "Primary" },
  { variant: "secondary" as const, label: "Secondary" },
  { variant: "tertiary" as const, label: "Tertiary" },
] as const;

export function CtaSubtab() {
  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">CTA</h2>
          <p className="mt-1 text-sm text-zinc-500">
            3rem height · Body Big SemiBold ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              px-[1rem]
            </code>{" "}
            · corner radius{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              0.5rem
            </code>{" "}
            ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              surface/cta/*
            </code>{" "}
            +{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              text/cta/*
            </code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[1rem] rounded-lg border border-zinc-200 bg-surface-page-default p-[1rem]">
          {CTA_VARIANTS.map(({ variant, label }) => (
            <CtaButton key={variant} variant={variant}>
              {label}
            </CtaButton>
          ))}
        </div>
      </section>
    </div>
  );
}
