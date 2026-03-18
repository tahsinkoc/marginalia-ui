import Link from "next/link";
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, CodeViewer, buttonVariants } from "@marginalia/ui";

const installSnippet = `npm install marginalia-ui`;

const codexPromptSnippet = `import "marginalia-ui/styles.css";

// Use $marginalia-ui at ./skills/marginalia-ui to build a warm editorial
// page with marginalia-ui. Prefer existing Marginalia components and
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
          Install the package from npm, then use the bundled skill from the GitHub repo so Codex can learn the
          full component set, theme tokens, page recipes, and usage patterns before it starts building.
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
          filename="install.sh"
          language="bash"
          caption="Install from npm"
          code={installSnippet}
        />
        <CodeViewer
          filename="codex-prompt.ts"
          language="tsx"
          caption="Prompt Codex with the bundled skill"
          code={codexPromptSnippet}
        />
        <div className="inline-actions" style={{ gap: "0.65rem", marginTop: 0 }}>
          <a
            href="https://github.com/tahsinkoc/marginalia-ui"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            GitHub repo
          </a>
          {ctaHref ? (
            <Link href={ctaHref} className={buttonVariants({ variant: "outline", size: "sm" })}>
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
