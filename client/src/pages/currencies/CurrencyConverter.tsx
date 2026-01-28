"use client";
import {
  useCurrencyConversion,
  useCurrencySymbols,
} from "@/hooks/currencies/useCurrencies";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const CurrencyConverter = () => {
  const { data: symbols = [], isLoading } = useCurrencySymbols();

  const [from, setFrom] = useState("THB");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState(1);

  const { data } = useCurrencyConversion(from, to, amount);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#daeaf2] p-8 grid grid-cols-2 gap-4 max-w-xl">
      {/* FROM */}
      <div className="relative inline-flex items-center w-25 md:w-full text-nowrap">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 rounded border bg-white overflow-hidden w-full appearance-none backdrop-blur-md"
        >
          {symbols.map((c) => (
            <option key={c.code} value={c.code}>
              {c.description} – {c.code}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 pointer-events-none" />
      </div>

      {/* TO */}
      <div className="relative inline-flex items-center w-25 md:w-full text-nowrap">
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-3 rounded border bg-white overflow-hidden w-full appearance-none backdrop-blur-md"
        >
          {symbols.map((c) => (
            <option key={c.code} value={c.code}>
              {c.description} – {c.code}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 pointer-events-none" />
      </div>

      {/* AMOUNT */}
      <div className="md:w-full relative inline-flex items-center w-25">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="p-3 rounded border w-full bg-white"
        />
      </div>

      <div className="w-25 relative inline-flex items-center md:w-full">
        {/* RESULT */}
        <input
          type="text"
          readOnly
          value={data?.result ? data.result.toFixed(2) : ""}
          className="p-3 rounded border w-full bg-white"
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
