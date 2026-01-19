import { sanityClient } from "@/lib/sanity";
import { BANK_CONNECTION_CONTENTS_QUERY } from "./queries";
import { useQuery } from "@tanstack/react-query";

export function useBankConnectionContents() {
  return useQuery({
    queryKey: ["bank-connection-contents"],
    queryFn: () => sanityClient.fetch(BANK_CONNECTION_CONTENTS_QUERY),
  });
}
