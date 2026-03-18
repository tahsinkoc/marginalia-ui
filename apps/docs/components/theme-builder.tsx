"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RichTextKicker,
  RichTextLead,
  RichTextMeta,
  RichTextQuote,
  RichTextSurface,
  Textarea
} from "marginalia-ui";

type ThemeMode = "light" | "dark";

type ColorKey =
  | "canvas"
  | "surface"
  | "surfaceAlt"
  | "border"
  | "text"
  | "textMuted"
  | "accent"
  | "accentSoft"
  | "focus"
  | "success"
  | "warning"
  | "danger";

type ThemeColors = Record<ColorKey, string>;
type ThemeColorsByMode = Record<ThemeMode, ThemeColors>;

type ScaleSettings = {
  fontScale: number;
  spaceScale: number;
  controlScale: number;
  radiusScale: number;
  contentWidth: number;
};

type ThemePreset = {
  id: string;
  label: string;
  note: string;
  modes: ThemeColorsByMode;
};

type DensityPreset = {
  id: string;
  label: string;
  note: string;
  settings: ScaleSettings;
};

const colorFields: Array<{ key: ColorKey; label: string; note: string; cssVar: string }> = [
  { key: "canvas", label: "Canvas", note: "Page background tone", cssVar: "--marginalia-color-canvas" },
  { key: "surface", label: "Surface", note: "Primary card and panel fill", cssVar: "--marginalia-color-surface" },
  { key: "surfaceAlt", label: "Surface alt", note: "Secondary surface tone", cssVar: "--marginalia-color-surface-alt" },
  { key: "border", label: "Border", note: "Lines, separators, soft dividers", cssVar: "--marginalia-color-border" },
  { key: "text", label: "Text", note: "Primary reading color", cssVar: "--marginalia-color-text" },
  { key: "textMuted", label: "Muted text", note: "Descriptions and helper copy", cssVar: "--marginalia-color-text-muted" },
  { key: "accent", label: "Accent", note: "Buttons, links, highlights", cssVar: "--marginalia-color-accent" },
  { key: "accentSoft", label: "Accent soft", note: "Hover and selected fills", cssVar: "--marginalia-color-accent-soft" },
  { key: "focus", label: "Focus", note: "Keyboard ring color", cssVar: "--marginalia-color-focus" },
  { key: "success", label: "Success", note: "Positive feedback states", cssVar: "--marginalia-color-success" },
  { key: "warning", label: "Warning", note: "Cautionary surfaces", cssVar: "--marginalia-color-warning" },
  { key: "danger", label: "Danger", note: "Destructive actions", cssVar: "--marginalia-color-danger" }
];

const shadowOrder = ["--marginalia-shadow-panel", "--marginalia-shadow-field"] as const;

