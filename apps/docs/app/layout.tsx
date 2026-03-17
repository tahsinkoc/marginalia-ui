import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";

import "@marginalia/ui/styles.css";
import "./globals.css";
import { DocsNav } from "../components/docs-nav";

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
  title: "Marginalia",
  description: "Marginalia is an academic and elegant React UI kit for the Next.js ecosystem."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${editorial.variable} ${sans.variable}`}>
        <div className="docs-shell">
          <DocsNav />
          <main className="page-stack">{children}</main>
          <footer className="footer-note">
            Marginalia is built for calm interfaces, editorial rhythm, and thoughtful defaults in React + Next.js.
          </footer>
        </div>
      </body>
    </html>
  );
}

