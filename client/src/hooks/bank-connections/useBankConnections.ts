import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import {
  ALL_BANK_CONNECTIONS_QUERY,
  POPULAR_BANK_CONNECTIONS_QUERY,
  BANK_COUNT_QUERY,
} from "./queries";

export function usePopularBankConnections(country: string) {
  return useQuery({
    queryKey: ["bankConnections", country],
    queryFn: () =>
      sanityClient.fetch(POPULAR_BANK_CONNECTIONS_QUERY, { country }),
  });
}

export function useAllBankConnections(country: string) {
  return useQuery({
    queryKey: ["allBankConnections", country],
    queryFn: () => sanityClient.fetch(ALL_BANK_CONNECTIONS_QUERY, { country }),
  });
}

export function useBankCount() {
  return useQuery({
    queryKey: ["bank-count"],
    queryFn: () => sanityClient.fetch(BANK_COUNT_QUERY),
  });
}
