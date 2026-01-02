import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

export interface FinancialRecord {
  id?: string; // legacy id clients might still send
  _id?: string; // mongodb document id returned by the API
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
  updateRecord: (
    id: string,
    updatedRecord: Partial<FinancialRecord>
  ) => Promise<void>;
  deleteRecord: (id: string) => void;
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

  const updateRecord = async (
    id: string,
    updatedRecord: Partial<FinancialRecord>
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/financial-records/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecord),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update record");
      }

      const savedRecord = await response.json();
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          (record._id ?? record.id) === savedRecord._id ? savedRecord : record
        )
      );
      toast.success("Record updated");
    } catch (error) {
      console.error("Failed to update record:", error);
      toast.error("Failed to update record");
      throw error;
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/financial-records/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }

      setRecords((prevRecords) =>
        prevRecords.filter((record) => (record._id ?? record.id) !== id)
      );
      toast.success("Record deleted");
    } catch (error) {
      console.error("Failed to delete record:", error);
      toast.error("Failed to delete record");
      throw error;
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
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
