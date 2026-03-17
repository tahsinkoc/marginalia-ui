import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Checkbox, Switch } from "../src";

describe("Checkbox and Switch", () => {
  it("toggles a checkbox through its label", async () => {
    const user = userEvent.setup();

    render(
      <Checkbox
        label="Include warm light"
        description="Applies the default elegant palette."
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: /include warm light/i });

    await user.click(screen.getByText(/include warm light/i));

    expect(checkbox).toBeChecked();
  });

  it("toggles a switch and exposes switch semantics", async () => {
    const user = userEvent.setup();

    render(<Switch label="Compact mode" description="Tighter density for dashboards." />);

    const toggle = screen.getByRole("switch", { name: /compact mode/i });

    expect(toggle).not.toBeChecked();

    await user.click(screen.getByText(/compact mode/i));

    expect(toggle).toBeChecked();
  });
});

