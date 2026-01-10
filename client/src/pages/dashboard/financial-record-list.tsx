import { useCallback, useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type Cell,
  type CellContext,
  type ColumnDef,
  useReactTable,
} from "@tanstack/react-table";
import { useFinancialRecords } from "@/context/financial-record-store";
import { financialRecordColumns } from "./financial-record-columns";
import { Button } from "@/components/ui/button";
import type { FinancialRecord } from "@/context/financial-record-store";
import { Input } from "@/components/ui/input";

import { Pen, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Dropdown choices share a single list so table + form stay in sync.
const CATEGORY_OPTIONS = [
  "Food",
  "Rent",
  "Salary",
  "Utilities",
  "Entertainment",
  "Other",
];

const PAYMENT_METHOD_OPTIONS = [
  "Credit Card",
  "Debit Card",
  "Cash",
  "Bank Transfer",
  "Other",
];

// Local copy of the row we are editing (mirrors FinancialRecord fields).
type DraftRecord = {
  date: string;
  description: string;
  amount: string;
  category: string;
  paymentMethod: string;
};

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  // Memoize data so the table only recalculates when records actually change.
  const data = useMemo(() => records ?? [], [records]);

  // TanStack exposes its internal state, but we keep sorting here so we can reset/inspect it.
  const [sorting, setSorting] = useState<SortingState>([]);
  // Everything below supports inline editing – which row is active + unsaved form data.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mongo collections may return _id or id depending on the API; this helper normalizes it.
  const getRecordId = (record: FinancialRecord) =>
    record._id ?? record.id ?? "";

  // Convert ISO strings/Date objects into YYYY-MM-DD so native inputs can consume them.
  const toInputDate = (value: Date | string) => {
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }
    return parsedDate.toISOString().split("T")[0];
  };

  // Enter edit mode by copying the row into our draft state.
  const beginEditing = useCallback((record: FinancialRecord) => {
    const recordId = record._id ?? record.id;
    if (!recordId) return;
    setEditingId(recordId);
    setDraft({
      date: toInputDate(record.date),
      description: record.description,
      amount: record.amount?.toString() ?? "0",
      category: record.category,
      paymentMethod: record.paymentMethod,
    });
  }, []);

  // Reset editing flags when the user cancels or after a successful save.
  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setDraft(null);
    setIsSaving(false);
  }, []);

  // Generic change handler so each cell editor can update just its field.
  const handleDraftChange = useCallback(
    (field: keyof DraftRecord, value: string) => {
      setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    []
  );

  // Push edits to the API, then collapse the row back into read-only mode.
  const persistDraft = useCallback(async () => {
    if (!editingId || !draft) return;
    setIsSaving(true);
    try {
      await updateRecord(editingId, {
        date: new Date(draft.date),
        description: draft.description,
        amount: Number(draft.amount),
        category: draft.category,
        paymentMethod: draft.paymentMethod,
      });
      cancelEditing();
    } catch (error) {
      // updateRecord already surfaces toast/error; we only reset saving state here.
      console.error("Failed to save record:", error);
    } finally {
      setIsSaving(false);
    }
  }, [cancelEditing, draft, editingId, updateRecord]);

  const beginDeleting = useCallback(
    (record: FinancialRecord) => {
      const recordId = getRecordId(record);
      if (!recordId) {
        return;
      }

      deleteRecord(recordId);
    },
    [deleteRecord]
  );

  // Extend the base column definitions with an "Actions" column for edit controls.
  const columns = useMemo<ColumnDef<FinancialRecord>[]>(() => {
    const actionColumn: ColumnDef<FinancialRecord> = {
      id: "actions",
      header: "Actions",
      cell: ({ row }: CellContext<FinancialRecord, unknown>) => {
        const record = row.original;
        const recordId = getRecordId(record);
        const isRowEditing = editingId === recordId;

        if (!recordId) {
          return null;
        }

        if (isRowEditing) {
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={persistDraft}
                disabled={isSaving}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={cancelEditing}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          );
        }

        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => beginEditing(record)}
              className="cursor-pointer"
            >
              <span className="sr-only">Edit Records</span>
              <Pen className="w-4 h-4 text-emerald-500 border-emerald-500" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <span className="sr-only">Delete Records</span>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this record?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the record from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive cursor-pointer hover:bg-destructive/90 transition-all"
                    onClick={() => beginDeleting(record)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    };

    return [...financialRecordColumns, actionColumn];
  }, [
    beginEditing,
    beginDeleting,
    cancelEditing,
    editingId,
    isSaving,
    persistDraft,
  ]);

  // useReactTable wires rows, headers, and helpers together with the features we enable.
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), // baseline row model (no sorting/filtering yet)
    getSortedRowModel: getSortedRowModel(), // opt into sorting computations
  });

  // Swap TanStack's default renderer for custom inputs whenever the row is being edited.
  const renderCell = (cell: Cell<FinancialRecord, unknown>) => {
    const record = cell.row.original as FinancialRecord;
    const recordId = getRecordId(record);
    const isRowEditing =
      draft && editingId === recordId && cell.column.id !== "actions";

    // Only the row currently being edited should swap to inputs
    // Every other row should stay read-only
    // draft: we only have editable values if we cloned the row into the draft state
    // IF the cell is not part of the active edit row or there's no draft, use default renderer
    if (!isRowEditing || !draft) {
      return flexRender(cell.column.columnDef.cell, cell.getContext());
    }

    switch (cell.column.id) {
      case "date":
        return (
          <Input
            type="date"
            value={draft.date}
            onChange={(event) => handleDraftChange("date", event.target.value)}
          />
        );
      case "description":
        return (
          <Input
            value={draft.description}
            onChange={(event) =>
              handleDraftChange("description", event.target.value)
            }
          />
        );
      case "amount":
        return (
          <Input
            type="number"
            value={draft.amount}
            onChange={(event) =>
              handleDraftChange("amount", event.target.value)
            }
          />
        );
      case "category":
        return (
          <select
            className="w-full rounded-md border border-input bg-background px-2 py-1"
            value={draft.category}
            onChange={(event) =>
              handleDraftChange("category", event.target.value)
            }
          >
            <option value="" disabled>
              Select category
            </option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "paymentMethod":
        return (
          <select
            className="w-full rounded-md border border-input bg-background px-2 py-1"
            value={draft.paymentMethod}
            onChange={(event) =>
              handleDraftChange("paymentMethod", event.target.value)
            }
          >
            <option value="" disabled>
              Select payment method
            </option>
            {PAYMENT_METHOD_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

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
                  <td key={cell.id} className="px-4 py-2 text-left">
                    {renderCell(cell)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="py-6 text-center text-muted-foreground"
                colSpan={columns.length}
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
