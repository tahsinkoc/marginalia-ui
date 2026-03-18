"use client";

import { useMemo, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
  CodeViewer,
  CommandPalette,
  DataTable,
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
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateIcon,
  EmptyStateTitle,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
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
  Progress,
  RadioGroup,
  RichTextKicker,
  RichTextLead,
  RichTextMeta,
  RichTextQuote,
  RichTextSurface,
  Select,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Stepper,
  StepperItem,
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
} from "marginalia-ui";
import type { DataTableColumn } from "marginalia-ui";

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

type OrderRow = {
  id: string;
  customer: string;
  channel: string;
  status: "Paid" | "Processing" | "At risk";
  items: number;
  total: number;
  placedAt: Date;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const orderDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
});

const orderRows: OrderRow[] = [
  {
    id: "ORD-2048",
    customer: "Mina Albright",
    channel: "Subscription",
    status: "Paid",
    items: 3,
    total: 248,
    placedAt: new Date(2026, 2, 18, 10, 24)
  },
  {
    id: "ORD-2041",
    customer: "Jonah Rivera",
    channel: "Direct",
    status: "Processing",
    items: 5,
    total: 132,
    placedAt: new Date(2026, 2, 18, 8, 5)
  },
  {
    id: "ORD-2037",
    customer: "Sofia Chen",
    channel: "Wholesale",
    status: "At risk",
    items: 2,
    total: 410,
    placedAt: new Date(2026, 2, 17, 17, 42)
  },
  {
    id: "ORD-2032",
    customer: "Amara Holt",
    channel: "Direct",
    status: "Paid",
    items: 1,
    total: 76,
    placedAt: new Date(2026, 2, 17, 13, 16)
  }
];

