import { PhonePreviewFrame } from "@/components/design-system/phone-preview-frame";
import { FieldsPreviewContent } from "@/components/fields-preview-content";
import { Header } from "@/components/header";
import { LearnStorySequence } from "@/components/learn-story-sequence";
import { NavigationBar } from "@/components/navigation-bar";
import Link from "next/link";

export default function PreviewPage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col px-6 py-16 sm:px-10 sm:py-20">
        <header className="mb-12 flex items-start justify-between gap-[1rem]">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Preview
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Navigation and fields phone frames side by side
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-lg border border-zinc-200 px-[1rem] py-[0.5rem] text-sm font-medium text-foreground transition-colors hover:bg-zinc-50"
          >
            Back
          </Link>
        </header>

        <div className="flex flex-wrap items-start justify-center gap-[3rem]">
          <PhonePreviewFrame>
            <Header />
            <LearnStorySequence />
            <NavigationBar />
          </PhonePreviewFrame>

          <div
            aria-hidden
            className="hidden w-px self-stretch bg-zinc-200 sm:block"
          />

          <PhonePreviewFrame>
            <FieldsPreviewContent />
          </PhonePreviewFrame>
        </div>
      </main>
    </div>
  );
}
