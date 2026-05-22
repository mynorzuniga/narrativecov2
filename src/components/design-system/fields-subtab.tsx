"use client";

import { useState } from "react";
import {
  PHONE_PREVIEW_HEIGHT_PX,
  PHONE_PREVIEW_WIDTH_PX,
  PhonePreviewFrame,
} from "@/components/design-system/phone-preview-frame";
import { FieldsPreviewContent } from "@/components/fields-preview-content";
import { PasswordField } from "@/components/password-field";
import { SearchField } from "@/components/search-field";
import { TextField } from "@/components/text-field";

function PreviewToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-[0.5rem] font-sans text-sm text-zinc-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-[1rem] accent-zinc-800"
      />
      {label}
    </label>
  );
}

export function FieldsSubtab() {
  const [showLabel, setShowLabel] = useState(true);
  const [showComplementary, setShowComplementary] = useState(true);

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Text field</h2>
          <p className="mt-1 text-sm text-zinc-500">
            3rem height · Body Standard Regular input · Body Small Regular label
            and complementary ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              px-[1rem]
            </code>{" "}
            · corner radius{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              0.5rem
            </code>{" "}
            ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              surface/field/*
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              line/field/*
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              text/field/*
            </code>
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-[1rem]">
          <PreviewToggle
            label="Label"
            checked={showLabel}
            onChange={setShowLabel}
          />
          <PreviewToggle
            label="Complementary"
            checked={showComplementary}
            onChange={setShowComplementary}
          />
        </div>

        <div className="max-w-[28rem] space-y-[1rem] rounded-lg border border-zinc-200 bg-surface-page-default p-[1rem]">
          <TextField
            label={showLabel ? "Label" : undefined}
            complementary={
              showComplementary ? "Complementary text" : undefined
            }
            placeholder="Placeholder"
          />
          <TextField
            label={showLabel ? "Label" : undefined}
            complementary={
              showComplementary ? "Complementary text" : undefined
            }
            defaultValue="Filled text"
            error
          />
          <TextField
            label={showLabel ? "Label" : undefined}
            complementary={
              showComplementary ? "Complementary text" : undefined
            }
            defaultValue="Filled text"
            disabled
          />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Ready to use</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Search and password variants · icons{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              text-text-field-default
            </code>{" "}
            ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              ICON_SIZE_PX.md
            </code>
          </p>
        </div>

        <div className="max-w-[28rem] space-y-[1rem] rounded-lg border border-zinc-200 bg-surface-page-default p-[1rem]">
          <SearchField placeholder="Search" />
          <PasswordField placeholder="Password" />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Fields preview</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Phone frame {PHONE_PREVIEW_WIDTH_PX}×{PHONE_PREVIEW_HEIGHT_PX}px ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bg-surface-page-default
            </code>{" "}
            · sign-in preview: centered logo, fields, CTAs, static art background below
          </p>
        </div>

        <PhonePreviewFrame>
          <FieldsPreviewContent />
        </PhonePreviewFrame>
      </section>
    </div>
  );
}
