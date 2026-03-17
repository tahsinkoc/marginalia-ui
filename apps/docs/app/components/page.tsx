"use client";

import { useMemo, useState } from "react";

import {
  Badge,
  Button,
  DatePicker,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Combobox,
  CommandPalette,
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
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateIcon,
  EmptyStateTitle,
  Input,
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  Select,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
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
} from "@ulib/ui";

import { SectionIntro, ShowcasePanel } from "../../components/docs-section";

const selectOptions = [
  { value: "essay", label: "Essay", description: "Long-form narrative and reflection." },
  { value: "brief", label: "Brief", description: "Short, concise communication." },
  { value: "report", label: "Report", description: "Structured delivery for teams." }
];

const comboboxOptions = [
  {
    value: "editorial-review",
    label: "Editorial review",
    description: "Best for scholarly and narrative interfaces.",
    keywords: ["academic", "warm", "classy"]
  },
  {
    value: "client-brief",
    label: "Client brief",
    description: "A more concise tone for fast-moving teams.",
    keywords: ["brief", "workshop", "summary"]
  },
  {
    value: "research-archive",
    label: "Research archive",
    description: "Dense content surfaces with gentle hierarchy.",
    keywords: ["archive", "library", "reference"]
  }
];

const reviewRows = [
  {
    title: "Scholar's preface",
    owner: "A. Morgan",
    status: "Needs review",
    updated: "Mar 17"
  },
  {
    title: "Archive annotation",
    owner: "L. Rivera",
    status: "Ready",
    updated: "Mar 15"
  },
  {
    title: "Editorial note",
    owner: "S. Chen",
    status: "In revision",
    updated: "Mar 13"
  }
];

