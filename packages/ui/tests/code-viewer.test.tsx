import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CodeViewer } from "../src";

describe("CodeViewer", () => {
  it("renders filename, line numbers, syntax tokens, and highlighted lines", () => {
    render(
      <CodeViewer
        filename="orders-table.tsx"
        language="tsx"
        code={`const total = orders.length;\nreturn total;`}
        highlightedLines={[2]}
      />
    );

    expect(screen.getByText(/orders-table\.tsx/i)).toBeInTheDocument();
    expect(screen.getByText("TSX", { selector: "span" })).toBeInTheDocument();
    expect(document.querySelector('[data-line-number="1"]')).toBeInTheDocument();
    expect(document.querySelector('[data-line-number="2"]')).toBeInTheDocument();
    expect(document.querySelector('[data-token-types*="keyword"]')).toHaveTextContent(/const|return/i);
    expect(document.querySelector('[data-code-line="2"][data-highlighted="true"]')).toHaveTextContent(/return total/i);
  });

  it("falls back to plain rendering and can hide line numbers", () => {
    render(
      <CodeViewer
        language="unknown"
        code={`alpha\nbeta`}
        showLineNumbers={false}
        showLanguageBadge={false}
      />
    );

    expect(screen.getByText("alpha")).toBeInTheDocument();
    expect(screen.getByText("beta")).toBeInTheDocument();
    expect(document.querySelector("[data-line-number]")).not.toBeInTheDocument();
  });
});
