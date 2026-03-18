# Overlays and Navigation

Use this file when building dialogs, drawers, menus, tooltips, app chrome, tabs, breadcrumbs, or other navigational flows.

## General Rules

- Prefer Marginalia overlay primitives over ad hoc floating panels.
- Keep overlay content concise and intentional.
- Use motion sparingly; the library already carries the intended smooth, restrained feel.

## Dialog

- Import the `Dialog` family from `@marginalia/ui`.
- Use for confirm, review, publish, and blocking decisions.

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@marginalia/ui";

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
```

## Sheet

- Import the `Sheet` family from `@marginalia/ui`.
- Use for side panels, settings drawers, workflow review, and navigation on mobile.

```tsx
import {
  Button,
  Input,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@marginalia/ui";

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
```

## DropdownMenu

- Use for compact action menus attached to a trigger.
- Good for card actions, row actions, and header actions.

```tsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@marginalia/ui";

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
```

## Popover

- Use for anchored detail, filters, or compact contextual content.
- Prefer Popover over Dialog when the interaction should stay local.

```tsx
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from "@marginalia/ui";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open note</Button>
  </PopoverTrigger>
  <PopoverContent align="start">
    <Badge variant="accent">Context</Badge>
    <p>Small, anchored detail with calm motion.</p>
  </PopoverContent>
</Popover>
```

## Tooltip

- Use for microcopy, metadata, and compact helper text.
- Wrap the trigger with `TooltipTrigger asChild`.

```tsx
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@marginalia/ui";

<TooltipProvider delayDuration={120}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Hover metadata</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltips ease in softly.</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## HoverCard

- Use for richer hover context such as author cards, summaries, and references.

```tsx
import { Badge, Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@marginalia/ui";

<HoverCard openDelay={120} closeDelay={90}>
  <HoverCardTrigger asChild>
    <Button variant="link">Hover author profile</Button>
  </HoverCardTrigger>
  <HoverCardContent align="start">
    <Badge variant="accent">Contributor</Badge>
    <p>Contributor details and supporting context.</p>
  </HoverCardContent>
</HoverCard>
```

## ContextMenu

- Use for right-click or long-press workflows.
- Keep options closely related to the current surface.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger
} from "@marginalia/ui";

<ContextMenu>
  <ContextMenuTrigger style={{ display: "block", padding: "1.25rem" }}>
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
```

## Toast

- Use for short-lived feedback after actions.
- Mount `ToastProvider` and `ToastViewport` around the interaction.

```tsx
import * as React from "react";
import {
  Button,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@marginalia/ui";

export function PublishToast() {
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider swipeDirection="right">
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen} variant="success">
        <ToastTitle>Draft published</ToastTitle>
        <ToastDescription>The latest version is ready for review.</ToastDescription>
        <ToastAction altText="Undo">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Command

- Use `Command` primitives when you need a custom searchable list or launcher.
- Use `CommandPalette` when you want a ready-made dialog wrapper.

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@marginalia/ui";

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
```

## CommandPalette

- Use for global command launchers, page switching, and power-user actions.

```tsx
import * as React from "react";
import { Button, CommandPalette } from "@marginalia/ui";

const groups = [
  {
    heading: "Actions",
    items: [
      { value: "publish", label: "Publish current draft", shortcut: "P", onSelect: () => undefined }
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
      <CommandPalette open={open} onOpenChange={setOpen} groups={groups} />
    </>
  );
}
```

## Tabs

- Use for adjacent related content, not for major site routing.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@marginalia/ui";

<Tabs defaultValue="principles">
  <TabsList>
    <TabsTrigger value="principles">Principles</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
  </TabsList>
  <TabsContent value="principles">Warm surfaces and calm contrast.</TabsContent>
  <TabsContent value="usage">Use tabs for adjacent settings or closely related content.</TabsContent>
</Tabs>
```

## Accordion

- Use for collapsible explanations, settings groups, or FAQs.

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@marginalia/ui";

<Accordion type="single" collapsible>
  <AccordionItem value="motion">
    <AccordionTrigger>How is motion handled?</AccordionTrigger>
    <AccordionContent>Movements stay short and soft.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Breadcrumb

- Use for nested page context, especially in docs and app flows.

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@marginalia/ui";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Review draft</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Menubar

- Use for desktop-like app bars and productivity tooling.
- Keep top-level groups limited and meaningful.

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from "@marginalia/ui";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarLabel>Document</MenubarLabel>
      <MenubarItem>
        New note
        <MenubarShortcut>Cmd+N</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Archive current draft</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Pagination

- Use for long lists, archives, and data tables.
- Keep it calm and compact; do not over-decorate pagination.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@marginalia/ui";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" active>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Use These Files for Deeper Examples

- `apps/docs/components/usage-data-overlays.tsx`
- `apps/docs/components/usage-data-navigation.tsx`
