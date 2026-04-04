import { useCallback, useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import { useFinancialRecords } from "@/hooks/dashboard/financial-record-store";
import { financialRecordColumns } from "./financial-record-columns";
import { Button } from "@/components/ui/button";
import type { FinancialRecord } from "@/hooks/dashboard/financial-record-store";
import { Input } from "@/components/ui/input";
import { Pen, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dropdown choices share a single list so the edit modal and the add form stay in sync.
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
// All numeric values are kept as strings here so controlled inputs work without
// conversion on every keystroke — they get parsed back to numbers on save.
type DraftRecord = {
  date: string;
  description: string;
  amount: string;
  category: string;
  paymentMethod: string;
  transactionType: "income" | "expense";
};

export const FinancialRecordList = () => {
  const { records, isLoading, hasFetched, updateRecord, deleteRecord } =
    useFinancialRecords();

  // Memoize data so the table only recalculates when records actually change.
  const data = useMemo(() => records ?? [], [records]);

  // TanStack exposes its internal state, but we keep sorting here so we can reset/inspect it.
  const [sorting, setSorting] = useState<SortingState>([]);

  // Instead of cramming inputs into table cells (which is hard to use at any screen size),
  // we open a floating modal when the user clicks Edit. These three pieces of state drive it:
  // - editingId: which record is open in the modal (null = modal closed)
  // - draft: a local working copy of that record's fields
  // - isSaving: prevents double-submits and disables the Save button while the API call is in flight
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mongo collections may return _id or id depending on the API; this helper normalises it.
  const getRecordId = (record: FinancialRecord) =>
    record._id ?? record.id ?? "";

  // Convert ISO strings / Date objects into YYYY-MM-DD so native date inputs can consume them.
  const toInputDate = (value: Date | string) => {
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) return "";
    return parsedDate.toISOString().split("T")[0];
  };

  // Enter edit mode: copy the chosen row into draft state and store its id so the modal knows
  // which record to update when the user hits Save.
  const beginEditing = useCallback((record: FinancialRecord) => {
    const recordId = record._id ?? record.id;
    if (!recordId) return;

    setEditingId(recordId);
    // Derive transaction type from the explicit field if present, otherwise infer it from
    // the sign of the amount (positive = income, negative = expense).
    const currentType =
      record.transactionType ?? (record.amount >= 0 ? "income" : "expense");

    setDraft({
      date: toInputDate(record.date),
      description: record.description,
      amount: Math.abs(record.amount).toString(),
      category: record.category,
      paymentMethod: record.paymentMethod,
      transactionType: currentType,
    });
  }, []);

  // Reset all editing flags — called both by Cancel and after a successful save.
  const cancelEditing = useCallback(() => {
    setEditingId(null);
    setDraft(null);
    setIsSaving(false);
  }, []);

  // Generic change handler so each modal field can update just its own slice of draft state.
  const handleDraftChange = useCallback(
    (field: keyof DraftRecord, value: string) => {
      setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    [],
  );

  // Push edits to the API then close the modal.
  // Amount sign is determined by transactionType: expense → negative, income → positive.
  const persistDraft = useCallback(async () => {
    if (!editingId || !draft) return;
    setIsSaving(true);
    try {
      const numericAmount = parseFloat(draft.amount);
      const signedAmount =
        draft.transactionType === "expense"
          ? -Math.abs(numericAmount)
          : Math.abs(numericAmount);

      await updateRecord(editingId, {
        date: new Date(draft.date),
        description: draft.description,
        amount: signedAmount,
        category: draft.category,
        paymentMethod: draft.paymentMethod,
        transactionType: draft.transactionType,
      });
      cancelEditing();
    } catch (error) {
      // updateRecord already surfaces a toast/error; we only reset the saving flag here.
      console.error("Failed to save record:", error);
    } finally {
      setIsSaving(false);
    }
  }, [cancelEditing, draft, editingId, updateRecord]);

  const beginDeleting = useCallback(
    (record: FinancialRecord) => {
      const recordId = getRecordId(record);
      if (!recordId) return;
      deleteRecord(recordId);
    },
    [deleteRecord],
  );

  // Extend the base column definitions with an "Actions" column.
  // The column only renders the Edit/Delete icon buttons — editing itself happens in the modal.
  const columns = useMemo<ColumnDef<FinancialRecord>[]>(() => {
    const actionColumn: ColumnDef<FinancialRecord> = {
      id: "actions",
      header: "Actions",
      cell: ({ row }: CellContext<FinancialRecord, unknown>) => {
        const record = row.original;
        const recordId = getRecordId(record);
        if (!recordId) return null;

        return (
          <div className="flex gap-2">
            {/* Edit button — opens the modal with this row's data pre-filled */}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => beginEditing(record)}
              className="cursor-pointer"
            >
              <span className="sr-only">Edit Record</span>
              <Pen className="w-4 h-4 text-emerald-500" />
            </Button>

            {/* Delete button — wrapped in a confirmation dialog to prevent accidental deletions */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive" className="cursor-pointer">
                  <span className="sr-only">Delete Record</span>
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
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
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
  }, [beginEditing, beginDeleting]);

  // useReactTable wires rows, headers, and helpers together with the features we enable.
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), // baseline row model (required)
    getSortedRowModel: getSortedRowModel(), // opt into client-side sorting
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
        Fetching your records...
      </div>
    );
  }

  return (
    <>
      {/* Read-only table — rows are never mutated in-place; edits happen via the modal below */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <span className="inline-flex items-center gap-1">
                      {/* flexRender lets TanStack render strings, JSX, or functions the same way */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-muted/40 hover:bg-muted/60 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-left">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : hasFetched ? (
              <tr>
                <td
                  className="py-6 text-center text-muted-foreground"
                  colSpan={columns.length}
                >
                  No records yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* ── Edit Modal ──────────────────────────────────────────────────────────
          Opens when editingId is set. AnimatePresence handles the mount/unmount
          animation so the modal fades and scales in/out smoothly.
          Clicking the backdrop (the dark overlay) also cancels editing.         */}
      <AnimatePresence>
        {editingId && draft && (
          <>
            {/* Semi-transparent backdrop — clicking it dismisses the modal */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={cancelEditing}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Modal card — spring physics give it a natural feel on open/close */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto">

                {/* Modal header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Edit Record</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Update the details below and save.</p>
                  </div>
                  <button
                    onClick={cancelEditing}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Form fields */}
                <div className="px-6 py-5 space-y-4">

                  {/* Transaction type toggle — two pill buttons so it's obvious and easy to tap */}
                  <div className="flex gap-3">
                    {(["expense", "income"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleDraftChange("transactionType", type)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                          draft.transactionType === type
                            ? type === "expense"
                              ? "bg-red-50 border-red-300 text-red-700"
                              : "bg-emerald-50 border-emerald-300 text-emerald-700"
                            : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {type === "expense" ? "− Expense" : "+ Income"}
                      </button>
                    ))}
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={draft.date}
                      onChange={(e) => handleDraftChange("date", e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Description
                    </label>
                    <Input
                      value={draft.description}
                      onChange={(e) => handleDraftChange("description", e.target.value)}
                      placeholder="What was this for?"
                      className="w-full"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                      Amount
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={draft.amount}
                      onChange={(e) => handleDraftChange("amount", e.target.value)}
                      placeholder="0.00"
                      className="w-full"
                    />
                  </div>

                  {/* Category and Payment Method sit side by side — they're short enough to share a row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Category
                      </label>
                      <Select
                        value={draft.category}
                        onValueChange={(v) => handleDraftChange("category", v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Payment
                      </label>
                      <Select
                        value={draft.paymentMethod}
                        onValueChange={(v) => handleDraftChange("paymentMethod", v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_METHOD_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Modal footer with Cancel / Save actions */}
                <div className="flex gap-3 px-6 pb-6">
                  <Button
                    variant="outline"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={persistDraft}
                    disabled={isSaving}
                    className="flex-1 bg-slate-900 hover:bg-slate-800"
                  >
                    {isSaving ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
