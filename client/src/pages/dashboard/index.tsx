import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import Navbar from "@/components/navbar";

export const Dashboard = () => {
  const { user } = useUser();
  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
        <h1>Welcome {user?.firstName}! Here Are Your Finances:</h1>
        <FinancialRecordForm />
        <FinancialRecordList />
      </div>
    </>
  );
};
