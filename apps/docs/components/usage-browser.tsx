"use client";

import * as React from "react";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, CodeViewer, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, buttonVariants } from "@marginalia/ui";

import { contentUsageSections } from "./usage-data-content";
import { foundationUsageSections } from "./usage-data-foundations";
import { formUsageSections } from "./usage-data-forms";
import { navigationUsageSections } from "./usage-data-navigation";
import { overlayUsageSections } from "./usage-data-overlays";
import type { UsageGroup, UsageSection } from "./usage-types";

const usageSections: UsageSection[] = [
  ...foundationUsageSections,
  ...formUsageSections,
  ...overlayUsageSections,
  ...navigationUsageSections,
  ...contentUsageSections
];

const usageGroups = usageSections.reduce<UsageGroup[]>((groups, section) => {
  const existing = groups.find((group) => group.title === section.category);

  if (existing) {
    existing.items.push(section);
  } else {
    groups.push({ title: section.category, items: [section] });
  }

  return groups;
}, []);

export function UsageBrowser() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(usageSections[0]?.id ?? "");

  React.useEffect(() => {
    const updateActiveId = () => {
      const requestedId = window.location.hash.replace("#", "");
      const nextId = usageSections.some((section) => section.id === requestedId)
        ? requestedId
        : (usageSections[0]?.id ?? "");

      setActiveId(nextId);
    };

    updateActiveId();
    window.addEventListener("hashchange", updateActiveId);

    return () => window.removeEventListener("hashchange", updateActiveId);
  }, []);

  const activeSection = usageSections.find((section) => section.id === activeId) ?? usageSections[0];
  const activeIndex = usageSections.findIndex((section) => section.id === activeSection?.id);
  const previousSection = activeIndex > 0 ? usageSections[activeIndex - 1] : undefined;
  const nextSection = activeIndex >= 0 && activeIndex < usageSections.length - 1 ? usageSections[activeIndex + 1] : undefined;

  const handleSelect = (id: string) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  if (!activeSection) {
    return null;
  }

  return (
    <div className="usage-stack">
      <div className="usage-mobile-bar">
        <div className="usage-mobile-meta">
          <Badge variant="accent">Usage</Badge>
          <span className="mono-note usage-mobile-current">{activeSection.label}</span>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="usage-mobile-trigger">
              <MenuIcon className="h-4 w-4" />
              <span>Browse components</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="usage-mobile-sheet">
            <SheetHeader>
              <Badge variant="accent">Usage</Badge>
              <SheetTitle>Component index</SheetTitle>
              <SheetDescription>Jump directly to a component example, live preview, and starter snippet.</SheetDescription>
            </SheetHeader>
            <UsageMenu
              activeId={activeId}
              onSelect={(id) => {
                handleSelect(id);
                setMenuOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="usage-layout">
        <aside className="usage-sidebar">
          <Card className="usage-sidebar-card">
            <CardHeader>
              <Badge variant="accent">Usage</Badge>
              <CardTitle>Component index</CardTitle>
              <CardDescription>Jump between examples, previews, and ready-to-paste starter snippets.</CardDescription>
            </CardHeader>
            <CardContent>
              <UsageMenu activeId={activeId} onSelect={handleSelect} />
            </CardContent>
          </Card>
        </aside>

        <div className="usage-content">
          <section key={activeSection.id} id={activeSection.id} className="usage-section is-active">
            <div className="usage-section-head">
              <div className="usage-section-bar">
                <div className="usage-section-meta">
                  <Badge variant="outline">{activeSection.category}</Badge>
                  <span className="mono-note">
                    {activeIndex + 1} / {usageSections.length}
                  </span>
                </div>
                <div className="usage-section-actions">
                  {previousSection ? (
                    <Button variant="ghost" size="sm" onClick={() => handleSelect(previousSection.id)}>
                      Previous
                    </Button>
                  ) : null}
                  {nextSection ? (
                    <Button variant="ghost" size="sm" onClick={() => handleSelect(nextSection.id)}>
                      Next
                    </Button>
                  ) : null}
                </div>
              </div>
              <h3>{activeSection.label}</h3>
              <p>{activeSection.description}</p>
            </div>
            <div className="usage-example-grid">
              <div className="usage-preview-card">
                <Card>
                  <CardHeader>
                    <Badge>Preview</Badge>
                    <CardTitle>{activeSection.label} output</CardTitle>
                    <CardDescription>Rendered with the same tokens and defaults your app receives.</CardDescription>
                  </CardHeader>
                  <CardContent>{activeSection.preview}</CardContent>
                </Card>
              </div>
              <div className="usage-code-card">
                <CodeViewer
                  filename={activeSection.filename}
                  language={resolveSnippetLanguage(activeSection.filename)}
                  caption="Starter usage snippet with imports"
                  code={activeSection.code}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function UsageMenu({
  activeId,
  onSelect
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav className="usage-menu" aria-label="Usage components">
      {usageGroups.map((group) => (
        <div key={group.title} className="usage-menu-group">
          <div className="mono-note usage-menu-title">{group.title}</div>
          <div className="usage-menu-links">
            {group.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(item.id);
                }}
                className={`${buttonVariants({ variant: activeId === item.id ? "secondary" : "ghost", size: "sm" })} usage-menu-link`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function resolveSnippetLanguage(filename: string) {
  if (filename.endsWith(".tsx")) {
    return "tsx";
  }

  if (filename.endsWith(".ts")) {
    return "typescript";
  }

  return "tsx";
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
