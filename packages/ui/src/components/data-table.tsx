"use client";

import * as React from "react";

import { cn } from "../lib/cn";
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableSortState {
  id: string;
  direction: DataTableSortDirection;
}

type DataTableSortValue = string | number | boolean | Date | null | undefined;

export interface DataTableCellContext<TData> {
  row: TData;
  rowIndex: number;
  column: DataTableColumn<TData>;
  value: unknown;
}

export interface DataTableHeaderContext<TData> {
  column: DataTableColumn<TData>;
  sortDirection: DataTableSortDirection | null;
  sortable: boolean;
}

export interface DataTableColumn<TData> {
  id?: string;
  header: React.ReactNode | ((context: DataTableHeaderContext<TData>) => React.ReactNode);
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => unknown;
  cell?: (context: DataTableCellContext<TData>) => React.ReactNode;
  sortable?: boolean;
  sortAccessor?: (row: TData) => DataTableSortValue;
  sortComparator?: (left: TData, right: TData) => number;
  align?: "left" | "center" | "right";
  width?: React.CSSProperties["width"];
  className?: string;
  headerClassName?: string;
}

export interface DataTableProps<TData>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  toolbar?: React.ReactNode;
  caption?: React.ReactNode;
  columns: readonly DataTableColumn<TData>[];
  data: readonly TData[];
  getRowId?: (row: TData, rowIndex: number) => string;
  emptyState?: React.ReactNode;
  initialSort?: DataTableSortState | null;
  sort?: DataTableSortState | null;
  onSortChange?: (sort: DataTableSortState | null) => void;
  rowClassName?: string | ((row: TData, rowIndex: number) => string | undefined);
}

interface NormalizedDataTableColumn<TData> extends DataTableColumn<TData> {
  id: string;
  label: string;
  getValue: (row: TData) => unknown;
  getSortValue: (row: TData) => DataTableSortValue;
}

