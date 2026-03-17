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
} from "@ulib/ui";

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
  colors: ThemeColors;
};

type DensityPreset = {
  id: string;
  label: string;
  note: string;
  settings: ScaleSettings;
};

const colorFields: Array<{ key: ColorKey; label: string; note: string; cssVar: string }> = [
  { key: "canvas", label: "Canvas", note: "Page background tone", cssVar: "--ulib-color-canvas" },
  { key: "surface", label: "Surface", note: "Primary card and panel fill", cssVar: "--ulib-color-surface" },
  { key: "surfaceAlt", label: "Surface alt", note: "Secondary surface tone", cssVar: "--ulib-color-surface-alt" },
  { key: "border", label: "Border", note: "Lines, separators, soft dividers", cssVar: "--ulib-color-border" },
  { key: "text", label: "Text", note: "Primary reading color", cssVar: "--ulib-color-text" },
  { key: "textMuted", label: "Muted text", note: "Descriptions and helper copy", cssVar: "--ulib-color-text-muted" },
  { key: "accent", label: "Accent", note: "Buttons, links, highlights", cssVar: "--ulib-color-accent" },
  { key: "accentSoft", label: "Accent soft", note: "Hover and selected fills", cssVar: "--ulib-color-accent-soft" },
  { key: "focus", label: "Focus", note: "Keyboard ring color", cssVar: "--ulib-color-focus" },
  { key: "success", label: "Success", note: "Positive feedback states", cssVar: "--ulib-color-success" },
  { key: "warning", label: "Warning", note: "Cautionary surfaces", cssVar: "--ulib-color-warning" },
  { key: "danger", label: "Danger", note: "Destructive actions", cssVar: "--ulib-color-danger" }
];

