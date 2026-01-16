import { createContext, useContext } from "react";

export interface FinancialRecord {
  id?: string;
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  transactionType: "income" | "expense";
  amount: number;
  category: string;
  paymentMethod: string;
}

export interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (
    id: string,
    updatedRecord: Partial<FinancialRecord>
  ) => Promise<void>;
  deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordProvider"
    );
  }

  return context;
};
