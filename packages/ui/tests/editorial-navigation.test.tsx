import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  RichTextLead,
  RichTextQuote,
  RichTextSurface
} from "../src";

describe("HoverCard, ContextMenu, Menubar, and RichTextSurface", () => {
  it("reveals hover card content on pointer hover", async () => {
    const user = userEvent.setup();

    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="secondary">Hover author profile</Button>
        </HoverCardTrigger>
        <HoverCardContent>Editorial contributor details</HoverCardContent>
      </HoverCard>
    );

    await user.hover(screen.getByRole("button", { name: /hover author profile/i }));

    expect(await screen.findByText(/editorial contributor details/i)).toBeInTheDocument();
  });

  it("opens a context menu on right click and selects an item", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div>Right click canvas</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Duplicate annotation</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText(/right click canvas/i));
    await user.click(screen.getByRole("menuitem", { name: /duplicate annotation/i }));

    expect(onSelect).toHaveBeenCalled();
  });

  it("opens a menubar menu and handles item selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Library</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onSelect}>Review outline</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );

    await user.click(screen.getByRole("menuitem", { name: /library/i }));
    await user.click(screen.getByRole("menuitem", { name: /review outline/i }));

    expect(onSelect).toHaveBeenCalled();
  });

  it("renders a rich text surface with editorial content", () => {
    render(
      <RichTextSurface aria-label="Release note">
        <h1>Measured updates</h1>
        <RichTextLead>Long-form product writing should feel deliberate and readable.</RichTextLead>
        <RichTextQuote>Quiet defaults make the interface easier to trust.</RichTextQuote>
      </RichTextSurface>
    );

    expect(screen.getByRole("article", { name: /release note/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /measured updates/i })).toBeInTheDocument();
    expect(screen.getByText(/quiet defaults make the interface easier to trust/i)).toBeInTheDocument();
  });
});
