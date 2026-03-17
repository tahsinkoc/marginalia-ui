import * as React from "react";
import { Prism, normalizeTokens } from "prism-react-renderer";
import type { Language, Token } from "prism-react-renderer";

import { Badge } from "./badge";
import { cn } from "../lib/cn";

const languageAliases: Record<string, Language> = {
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  ts: "typescript",
  mts: "typescript",
  cts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  py: "python",
  json: "json",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  bash: "bash",
  text: "plain",
  txt: "plain",
  plaintext: "plain"
};

export interface CodeViewerProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: React.ElementType;
  code: string;
  language?: Language;
  filename?: React.ReactNode;
  caption?: React.ReactNode;
  showLineNumbers?: boolean;
  showLanguageBadge?: boolean;
  highlightedLines?: number[];
  wrapLongLines?: boolean;
}

export function CodeViewer({
  as: Component = "figure",
  code,
  language = "typescript",
  filename,
  caption,
  showLineNumbers = true,
  showLanguageBadge = true,
  highlightedLines = [],
  wrapLongLines = true,
  className,
  ...props
}: CodeViewerProps) {
  const normalizedCode = normalizeCode(code);
  const resolvedLanguage = resolveLanguage(language);
  const lines = tokenizeCode(normalizedCode, resolvedLanguage);
  const highlightedLineSet = new Set(highlightedLines);
  const languageLabel = formatLanguageLabel(resolvedLanguage);

  return (
    <Component
      className={cn(
        "overflow-hidden rounded-[var(--marginalia-radius-panel)] border bg-surface/95 shadow-panel",
        className
      )}
      {...props}
    >
      {(filename || caption || showLanguageBadge) ? (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 bg-surfaceAlt/34 px-[var(--marginalia-space-panel)] py-[var(--marginalia-space-panel-compact)]">
          <div className="grid gap-1">
            {filename ? (
              <div className="font-medium tracking-[-0.01em] text-text">{filename}</div>
            ) : null}
            {caption ? (
              <div className="text-[length:var(--marginalia-size-text-sm)] leading-relaxed text-textMuted">
                {caption}
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {showLanguageBadge ? <Badge variant="outline">{languageLabel}</Badge> : null}
            <span className="text-[length:var(--marginalia-size-text-xs)] uppercase tracking-[0.16em] text-textMuted">
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </span>
          </div>
        </div>
      ) : null}

      <pre
        className="m-0 overflow-x-auto bg-canvas/26 px-0 py-[var(--marginalia-space-panel-compact)] text-[13px] leading-6 text-text backdrop-blur-[2px]"
        style={{ tabSize: 2 }}
      >
        <code className="block min-w-full font-mono">
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = highlightedLineSet.has(lineNumber);

            return (
              <span
                key={`line-${lineNumber}`}
                data-code-line={lineNumber}
                data-highlighted={isHighlighted ? "true" : undefined}
                className={cn(
                  "grid min-w-full items-start gap-4 px-[var(--marginalia-space-panel)]",
                  showLineNumbers ? "grid-cols-[auto_minmax(0,1fr)]" : "grid-cols-1",
                  isHighlighted && "bg-accentSoft/45"
                )}
              >
                {showLineNumbers ? (
                  <span
                    aria-hidden="true"
                    data-line-number={lineNumber}
                    className="select-none pt-[1px] text-right text-[length:var(--marginalia-size-text-xs)] tracking-[0.08em] text-textMuted"
                  >
                    {lineNumber}
                  </span>
                ) : null}
                <span className={cn("min-w-0", wrapLongLines ? "whitespace-pre-wrap break-words" : "whitespace-pre")}>
                  {line.length === 1 && line[0]?.content === "" ? <span>&nbsp;</span> : null}
                  {line.map((token, tokenIndex) => (
                    <span
                      // `content` is stable enough for Prism tokens here; tokenIndex only disambiguates duplicates on the same line.
                      key={`${lineNumber}-${token.content}-${tokenIndex}`}
                      data-token-types={token.types.join(" ")}
                      className={cn(resolveTokenClassName(token.types))}
                    >
                      {token.content}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </Component>
  );
}

function normalizeCode(code: string) {
  const normalized = code.replace(/\r\n/g, "\n");

  if (normalized.endsWith("\n")) {
    return normalized.slice(0, -1);
  }

  return normalized;
}

function resolveLanguage(language: string): Language {
  const normalized = language.toLowerCase();

  return languageAliases[normalized] ?? normalized;
}

function tokenizeCode(code: string, language: Language) {
  if (!code) {
    return [[{ types: ["plain"], content: "", empty: true } satisfies Token]];
  }

  const grammar = Prism.languages[language];

  if (!grammar) {
    return code.split("\n").map((line) => [
      { types: ["plain"], content: line, empty: line.length === 0 } satisfies Token
    ]);
  }

  return normalizeTokens(Prism.tokenize(code, grammar));
}

function formatLanguageLabel(language: string) {
  switch (language) {
    case "javascript":
      return "JavaScript";
    case "typescript":
      return "TypeScript";
    case "jsx":
      return "JSX";
    case "tsx":
      return "TSX";
    case "python":
      return "Python";
    case "json":
      return "JSON";
    case "bash":
      return "Bash";
    case "plain":
      return "Plain Text";
    default:
      return language;
  }
}

function resolveTokenClassName(types: string[]) {
  if (hasType(types, ["comment", "prolog", "doctype", "cdata"])) {
    return "italic text-textMuted";
  }

  if (hasType(types, ["keyword", "atrule", "selector", "important", "tag"])) {
    return "font-medium text-accent";
  }

  if (hasType(types, ["string", "char", "attr-value", "inserted"])) {
    return "text-success";
  }

  if (hasType(types, ["number", "boolean", "constant", "symbol", "regex"])) {
    return "text-warning";
  }

  if (hasType(types, ["operator", "punctuation", "entity"])) {
    return "text-textMuted";
  }

  if (hasType(types, ["class-name", "builtin", "function", "function-variable"])) {
    return "font-medium text-text";
  }

  if (hasType(types, ["property", "parameter", "variable", "attr-name"])) {
    return "text-text";
  }

  if (hasType(types, ["deleted"])) {
    return "text-danger";
  }

  return "text-text";
}

function hasType(types: string[], candidates: string[]) {
  return candidates.some((candidate) => types.includes(candidate));
}
