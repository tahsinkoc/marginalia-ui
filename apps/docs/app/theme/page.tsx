import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ulib/ui";

import { SectionIntro, ShowcasePanel } from "../../components/docs-section";

const tokens = [
  { name: "canvas", value: "247 242 233", css: "rgb(var(--ulib-color-canvas))" },
  { name: "surface", value: "255 250 243", css: "rgb(var(--ulib-color-surface))" },
  { name: "surfaceAlt", value: "239 231 218", css: "rgb(var(--ulib-color-surface-alt))" },
  { name: "border", value: "211 197 177", css: "rgb(var(--ulib-color-border))" },
  { name: "text", value: "59 47 38", css: "rgb(var(--ulib-color-text))" },
  { name: "textMuted", value: "123 108 92", css: "rgb(var(--ulib-color-text-muted))" },
  { name: "accent", value: "157 112 78", css: "rgb(var(--ulib-color-accent))" },
  { name: "accentSoft", value: "229 216 196", css: "rgb(var(--ulib-color-accent-soft))" },
  { name: "focus", value: "181 129 90", css: "rgb(var(--ulib-color-focus))" },
  { name: "success", value: "104 132 96", css: "rgb(var(--ulib-color-success))" },
  { name: "warning", value: "179 129 58", css: "rgb(var(--ulib-color-warning))" },
  { name: "danger", value: "167 87 77", css: "rgb(var(--ulib-color-danger))" }
];

const themeSnippet = `:root {
  --ulib-color-canvas: 247 242 233;
  --ulib-color-surface: 255 250 243;
  --ulib-color-surface-alt: 239 231 218;
  --ulib-color-border: 211 197 177;
  --ulib-color-text: 59 47 38;
  --ulib-color-text-muted: 123 108 92;
  --ulib-color-accent: 157 112 78;
  --ulib-color-accent-soft: 229 216 196;
  --ulib-color-focus: 181 129 90;
  --ulib-color-success: 104 132 96;
  --ulib-color-warning: 179 129 58;
  --ulib-color-danger: 167 87 77;
}`;

export default function ThemePage() {
  return (
    <>
      <SectionIntro
        eyebrow="Theme customization"
        title="One token file controls the palette."
        description="Adjust the warm light identity from a single CSS source. Components consume only semantic tokens, so swapping values updates the whole kit consistently."
      />

      <section className="section-stack">
        <Card>
          <CardHeader>
            <CardTitle>Theme source of truth</CardTitle>
            <CardDescription>
              Edit <span className="mono-note">packages/ui/src/styles/theme.css</span> to retune the palette.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="code-block">{themeSnippet}</pre>
          </CardContent>
        </Card>
      </section>

      <section className="section-stack">
        <SectionIntro
          eyebrow="Color tokens"
          title="Semantic names instead of raw hex in components."
          description="That keeps the implementation resilient while making palette exploration straightforward."
        />
        <div className="token-grid">
          {tokens.map((token) => (
            <div key={token.name} className="token-card">
              <div className="token-swatch" style={{ backgroundColor: token.css }} />
              <div className="token-name">{token.name}</div>
              <div className="token-value">{token.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="showcase-grid">
        <ShowcasePanel className="span-6">
          <div className="section-stack">
            <div className="eyebrow">Usage</div>
            <p className="lead" style={{ fontSize: "1rem" }}>
              Import <span className="mono-note">@ulib/ui/styles.css</span> once in your app shell, then override
              tokens where appropriate.
            </p>
          </div>
        </ShowcasePanel>
        <ShowcasePanel className="span-6">
          <div className="section-stack">
            <div className="eyebrow">No runtime provider</div>
            <p className="lead" style={{ fontSize: "1rem" }}>
              V1 intentionally stays CSS-first. Theme customization is file-based, predictable, and easy to audit.
            </p>
          </div>
        </ShowcasePanel>
      </section>
    </>
  );
}
