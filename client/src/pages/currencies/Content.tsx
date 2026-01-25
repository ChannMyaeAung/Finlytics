import React from "react";
import type { LinkType } from "../bank-connections/Content";
import { useCurrenciesContents } from "@/hooks/currencies/useCurrenciesContents";
import { Loader2 } from "lucide-react";

interface CurrencyContentType {
  title: string;
  Image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  SecondaryImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  description: string;
  links: LinkType[];
}

const CurrencyContents = () => {
  const { data, isLoading } = useCurrenciesContents();

  const fetchedContents = (data || []) as CurrencyContentType[];

  return (
    <div>
      {isLoading && (
        <div className="flex absolute inset-0 items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}

      {fetchedContents.map((contentDoc, idx) => (
        <div
          key={idx}
          className={`${idx % 2 !== 0 ? "bg-[#f4f9f4]" : "bg-white"}`}
        >
          {/* Contents */}
          <div>
            <h1>{contentDoc.title}</h1>
            <p>{contentDoc.description}</p>
          </div>

          {/* Images */}
          {contentDoc.Image && (
            <div>
              <img />
            </div>
          )}

          {/* Secondary Image Icon */}
          {contentDoc.SecondaryImage && <div></div>}
        </div>
      ))}
    </div>
  );
};

export default CurrencyContents;
