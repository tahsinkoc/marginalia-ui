"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Badge,
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  buttonVariants
} from "@marginalia/ui";

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
  { href: "/theme", label: "Theme" }
];

const brandName = "Marginalia";

export function DocsNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <div className="site-header-content">
          <div className="brand-panel">
            <div className="brand-row">
              <Link href="/" className="brand-mark">
                {/* {brandName} */}
                <Image src={'/marginalia_logo_r.png'} alt="logo" width={100} height={100}/>
              </Link>
              {/* <Badge variant="accent">React UI Kit</Badge> */}
            </div>
            <div className="brand-note">Warm editorial system for calm React and Next.js interfaces.</div>
          </div>

          <nav className="nav-links nav-links-desktop" aria-label="Primary">
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

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="nav-mobile-trigger" aria-label="Open navigation menu">
                <MenuIcon className="h-4 w-4" />
                {/* <span>Menu</span> */}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="nav-mobile-sheet">
              <SheetHeader>
                <Badge variant="accent">Marginalia</Badge>
                <SheetTitle>Documentation</SheetTitle>
                <SheetDescription>Browse the overview, components, and theme builder on smaller screens.</SheetDescription>
              </SheetHeader>
              <nav className="nav-mobile-links" aria-label="Mobile primary">
                {navigation.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={`${buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "md" })} nav-mobile-link`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
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
