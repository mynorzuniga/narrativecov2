"use client";

import { Warning } from "@phosphor-icons/react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { BODY_STYLES } from "@/lib/typography/scale";

const bodyStandard = BODY_STYLES.find((s) => s.id === "body")!;
const bodySmall = BODY_STYLES.find((s) => s.id === "small")!;

export type TextFieldProps = {
  label?: string;
  complementary?: string;
  trailing?: ReactNode;
  leadingAdornment?: ReactNode;
  trailingAdornment?: ReactNode;
  error?: boolean;
} & Omit<ComponentProps<"input">, "className">;

export function TextField({
  label,
  complementary,
  trailing,
  leadingAdornment,
  trailingAdornment,
  error = false,
  disabled = false,
  id: idProp,
  placeholder,
  type = "text",
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const hasLeading = Boolean(leadingAdornment);
  const hasTrailing =
    Boolean(trailingAdornment) || (error && !disabled);

  const inputBorderClass = disabled
    ? "border-line-field-disabled"
    : error
      ? "border-line-field-warning focus:border-line-field-warning"
      : "border-line-field-enabled focus:border-line-field-active";

  const inputSurfaceClass = disabled
    ? "bg-surface-field-disabled"
    : "bg-surface-field-enabled";

  const inputTextClass = disabled
    ? "text-text-field-disabled placeholder:text-text-field-disabled"
    : "text-text-field-default placeholder:text-text-field-placeholder";

  const inputPaddingClass = `${hasLeading ? "pl-[2.5rem]" : "pl-[1rem]"} ${hasTrailing ? "pr-[2.5rem]" : "pr-[1rem]"}`;

  return (
    <div className="flex flex-col">
      {label ? (
        <label
          htmlFor={id}
          className="mb-[0.25rem] font-serif font-normal text-text-field-default"
          style={{ fontSize: bodySmall.size }}
        >
          {label}
        </label>
      ) : null}

      <div className="flex items-center gap-[1rem]">
        <div className="relative min-w-0 flex-1">
          <input
            id={id}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={`h-[3rem] w-full rounded-[0.5rem] border font-serif font-normal outline-none ${inputPaddingClass} ${inputSurfaceClass} ${inputTextClass} ${inputBorderClass}`}
            style={{ fontSize: bodyStandard.size }}
            aria-invalid={error && !disabled ? true : undefined}
            {...inputProps}
          />
          {leadingAdornment ? (
            <div className="pointer-events-none absolute top-1/2 left-[1rem] -translate-y-1/2">
              {leadingAdornment}
            </div>
          ) : null}
          {error && !disabled ? (
            <Warning
              size={ICON_SIZE_PX.md}
              weight={ICON_WEIGHT_DEFAULT}
              className="pointer-events-none absolute top-1/2 right-[1rem] -translate-y-1/2 text-line-field-warning"
              aria-hidden
            />
          ) : trailingAdornment ? (
            <div className="absolute top-1/2 right-[1rem] -translate-y-1/2">
              {trailingAdornment}
            </div>
          ) : null}
        </div>
        {trailing}
      </div>

      {complementary ? (
        <p
          className="mt-[0.25rem] font-serif font-normal text-text-field-default"
          style={{ fontSize: bodySmall.size }}
        >
          {complementary}
        </p>
      ) : null}
    </div>
  );
}
