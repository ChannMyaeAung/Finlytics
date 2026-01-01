import { useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useFinancialRecords } from "@/context/financial-record-context";
import { financialRecordColumns } from "./financial-record-columns";

export const FinancialRecordList = () => {
  const { records } = useFinancialRecords();

  // Memoize data so the table only recalculates when records actually change.
  const data = useMemo(() => records ?? [], [records]);

  // Sorting state is managed outside TanStack so we can show indicators, reset, etc.
  const [sorting, setSorting] = useState<SortingState>([]);

  // useReactTable wires rows, headers, and helpers together with the features we enable.
  const table = useReactTable({
    data,
    columns: financialRecordColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), // baseline row model (no sorting/filtering yet)
    getSortedRowModel: getSortedRowModel(), // opt into sorting computations
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <span className="inline-flex items-center gap-1">
                    {/* flexRender lets TanStack render strings, JSX, or functions the same way */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: "▲",
                      desc: "▼",
                    }[header.column.getIsSorted() as string] ?? null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* Render either the row model or a single "empty" row if nothing to show */}
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-muted/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-6 text-center text-muted-foreground"
                colSpan={financialRecordColumns.length}
              >
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
