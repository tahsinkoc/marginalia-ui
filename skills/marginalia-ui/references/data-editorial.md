# Data and Editorial

Use this file when building data-heavy screens, loading states, code snippets, article surfaces, or multi-step flows.

## General Rules

- Prefer `DataTable` for app-level sortable tables.
- Prefer `Table` when the data is simple and hand-authored.
- Use `RichTextSurface` and `CodeViewer` for content-heavy pages instead of inventing new prose styles.

## DataTable

- Import: `import { DataTable } from "@marginalia/ui";`
- Type support: use `DataTable<T>` and `DataTableColumn<T>`.
- Supports sorting, custom cells, empty state, and aligned numeric columns.

```tsx
import { Badge, DataTable } from "@marginalia/ui";
import type { DataTableColumn } from "@marginalia/ui";

type Order = {
  id: string;
  customer: string;
  status: "Paid" | "Processing";
  total: number;
};

const columns: DataTableColumn<Order>[] = [
  { accessorKey: "id", header: "Order", sortable: true },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ value }) => (
      <Badge variant={value === "Paid" ? "success" : "accent"}>
        {String(value)}
      </Badge>
    )
  },
  { accessorKey: "total", header: "Total", align: "right", sortable: true }
];

<DataTable<Order> columns={columns} data={orders} initialSort={{ id: "total", direction: "desc" }} />
```

## Table

- Use for simpler tables where you want full manual control.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@marginalia/ui";

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
  </TableBody>
</Table>
```

## EmptyState

- Use for empty collections, empty dashboards, and first-run moments.
- Prefer meaningful copy plus one clear action.

```tsx
import {
  Button,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateIcon,
  EmptyStateTitle
} from "@marginalia/ui";

<EmptyState>
  <EmptyStateIcon>R</EmptyStateIcon>
  <EmptyStateTitle>No records yet</EmptyStateTitle>
  <EmptyStateDescription>Create your first review to populate the queue.</EmptyStateDescription>
  <EmptyStateFooter>
    <Button>Create review</Button>
  </EmptyStateFooter>
</EmptyState>
```

## Skeleton

- Use for loading placeholders when structure is known but content is not.
- Keep shimmer subtle; do not stack too many oversized skeleton blocks.

```tsx
import { Card, CardContent, CardHeader, Skeleton } from "@marginalia/ui";

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
```

## Progress

- Use for bounded progress, health, and workflow completion.
- Variants include default and `warning`.

```tsx
import { Progress } from "@marginalia/ui";

<>
  <Progress value={68} />
  <Progress value={42} variant="warning" />
</>
```

## Stepper

- Use for explicit multi-step sequences such as review, publish, checkout, or onboarding.

```tsx
import { Stepper, StepperItem } from "@marginalia/ui";

<Stepper>
  <StepperItem step="1" status="complete" title="Draft prepared" />
  <StepperItem step="2" status="current" title="Design review" />
  <StepperItem step="3" status="upcoming" title="Publish" />
</Stepper>
```

## CodeViewer

- Use for docs pages, code samples, implementation notes, and developer-facing surfaces.
- Supports filename, language, highlighted lines, and warm syntax colors.

```tsx
import { CodeViewer } from "@marginalia/ui";

const source = `export function queueDraft(order) {
  if (order.status !== "paid") {
    return { ready: false };
  }

  return {
    ready: true,
    priority: order.total > 250 ? "high" : "standard"
  };
}`;

<CodeViewer
  filename="queue-draft.ts"
  language="typescript"
  code={source}
  highlightedLines={[2, 7]}
/>
```

## RichTextSurface

- Use for release notes, essays, changelogs, documentation, and editorial articles.
- Compose with `RichTextLead`, `RichTextKicker`, `RichTextMeta`, and `RichTextQuote` when needed.

```tsx
import { RichTextLead, RichTextSurface } from "@marginalia/ui";

<RichTextSurface>
  <h1>Editorial notes with a calmer cadence.</h1>
  <RichTextLead>
    RichTextSurface gives longer explanations a more considered rhythm.
  </RichTextLead>
  <p>Use it for release notes, essays, design rationales, or deeper docs pages.</p>
</RichTextSurface>
```

## Use These Files for Deeper Examples

- `apps/docs/components/usage-data-content.tsx`
