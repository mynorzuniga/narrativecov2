import { MagnifyingGlass } from "@phosphor-icons/react";
import { ICON_SIZE_PX, ICON_WEIGHT_DEFAULT } from "@/lib/icons/scale";
import { TextField, type TextFieldProps } from "@/components/text-field";

const fieldIconClass = "text-text-field-default";

type SearchFieldProps = Omit<
  TextFieldProps,
  "leadingAdornment" | "trailingAdornment" | "type"
>;

export function SearchField(props: SearchFieldProps) {
  return (
    <TextField
      type="search"
      leadingAdornment={
        <MagnifyingGlass
          size={ICON_SIZE_PX.md}
          weight={ICON_WEIGHT_DEFAULT}
          className={fieldIconClass}
          aria-hidden
        />
      }
      {...props}
    />
  );
}
