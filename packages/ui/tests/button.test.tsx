import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../src";

describe("Button", () => {
  it("renders its label and loading state", () => {
    render(<Button loading>Publish</Button>);

    const button = screen.getByRole("button", { name: /publish/i });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("supports alternate visual variants", () => {
    render(
      <Button variant="outline" size="lg">
        Review draft
      </Button>
    );

    expect(screen.getByRole("button", { name: /review draft/i })).toHaveClass("border-border", "h-12");
  });
});

