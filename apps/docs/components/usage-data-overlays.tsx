"use client";

import * as React from "react";
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandPalette,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "marginalia-ui";

import { createUsageSnippet } from "./usage-snippet";
import type { UsageSection } from "./usage-types";

export const overlayUsageSections: UsageSection[] = [
  {
    id: "dialog",
    label: "Dialog",
    category: "Overlays",
    description: "A modal confirmation flow with warm surfaces and restrained motion.",
    filename: "dialog.tsx",
    code: createUsageSnippet({
      imports: [
        "Button",
        "Dialog",
        "DialogContent",
        "DialogDescription",
        "DialogFooter",
        "DialogHeader",
        "DialogTitle",
        "DialogTrigger"
      ],
      body: `
export function PublishDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish the current draft?</DialogTitle>
          <DialogDescription>
            Confirm before sending this note to the review queue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
      `
    }),
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish the current draft?</DialogTitle>
            <DialogDescription>Confirm before sending this note to the review queue.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary">Cancel</Button>
            <Button>Publish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  {
    id: "sheet",
    label: "Sheet",
    category: "Overlays",
    description: "Side panels for denser utility flows, review queues, and contextual editing.",
    filename: "sheet.tsx",
    code: createUsageSnippet({
      imports: [
        "Button",
        "Input",
        "Sheet",
        "SheetBody",
        "SheetContent",
        "SheetDescription",
        "SheetFooter",
        "SheetHeader",
        "SheetTitle",
        "SheetTrigger"
      ],
      body: `
export function EditorialSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editorial handoff</SheetTitle>
          <SheetDescription>Review the current batch before publishing.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Input value="Annotations ready for final pass." readOnly />
        </SheetBody>
        <SheetFooter>
          <Button size="sm" variant="secondary">Dismiss</Button>
          <Button size="sm">Continue</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
      `
    }),
    preview: (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Editorial handoff</SheetTitle>
            <SheetDescription>Review the current batch before publishing.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            <Input value="Annotations ready for final pass." readOnly />
          </SheetBody>
          <SheetFooter>
            <Button size="sm" variant="secondary">
              Dismiss
            </Button>
            <Button size="sm">Continue</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  },
  {
    id: "dropdown-menu",
    label: "DropdownMenu",
    category: "Overlays",
    description: "Action menus for compact contextual operations.",
    filename: "dropdown-menu.tsx",
    code: createUsageSnippet({
      imports: [
        "Button",
        "DropdownMenu",
        "DropdownMenuContent",
        "DropdownMenuItem",
        "DropdownMenuLabel",
        "DropdownMenuSeparator",
        "DropdownMenuTrigger"
      ],
      body: `
export function QuickActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Quick actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Editorial actions</DropdownMenuLabel>
        <DropdownMenuItem>Archive draft</DropdownMenuItem>
        <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete permanently</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
      `
    }),
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Quick actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Editorial actions</DropdownMenuLabel>
          <DropdownMenuItem>Archive draft</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete permanently</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
  {
    id: "popover",
    label: "Popover",
    category: "Overlays",
    description: "Anchored contextual content without taking over the whole screen.",
    filename: "popover.tsx",
    code: createUsageSnippet({
      imports: ["Badge", "Button", "Popover", "PopoverContent", "PopoverTrigger"],
      body: `
export function ContextPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open note</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Badge variant="accent">Context</Badge>
        <p>Small, anchored detail with calm motion.</p>
      </PopoverContent>
    </Popover>
  );
}
      `
    }),
    preview: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open note</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="section-stack" style={{ gap: "0.65rem" }}>
            <Badge variant="accent">Context</Badge>
            <p className="lead" style={{ fontSize: "0.98rem", margin: 0 }}>
              Small, anchored detail with calm motion.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
  {
    id: "tooltip",
    label: "Tooltip",
    category: "Overlays",
    description: "Soft, understated micro-copy for metadata or compact guidance.",
    filename: "tooltip.tsx",
    code: createUsageSnippet({
      imports: [
        "Button",
        "Tooltip",
        "TooltipContent",
        "TooltipProvider",
        "TooltipTrigger"
      ],
      body: `
export function MetadataTooltip() {
  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="secondary">Hover metadata</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltips ease in softly.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
      `
    }),
    preview: (
      <TooltipProvider delayDuration={120}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover metadata</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltips ease in softly.</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    id: "hover-card",
    label: "HoverCard",
    category: "Overlays",
    description: "Hover-revealed context for people, notes, or richer metadata.",
    filename: "hover-card.tsx",
    code: createUsageSnippet({
      imports: ["Badge", "Button", "HoverCard", "HoverCardContent", "HoverCardTrigger"],
      body: `
export function AuthorHoverCard() {
  return (
    <HoverCard openDelay={120} closeDelay={90}>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover author profile</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <Badge variant="accent">Contributor</Badge>
        <p>Contributor details and supporting context.</p>
      </HoverCardContent>
    </HoverCard>
  );
}
      `
    }),
    preview: (
      <HoverCard openDelay={120} closeDelay={90}>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover author profile</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="section-stack" style={{ gap: "0.55rem" }}>
            <Badge variant="accent">Contributor</Badge>
            <p className="lead" style={{ fontSize: "0.98rem", margin: 0 }}>
              Sofia Chen writes interface notes that make dense product surfaces feel lighter and slower.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  },
  {
    id: "command",
    label: "Command",
    category: "Overlays",
    description: "Low-level searchable command surface for custom palettes, launchers, and quick-switchers.",
    filename: "command.tsx",
    code: createUsageSnippet({
      imports: [
        "Command",
        "CommandEmpty",
        "CommandGroup",
        "CommandInput",
        "CommandItem",
        "CommandList",
        "CommandSeparator",
        "CommandShortcut"
      ],
      body: `
export function EditorialCommandSurface() {
  return (
    <Command className="border shadow-field">
      <CommandInput placeholder="Search notes..." />
      <CommandList>
        <CommandEmpty>No matching entry.</CommandEmpty>
        <CommandGroup heading="Drafts">
          <CommandItem value="review-current-draft">
            <span>Review current draft</span>
            <CommandShortcut>R</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem value="go-to-theme-builder">
            <span>Go to theme builder</span>
            <CommandShortcut>T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
      `
    }),
    preview: <CommandUsagePreview />
  },
  {
    id: "command-palette",
    label: "CommandPalette",
    category: "Overlays",
    description: "A ready-to-use command launcher built on top of the lower-level Command primitives.",
    filename: "command-palette.tsx",
    code: createUsageSnippet({
      react: true,
      imports: ["Button", "CommandPalette"],
      body: `
const groups = [
  {
    heading: "Actions",
    items: [
      { value: "publish", label: "Publish current draft", shortcut: "P", onSelect: () => undefined },
      { value: "assign", label: "Assign reviewer", shortcut: "R", onSelect: () => undefined }
    ]
  }
];

export function EditorialCommandPalette() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        placeholder="Search actions, pages, or shortcuts..."
      />
    </>
  );
}
      `
    }),
    preview: <CommandPaletteUsagePreview />
  },
  {
    id: "context-menu",
    label: "ContextMenu",
    category: "Overlays",
    description: "Right-click menus for dense workflows where secondary actions should stay close to the target.",
    filename: "context-menu.tsx",
    code: createUsageSnippet({
      imports: [
        "ContextMenu",
        "ContextMenuContent",
        "ContextMenuItem",
        "ContextMenuLabel",
        "ContextMenuSeparator",
        "ContextMenuShortcut",
        "ContextMenuTrigger"
      ],
      body: `
export function ReviewContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: "block",
          padding: "1.25rem",
          borderRadius: "var(--marginalia-radius-panel)",
          border: "1px solid rgba(var(--marginalia-color-border), 0.8)"
        }}
      >
        Right click this area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Review actions</ContextMenuLabel>
        <ContextMenuItem>
          Duplicate note
          <ContextMenuShortcut>Cmd+D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive>Delete permanently</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
      `
    }),
    preview: <ContextMenuUsagePreview />
  },
  {
    id: "toast",
    label: "Toast",
    category: "Overlays",
    description: "Short-lived feedback with the same motion and tone as the rest of the system.",
    filename: "toast.tsx",
    code: createUsageSnippet({
      react: true,
      imports: [
        "Button",
        "Toast",
        "ToastAction",
        "ToastClose",
        "ToastDescription",
        "ToastProvider",
        "ToastTitle",
        "ToastViewport"
      ],
      body: `
export function PublishToast() {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen} variant="success" duration={2600}>
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>The latest version is ready for review.</ToastDescription>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
      `
    }),
    preview: <ToastUsagePreview />
  }
];

function ToastUsagePreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <div className="section-stack">
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <p className="lead" style={{ fontSize: "1rem" }}>
          Toast stays understated and uses the same motion language as overlays.
        </p>
      </div>
      <Toast open={open} onOpenChange={setOpen} variant="success" duration={2600}>
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>The latest version is ready for review.</ToastDescription>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

const commandGroups = [
  {
    heading: "Actions",
    items: [
      {
        value: "publish",
        label: "Publish current draft",
        shortcut: "P",
        onSelect: () => undefined
      },
      {
        value: "assign",
        label: "Assign reviewer",
        shortcut: "R",
        onSelect: () => undefined
      }
    ]
  }
];

function CommandPaletteUsagePreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="section-stack">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <p className="lead" style={{ fontSize: "1rem" }}>
        Great for power actions, quick navigation, and searchable workflows without leaving the page.
      </p>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={commandGroups}
        placeholder="Search actions, pages, or shortcuts..."
      />
    </div>
  );
}

function CommandUsagePreview() {
  return (
    <Command className="border shadow-field">
      <CommandInput placeholder="Search notes..." />
      <CommandList>
        <CommandEmpty>No matching entry.</CommandEmpty>
        <CommandGroup heading="Drafts">
          <CommandItem value="review-current-draft">
            <span>Review current draft</span>
            <CommandShortcut>R</CommandShortcut>
          </CommandItem>
          <CommandItem value="open-annotation-log">
            <span>Open annotation log</span>
            <CommandShortcut>A</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem value="go-to-theme-builder">
            <span>Go to theme builder</span>
            <CommandShortcut>T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function ContextMenuUsagePreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="block rounded-[var(--marginalia-radius-panel)] border border-border/80 bg-surfaceAlt/35 px-5 py-10 text-left shadow-field outline-none transition duration-150 hover:border-accent/35">
        <div className="section-stack" style={{ gap: "0.45rem" }}>
          <Badge variant="accent">Try me</Badge>
          <p className="lead" style={{ fontSize: "1rem", margin: 0 }}>
            Right click this note surface to reveal contextual editorial actions.
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Review actions</ContextMenuLabel>
        <ContextMenuItem>
          Duplicate note
          <ContextMenuShortcut>Cmd+D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Send to archive
          <ContextMenuShortcut>Cmd+Shift+A</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive>Delete permanently</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
