"use client";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { TextField, type TextFieldProps } from "@/components/text-field";

const fieldIconClass = "text-text-field-default";

type PasswordFieldProps = Omit<
  TextFieldProps,
  "leadingAdornment" | "trailingAdornment" | "type"
>;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      type={visible ? "text" : "password"}
      trailingAdornment={
        <button
          type="button"
          className="flex items-center justify-center"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((show) => !show)}
        >
          {visible ? (
            <EyeSlash
              size={ICON_SIZE_PX.md}
              weight={ICON_WEIGHT_DEFAULT}
              className={fieldIconClass}
              aria-hidden
            />
          ) : (
            <Eye
              size={ICON_SIZE_PX.md}
              weight={ICON_WEIGHT_DEFAULT}
              className={fieldIconClass}
              aria-hidden
            />
          )}
        </button>
      }
      {...props}
    />
  );
}
