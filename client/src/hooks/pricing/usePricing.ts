import { sanityClient } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";
import { PRICING_FEATURE_COMPARISON_QUERY } from "./queries";
import type { PricingPageProps } from "./types";

export function usePricing() {
  return useQuery<PricingPageProps>({
    queryKey: ["pricing"],
    queryFn: async () => sanityClient.fetch(PRICING_FEATURE_COMPARISON_QUERY),
  });
}
