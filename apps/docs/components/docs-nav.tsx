"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge, Card, CardContent, buttonVariants } from "@marginalia/ui";

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
  { href: "/theme", label: "Theme" }
];

const brandName = "Marginalia";

export function DocsNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Card className="site-header-card">
        <CardContent className="site-header-content">
          <div className="brand-panel">
            <div className="brand-row">
              <Link href="/" className="brand-mark">
                {brandName}
              </Link>
              <Badge variant="accent">React UI Kit</Badge>
            </div>
            <div className="brand-note">Warm editorial system for calm React and Next.js interfaces.</div>
          </div>

          <nav className="nav-links" aria-label="Primary">
            {navigation.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`${buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" })} nav-link-button`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </CardContent>
      </Card>
    </header>
  );
}

