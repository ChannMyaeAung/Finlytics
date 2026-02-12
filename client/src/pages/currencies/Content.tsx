import type { LinkType } from "../bank-connections/Content";
import { useCurrenciesContents } from "@/hooks/currencies/useCurrenciesContents";
import { Loader2 } from "lucide-react";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import { NavLink } from "react-router-dom";

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
  description: PortableTextBlock[];
  links: LinkType[];
}

const CurrencyContents = () => {
  const { data, isLoading } = useCurrenciesContents();

  const fetchedContents = (data || []) as CurrencyContentType[];

  // Add spaces between each paragraphs
  const portableTextComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p className="my-4 last:mb-0">{children}</p>,
    },
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex absolute inset-0 items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}

      {fetchedContents.map((contentDoc, idx) => {
        const isReversed = idx % 2 !== 0;
        return (
          <div
            key={idx}
            className={`${isReversed ? "bg-[#f4f9f4]" : "bg-white"} pt-8 overflow-hidden`}
          >
            <div
              className={`max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row  justify-center items-center gap-24 relative h-full min-h-200 ${isReversed ? "md:flex-row-reverse" : ""} `}
            >
              {/* Contents - (First 2 contents to be self-start and last 2 contents to be self-center*/}
              <div
                className={`text-left w-full max-w-lg pb-8 md:pb-0 ${idx < 2 ? "self-start" : "self-center"}`}
              >
                <h1
                  className={`italic font-black text-4xl md:text-5xl pb-8 ${idx < 1 ? "font-serif" : "font-sans"} ${idx === 3 ? "text-7xl" : ""}`}
                >
                  {contentDoc.title}
                </h1>

                <div className="mt-4 text-sm text-gray-800">
                  <PortableText
                    value={contentDoc.description}
                    components={portableTextComponents}
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 ">
                  {contentDoc.links?.map((link, i) => (
                    <NavLink
                      key={i}
                      to={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#b33556] font-medium hover:text-[#d94668] transition-colors"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Images */}
              {contentDoc.Image && (
                <div
                  className={`flex justify-center relative w-full min-h-25 max-h-full h-full md:h-auto md:static ${idx === 2 ? "max-h-65" : ""}`}
                >
                  {/* Each content section will have its own styles for images */}
                  <img
                    src={urlFor(contentDoc.Image).url()}
                    alt={contentDoc.title}
                    className={`max-w-md w-full h-auto md:relative object-contain max-h-130 md:max-h-150 ${idx === 0 ? "md:min-w-0 md:bottom-0 absolute max-h-100! left-0 -bottom-40 md:left-15" : idx === 1 ? "-bottom-70 absolute md:top-0 md:-left-30 -top-15 scale-110 md:scale-100 " : idx === 2 ? "" : idx === 3 ? "absolute md:-left-45 max-w-xl! md:scale-150 scale-120 -top-10 md:top-0" : ""}`}
                  />
                </div>
              )}

              {/* Secondary Image Icon */}
              {contentDoc.SecondaryImage && (
                <div>
                  <img
                    src={urlFor(contentDoc.SecondaryImage).url()}
                    alt={`${contentDoc.title} secondary`}
                    className={` w-[20vw] min-w-17.5 max-w-38.25 absolute h-auto object-contain ${idx === 0 ? "md:bottom-5 md:w-[15vw] md:left-1/8 bottom-[21%] left-1/9" : "md:bottom-5 md:right-15 max-w-53.25 right-5 bottom-[27%]"}`}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyContents;
