import { sanityClient } from "@/lib/sanity";
import { useQuery } from "@tanstack/react-query";
import { HERO_PAGE_QUERY } from "./queries";

export function useHeroPage() {
  return useQuery({
    queryKey: ["hero-page"],
    queryFn: async () => sanityClient.fetch(HERO_PAGE_QUERY),
  });
}