const themePresets: ThemePreset[] = [
  {
    id: "parchment",
    label: "Classic Warm",
    note: "The current warm editorial default.",
    colors: {
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
    }
  },
  {
    id: "warm-blue",
    label: "Warm Blue",
    note: "Dusty blue notes over parchment neutrals.",
    colors: {
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
    }
  },
  {
    id: "warm-green",
    label: "Warm Green",
    note: "Quiet sage warmth for calmer dashboards.",
    colors: {
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
    }
  },
  {
    id: "warm-gray",
    label: "Warm Gray",
    note: "Softer editorial neutrality with stone accents.",
    colors: {
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
    }
  },
  {
    id: "warm-ink",
    label: "Warm White/Black",
    note: "Warmer high-contrast paper and ink treatment.",
    colors: {
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
  "--ulib-radius-panel",
  "--ulib-radius-overlay",
  "--ulib-radius-field",
  "--ulib-radius-pill",
  "--ulib-space-panel",
  "--ulib-space-panel-compact",
  "--ulib-space-stack",
  "--ulib-space-inline",
  "--ulib-space-control-x-sm",
  "--ulib-space-control-x-md",
  "--ulib-space-control-x-lg",
  "--ulib-space-control-y-sm",
  "--ulib-space-control-y-md",
  "--ulib-space-control-y-lg",
  "--ulib-space-badge-x",
  "--ulib-space-badge-y",
  "--ulib-size-control-sm",
  "--ulib-size-control-md",
  "--ulib-size-control-lg",
  "--ulib-size-text-xs",
  "--ulib-size-text-sm",
  "--ulib-size-text-body",
  "--ulib-size-text-lead",
  "--ulib-size-text-title",
  "--ulib-size-text-heading",
  "--ulib-size-text-subheading",
  "--ulib-size-text-display",
  "--ulib-size-text-dialog-title",
  "--ulib-size-text-quote",
  "--ulib-size-textarea-min-height",
  "--ulib-line-height-body",
  "--ulib-content-max-width"
] as const;

const defaultColors = themePresets[0].colors;
const defaultDensity = densityPresets[0].settings;

export function ThemeBuilder() {
  const [colors, setColors] = React.useState<ThemeColors>(defaultColors);
  const [density, setDensity] = React.useState<ScaleSettings>(defaultDensity);
  const [activeThemePreset, setActiveThemePreset] = React.useState(themePresets[0].id);
  const [activeDensityPreset, setActiveDensityPreset] = React.useState(densityPresets[0].id);
  const [copyState, setCopyState] = React.useState<"idle" | "copied" | "failed">("idle");

  const cssVars = React.useMemo(() => buildCssVariables(colors, density), [colors, density]);
  const previewStyle = React.useMemo(() => cssVars as React.CSSProperties, [cssVars]);

  const exportSnippet = React.useMemo(() => {
    const lines = [
      "/* Paste into app/globals.css or replace the :root block in packages/ui/src/styles/theme.css */",
      ":root {",
      ...colorFields.map(({ cssVar, key }) => `  ${cssVar}: ${hexToRgbString(colors[key])};`),
      ...metricOrder.map((cssVar) => `  ${cssVar}: ${cssVars[cssVar]};`),
      "}"
    ];

    return lines.join("\n");
  }, [colors, cssVars]);

  const tokenCards = React.useMemo(
    () =>
      colorFields.map((field) => ({
        name: field.label,
        value: hexToRgbString(colors[field.key]),
        hex: colors[field.key].toUpperCase(),
        swatch: colors[field.key]
      })),
    [colors]
  );

  const scaleSummary = React.useMemo(
    () => [
      { name: "Body text", value: cssVars["--ulib-size-text-body"] },
      { name: "Card padding", value: cssVars["--ulib-space-panel"] },
      { name: "Button md height", value: cssVars["--ulib-size-control-md"] },
      { name: "Reading width", value: cssVars["--ulib-content-max-width"] }
    ],
    [cssVars]
  );

  const handleColorChange = React.useCallback((key: ColorKey, value: string) => {
    setColors((current) => ({ ...current, [key]: value }));
    setActiveThemePreset("custom");
  }, []);

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
              Choose a warm preset, then tighten or relax typography, padding, controls, radius, and reading width with a few sliders.
            </CardDescription>
          </CardHeader>
          <CardContent className="theme-builder-stack">
            <div className="section-stack" style={{ gap: "0.85rem" }}>
              <div className="eyebrow">Color presets</div>
              <div className="theme-preset-row">
                {themePresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`theme-preset-button${activeThemePreset === preset.id ? " is-active" : ""}`}
                    onClick={() => {
                      setColors(preset.colors);
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
              <div className="eyebrow">Colors</div>
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
                        value={colors[field.key]}
                        onChange={(event) => handleColorChange(field.key, event.currentTarget.value)}
                      />
                    </div>
                    <div className="mono-note">{colors[field.key].toUpperCase()}</div>
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
              Copy the generated `:root` block, then paste it either into your consumer app&apos;s `app/globals.css` or into ULib&apos;s own `packages/ui/src/styles/theme.css`.
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
                    : "Consumer apps should keep importing @ulib/ui/styles.css once in the app shell."}
              </span>
            </div>
            <pre className="code-block">{exportSnippet}</pre>
            <div className="catalog-list">
              <div className="token-card">
                <div className="token-name">Paste inside this repo</div>
                <div className="theme-field-note">Replace the `:root` block in `packages/ui/src/styles/theme.css`.</div>
              </div>
              <div className="token-card">
                <div className="token-name">Paste in a Next app</div>
                <div className="theme-field-note">
                  Keep `import "@ulib/ui/styles.css"` in `app/layout.tsx`, then paste the snippet into `app/globals.css`.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-builder-full">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>
              The preview below applies your token overrides directly to ULib components, so you can feel spacing and type changes before exporting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="theme-preview-shell" style={previewStyle}>
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
                        <Label htmlFor="theme-builder-email">Project name</Label>
                        <Input id="theme-builder-email" value="ULib Theme Builder" readOnly />
                      </div>
                      <div className="section-stack" style={{ gap: "0.7rem" }}>
                        <Label htmlFor="theme-builder-notes">Editorial notes</Label>
                        <Textarea
                          id="theme-builder-notes"
                          value="Compact mode lowers font, padding, and control sizes without sacrificing the warm tone."
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
                      A single snippet can now tune warm color, control density, padding rhythm, and reading width without adding a runtime theme provider.
                    </RichTextLead>
                    <RichTextQuote>
                      The best theme builder feels simple enough to trust, then exports values clear enough to paste without guessing.
                    </RichTextQuote>
                    <h2>What changes now</h2>
                    <p>
                      This builder exports not only colors, but also the core sizing tokens that drive card padding, field height, button size, and rich text measure.
                    </p>
                    <RichTextMeta>
                      <span>Live tokens</span>
                      <span>Warm presets</span>
                      <span>No runtime provider</span>
                    </RichTextMeta>
                  </RichTextSurface>
                </div>
              </div>
            </div>
            <p className="theme-preview-note">
              Tip: `Compact` is the fastest way to get the smaller text and tighter content density you asked for.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="section-stack">
        <div className="section-copy">
          <div className="eyebrow">Current output</div>
          <h2 className="section-title">Color and density tokens at a glance.</h2>
          <p className="lead">
            Swatches reflect the current palette. The summary cards beneath them show the main size values your preview is using right now.
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

function buildCssVariables(colors: ThemeColors, settings: ScaleSettings) {
  const metrics: Record<(typeof metricOrder)[number], string> = {
    "--ulib-radius-panel": px(32 * settings.radiusScale),
    "--ulib-radius-overlay": px(28 * settings.radiusScale),
    "--ulib-radius-field": px(22 * settings.radiusScale),
    "--ulib-radius-pill": "999px",
    "--ulib-space-panel": px(24 * settings.spaceScale),
    "--ulib-space-panel-compact": px(16 * settings.spaceScale),
    "--ulib-space-stack": px(16 * settings.spaceScale),
    "--ulib-space-inline": px(12 * settings.spaceScale),
    "--ulib-space-control-x-sm": px(12 * settings.spaceScale),
    "--ulib-space-control-x-md": px(16 * settings.spaceScale),
    "--ulib-space-control-x-lg": px(20 * settings.spaceScale),
    "--ulib-space-control-y-sm": px(8 * settings.spaceScale),
    "--ulib-space-control-y-md": px(10 * settings.spaceScale),
    "--ulib-space-control-y-lg": px(12 * settings.spaceScale),
    "--ulib-space-badge-x": px(12 * settings.spaceScale),
    "--ulib-space-badge-y": px(4 * settings.spaceScale),
    "--ulib-size-control-sm": px(40 * settings.controlScale),
    "--ulib-size-control-md": px(44 * settings.controlScale),
    "--ulib-size-control-lg": px(48 * settings.controlScale),
    "--ulib-size-text-xs": px(12 * settings.fontScale),
    "--ulib-size-text-sm": px(14 * settings.fontScale),
    "--ulib-size-text-body": px(15 * settings.fontScale),
    "--ulib-size-text-lead": px(18 * settings.fontScale),
    "--ulib-size-text-title": px(27 * settings.fontScale),
    "--ulib-size-text-heading": px(30 * settings.fontScale),
    "--ulib-size-text-subheading": px(23 * settings.fontScale),
    "--ulib-size-text-display": px(51 * settings.fontScale),
    "--ulib-size-text-dialog-title": px(32 * settings.fontScale),
    "--ulib-size-text-quote": px(19 * settings.fontScale),
    "--ulib-size-textarea-min-height": px(144 * settings.spaceScale),
    "--ulib-line-height-body": "1.7",
    "--ulib-content-max-width": rem(settings.contentWidth)
  };

  const colorVars = Object.fromEntries(
    colorFields.map(({ cssVar, key }) => [cssVar, hexToRgbString(colors[key])])
  );

  return {
    ...colorVars,
    ...metrics
  } as Record<string, string>;
}

function hexToRgbString(hex: string) {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : sanitized;

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
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
