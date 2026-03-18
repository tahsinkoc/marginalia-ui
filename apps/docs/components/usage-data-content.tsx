"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CodeViewer,
  DataTable,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateIcon,
  EmptyStateTitle,
  Progress,
  RichTextLead,
  RichTextSurface,
  Skeleton,
  Stepper,
  StepperItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "marginalia-ui";
import type { DataTableColumn } from "marginalia-ui";

import { createUsageSnippet } from "./usage-snippet";
import type { UsageSection } from "./usage-types";

type OrderRow = {
  id: string;
  customer: string;
  status: "Paid" | "Processing" | "At risk";
  total: number;
};

const orderRows: OrderRow[] = [
  { id: "ORD-2048", customer: "Mina Albright", status: "Paid", total: 248 },
  { id: "ORD-2041", customer: "Jonah Rivera", status: "Processing", total: 132 },
  { id: "ORD-2037", customer: "Sofia Chen", status: "At risk", total: 410 }
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const orderColumns: DataTableColumn<OrderRow>[] = [
  {
    accessorKey: "id",
    header: "Order",
    sortable: true,
    cell: ({ row }) => (
      <div className="grid gap-1">
        <span className="font-medium text-text">{row.id}</span>
        <span className="text-[length:var(--marginalia-size-text-xs)] text-textMuted">{row.customer}</span>
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
    accessorKey: "total",
    header: "Total",
    sortable: true,
    align: "right",
    cell: ({ value }) => <span className="font-medium">{currencyFormatter.format(Number(value ?? 0))}</span>
  }
];

const codeSnippet = `export function queueDraft(order) {
  if (order.status !== "paid") {
    return { ready: false };
  }

  return {
    ready: true,
    priority: order.total > 250 ? "high" : "standard"
  };
}`;

export const contentUsageSections: UsageSection[] = [
  {
    id: "data-table",
    label: "DataTable",
    category: "Data",
    description: "Typed column definitions, richer cells, and built-in sorting for app-level tables.",
    filename: "data-table.tsx",
    code: createUsageSnippet({
      imports: ["Badge", "DataTable"],
      typeImports: ["DataTableColumn"],
      body: `
type Order = {
  id: string;
  customer: string;
  status: "Paid" | "Processing" | "At risk";
  total: number;
};

const orders: Order[] = [
  { id: "ORD-2048", customer: "Mina Albright", status: "Paid", total: 248 },
  { id: "ORD-2041", customer: "Jonah Rivera", status: "Processing", total: 132 }
];

const columns: DataTableColumn<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    sortable: true
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ value }) => (
      <Badge variant={value === "Paid" ? "success" : "accent"}>
        {String(value)}
      </Badge>
    )
  },
  {
    accessorKey: "total",
    header: "Total",
    align: "right",
    sortable: true
  }
];

export function OrdersTable() {
  return (
    <DataTable
      title="Recent orders"
      description="Typed rows and custom cells stay readable even in denser views."
      columns={columns}
      data={orders}
      initialSort={{ id: "total", direction: "desc" }}
    />
  );
}
      `
    }),
    preview: (
      <DataTable<OrderRow>
        title="Recent orders"
        description="Typed rows and custom cells stay readable even in denser views."
        columns={orderColumns}
        data={orderRows}
        getRowId={(row) => row.id}
        initialSort={{ id: "total", direction: "desc" }}
      />
    )
  },
  {
    id: "table",
    label: "Table",
    category: "Data",
    description: "Lower-level table primitives for simpler, hand-authored tabular layouts.",
    filename: "table.tsx",
    code: createUsageSnippet({
      imports: [
        "Table",
        "TableBody",
        "TableCell",
        "TableHead",
        "TableHeader",
        "TableRow"
      ],
      body: `
export function EditorialTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Scholar's preface</TableCell>
          <TableCell>Ready</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Archive annotation</TableCell>
          <TableCell>Needs review</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
      `
    }),
    preview: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Scholar&apos;s preface</TableCell>
            <TableCell>Ready</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Archive annotation</TableCell>
            <TableCell>Needs review</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  },
  {
    id: "empty-state",
    label: "EmptyState",
    category: "Data",
    description: "Purposeful empty placeholders with copy and actions already composed.",
    filename: "empty-state.tsx",
    code: createUsageSnippet({
      imports: [
        "Button",
        "EmptyState",
        "EmptyStateDescription",
        "EmptyStateFooter",
        "EmptyStateIcon",
        "EmptyStateTitle"
      ],
      body: `
export function EmptyReviews() {
  return (
    <EmptyState>
      <EmptyStateIcon>R</EmptyStateIcon>
      <EmptyStateTitle>No records yet</EmptyStateTitle>
      <EmptyStateDescription>Create your first review to populate the queue.</EmptyStateDescription>
      <EmptyStateFooter>
        <Button>Create review</Button>
      </EmptyStateFooter>
    </EmptyState>
  );
}
      `
    }),
    preview: (
      <EmptyState>
        <EmptyStateIcon>
          <ArchiveIcon className="h-7 w-7" />
        </EmptyStateIcon>
        <EmptyStateTitle>No records yet</EmptyStateTitle>
        <EmptyStateDescription>Create your first review to populate the queue.</EmptyStateDescription>
        <EmptyStateFooter>
          <Button size="sm">Create review</Button>
        </EmptyStateFooter>
      </EmptyState>
    )
  },
  {
    id: "skeleton",
    label: "Skeleton",
    category: "Data",
    description: "Loading placeholders with a gentle shimmer instead of aggressive chrome.",
    filename: "skeleton.tsx",
    code: createUsageSnippet({
      imports: ["Card", "CardContent", "CardHeader", "Skeleton"],
      body: `
export function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-10 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full rounded-[24px]" />
      </CardContent>
    </Card>
  );
}
      `
    }),
    preview: (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
        </CardHeader>
        <CardContent className="gap-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full rounded-[24px]" />
        </CardContent>
      </Card>
    )
  },
  {
    id: "progress",
    label: "Progress",
    category: "Data",
    description: "Soft progress indicators that stay calm in dashboards and workflows.",
    filename: "progress.tsx",
    code: createUsageSnippet({
      imports: ["Progress"],
      body: `
export function ReviewProgress() {
  return (
    <>
      <Progress value={68} />
      <Progress value={42} variant="warning" />
    </>
  );
}
      `
    }),
    preview: (
      <div className="section-stack">
        <div className="section-stack" style={{ gap: "0.5rem" }}>
          <span className="mono-note">Editorial review · 68%</span>
          <Progress value={68} />
        </div>
        <div className="section-stack" style={{ gap: "0.5rem" }}>
          <span className="mono-note">Publication readiness · 42%</span>
          <Progress value={42} variant="warning" />
        </div>
      </div>
    )
  },
  {
    id: "stepper",
    label: "Stepper",
    category: "Data",
    description: "Progression primitives for multi-step editorial or operational flows.",
    filename: "stepper.tsx",
    code: createUsageSnippet({
      imports: ["Stepper", "StepperItem"],
      body: `
export function PublishStepper() {
  return (
    <Stepper>
      <StepperItem step="1" status="complete" title="Draft prepared" />
      <StepperItem step="2" status="current" title="Design review" />
      <StepperItem step="3" status="upcoming" title="Publish" />
    </Stepper>
  );
}
      `
    }),
    preview: (
      <Stepper>
        <StepperItem step="1" status="complete" title="Draft prepared" />
        <StepperItem step="2" status="current" title="Design review" />
        <StepperItem step="3" status="upcoming" title="Publish" />
      </Stepper>
    )
  },
  {
    id: "code-viewer",
    label: "CodeViewer",
    category: "Editorial",
    description: "Syntax-highlighted snippets with line numbers, filename metadata, and warm token mapping.",
    filename: "code-viewer.tsx",
    code: createUsageSnippet({
      imports: ["CodeViewer"],
      body: `
const source = \`export function queueDraft(order) {
  if (order.status !== "paid") {
    return { ready: false };
  }

  return {
    ready: true,
    priority: order.total > 250 ? "high" : "standard"
  };
}\`;

export function QueueDraftViewer() {
  return (
    <CodeViewer
      filename="queue-draft.ts"
      language="typescript"
      code={source}
      highlightedLines={[2, 7]}
    />
  );
}
      `
    }),
    preview: (
      <CodeViewer
        filename="queue-draft.ts"
        language="typescript"
        code={codeSnippet}
        highlightedLines={[2, 7]}
      />
    )
  },
  {
    id: "rich-text-surface",
    label: "RichTextSurface",
    category: "Editorial",
    description: "Long-form reading surfaces for notes, essays, release posts, and rationale docs.",
    filename: "rich-text-surface.tsx",
    code: createUsageSnippet({
      imports: ["RichTextLead", "RichTextSurface"],
      body: `
export function ReleaseNotesSurface() {
  return (
    <RichTextSurface>
      <h1>Editorial notes with a calmer cadence.</h1>
      <RichTextLead>
        RichTextSurface gives longer explanations a more considered rhythm.
      </RichTextLead>
      <p>
        Use it for release notes, essays, design rationales, or deeper docs pages where reading flow matters.
      </p>
    </RichTextSurface>
  );
}
      `
    }),
    preview: (
      <RichTextSurface>
        <h1>Editorial notes with a calmer cadence.</h1>
        <RichTextLead>
          RichTextSurface gives longer explanations a more considered rhythm than raw prose dropped into a card.
        </RichTextLead>
        <p>
          Use it for release notes, essays, design rationales, or deeper docs pages where reading flow matters as much
          as the controls around it.
        </p>
      </RichTextSurface>
    )
  }
];

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
