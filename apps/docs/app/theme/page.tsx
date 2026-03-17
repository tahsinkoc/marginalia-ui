import { SectionIntro, ShowcasePanel } from "../../components/docs-section";
import { ThemeBuilder } from "../../components/theme-builder";

export default function ThemePage() {
  return (
    <>
      <SectionIntro
        eyebrow="Theme customization"
        title="Theme builder with warm presets, color controls, and density sliders."
        description="Tune the palette, make the UI more compact when needed, then copy a ready-to-paste CSS token block with exact file placement guidance."
      />

      <ThemeBuilder />

      <section className="showcase-grid">
        <ShowcasePanel className="span-6">
          <div className="section-stack">
            <div className="eyebrow">How to ship it</div>
            <p className="lead" style={{ fontSize: "1rem" }}>
              Import <span className="mono-note">@marginalia/ui/styles.css</span> once, then paste your exported token block
              into <span className="mono-note">app/globals.css</span> or the library&apos;s own
              <span className="mono-note"> packages/ui/src/styles/theme.css</span>.
            </p>
          </div>
        </ShowcasePanel>
        <ShowcasePanel className="span-6">
          <div className="section-stack">
            <div className="eyebrow">What the builder edits</div>
            <p className="lead" style={{ fontSize: "1rem" }}>
              The export now covers both semantic colors and a compact set of size tokens for text, control height,
              panel padding, radius softness, and reading width.
            </p>
          </div>
        </ShowcasePanel>
      </section>
    </>
  );
}

