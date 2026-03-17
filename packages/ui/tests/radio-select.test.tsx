import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { RadioGroup, Select } from "../src";

describe("RadioGroup and Select", () => {
  it("supports keyboard navigation for radio groups", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup
        label="Tone"
        defaultValue="warm"
        options={[
          { value: "warm", label: "Warm editorial" },
          { value: "neutral", label: "Neutral paper" }
        ]}
      />
    );

    const warm = screen.getByRole("radio", { name: /warm editorial/i });
    const neutral = screen.getByRole("radio", { name: /neutral paper/i });

    expect(warm).toHaveAttribute("aria-checked", "true");
    await user.tab();
    expect(warm).toHaveFocus();
    await user.keyboard("{ArrowDown}");

    expect(neutral).toHaveFocus();
    expect(neutral).toHaveAttribute("role", "radio");
  });

  it("supports accessible selection in the custom select", async () => {
    const user = userEvent.setup();

    render(
      <Select
        label="Document type"
        options={[
          { value: "essay", label: "Essay" },
          { value: "brief", label: "Brief" },
          { value: "report", label: "Report" }
        ]}
      />
    );

    const trigger = screen.getByRole("combobox", { name: /document type/i });

    await user.click(trigger);
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}");

    expect(trigger).toHaveTextContent("Report");
  });
});
