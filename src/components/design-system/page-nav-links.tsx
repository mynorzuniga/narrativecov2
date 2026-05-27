import Link from "next/link";

const linkBase =
  "inline-flex min-w-[9.5rem] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 px-[1.25rem] py-[0.625rem] text-base font-semibold shadow-md transition-colors";

export function PageNavLinks() {
  return (
    <nav
      aria-label="Page navigation"
      className="flex shrink-0 flex-nowrap items-center gap-[0.75rem]"
    >
      <Link
        href="/interactions"
        className={`${linkBase} border-oxblood-ink-800 bg-oxblood-ink-800 text-cream-100 hover:bg-oxblood-ink-700`}
      >
        Interactions
      </Link>
      <Link
        href="/preview"
        className={`${linkBase} border-charcoal-800 bg-cream-100 text-charcoal-800 hover:bg-cream-200`}
      >
        Preview
      </Link>
      <Link
        href="/preview-2"
        className={`${linkBase} border-charcoal-800 bg-cream-100 text-charcoal-800 hover:bg-cream-200`}
      >
        Preview 2
      </Link>
    </nav>
  );
}
