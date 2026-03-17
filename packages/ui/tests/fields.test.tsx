import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input, Label, Textarea } from "../src";

describe("Form fields", () => {
  it("connects labels with inputs", () => {
    render(
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input id="email" placeholder="editorial@ulib.dev" />
      </div>
    );

    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("placeholder", "editorial@ulib.dev");
  });

  it("supports size variants and invalid textareas", () => {
    render(<Textarea size="lg" invalid aria-label="Notes" />);

    const textarea = screen.getByLabelText(/notes/i);

    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveClass("px-5", "text-base");
  });
});
