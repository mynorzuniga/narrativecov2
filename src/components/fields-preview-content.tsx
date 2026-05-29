"use client";

import { CtaButton } from "@/components/cta-button";
import { Logo } from "@/components/logo";
import { PasswordField } from "@/components/password-field";
import { TextField } from "@/components/text-field";
import { DISPLAY_STYLES } from "@/lib/typography/scale";

const display2 = DISPLAY_STYLES.find((s) => s.id === "display2")!;

export function FieldsPreviewContent() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface-page-default px-[1rem]">
      <div className="flex shrink-0 justify-center pt-[1rem]">
        <Logo />
      </div>

      <div className="mt-[calc(3rem+2.5rem)] flex min-h-0 flex-1 flex-col">
        <h1
          className="shrink-0 font-heading font-semibold leading-tight text-text-default-heading"
          style={{ fontSize: display2.size }}
        >
          <span className="text-text-default-accent">Start</span> Your Journey
        </h1>

        <div className="mt-[1rem] shrink-0 space-y-[1rem]">
          <TextField label="Username" placeholder="Username" />
          <PasswordField label="Password" placeholder="Password" />
          <CtaButton variant="primary" className="w-full">
            LogIn
          </CtaButton>
          <CtaButton variant="secondary" className="w-full">
            SignUp
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
