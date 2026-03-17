import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  Button,
  Combobox,
  CommandPalette,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "../src";

describe("Popover, Toast, Combobox, and CommandPalette", () => {
  it("opens a popover from its trigger", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open note</Button>
        </PopoverTrigger>
        <PopoverContent>Anchored detail</PopoverContent>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: /open note/i }));

    expect(screen.getByText(/anchored detail/i)).toBeInTheDocument();
  });

  it("selects an option from the combobox", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Combobox
        label="Content mode"
        options={[
          { value: "editorial", label: "Editorial review" },
          { value: "archive", label: "Research archive" }
        ]}
        onValueChange={onValueChange}
      />
    );

    await user.click(screen.getByRole("combobox", { name: /content mode/i }));
    await user.click(screen.getByText(/research archive/i));

    expect(onValueChange).toHaveBeenCalledWith("archive");
    expect(screen.getByRole("combobox", { name: /content mode/i })).toHaveTextContent("Research archive");
  });

  it("renders and closes a toast", async () => {
    const user = userEvent.setup();

    function ToastHarness() {
      const [open, setOpen] = useState(true);

      return (
        <ToastProvider>
          <Toast open={open} onOpenChange={setOpen}>
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>Draft archived successfully.</ToastDescription>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      );
    }

    render(<ToastHarness />);

    expect(screen.getByText(/draft archived successfully/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText(/draft archived successfully/i)).not.toBeInTheDocument();
    });
  });

  it("selects an item in the command palette and requests close", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const onSelect = vi.fn();

    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        groups={[
          {
            heading: "Actions",
            items: [
              {
                value: "publish",
                label: "Publish draft",
                onSelect
              }
            ]
          }
        ]}
      />
    );

    await user.click(screen.getByText(/publish draft/i));

    expect(onSelect).toHaveBeenCalledWith("publish");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
