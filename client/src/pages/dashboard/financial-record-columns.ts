import type { ColumnDef } from "@tanstack/react-table";
import type { FinancialRecord } from "@/context/financial-record-context";

// Helper so we do not repeat currency formatting inside each cell renderer.
const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "THB" });

// Column definitions tell TanStack Table how to read and render every field.
export const financialRecordColumns: ColumnDef<FinancialRecord>[] = [
  {
    // Show the record date and convert ISO strings into a friendly format.
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) => {
      const raw = getValue<string | Date>();
      return new Date(raw).toLocaleDateString();
    },
  },
  {
    // Plain accessors can rely on the default cell renderer.
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Payment Method",
    accessorKey: "paymentMethod",
  },
  {
    // Amount needs custom formatting plus a numeric meta flag for styling.
    header: "Amount",
    accessorKey: "amount",
    cell: ({ getValue }) => currency(getValue<number>()),
    meta: { isNumeric: true },
  },
];
