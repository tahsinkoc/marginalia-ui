import Link from "next/link";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, buttonVariants } from "@marginalia/ui";

import { SectionIntro, ShowcasePanel } from "../components/docs-section";

const principles = [
  {
    title: "Academic warmth",
    copy: "Typography and spacing stay measured, not ornamental. The palette leans parchment, clay, and ink."
  },
  {
    title: "Calm defaults",
    copy: "Components feel polished from the first render, with no theme provider or runtime configuration required."
  },
  {
    title: "Built for Next",
    copy: "Interactive primitives are client-only, while presentation components stay server-safe for App Router projects."
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero-grid">
        <div className="section-stack">
          <Badge variant="accent">Marginalia UI</Badge>
          <div className="eyebrow">React + Next.js UI library</div>
          <h1 className="hero-title">Thoughtful components with an editorial, elegant cadence.</h1>
          <p className="lead">
            Marginalia begins with the everyday pieces you reach for first, then gives them a cohesive academic
            character inspired by warm paper, quiet contrast, and deliberate spacing.
          </p>
          <div className="hero-actions">
            <Link href="/components" className={buttonVariants({ variant: "primary", size: "lg" })}>
              Explore components
            </Link>
            <Link href="/theme" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Tune the palette
            </Link>
          </div>
          <p className="hero-note">
            Theme colors live in one file: <span className="mono-note">packages/ui/src/styles/theme.css</span>
          </p>
        </div>

        <Card>
          <CardHeader>
            <Badge>V1 foundations</Badge>
            <CardTitle>Start with the essentials</CardTitle>
            <CardDescription>
              Buttons, fields, and form controls share the same surface language so the kit feels coherent from
              day one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="inline-actions">
              <Button size="sm">Primary action</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </div>
            <div className="showcase-panel">
              <div className="eyebrow">Included now</div>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Button, Input, Textarea, Label, Select, Checkbox, Radio, Switch, Card, Badge, Dialog,
                Tooltip, Dropdown Menu, Tabs, Toast, Popover, Combobox, Command Palette, Date Picker,
                Table, Pagination, Empty State, Accordion, Sheet, Stepper, Skeleton, Alert, Progress,
                Breadcrumb, Avatar, Hover Card, Context Menu, Menubar, and Rich Text Surface.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="section-stack">
        <SectionIntro
          eyebrow="Design principles"
          title="Quietly distinctive by default."
          description="The system aims for clarity before novelty, then adds just enough texture and contrast to feel memorable."
        />
        <div className="catalog-list">
          {principles.map((item) => (
            <ShowcasePanel key={item.title}>
              <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.7rem", fontWeight: 600 }}>{item.title}</h3>
              <p className="lead" style={{ fontSize: "1rem" }}>
                {item.copy}
              </p>
            </ShowcasePanel>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <SectionIntro
          eyebrow="What ships in the package"
          title="Foundations first, then thoughtful overlays."
          description="The API now covers form foundations, layered interactions, menus, editorial reading surfaces, searchable workflows, data display, loading or progression patterns, and navigational identity details without breaking the same calm visual rhythm."
        />
        <div className="showcase-grid">
          <ShowcasePanel className="span-8">
            <div className="eyebrow">Styling model</div>
            <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", marginTop: "0.35rem" }}>
              Tailwind inside, compiled CSS outside.
            </h3>
            <p className="lead" style={{ fontSize: "1rem" }}>
              Components are authored with semantic utility classes and exported with a ready-to-import
              <span className="mono-note"> styles.css</span>, so consumers do not need Tailwind installed.
            </p>
          </ShowcasePanel>
          <ShowcasePanel className="span-4">
            <div className="eyebrow">Accessibility</div>
            <p className="lead" style={{ fontSize: "1rem" }}>
              Select, Checkbox, Radio, and Switch are composed with Radix primitives for dependable keyboard and
              ARIA behavior.
            </p>
          </ShowcasePanel>
        </div>
      </section>
    </>
  );
}

