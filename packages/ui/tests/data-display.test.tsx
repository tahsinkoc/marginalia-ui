import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Button,
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
