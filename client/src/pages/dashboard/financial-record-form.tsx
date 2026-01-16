import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "@/context/financial-record-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const FinancialRecordForm = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );
  const { records, addRecord } = useFinancialRecords();

  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);
    // If expense, ensure amount is stored as negative. If income, as positive.
    const signedAmount =
      transactionType === "expense"
        ? -Math.abs(numericAmount)
        : Math.abs(numericAmount);

    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: signedAmount,
      transactionType: transactionType,
      category: category,
      paymentMethod: paymentMethod,
    };

    console.log(newRecord);

    addRecord(newRecord);
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
    setTransactionType("expense");
  };

  return (
    <div className="w-full max-w-md mx-auto border p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Financial Record Form</FieldLegend>
            <FieldDescription>Add a new transaction.</FieldDescription>

            {/* Transaction Type Toggle */}
            <RadioGroup
              value={transactionType}
              onValueChange={(value) =>
                setTransactionType(value as "income" | "expense")
              }
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
            </RadioGroup>

            <FieldGroup>
              {/* Description */}
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field>

              {/* Amount */}
              <Field>
                <FieldLabel>Amount</FieldLabel>
                <Input
                  type="number"
                  placeholder="Amount"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Field>

              {/* Select */}
              <Field>
                <FieldLabel>Cateogry</FieldLabel>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Payment Method</FieldLabel>
                <Select
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <Field>
              <Button type="submit">Add Record</Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
