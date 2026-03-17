import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../src";

describe("Dialog, DropdownMenu, Tooltip, and Tabs", () => {
  it("opens and closes a dialog", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editorial review</DialogTitle>
            <DialogDescription>Final confirmation before publishing.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: /open dialog/i }));

    expect(screen.getByText(/editorial review/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close dialog/i }));

    await waitFor(() => {
      expect(screen.queryByText(/editorial review/i)).not.toBeInTheDocument();
    });
  });

  it("opens a dropdown menu and handles item selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>Assign reviewer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("menuitem", { name: /assign reviewer/i }));

    expect(onSelect).toHaveBeenCalled();
  });

  it("reveals tooltip content on hover", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Helpful metadata</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(screen.getByRole("button", { name: /hover me/i }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful metadata");
  });

  it("switches between tab panels", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="principles">
        <TabsList>
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="principles">Warm editorial defaults.</TabsContent>
        <TabsContent value="notes">Compact navigation guidance.</TabsContent>
      </Tabs>
    );

    expect(screen.getByText(/warm editorial defaults/i)).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: /notes/i }));

    expect(screen.getByText(/compact navigation guidance/i)).toBeInTheDocument();
    expect(screen.queryByText(/warm editorial defaults/i)).not.toBeInTheDocument();
  });
});