const themePresets: ThemePreset[] = [
  {
    id: "parchment",
    label: "Classic Warm",
    note: "The current warm editorial default in both light and dark study-hour variants.",
    modes: {
      light: {
        canvas: "#f7f2e9",
        surface: "#fffaf3",
        surfaceAlt: "#efe7da",
        border: "#d3c5b1",
        text: "#3b2f26",
        textMuted: "#7b6c5c",
        accent: "#9d704e",
        accentSoft: "#e5d8c4",
        focus: "#b5815a",
        success: "#688460",
        warning: "#b3813a",
        danger: "#a7574d"
      },
      dark: {
        canvas: "#171310",
        surface: "#211b17",
        surfaceAlt: "#2d241e",
        border: "#524338",
        text: "#efe2d2",
        textMuted: "#b9a793",
        accent: "#c79a72",
        accentSoft: "#46372a",
        focus: "#d9ab82",
        success: "#8aa17f",
        warning: "#d0a05a",
        danger: "#c68479"
      }
    }
  },
  {
    id: "warm-blue",
    label: "Warm Blue",
    note: "Dusty blue notes over parchment neutrals, with a darker library-night companion.",
    modes: {
      light: {
        canvas: "#f3f0ea",
        surface: "#fcfaf6",
        surfaceAlt: "#e7e3dc",
        border: "#cbc5bb",
        text: "#30363c",
        textMuted: "#66707a",
        accent: "#6f8297",
        accentSoft: "#dbe4ea",
        focus: "#90a4b8",
        success: "#6b8667",
        warning: "#b68a4a",
        danger: "#a6695f"
      },
      dark: {
        canvas: "#17191d",
        surface: "#1f242b",
        surfaceAlt: "#2a3139",
        border: "#44505b",
        text: "#ece3d8",
        textMuted: "#b7aea5",
        accent: "#97adc1",
        accentSoft: "#2f3c49",
        focus: "#b2c6d8",
        success: "#86a181",
        warning: "#c8a063",
        danger: "#c08074"
      }
    }
  },
  {
    id: "warm-green",
    label: "Warm Green",
    note: "Quiet sage warmth for calmer dashboards, with a darker reading-room version.",
    modes: {
      light: {
        canvas: "#f4f2ea",
        surface: "#fdfbf6",
        surfaceAlt: "#e7e4d7",
        border: "#cec7b7",
        text: "#34342d",
        textMuted: "#6c6f60",
        accent: "#768565",
        accentSoft: "#dee6d4",
        focus: "#92a380",
        success: "#6f8b61",
        warning: "#b08b4c",
        danger: "#9d675e"
      },
      dark: {
        canvas: "#161713",
        surface: "#1e211c",
        surfaceAlt: "#293026",
        border: "#43493b",
        text: "#ece5d7",
        textMuted: "#b4ac9d",
        accent: "#9dae87",
        accentSoft: "#333b2c",
        focus: "#b5c69e",
        success: "#8ea67d",
        warning: "#c4a067",
        danger: "#b77a71"
      }
    }
  },
  {
    id: "warm-gray",
    label: "Warm Gray",
    note: "Stone-like neutrality with a darker archive shelf interpretation.",
    modes: {
      light: {
        canvas: "#f4f2ee",
        surface: "#fbf9f5",
        surfaceAlt: "#e8e3dc",
        border: "#cbc4bb",
        text: "#35322f",
        textMuted: "#716a63",
        accent: "#8b7f74",
        accentSoft: "#e3dbd3",
        focus: "#a4978a",
        success: "#6c8174",
        warning: "#ab8550",
        danger: "#99665d"
      },
      dark: {
        canvas: "#171513",
        surface: "#201d1a",
        surfaceAlt: "#2b2723",
        border: "#47413c",
        text: "#ede4d8",
        textMuted: "#b7aea2",
        accent: "#b19e8d",
        accentSoft: "#37302a",
        focus: "#c3b09f",
        success: "#889c8d",
        warning: "#c19a66",
        danger: "#b97b72"
      }
    }
  },
  {
    id: "warm-ink",
    label: "Warm White/Black",
    note: "A warmer high-contrast paper-and-ink pair with a deep night mode counterpart.",
    modes: {
      light: {
        canvas: "#f8f5ef",
        surface: "#fffdf8",
        surfaceAlt: "#efebe4",
        border: "#d0c7bb",
        text: "#211b18",
        textMuted: "#60564d",
        accent: "#7b6857",
        accentSoft: "#e7dfd5",
        focus: "#9a836f",
        success: "#607a63",
        warning: "#a97b40",
        danger: "#8c5149"
      },
      dark: {
        canvas: "#11100f",
        surface: "#191715",
        surfaceAlt: "#24211f",
        border: "#3d3935",
        text: "#f4ede4",
        textMuted: "#c0b5a8",
        accent: "#c1a58e",
        accentSoft: "#342c25",
        focus: "#d4b9a2",
        success: "#89a08c",
        warning: "#cb9a5d",
        danger: "#b97870"
      }
    }
  }
];

