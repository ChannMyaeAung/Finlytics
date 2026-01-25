import { sanityClient } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";
import { CURRENCIES_CONTENT_QUERY } from "./queries";

export function useCurrenciesContents() {
  return useQuery({
    queryKey: ["currencies-contents"],
    queryFn: () => sanityClient.fetch(CURRENCIES_CONTENT_QUERY),
  });
}