export default function ComponentsPage() {
  const [menuChoice, setMenuChoice] = useState("Archive draft");
  const [toastOpen, setToastOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [comboboxValue, setComboboxValue] = useState("editorial-review");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2026, 2, 17));

  const commandGroups = useMemo(
    () => [
      {
        heading: "Actions",
        items: [
          {
            value: "publish",
            label: "Publish current draft",
            shortcut: "P",
            keywords: ["approve", "go live"],
            onSelect: () => setToastOpen(true)
          },
          {
            value: "assign",
            label: "Assign reviewer",
            shortcut: "R",
            keywords: ["review", "editor"],
            onSelect: () => setMenuChoice("Assign reviewer")
          }
        ]
      },
      {
        heading: "Navigate",
        items: [
          {
            value: "theme",
            label: "Open theme tokens",
            shortcut: "T",
            keywords: ["theme", "tokens", "palette"],
            onSelect: () => setMenuChoice("Open theme tokens")
          },
          {
            value: "components",
            label: "Review component catalog",
            shortcut: "C",
            keywords: ["catalog", "components", "library"],
            onSelect: () => setMenuChoice("Review component catalog")
          }
        ]
      }
    ],
    []
  );

  return (
    <ToastProvider swipeDirection="right">
      <TooltipProvider delayDuration={120}>
        <SectionIntro
          eyebrow="Component catalog"
          title="Foundations, overlays, search, data views, and feedback in one calm visual language."
          description="The system now covers form primitives, layered interactions, searchable controls, data display, and feedback surfaces without losing the warm editorial tone."
        />

        <section className="showcase-grid">
          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Buttons</div>
              <div className="inline-actions">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <div className="inline-actions">
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
                <Button variant="link" size="sm">
                  Text action
                </Button>
                <Button loading>Saving</Button>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Badges</div>
              <div className="inline-actions">
                <Badge>Neutral</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Fields</div>
              <div className="section-stack">
                <div className="section-stack" style={{ gap: "0.65rem" }}>
                  <Label htmlFor="catalog-email">Email address</Label>
                  <Input id="catalog-email" placeholder="editorial@ulib.dev" />
                </div>
                <div className="section-stack" style={{ gap: "0.65rem" }}>
                  <Label htmlFor="catalog-notes">Notes</Label>
                  <Textarea id="catalog-notes" placeholder="Describe the desired tone and layout rhythm..." />
                </div>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Selection controls</div>
              <Checkbox
                defaultChecked
                label="Include soft contrast"
                description="Keeps the palette warm without sacrificing clarity."
              />
              <Switch
                defaultChecked
                label="Enable compact review mode"
                description="Useful when showing multiple data cards side by side."
              />
              <RadioGroup
                defaultValue="warm"
                label="Palette character"
                description="Pick the tonal center for your app."
                options={[
                  {
                    value: "warm",
                    label: "Warm editorial",
                    description: "Ivory surfaces, clay accents, and quiet shadows."
                  },
                  {
                    value: "neutral",
                    label: "Neutral paper",
                    description: "A subtler, softer interpretation."
                  }
                ]}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Select</div>
              <Select
                defaultValue="brief"
                label="Document style"
                description="Built with Radix for keyboard-friendly interaction."
                options={selectOptions}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Date picker</div>
              <DatePicker
                label="Review deadline"
                description="A warm, editorial calendar surface for choosing single dates."
                selected={selectedDate}
                onSelect={setSelectedDate}
                calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
              />
              <p className="lead" style={{ fontSize: "1rem" }}>
                Current date: <span className="mono-note">{selectedDate?.toLocaleDateString("en-US")}</span>
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Combobox</div>
              <Combobox
                label="Content mode"
                description="Search and pick a more descriptive option set than a simple select."
                options={comboboxOptions}
                value={comboboxValue}
                onValueChange={setComboboxValue}
              />
              <p className="lead" style={{ fontSize: "1rem" }}>
                Current value: <span className="mono-note">{comboboxValue}</span>
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Card</div>
              <Card>
                <CardHeader>
                  <Badge variant="accent">Surface</Badge>
                  <CardTitle>Elegant containers</CardTitle>
                  <CardDescription>
                    Cards use gentle radius, warm surfaces, and restrained shadows to avoid noisy chrome.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input value="Scholar's annotation ready" readOnly />
                </CardContent>
                <CardFooter>
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="secondary">
                    Revisit
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Dialog</div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open preview dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Badge variant="accent">Overlay</Badge>
                    <DialogTitle>Review a calm confirmation flow</DialogTitle>
                    <DialogDescription>
                      Dialog now eases in with a subtle lift and scale, so it feels intentional without becoming theatrical.
                    </DialogDescription>
                  </DialogHeader>
                  <Card>
                    <CardContent>
                      <Input readOnly value="Scholar's edition is ready for final approval." />
                    </CardContent>
                  </Card>
                  <DialogFooter>
                    <Button variant="secondary">Return</Button>
                    <Button>Approve</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Dropdown menu</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Quick actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Editorial actions</DropdownMenuLabel>
                  <DropdownMenuItem onSelect={() => setMenuChoice("Archive draft")}>
                    Archive draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setMenuChoice("Assign reviewer")}>
                    Assign reviewer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive onSelect={() => setMenuChoice("Delete permanently")}>
                    Delete permanently
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Last selection: <span className="mono-note">{menuChoice}</span>
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Popover</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Open contextual note</Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <div className="section-stack" style={{ gap: "0.7rem" }}>
                    <Badge variant="accent">Context</Badge>
                    <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.5rem", margin: 0 }}>
                      Small, anchored detail
                    </h3>
                    <p className="lead" style={{ fontSize: "0.98rem" }}>
                      Popover uses the same gentle lift animation as menus and tooltips, which keeps the UI feeling cohesive.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Tooltip</div>
              <div className="inline-actions">
                <Tooltip delayDuration={120}>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Hover metadata</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Tooltips now ease in softly instead of appearing abruptly.
                  </TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={120}>
                  <TooltipTrigger asChild>
                    <Badge variant="accent" style={{ cursor: "default" }}>
                      Reference note
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Claude-inspired warmth, without copying the layout.</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Tabs</div>
              <Tabs defaultValue="principles">
                <TabsList>
                  <TabsTrigger value="principles">Principles</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="principles">
                  <p className="lead" style={{ fontSize: "1rem" }}>
                    Warm surfaces, calm contrast, and typography that feels scholarly rather than corporate.
                  </p>
                </TabsContent>
                <TabsContent value="usage">
                  <p className="lead" style={{ fontSize: "1rem" }}>
                    Use tabs to segment closely related settings without reaching for multiple cards or pages.
                  </p>
                </TabsContent>
                <TabsContent value="notes">
                  <p className="lead" style={{ fontSize: "1rem" }}>
                    The trigger row is intentionally soft and pill-shaped so state changes feel subtle instead of loud.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Toast</div>
              <Button onClick={() => setToastOpen(true)}>Show publication toast</Button>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Toast stays understated and slides in with the same motion language as the rest of the system.
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Command palette</div>
              <Button variant="outline" onClick={() => setPaletteOpen(true)}>
                Open command palette
              </Button>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Great for power actions, quick navigation, and searchable workflows without leaving the page.
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-12">
            <div className="section-stack">
              <div className="eyebrow">Table</div>
              <Table>
                <TableCaption>Active editorial reviews this week.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewRows.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="text-right text-textMuted">{row.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Pagination</div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(event) => event.preventDefault()} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" onClick={(event) => event.preventDefault()}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" active onClick={(event) => event.preventDefault()}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" onClick={(event) => event.preventDefault()}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(event) => event.preventDefault()} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Empty state</div>
              <EmptyState>
                <EmptyStateIcon>
                  <ArchiveIcon className="h-7 w-7" />
                </EmptyStateIcon>
                <EmptyStateTitle>No archived notes yet</EmptyStateTitle>
                <EmptyStateDescription>
                  Once research notes are moved out of the active queue, they will appear here with tags and dates for quick recovery.
                </EmptyStateDescription>
                <EmptyStateFooter>
                  <Button size="sm">Create a note</Button>
                  <Button size="sm" variant="secondary">
                    Review filters
                  </Button>
                </EmptyStateFooter>
              </EmptyState>
            </div>
          </ShowcasePanel>
        </section>

        <Toast open={toastOpen} onOpenChange={setToastOpen} duration={3200} variant="success">
          <ToastTitle>Draft published</ToastTitle>
          <ToastDescription>The latest editorial version is now ready for review.</ToastDescription>
          <ToastAction altText="Undo publish">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          groups={commandGroups}
          placeholder="Search actions, pages, or shortcuts..."
        />
      </TooltipProvider>
    </ToastProvider>
  );
}

function ArchiveIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path
        d="M2.5 4.5h11v8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1zM1.5 2.5h13v2h-13zM6 7.5h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
