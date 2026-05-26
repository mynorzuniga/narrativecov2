import { BODY_STYLES } from "@/lib/typography/scale";

const bodyBig = BODY_STYLES.find((s) => s.id === "big")!;

const VARIANT_CLASSES = {
  primary: "bg-surface-cta-primary text-text-cta-primary",
  secondary: "bg-surface-cta-secondary text-text-cta-secondary",
  tertiary: "bg-surface-cta-tertiary text-text-cta-tertiary",
} as const;

export type CtaVariant = keyof typeof VARIANT_CLASSES;

type CtaButtonProps = {
  variant: CtaVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export function CtaButton({
  variant,
  children,
  className,
  onClick,
  disabled,
}: CtaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex h-[3rem] items-center justify-center overflow-hidden rounded-[0.5rem] px-[1rem] font-serif font-semibold ${VARIANT_CLASSES[variant]}${className ? ` ${className}` : ""}`}
      style={{ fontSize: bodyBig.size }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-text-default-heading/10 opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
