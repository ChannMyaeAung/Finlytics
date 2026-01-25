import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type CurrencySymbol = {
  code: string;
  description: string;
};

export function useCurrencySymbols() {
  const baseURL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";
  return useQuery({
    queryKey: ["currency-symbols"],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/api/currency/symbols`);
      return Object.entries(res.data).map(([code, value]) => ({
        code,
        description: String(value),
      }));
    },
  });
}

export function useCurrencyConversion(
  from: string,
  to: string,
  amount: number,
) {
  const baseURL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";
  return useQuery({
    queryKey: ["convert", from, to, amount],
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/api/currency/convert`, {
        params: { from, to, amount },
      });
      return res.data;
    },
    enabled: !!from && !!to && !!amount,
  });
}
