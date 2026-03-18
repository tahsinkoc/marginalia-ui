import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Button,
  DataTable,
  DatePicker,
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStateIcon,
  EmptyStateTitle,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../src";
import type { DataTableColumn } from "../src";

describe("DatePicker, Table, Pagination, and EmptyState", () => {
  it("selects a date from the date picker", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker
        label="Review deadline"
        placeholder="Choose a date"
        calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
      />
    );

    await user.click(screen.getByRole("button", { name: /review deadline/i }));

    const dayButton = screen.getByRole("button", { name: /march 15.*2026/i });
    await user.click(dayButton);

    expect(screen.getByRole("button", { name: /review deadline/i })).toHaveTextContent("March 15, 2026");
  });

  it("keeps a single month caption visible while navigating the date picker", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker
        label="Review deadline"
        placeholder="Choose a date"
        calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
      />
    );

    await user.click(screen.getByRole("button", { name: /review deadline/i }));
    await user.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getAllByText(/april 2026/i)).toHaveLength(1);
  });

  it("renders table content and caption", () => {
    render(
      <Table>
        <TableCaption>Weekly editorial reviews.</TableCaption>
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
    );

    expect(screen.getByText(/weekly editorial reviews/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText(/scholar's preface/i)).toBeInTheDocument();
  });

  it("sorts a typed data table through ascending and descending order", async () => {
    type OrderRow = {
      id: string;
      total: number;
      status: "Paid" | "Processing";
    };

    const user = userEvent.setup();
    const rows: OrderRow[] = [
      { id: "ORD-101", total: 84, status: "Paid" },
      { id: "ORD-102", total: 246, status: "Processing" },
      { id: "ORD-103", total: 132, status: "Paid" }
    ];

    const columns: DataTableColumn<OrderRow>[] = [
      {
        accessorKey: "id",
        header: "Order",
        sortable: true
      },
      {
        accessorKey: "status",
        header: "Status"
      },
      {
        accessorKey: "total",
        header: "Total",
        sortable: true,
        align: "right"
      }
    ];

    render(<DataTable<OrderRow> columns={columns} data={rows} />);

    const totalSortButton = screen.getByRole("button", { name: /total/i });

    await user.click(totalSortButton);

    let tableRows = screen.getAllByRole("row");
    expect(tableRows[1]).toHaveTextContent("ORD-101");

    await user.click(totalSortButton);

    tableRows = screen.getAllByRole("row");
    expect(tableRows[1]).toHaveTextContent("ORD-102");
    expect(screen.getByText(/sorted by total \(descending\)/i)).toBeInTheDocument();
  });

  it("renders a custom empty state in the data table", () => {
    type OrderRow = {
      id: string;
      total: number;
    };

    const columns: DataTableColumn<OrderRow>[] = [
      {
        accessorKey: "id",
        header: "Order"
      },
      {
        accessorKey: "total",
        header: "Total",
        align: "right"
      }
    ];

    render(<DataTable<OrderRow> columns={columns} data={[]} emptyState="No orders in this queue." />);

    expect(screen.getByText(/no orders in this queue/i)).toBeInTheDocument();
    expect(screen.getByText(/0 rows/i)).toBeInTheDocument();
  });

  it("marks the active pagination link and keeps disabled links non-interactive", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" active>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" disabled />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /next/i })).toHaveAttribute("aria-disabled", "true");
  });

  it("renders an empty state with actions", () => {
    render(
      <EmptyState>
        <EmptyStateIcon>R</EmptyStateIcon>
        <EmptyStateTitle>No records yet</EmptyStateTitle>
        <EmptyStateDescription>Create your first review to populate the queue.</EmptyStateDescription>
        <EmptyStateFooter>
          <Button>Create review</Button>
        </EmptyStateFooter>
      </EmptyState>
    );

    expect(screen.getByText(/no records yet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create review/i })).toBeInTheDocument();
  });
});
