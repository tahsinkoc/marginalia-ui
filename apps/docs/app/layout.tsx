import type { Metadata } from "next";
import Link from "next/link";
import { Manrope, Newsreader } from "next/font/google";

import "@ulib/ui/styles.css";
import "./globals.css";

const editorial = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "ULib",
  description: "Academic and elegant React UI kit for the Next.js ecosystem."
};

const navigation = [
  { href: "/", label: "Overview" },
  { href: "/components", label: "Components" },
  { href: "/theme", label: "Theme" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${editorial.variable} ${sans.variable}`}>
        <div className="docs-shell">
          <header className="site-header">
            <div className="brand-lockup">
              <Link href="/" className="brand-mark">
                ULib
              </Link>
              <div className="brand-note">Warm light React system</div>
            </div>
            <nav className="nav-links" aria-label="Primary">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="page-stack">{children}</main>
          <footer className="footer-note">
            Built for calm interfaces, editorial rhythm, and thoughtful defaults in React + Next.js.
          </footer>
        </div>
      </body>
    </html>
  );
}

