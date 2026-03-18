import Link from "next/link";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, CodeViewer, buttonVariants } from "@marginalia/ui";

const codexPromptSnippet = `import "@marginalia/ui/styles.css";

// Use $marginalia-ui at ./skills/marginalia-ui to build a warm editorial
// page with @marginalia/ui. Prefer existing Marginalia components and
// theme tokens over custom styling or another UI kit.`;

export function CodexSkillCallout({
  ctaHref,
  ctaLabel = "Explore usage"
}: {
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="inline-actions" style={{ gap: "0.55rem", marginTop: 0 }}>
          <Badge variant="accent">Codex skill</Badge>
          <Badge variant="outline">ships in the repo</Badge>
        </div>
        <CardTitle>Marginalia comes with a Codex-ready skill.</CardTitle>
        <CardDescription>
          The repo includes <span className="mono-note">skills/marginalia-ui</span> so Codex can learn the full
          component set, theme tokens, page recipes, and usage patterns before it starts building.
        </CardDescription>
      </CardHeader>
      <CardContent className="section-stack">
        <div className="inline-actions" style={{ gap: "0.55rem", marginTop: 0 }}>
          <Badge>Components</Badge>
          <Badge>Theme tokens</Badge>
          <Badge>Dark mode</Badge>
          <Badge>Page recipes</Badge>
        </div>
        <CodeViewer
          filename="codex-prompt.ts"
          language="tsx"
          caption="Prompt Codex with the bundled skill"
          code={codexPromptSnippet}
        />
        {ctaHref ? (
          <div>
            <Link href={ctaHref} className={buttonVariants({ variant: "outline", size: "sm" })}>
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