const densityPresets: DensityPreset[] = [
  {
    id: "comfortable",
    label: "Comfortable",
    note: "Matches the current roomy defaults.",
    settings: {
      fontScale: 1,
      spaceScale: 1,
      controlScale: 1,
      radiusScale: 1,
      contentWidth: 44
    }
  },
  {
    id: "compact",
    label: "Compact",
    note: "Smaller fonts and tighter spacing for denser layouts.",
    settings: {
      fontScale: 0.92,
      spaceScale: 0.86,
      controlScale: 0.92,
      radiusScale: 0.94,
      contentWidth: 40
    }
  },
  {
    id: "airy",
    label: "Airy",
    note: "More generous reading space and softer scale.",
    settings: {
      fontScale: 1.04,
      spaceScale: 1.08,
      controlScale: 1.02,
      radiusScale: 1.04,
      contentWidth: 47
    }
  }
];

const metricOrder = [
  "--marginalia-radius-panel",
  "--marginalia-radius-overlay",
  "--marginalia-radius-field",
  "--marginalia-radius-pill",
  "--marginalia-space-panel",
  "--marginalia-space-panel-compact",
  "--marginalia-space-stack",
  "--marginalia-space-inline",
  "--marginalia-space-control-x-sm",
  "--marginalia-space-control-x-md",
  "--marginalia-space-control-x-lg",
  "--marginalia-space-control-y-sm",
  "--marginalia-space-control-y-md",
  "--marginalia-space-control-y-lg",
  "--marginalia-space-badge-x",
  "--marginalia-space-badge-y",
  "--marginalia-size-control-sm",
  "--marginalia-size-control-md",
  "--marginalia-size-control-lg",
  "--marginalia-size-text-xs",
  "--marginalia-size-text-sm",
  "--marginalia-size-text-body",
  "--marginalia-size-text-lead",
  "--marginalia-size-text-title",
  "--marginalia-size-text-heading",
  "--marginalia-size-text-subheading",
  "--marginalia-size-text-display",
  "--marginalia-size-text-dialog-title",
  "--marginalia-size-text-quote",
  "--marginalia-size-textarea-min-height",
  "--marginalia-line-height-body",
  "--marginalia-content-max-width"
] as const;

const defaultPreset = themePresets[0];
const defaultDensity = densityPresets[0].settings;

