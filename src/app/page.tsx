import { DesignSystemTabs } from "@/components/design-system/design-system-tabs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <main className="mx-auto w-full max-w-screen-2xl px-6 py-16 sm:px-10 sm:py-20">
        <header className="mb-12 flex items-start justify-between gap-[1rem]">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            DevSavan - NarrativeCo
          </h1>
          <Link
            href="/preview"
            className="shrink-0 rounded-lg border border-zinc-200 px-[1rem] py-[0.5rem] text-sm font-medium text-foreground transition-colors hover:bg-zinc-50"
          >
            Preview
          </Link>
        </header>

        <DesignSystemTabs />
      </main>
    </div>
  );
}
