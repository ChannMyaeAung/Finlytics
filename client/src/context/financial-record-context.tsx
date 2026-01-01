import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

export interface FinancialRecord {
  id?: string; // mongodb document id
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  // function for fetching financial records by userId
  const fetchRecords = async () => {
    try {
      if (!user) return;
      const response = await fetch(
        `http://localhost:5000/financial-records/getAllByUserID/${user?.id}`
      );
      if (response.ok) {
        const records = await response.json();
        setRecords(records);
      }
    } catch (error) {
      console.error("Failed to fetch records:", error);
      toast.error("Failed to fetch records");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user?.id]);

  console.log(records);

  // Function for adding a financial record
  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch("http://localhost:5000/financial-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        const savedRecord = await response.json();
        setRecords((prevRecords) => [...prevRecords, savedRecord]);
      }
    } catch (error) {
      console.error("Failed to add record:", error);
      toast.error("Failed to add record");
    }
  };

  return (
    <FinancialRecordContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordProvider"
    );
  }
  return context;
};
