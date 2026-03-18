# Component Index

Use this file when you need the full Marginalia export map or want to locate source files quickly.

## Primary Repo Entry Points

- Export surface: `packages/ui/src/index.ts`
- Server-safe export surface: `packages/ui/src/index.server.ts`
- Theme tokens: `packages/ui/src/styles/theme.css`
- Docs usage examples:
  - `apps/docs/components/usage-data-foundations.tsx`
  - `apps/docs/components/usage-data-forms.tsx`
  - `apps/docs/components/usage-data-overlays.tsx`
  - `apps/docs/components/usage-data-navigation.tsx`
  - `apps/docs/components/usage-data-content.tsx`

## Foundations

- `Badge` -> `packages/ui/src/components/badge.tsx`
- `Alert`, `AlertTitle`, `AlertDescription` -> `packages/ui/src/components/alert.tsx`
- `Avatar`, `AvatarImage`, `AvatarFallback` -> `packages/ui/src/components/avatar.tsx`
- `Button`, `buttonVariants` -> `packages/ui/src/components/button.tsx`
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` -> `packages/ui/src/components/card.tsx`
- `Label` -> `packages/ui/src/components/label.tsx`

## Forms

- `Input` -> `packages/ui/src/components/input.tsx`
- `Textarea` -> `packages/ui/src/components/textarea.tsx`
- `Checkbox` -> `packages/ui/src/components/checkbox.tsx`
- `RadioGroup`, `RadioItem` -> `packages/ui/src/components/radio.tsx`
- `Switch` -> `packages/ui/src/components/switch.tsx`
- `Select` -> `packages/ui/src/components/select.tsx`
- `Combobox` -> `packages/ui/src/components/combobox.tsx`
- `Calendar` -> `packages/ui/src/components/calendar.tsx`
- `DatePicker` -> `packages/ui/src/components/date-picker.tsx`

## Overlays

- `Dialog` family -> `packages/ui/src/components/dialog.tsx`
- `Sheet` family -> `packages/ui/src/components/sheet.tsx`
- `DropdownMenu` family -> `packages/ui/src/components/dropdown-menu.tsx`
- `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor` -> `packages/ui/src/components/popover.tsx`
- `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent` -> `packages/ui/src/components/tooltip.tsx`
- `HoverCard`, `HoverCardTrigger`, `HoverCardContent` -> `packages/ui/src/components/hover-card.tsx`
- `ContextMenu` family -> `packages/ui/src/components/context-menu.tsx`
- `Toast` family -> `packages/ui/src/components/toast.tsx`
- `Command` family -> `packages/ui/src/components/command.tsx`
- `CommandPalette` -> `packages/ui/src/components/command-palette.tsx`

## Navigation

- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` -> `packages/ui/src/components/tabs.tsx`
- `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` -> `packages/ui/src/components/accordion.tsx`
- `Breadcrumb` family -> `packages/ui/src/components/breadcrumb.tsx`
- `Menubar` family -> `packages/ui/src/components/menubar.tsx`
- `Pagination` family -> `packages/ui/src/components/pagination.tsx`

## Data and Editorial

- `DataTable` and related types -> `packages/ui/src/components/data-table.tsx`
- `Table` family -> `packages/ui/src/components/table.tsx`
- `EmptyState` family -> `packages/ui/src/components/empty-state.tsx`
- `Skeleton` -> `packages/ui/src/components/skeleton.tsx`
- `Progress` -> `packages/ui/src/components/progress.tsx`
- `Stepper`, `StepperItem` -> `packages/ui/src/components/stepper.tsx`
- `CodeViewer` -> `packages/ui/src/components/code-viewer.tsx`
- `RichTextSurface`, `RichTextLead`, `RichTextKicker`, `RichTextMeta`, `RichTextQuote` -> `packages/ui/src/components/rich-text-surface.tsx`

## Use This Index With the Other References

- Read `foundations-forms.md` for inputs, buttons, cards, and identity surfaces.
- Read `overlays-navigation.md` for dialogs, menus, tooltips, tabs, and app shells.
- Read `data-editorial.md` for tables, progress, code, and long-form content.
- Read `theme-system.md` before changing colors, spacing, density, or dark mode.