export function DataTable<TData>({
  title,
  description,
  toolbar,
  caption,
  columns,
  data,
  getRowId,
  emptyState,
  initialSort = null,
  sort,
  onSortChange,
  rowClassName,
  className,
  ...props
}: DataTableProps<TData>) {
  const normalizedColumns = React.useMemo<NormalizedDataTableColumn<TData>[]>(
    () =>
      columns.map((column, index) => {
        const id = column.id ?? (column.accessorKey ? String(column.accessorKey) : `column-${index}`);
        const getValue =
          column.accessorFn ??
          (column.accessorKey
            ? (row: TData) => row[column.accessorKey as keyof TData]
            : () => undefined);

        return {
          ...column,
          id,
          label: typeof column.header === "string" ? column.header : id,
          getValue,
          getSortValue: column.sortAccessor ?? ((row: TData) => getValue(row) as DataTableSortValue)
        };
      }),
    [columns]
  );

  const [uncontrolledSort, setUncontrolledSort] = React.useState<DataTableSortState | null>(initialSort);
  const currentSort = sort === undefined ? uncontrolledSort : sort;

  const sortedData = React.useMemo(() => {
    if (!currentSort) {
      return [...data];
    }

    const activeColumn = normalizedColumns.find((column) => column.id === currentSort.id);

    if (!activeColumn) {
      return [...data];
    }

    const comparator = activeColumn.sortComparator
      ? (left: TData, right: TData) => activeColumn.sortComparator?.(left, right) ?? 0
      : (left: TData, right: TData) =>
          compareDataTableValues(activeColumn.getSortValue(left), activeColumn.getSortValue(right));

    const result = [...data].sort(comparator);

    return currentSort.direction === "desc" ? result.reverse() : result;
  }, [currentSort, data, normalizedColumns]);

  const activeSortColumn = currentSort
    ? normalizedColumns.find((column) => column.id === currentSort.id) ?? null
    : null;

  const rowCountLabel = `${data.length} ${data.length === 1 ? "row" : "rows"}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--marginalia-radius-panel)] border bg-surface/95 shadow-panel",
        className
      )}
      {...props}
    >
      {title || description || toolbar ? (
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/70 bg-surfaceAlt/32 px-4 py-4">
          <div className="grid gap-1.5">
            {title ? (
              <h3 className="m-0 font-serif text-[length:var(--marginalia-size-text-title)] leading-tight tracking-[-0.03em] text-text">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p className="m-0 max-w-[44rem] text-[length:var(--marginalia-size-text-sm)] leading-relaxed text-textMuted">
                {description}
              </p>
            ) : null}
          </div>
          {toolbar ? <div className="flex shrink-0 items-center gap-2">{toolbar}</div> : null}
        </div>
      ) : null}

      <div className="relative w-full overflow-x-auto">
        <table className="w-full caption-bottom text-[length:var(--marginalia-size-text-sm)]">
          {caption ? <TableCaption>{caption}</TableCaption> : null}
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {normalizedColumns.map((column) => {
                const sortable = column.sortable ?? Boolean(column.sortComparator || column.sortAccessor || column.accessorFn || column.accessorKey);
                const sortDirection = currentSort?.id === column.id ? currentSort.direction : null;

                return (
                  <TableHead
                    key={column.id}
                    scope="col"
                    aria-sort={sortable ? toAriaSort(sortDirection) : undefined}
                    className={cn(resolveHeaderAlignClass(column.align), column.headerClassName)}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        onClick={() => {
                          const nextSort = getNextSortState(currentSort, column.id);

                          if (sort === undefined) {
                            setUncontrolledSort(nextSort);
                          }

                          onSortChange?.(nextSort);
                        }}
                        className={cn(
                          "inline-flex min-h-7 items-center gap-2 rounded-[var(--marginalia-radius-pill)] px-2 py-1 text-inherit transition hover:bg-accentSoft/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                          resolveSortButtonAlignClass(column.align),
                          sortDirection ? "text-text" : ""
                        )}
                      >
                        <span>{renderHeader(column, sortDirection, sortable)}</span>
                        <SortIcon direction={sortDirection} />
                      </button>
                    ) : (
                      renderHeader(column, sortDirection, sortable)
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length ? (
              sortedData.map((row, rowIndex) => (
                <TableRow
                  key={getRowId?.(row, rowIndex) ?? deriveRowId(row, rowIndex)}
                  className={cn(resolveRowClassName(row, rowIndex, rowClassName))}
                >
                  {normalizedColumns.map((column) => {
                    const value = column.getValue(row);

                    return (
                      <TableCell key={column.id} className={cn(resolveCellAlignClass(column.align), column.className)}>
                        {column.cell
                          ? column.cell({ row, rowIndex, column, value })
                          : defaultRenderValue(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={Math.max(normalizedColumns.length, 1)} className="px-6 py-10 text-center text-textMuted">
                  {emptyState ?? "No entries to display."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-surfaceAlt/35 px-4 py-3 text-[length:var(--marginalia-size-text-xs)] font-semibold uppercase tracking-[0.16em] text-textMuted">
        <span>{rowCountLabel}</span>
        <span>
          {activeSortColumn
            ? `Sorted by ${activeSortColumn.label} (${currentSort?.direction === "asc" ? "ascending" : "descending"})`
            : "Manual order"}
        </span>
      </div>
    </div>
  );
}

function renderHeader<TData>(
  column: DataTableColumn<TData>,
  sortDirection: DataTableSortDirection | null,
  sortable: boolean
) {
  return typeof column.header === "function"
    ? column.header({ column, sortDirection, sortable })
    : column.header;
}

function getNextSortState(currentSort: DataTableSortState | null, columnId: string) {
  if (!currentSort || currentSort.id !== columnId) {
    return { id: columnId, direction: "asc" as const };
  }

  if (currentSort.direction === "asc") {
    return { id: columnId, direction: "desc" as const };
  }

  return null;
}

function compareDataTableValues(left: DataTableSortValue, right: DataTableSortValue) {
  const normalizedLeft = normalizeDataTableValue(left);
  const normalizedRight = normalizeDataTableValue(right);

  if (normalizedLeft < normalizedRight) {
    return -1;
  }

  if (normalizedLeft > normalizedRight) {
    return 1;
  }

  return 0;
}

function normalizeDataTableValue(value: DataTableSortValue) {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string") {
    return value.toLocaleLowerCase();
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  if (value == null) {
    return "";
  }

  return value;
}

function defaultRenderValue(value: unknown) {
  if (React.isValidElement(value)) {
    return value;
  }

  if (value instanceof Date) {
    return value.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  if (value == null || value === "") {
    return "—";
  }

  return String(value);
}

function deriveRowId<TData>(row: TData, rowIndex: number) {
  if (typeof row === "object" && row !== null && "id" in row) {
    const value = (row as { id?: string | number }).id;

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }

  return `row-${rowIndex}`;
}

function resolveRowClassName<TData>(
  row: TData,
  rowIndex: number,
  rowClassName: DataTableProps<TData>["rowClassName"]
) {
  return typeof rowClassName === "function" ? rowClassName(row, rowIndex) : rowClassName;
}

function resolveHeaderAlignClass(align: DataTableColumn<unknown>["align"]) {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

function resolveCellAlignClass(align: DataTableColumn<unknown>["align"]) {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

function resolveSortButtonAlignClass(align: DataTableColumn<unknown>["align"]) {
  switch (align) {
    case "center":
      return "w-full justify-center";
    case "right":
      return "w-full justify-end";
    default:
      return "-ml-2";
  }
}

function toAriaSort(direction: DataTableSortDirection | null) {
  if (direction === "asc") {
    return "ascending";
  }

  if (direction === "desc") {
    return "descending";
  }

  return "none";
}

function SortIcon({ direction }: { direction: DataTableSortDirection | null }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        "h-4 w-4 transition",
        direction ? "text-accent" : "text-textMuted"
      )}
    >
      {direction === "asc" ? (
        <path
          d="M8 3.5 11 7H5zM8 12.5V6.5"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
        />
      ) : direction === "desc" ? (
        <path
          d="M8 12.5 5 9h6zM8 3.5v6"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.5"
        />
      ) : (
        <path
          d="M8 3.5 10.75 6.5h-5.5ZM8 12.5 5.25 9.5h5.5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.1"
        />
      )}
    </svg>
  );
}