const orderColumns: DataTableColumn<OrderRow>[] = [
  {
    id: "order",
    header: "Order",
    accessorFn: (row) => row.id,
    sortable: true,
    sortAccessor: (row) => row.id,
    cell: ({ row }) => (
      <div className="grid gap-1">
        <span className="font-medium text-text">{row.id}</span>
        <span className="text-[length:var(--marginalia-size-text-xs)] text-textMuted">
          {row.customer} · {row.channel}
        </span>
      </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    cell: ({ value }) => (
      <Badge
        variant={
          value === "Paid"
            ? "success"
            : value === "Processing"
              ? "accent"
              : "warning"
        }
      >
        {String(value)}
      </Badge>
    )
  },
  {
    accessorKey: "items",
    header: "Items",
    sortable: true,
    align: "center"
  },
  {
    accessorKey: "total",
    header: "Total",
    sortable: true,
    align: "right",
    cell: ({ value }) => <span className="font-medium">{currencyFormatter.format(Number(value ?? 0))}</span>
  },
  {
    accessorKey: "placedAt",
    header: "Placed",
    sortable: true,
    cell: ({ value }) =>
      value instanceof Date ? (
        <span className="text-textMuted">{orderDateFormatter.format(value)}</span>
      ) : (
        "—"
      )
  }
];

const typescriptSnippet = `type Order = {
  id: string;
  total: number;
  status: "paid" | "processing" | "at-risk";
};

const columns: DataTableColumn<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    sortable: true
  },
  {
    accessorKey: "total",
    header: "Total",
    align: "right",
    sortable: true,
    cell: ({ value }) => currency.format(Number(value))
  }
];`;

const javascriptSnippet = `export function queueDraft(order) {
  if (order.status !== "paid") {
    return {
      ready: false,
      reason: "Payment must be confirmed first."
    };
  }

  return {
    ready: true,
    priority: order.total > 250 ? "high" : "standard"
  };
}`;

const pythonSnippet = `from collections import Counter

def summarize_orders(orders):
    counts = Counter(order["status"] for order in orders)
    total = sum(order["total"] for order in orders)

    return {
        "count": len(orders),
        "total": total,
        "statuses": dict(counts),
    }`;

export default function ComponentsPage() {
  const [menuChoice, setMenuChoice] = useState("Archive draft");
  const [contextChoice, setContextChoice] = useState("Open research note");
  const [menubarChoice, setMenubarChoice] = useState("Review outline");
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
          title="Foundations, overlays, navigation, editorial reading surfaces, and feedback in one calm visual language."
          description="The system now covers form primitives, layered interactions, menus, searchable controls, data display, and long-form reading surfaces without losing the warm editorial tone."
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
              <div className="eyebrow">Alert</div>
              <Alert variant="warning">
                <AlertTitle>Review window is narrowing</AlertTitle>
                <AlertDescription>
                  The current draft has been waiting for editorial approval for 48 hours. A gentle reminder helps keep the flow moving.
                </AlertDescription>
              </Alert>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Breadcrumb</div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Library</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Editorial</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Review draft</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Fields</div>
              <div className="section-stack">
                <div className="section-stack" style={{ gap: "0.65rem" }}>
                  <Label htmlFor="catalog-email">Email address</Label>
                  <Input id="catalog-email" placeholder="editorial@marginalia.dev" />
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
              <div className="eyebrow">Avatar</div>
              <div className="inline-actions">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="Editor portrait" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <Avatar className="h-14 w-14">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </div>
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
              <div className="eyebrow">Hover card</div>
              <HoverCard openDelay={120} closeDelay={90}>
                <HoverCardTrigger asChild>
                  <Button variant="link">Hover author profile</Button>
                </HoverCardTrigger>
                <HoverCardContent align="start">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                      <Badge variant="accent">Contributor</Badge>
                      <h3 style={{ fontFamily: "var(--font-editorial)", fontSize: "1.45rem", margin: 0 }}>
                        Sofia Chen
                      </h3>
                      <p className="lead" style={{ fontSize: "0.96rem", margin: 0 }}>
                        Writes interface notes that make dense product surfaces feel lighter, slower, and easier to trust.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
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
              <div className="eyebrow">Context menu</div>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <Card className="cursor-context-menu border-dashed border-accent/35 bg-surfaceAlt/35">
                    <CardHeader className="mb-0">
                      <CardTitle style={{ fontSize: "1.4rem" }}>Right click this note</CardTitle>
                      <CardDescription>
                        Secondary actions stay attached to the reading surface instead of crowding the main layout.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Note actions</ContextMenuLabel>
                  <ContextMenuItem onSelect={() => setContextChoice("Open research note")}>
                    Open research note
                    <ContextMenuShortcut>Enter</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem onSelect={() => setContextChoice("Duplicate annotation")}>
                    Duplicate annotation
                    <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem destructive onSelect={() => setContextChoice("Remove note")}>
                    Remove note
                    <ContextMenuShortcut>Del</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Last action: <span className="mono-note">{contextChoice}</span>
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Menubar</div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Library</MenubarTrigger>
                  <MenubarContent>
                    <MenubarLabel>Browse</MenubarLabel>
                    <MenubarItem onSelect={() => setMenubarChoice("Review outline")}>
                      Review outline
                      <MenubarShortcut>Ctrl+R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onSelect={() => setMenubarChoice("Open archive")}>
                      Open archive
                      <MenubarShortcut>Ctrl+A</MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Compose</MenubarTrigger>
                  <MenubarContent>
                    <MenubarLabel>Writing</MenubarLabel>
                    <MenubarItem onSelect={() => setMenubarChoice("New essay draft")}>
                      New essay draft
                    </MenubarItem>
                    <MenubarItem onSelect={() => setMenubarChoice("Publish summary")}>
                      Publish summary
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem destructive onSelect={() => setMenubarChoice("Discard changes")}>
                      Discard changes
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              <p className="lead" style={{ fontSize: "1rem" }}>
                Current selection: <span className="mono-note">{menubarChoice}</span>
              </p>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Progress</div>
              <div className="section-stack" style={{ gap: "0.9rem" }}>
                <div className="section-stack" style={{ gap: "0.5rem" }}>
                  <span className="mono-note">Editorial review · 68%</span>
                  <Progress value={68} />
                </div>
                <div className="section-stack" style={{ gap: "0.5rem" }}>
                  <span className="mono-note">Publication readiness · 42%</span>
                  <Progress value={42} variant="warning" />
                </div>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Accordion</div>
              <Accordion type="single" collapsible className="grid gap-3">
                <AccordionItem value="voice">
                  <AccordionTrigger>Why this visual tone?</AccordionTrigger>
                  <AccordionContent>
                    The kit aims for scholarly calm rather than startup gloss, so spacing, radius, and contrast feel measured.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="motion">
                  <AccordionTrigger>How is motion handled?</AccordionTrigger>
                  <AccordionContent>
                    Movements stay short and soft. Panels open with gentle lift and collapse without theatrical overshoot.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Sheet</div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open side panel</Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <div className="inline-actions" style={{ gap: "0.55rem", marginTop: 0 }}>
                      <Badge variant="accent">Workflow</Badge>
                      <span className="mono-note">Review queue</span>
                    </div>
                    <SheetTitle>Editorial handoff</SheetTitle>
                    <SheetDescription>
                      Sheets now feel lighter and more structured, with a dedicated body area for denser utility flows.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetBody>
                    <div className="grid gap-2 rounded-[var(--marginalia-radius-field)] border bg-surfaceAlt/45 p-4">
                      <Label htmlFor="sheet-handoff">Current handoff</Label>
                      <Input id="sheet-handoff" readOnly value="Annotations ready for final pass." />
                    </div>
                    <div className="grid gap-2 rounded-[var(--marginalia-radius-field)] border border-dashed bg-canvas/55 p-4">
                      <span className="mono-note">Next steps</span>
                      <p className="lead" style={{ fontSize: "0.98rem", margin: 0 }}>
                        Confirm citations, scan inline notes, and send the draft to production once copy is locked.
                      </p>
                    </div>
                  </SheetBody>
                  <SheetFooter>
                    <Button size="sm" variant="secondary">
                      Dismiss
                    </Button>
                    <Button size="sm">Continue</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
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
              <div className="eyebrow">Stepper</div>
              <Stepper>
                <StepperItem
                  step="1"
                  status="complete"
                  title="Draft prepared"
                  description="Content structure and editorial tone have been approved."
                />
                <StepperItem
                  step="2"
                  status="current"
                  title="Design review"
                  description="Palette, spacing, and interaction details are being refined."
                />
                <StepperItem
                  step="3"
                  status="upcoming"
                  title="Publish"
                  description="Final assets and documentation will be shipped next."
                />
              </Stepper>
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
              <div className="eyebrow">Rich text surface</div>
              <RichTextSurface>
                <RichTextKicker>Editorial reading surface</RichTextKicker>
                <h1>Long-form content without borrowing the feel of a CMS theme.</h1>
                <RichTextLead>
                  Rich Text Surface gives essays, release notes, case studies, and product commentary a warm frame that feels composed rather than generic.
                </RichTextLead>
                <RichTextQuote>
                  When interface chrome gets quieter, the writing can carry more of the experience.
                </RichTextQuote>
                <h2>Why it belongs in the kit</h2>
                <p>
                  Product teams often build polished controls but leave longer reading surfaces to ad hoc markup. This component closes that gap with better defaults for hierarchy, spacing, and annotation-friendly rhythm.
                </p>
                <ul>
                  <li>Use it for editorial landing pages, release notes, and dense documentation.</li>
                  <li>Keep links readable with understated accents instead of loud color jumps.</li>
                  <li>Highlight short inline details with tokens like <code>accentSoft</code> or <code>textMuted</code>.</li>
                </ul>
                <hr />
                <RichTextMeta>
                  <span>Reading time 4 min</span>
                  <span>Updated Mar 17, 2026</span>
                  <span>Surface tokens only</span>
                </RichTextMeta>
              </RichTextSurface>
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-12">
            <div className="section-stack">
              <div className="eyebrow">Data table</div>
              <DataTable<OrderRow>
                title="Recent orders"
                description="A typed `DataTable<OrderRow>` surface with sortable columns, richer cells, and a calmer detail rhythm than a plain table."
                toolbar={<Badge variant="accent">Typed and sortable</Badge>}
                caption="Client-side sorting with strongly typed columns and custom cells."
                columns={orderColumns}
                data={orderRows}
                getRowId={(row) => row.id}
                initialSort={{ id: "placedAt", direction: "desc" }}
                rowClassName={(row) => (row.status === "At risk" ? "bg-warning/5" : undefined)}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel className="span-12">
            <div className="section-stack">
              <div className="eyebrow">Code viewer</div>
              <Tabs defaultValue="typescript">
                <TabsList>
                  <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                </TabsList>
                <TabsContent value="typescript">
                  <CodeViewer
                    filename="orders-table.tsx"
                    language="tsx"
                    caption="Warm syntax highlighting for snippets, docs examples, and implementation notes."
                    code={typescriptSnippet}
                    highlightedLines={[6, 15]}
                  />
                </TabsContent>
                <TabsContent value="javascript">
                  <CodeViewer
                    filename="queue-draft.js"
                    language="javascript"
                    code={javascriptSnippet}
                    highlightedLines={[2, 10]}
                  />
                </TabsContent>
                <TabsContent value="python">
                  <CodeViewer
                    filename="summaries.py"
                    language="python"
                    code={pythonSnippet}
                    highlightedLines={[3, 7]}
                  />
                </TabsContent>
              </Tabs>
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
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviewRows.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="text-textMuted">{row.updated}</TableCell>
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

          <ShowcasePanel className="span-6">
            <div className="section-stack">
              <div className="eyebrow">Skeleton</div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-5 w-28 rounded-full" />
                  <Skeleton className="h-10 w-3/4" />
                </CardHeader>
                <CardContent className="gap-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-[88%]" />
                  <Skeleton className="h-28 w-full rounded-[24px]" />
                </CardContent>
              </Card>
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
