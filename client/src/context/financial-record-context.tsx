import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import { FinancialRecordContext } from "./financial-record-store";
import type {
  FinancialRecord,
  FinancialRecordContextType,
} from "./financial-record-store";

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

  const contextValue: FinancialRecordContextType = {
    records,
    addRecord,
    updateRecord,
    deleteRecord,
  };

  return (
    <FinancialRecordContext.Provider value={contextValue}>
      {children}
    </FinancialRecordContext.Provider>
  );
};
