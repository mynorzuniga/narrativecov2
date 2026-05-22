import {
  SURFACE_CONTAINER_TOKENS,
  SURFACE_CTA_TOKENS,
  SURFACE_FIELD_TOKENS,
  SURFACE_PAGE_TOKENS,
} from "@/lib/tokens/surface";
import { LINE_FIELD_TOKENS } from "@/lib/tokens/line";
import {
  TEXT_ACCENT1_TOKENS,
  TEXT_ACCENT2_TOKENS,
  TEXT_CTA_TOKENS,
  TEXT_DEFAULT_TOKENS,
  TEXT_DISABLED_TOKENS,
  TEXT_FIELD_TOKENS,
  TEXT_SUCCESS_TOKENS,
  TEXT_WARNING_TOKENS,
} from "@/lib/tokens/text";

type SemanticColorToken = {
  path: string;
  paletteClass: string;
  hex: string;
};

function TokenColorSwatch({ hex, label }: { hex: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="size-8 shrink-0 rounded border border-zinc-200"
      style={{ backgroundColor: hex }}
    />
  );
}

function SemanticTokenList({ tokens }: { tokens: readonly SemanticColorToken[] }) {
  return (
    <ul className="w-fit divide-y divide-zinc-200 rounded-lg border border-zinc-200">
      {tokens.map((token) => (
        <li key={token.path} className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 font-mono text-sm text-zinc-900">
            <span className="text-foreground">{token.path}</span>
            <span className="text-zinc-500"> → {token.paletteClass}</span>
          </div>
          <TokenColorSwatch
            hex={token.hex}
            label={`${token.path}: ${token.paletteClass}`}
          />
        </li>
      ))}
    </ul>
  );
}

function SemanticTokenGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function TokensColorSubtab() {
  return (
    <>
      <SemanticTokenGroup
        title="Surface"
        description="Semantic surface tokens mapped to palette shades."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Page</h3>
            <SemanticTokenList tokens={SURFACE_PAGE_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Container</h3>
            <SemanticTokenList tokens={SURFACE_CONTAINER_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">CTA</h3>
            <SemanticTokenList tokens={SURFACE_CTA_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Field</h3>
            <SemanticTokenList tokens={SURFACE_FIELD_TOKENS} />
          </div>
        </div>
      </SemanticTokenGroup>
      <SemanticTokenGroup
        title="Line"
        description="Semantic line tokens mapped to palette shades."
      >
        <div>
          <h3 className="mb-3 text-sm font-semibold text-zinc-900">Field</h3>
          <SemanticTokenList tokens={LINE_FIELD_TOKENS} />
        </div>
      </SemanticTokenGroup>
      <SemanticTokenGroup
        title="Text"
        description="Semantic text tokens mapped to palette shades."
      >
        <div className="space-y-8">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Default</h3>
            <SemanticTokenList tokens={TEXT_DEFAULT_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Accent 1</h3>
            <SemanticTokenList tokens={TEXT_ACCENT1_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Accent 2</h3>
            <SemanticTokenList tokens={TEXT_ACCENT2_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Disabled</h3>
            <SemanticTokenList tokens={TEXT_DISABLED_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Warning</h3>
            <SemanticTokenList tokens={TEXT_WARNING_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Success</h3>
            <SemanticTokenList tokens={TEXT_SUCCESS_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">CTA</h3>
            <SemanticTokenList tokens={TEXT_CTA_TOKENS} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900">Field</h3>
            <SemanticTokenList tokens={TEXT_FIELD_TOKENS} />
          </div>
        </div>
      </SemanticTokenGroup>
    </>
  );
}
