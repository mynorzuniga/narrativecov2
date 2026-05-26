"use client";

import { Art1StackAnimation } from "@/components/art1-stack-animation";
import { Art2StackAnimation } from "@/components/art2-stack-animation";
import { Header } from "@/components/header";
import { LearnStorySequence } from "@/components/learn-story-sequence";
import { NavigationBar } from "@/components/navigation-bar";
import {
  PHONE_PREVIEW_HEIGHT_PX,
  PHONE_PREVIEW_WIDTH_PX,
  PhonePreviewFrame,
} from "@/components/design-system/phone-preview-frame";

export function NavigationSubtab() {
  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Header</h2>
          <p className="mt-1 text-sm text-zinc-500">
            3rem height · center title Body Big Medium · left flame + count ·
            right notifications and account · bottom border{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              text-text-default-complementary
            </code>
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <Header />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Navigation bar</h2>
          <p className="mt-1 text-sm text-zinc-500">
            3.5rem height · Home and Learn · selected state uses container success
            background and success heading text · top border{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              text-text-default-complementary
            </code>
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <NavigationBar />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Art stack animation</h2>
          <p className="mt-1 text-sm text-zinc-500">
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              art1/man
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bubble1
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bubble2
            </code>{" "}
            · multiply blend · spring reveal (man → bubble1 → bubble2)
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <Art1StackAnimation />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Art 2 stack animation</h2>
          <p className="mt-1 text-sm text-zinc-500">
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              art2/man
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bubble1
            </code>
            ,{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bubble2
            </code>{" "}
            · multiply blend · spring reveal (man → bubble1 → bubble2)
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <Art2StackAnimation />
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">Navigation preview</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Phone frame {PHONE_PREVIEW_WIDTH_PX}×{PHONE_PREVIEW_HEIGHT_PX}px ·{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              bg-surface-page-default
            </code>{" "}
            · header, learn story sequence, and navigation bar
          </p>
        </div>

        <PhonePreviewFrame>
          <Header />
          <LearnStorySequence />
          <NavigationBar />
        </PhonePreviewFrame>
      </section>
    </div>
  );
}