export function ThemeBuilder() {
  const [mode, setMode] = React.useState<ThemeMode>("light");
  const [colorsByMode, setColorsByMode] = React.useState<ThemeColorsByMode>({
    light: { ...defaultPreset.modes.light },
    dark: { ...defaultPreset.modes.dark }
  });
  const [density, setDensity] = React.useState<ScaleSettings>(defaultDensity);
  const [activeThemePreset, setActiveThemePreset] = React.useState(defaultPreset.id);
  const [activeDensityPreset, setActiveDensityPreset] = React.useState(densityPresets[0].id);
  const [copyState, setCopyState] = React.useState<"idle" | "copied" | "failed">("idle");

  const cssVarsByMode = React.useMemo(
    () => ({
      light: buildCssVariables(colorsByMode.light, density, "light"),
      dark: buildCssVariables(colorsByMode.dark, density, "dark")
    }),
    [colorsByMode, density]
  );

  const activeColors = colorsByMode[mode];
  const activeCssVars = cssVarsByMode[mode];
  const previewStyle = React.useMemo(
    () =>
      ({
        ...activeCssVars,
        colorScheme: mode
      }) as React.CSSProperties,
    [activeCssVars, mode]
  );

  const exportSnippet = React.useMemo(
    () => buildExportSnippet(cssVarsByMode.light, cssVarsByMode.dark),
    [cssVarsByMode.dark, cssVarsByMode.light]
  );

  const tokenCards = React.useMemo(
    () =>
      colorFields.map((field) => ({
        name: field.label,
        value: hexToRgbString(activeColors[field.key]),
        hex: activeColors[field.key].toUpperCase(),
        swatch: activeColors[field.key]
      })),
    [activeColors]
  );

  const scaleSummary = React.useMemo(
    () => [
      { name: "Body text", value: activeCssVars["--marginalia-size-text-body"] },
      { name: "Card padding", value: activeCssVars["--marginalia-space-panel"] },
      { name: "Button md height", value: activeCssVars["--marginalia-size-control-md"] },
      { name: "Reading width", value: activeCssVars["--marginalia-content-max-width"] }
    ],
    [activeCssVars]
  );

  const handleColorChange = React.useCallback(
    (key: ColorKey, value: string) => {
      setColorsByMode((current) => ({
        ...current,
        [mode]: {
          ...current[mode],
          [key]: value
        }
      }));
      setActiveThemePreset("custom");
    },
    [mode]
  );

  const handleDensityChange = React.useCallback((key: keyof ScaleSettings, value: number) => {
    setDensity((current) => ({ ...current, [key]: value }));
    setActiveDensityPreset("custom");
  }, []);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportSnippet);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  }, [exportSnippet]);

  return (
    <>
      <section className="theme-builder-grid">
        <Card>
          <CardHeader>
            <CardTitle>Build the theme</CardTitle>
            <CardDescription>
              Choose a warm preset, switch between light and dark tokens, then tighten or relax typography, padding,
              controls, radius, and reading width with a few sliders.
            </CardDescription>
          </CardHeader>
          <CardContent className="theme-builder-stack">
            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">Editing mode</div>
              <div className="inline-actions" style={{ marginTop: 0 }}>
                <Button variant={mode === "light" ? "secondary" : "ghost"} size="sm" onClick={() => setMode("light")}>
                  Light tokens
                </Button>
                <Button variant={mode === "dark" ? "secondary" : "ghost"} size="sm" onClick={() => setMode("dark")}>
                  Dark tokens
                </Button>
              </div>
              <div className="theme-field-note">
                Presets load both modes together. Color pickers below only edit the currently selected {mode} variant.
              </div>
            </div>

            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">Color presets</div>
              <div className="theme-preset-row">
                {themePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`theme-preset-button${activeThemePreset === preset.id ? " is-active" : ""}`}
                    onClick={() => {
                      setColorsByMode({
                        light: { ...preset.modes.light },
                        dark: { ...preset.modes.dark }
                      });
                      setActiveThemePreset(preset.id);
                    }}
                  >
                    <span>{preset.label}</span>
                    <span className="theme-field-note">{preset.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">Density presets</div>
              <div className="theme-preset-row">
                {densityPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`theme-preset-button${activeDensityPreset === preset.id ? " is-active" : ""}`}
                    onClick={() => {
                      setDensity(preset.settings);
                      setActiveDensityPreset(preset.id);
                    }}
                  >
                    <span>{preset.label}</span>
                    <span className="theme-field-note">{preset.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">{mode === "light" ? "Light colors" : "Dark colors"}</div>
              <div className="theme-control-grid">
                {colorFields.map((field) => (
                  <div key={field.key} className="theme-color-field">
                    <div className="theme-color-row">
                      <div>
                        <div className="token-name">{field.label}</div>
                        <div className="theme-field-note">{field.note}</div>
                      </div>
                      <input
                        aria-label={field.label}
                        className="theme-color-input"
                        type="color"
                        value={activeColors[field.key]}
                        onChange={(event) => handleColorChange(field.key, event.currentTarget.value)}
                      />
                    </div>
                    <div className="mono-note">{activeColors[field.key].toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">Scale controls</div>
              <div className="theme-range-grid">
                <RangeField
                  label="Typography"
                  value={density.fontScale}
                  min={0.84}
                  max={1.14}
                  step={0.01}
                  display={`${Math.round(density.fontScale * 100)}%`}
                  onChange={(value) => handleDensityChange("fontScale", value)}
                />
                <RangeField
                  label="Spacing"
                  value={density.spaceScale}
                  min={0.8}
                  max={1.18}
                  step={0.01}
                  display={`${Math.round(density.spaceScale * 100)}%`}
                  onChange={(value) => handleDensityChange("spaceScale", value)}
                />
                <RangeField
                  label="Controls"
                  value={density.controlScale}
                  min={0.84}
                  max={1.12}
                  step={0.01}
                  display={`${Math.round(density.controlScale * 100)}%`}
                  onChange={(value) => handleDensityChange("controlScale", value)}
                />
                <RangeField
                  label="Radius"
                  value={density.radiusScale}
                  min={0.86}
                  max={1.14}
                  step={0.01}
                  display={`${Math.round(density.radiusScale * 100)}%`}
                  onChange={(value) => handleDensityChange("radiusScale", value)}
                />
                <RangeField
                  label="Reading width"
                  value={density.contentWidth}
                  min={36}
                  max={52}
                  step={1}
                  display={`${density.contentWidth}rem`}
                  onChange={(value) => handleDensityChange("contentWidth", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export CSS tokens</CardTitle>
            <CardDescription>
              Copy the generated light and dark theme blocks, then paste them either into your consumer app&apos;s
              `app/globals.css` or into Marginalia&apos;s own `packages/ui/src/styles/theme.css`.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="theme-export-actions">
              <Button onClick={handleCopy}>Copy snippet</Button>
              <span className="theme-export-note">
                {copyState === "copied"
                  ? "Copied to clipboard."
                  : copyState === "failed"
                    ? "Clipboard copy failed. You can still copy from the code block."
                    : "Toggle dark mode by applying the `dark` class or `data-marginalia-theme=\"dark\"` to html, body, or a wrapper."}
              </span>
            </div>
            <pre className="code-block">{exportSnippet}</pre>
            <div className="catalog-list">
              <div className="token-card">
                <div className="token-name">Paste inside this repo</div>
                <div className="theme-field-note">
                  Replace the light `:root` block and the dark block in `packages/ui/src/styles/theme.css`.
                </div>
              </div>
              <div className="token-card">
                <div className="token-name">Paste in a Next app</div>
                <div className="theme-field-note">
                  Keep `import "marginalia-ui/styles.css"` in `app/layout.tsx`, then paste both blocks into
                  `app/globals.css`.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-builder-full">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>
              The preview below applies your token overrides directly to Marginalia components, so you can feel the
              light and dark variants before exporting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="theme-export-actions">
              <Badge variant="accent">{mode === "light" ? "Light preview" : "Dark preview"}</Badge>
              <span className="theme-preview-note">
                Export always includes both variants, even while you are previewing only one side.
              </span>
            </div>
            <div className="theme-preview-shell" style={previewStyle} data-marginalia-theme={mode}>
              <div className="theme-preview-canvas">
                <div className="theme-preview-grid">
                  <Card className="theme-preview-surface">
                    <CardHeader>
                      <Badge variant="accent">Preview</Badge>
                      <CardTitle>Warm editorial system</CardTitle>
                      <CardDescription>
                        Cards, buttons, fields, and longer reading surfaces update from the same token sheet.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="section-stack" style={{ gap: "0.7rem" }}>
                        <Label htmlFor="theme-builder-project">Project name</Label>
                        <Input id="theme-builder-project" value="Marginalia Theme Builder" readOnly />
                      </div>
                      <div className="section-stack" style={{ gap: "0.7rem" }}>
                        <Label htmlFor="theme-builder-notes">Editorial notes</Label>
                        <Textarea
                          id="theme-builder-notes"
                          value="Dark mode stays warm, academic, and legible instead of turning into cold graphite."
                          readOnly
                        />
                      </div>
                    </CardContent>
                    <div className="inline-actions" style={{ marginTop: 0 }}>
                      <Button size="sm">Primary</Button>
                      <Button variant="secondary" size="sm">
                        Secondary
                      </Button>
                      <Button variant="outline" size="sm">
                        Outline
                      </Button>
                    </div>
                  </Card>

                  <RichTextSurface className="theme-preview-surface">
                    <RichTextKicker>Editorial sample</RichTextKicker>
                    <h1>Theme tokens should travel cleanly from preview to production.</h1>
                    <RichTextLead>
                      A single snippet can now tune warm color, control density, padding rhythm, and reading width for
                      both light and dark modes without adding a runtime theme provider.
                    </RichTextLead>
                    <RichTextQuote>
                      The best theme builder feels simple enough to trust, then exports values clear enough to paste
                      without guessing.
                    </RichTextQuote>
                    <h2>What changes now</h2>
                    <p>
                      This builder exports not only colors, but also shared sizing tokens and matching shadow values so
                      the darker variant keeps the same soft Marginalia character.
                    </p>
                    <RichTextMeta>
                      <span>Light + dark</span>
                      <span>Warm presets</span>
                      <span>No runtime provider</span>
                    </RichTextMeta>
                  </RichTextSurface>
                </div>
              </div>
            </div>
            <p className="theme-preview-note">
              Tip: `Compact` plus the dark variant is a good starting point for denser back-office or research-facing
              interfaces.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="section-stack">
        <div className="section-copy">
          <div className="eyebrow">Current output</div>
          <h2 className="section-title">{mode === "light" ? "Light tokens" : "Dark tokens"} at a glance.</h2>
          <p className="lead">
            Swatches reflect the currently edited palette. The summary cards beneath them show the main size values
            your preview is using right now.
          </p>
        </div>
        <div className="token-grid">
          {tokenCards.map((token) => (
            <div key={token.name} className="token-card">
              <div className="token-swatch" style={{ backgroundColor: token.swatch }} />
              <div className="token-name">{token.name}</div>
              <div className="token-value">{token.hex}</div>
              <div className="theme-field-note">{token.value}</div>
            </div>
          ))}
        </div>
        <div className="showcase-grid">
          {scaleSummary.map((item) => (
            <div key={item.name} className="showcase-panel span-6">
              <div className="eyebrow">{item.name}</div>
              <p className="lead" style={{ fontSize: "1rem" }}>
                <span className="mono-note">{item.value}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="theme-range-field">
      <div className="theme-range-top">
        <span className="token-name">{label}</span>
        <span className="theme-range-value">{display}</span>
      </div>
      <input
        aria-label={label}
        className="theme-range-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </div>
  );
}

function buildCssVariables(colors: ThemeColors, settings: ScaleSettings, mode: ThemeMode) {
  const metrics: Record<(typeof metricOrder)[number], string> = {
    "--marginalia-radius-panel": px(32 * settings.radiusScale),
    "--marginalia-radius-overlay": px(28 * settings.radiusScale),
    "--marginalia-radius-field": px(22 * settings.radiusScale),
    "--marginalia-radius-pill": "999px",
    "--marginalia-space-panel": px(24 * settings.spaceScale),
    "--marginalia-space-panel-compact": px(16 * settings.spaceScale),
    "--marginalia-space-stack": px(16 * settings.spaceScale),
    "--marginalia-space-inline": px(12 * settings.spaceScale),
    "--marginalia-space-control-x-sm": px(12 * settings.spaceScale),
    "--marginalia-space-control-x-md": px(16 * settings.spaceScale),
    "--marginalia-space-control-x-lg": px(20 * settings.spaceScale),
    "--marginalia-space-control-y-sm": px(8 * settings.spaceScale),
    "--marginalia-space-control-y-md": px(10 * settings.spaceScale),
    "--marginalia-space-control-y-lg": px(12 * settings.spaceScale),
    "--marginalia-space-badge-x": px(12 * settings.spaceScale),
    "--marginalia-space-badge-y": px(4 * settings.spaceScale),
    "--marginalia-size-control-sm": px(40 * settings.controlScale),
    "--marginalia-size-control-md": px(44 * settings.controlScale),
    "--marginalia-size-control-lg": px(48 * settings.controlScale),
    "--marginalia-size-text-xs": px(12 * settings.fontScale),
    "--marginalia-size-text-sm": px(14 * settings.fontScale),
    "--marginalia-size-text-body": px(15 * settings.fontScale),
    "--marginalia-size-text-lead": px(18 * settings.fontScale),
    "--marginalia-size-text-title": px(27 * settings.fontScale),
    "--marginalia-size-text-heading": px(30 * settings.fontScale),
    "--marginalia-size-text-subheading": px(23 * settings.fontScale),
    "--marginalia-size-text-display": px(51 * settings.fontScale),
    "--marginalia-size-text-dialog-title": px(32 * settings.fontScale),
    "--marginalia-size-text-quote": px(19 * settings.fontScale),
    "--marginalia-size-textarea-min-height": px(144 * settings.spaceScale),
    "--marginalia-line-height-body": "1.7",
    "--marginalia-content-max-width": rem(settings.contentWidth)
  };

  const colorVars = Object.fromEntries(colorFields.map(({ cssVar, key }) => [cssVar, hexToRgbString(colors[key])]));
  const shadowVars = buildShadowVariables(colors, mode);

  return {
    ...colorVars,
    ...shadowVars,
    ...metrics
  } as Record<string, string>;
}

function buildShadowVariables(colors: ThemeColors, mode: ThemeMode) {
  const panelShadow =
    mode === "light"
      ? `0 22px 45px -30px ${rgbaFromHex(colors.text, 0.34)}, 0 12px 24px -18px ${rgbaFromHex(colors.accent, 0.2)}`
      : `0 28px 60px -34px ${rgbaFromHex(colors.canvas, 0.78)}, 0 14px 28px -20px ${rgbaFromHex(colors.accent, 0.22)}`;

  const fieldShadow =
    mode === "light"
      ? `0 1px 0 ${rgbaFromHex(colors.surface, 0.68)} inset, 0 16px 30px -24px ${rgbaFromHex(colors.text, 0.28)}`
      : `0 1px 0 ${rgbaFromHex(colors.surface, 0.12)} inset, 0 18px 36px -28px ${rgbaFromHex(colors.canvas, 0.72)}`;

  return {
    "--marginalia-shadow-panel": panelShadow,
    "--marginalia-shadow-field": fieldShadow
  } as Record<(typeof shadowOrder)[number], string>;
}

function buildExportSnippet(lightCssVars: Record<string, string>, darkCssVars: Record<string, string>) {
  return [
    "/* Paste into app/globals.css or replace the light and dark theme blocks in packages/ui/src/styles/theme.css */",
    ":root {",
    "  color-scheme: light;",
    ...colorFields.map(({ cssVar }) => `  ${cssVar}: ${lightCssVars[cssVar]};`),
    ...shadowOrder.map((cssVar) => `  ${cssVar}: ${lightCssVars[cssVar]};`),
    ...metricOrder.map((cssVar) => `  ${cssVar}: ${lightCssVars[cssVar]};`),
    "}",
    "",
    ".dark,",
    '[data-marginalia-theme="dark"] {',
    "  color-scheme: dark;",
    ...colorFields.map(({ cssVar }) => `  ${cssVar}: ${darkCssVars[cssVar]};`),
    ...shadowOrder.map((cssVar) => `  ${cssVar}: ${darkCssVars[cssVar]};`),
    "}"
  ].join("\n");
}

function hexToRgbString(hex: string) {
  const { red, green, blue } = hexToRgb(hex);

  return `${red} ${green} ${blue}`;
}

function rgbaFromHex(hex: string, alpha: number) {
  const { red, green, blue } = hexToRgb(hex);

  return `rgba(${red}, ${green}, ${blue}, ${trimNumber(alpha)})`;
}

function hexToRgb(hex: string) {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : sanitized;

  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16)
  };
}

function px(value: number) {
  return `${trimNumber(value)}px`;
}

function rem(value: number) {
  return `${trimNumber(value)}rem`;
}

function trimNumber(value: number) {
  return Number.parseFloat(value.toFixed(2)).toString();
}
