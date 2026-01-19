import React from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { useBankConnectionContents } from "@/hooks/bank-connections/useBankConnectionContents";
import { Loader2 } from "lucide-react";
import { urlFor } from "@/lib/sanity";

export type LinkType = {
  label: string;
  url: string;
};

export type SectionType = {
  heading: string;
  content: PortableTextBlock[];
  links: LinkType[];
};

type BankConnectionContentsResponse = {
  title: string;
  Image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  sections: SectionType[];
};
export type BankConnectionContentsType = BankConnectionContentsResponse[];

interface SetUpFinanceProps {
  contents?: BankConnectionContentsType;
}

const SetUpFinance = ({ contents: propContents }: SetUpFinanceProps) => {
  const { data, isLoading } = useBankConnectionContents();

  const fetchedContents = (data || []) as BankConnectionContentsType;
  const contents = propContents || fetchedContents;

  return (
    <section id="set-up finance" className="bg-white relative">
      {isLoading && (
        <div className="flex absolute inset-0 items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}

      {contents.map((contentDoc, idx) => (
        <div>
          {contentDoc.sections?.map((section, sectionIdx) => (
            <SectionComponent
              key={sectionIdx}
              section={section}
              image={contentDoc.Image}
              isReversed={idx % 2 !== 0}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

// Helper component to render a single section
const SectionComponent = ({
  section,
  image,
  isReversed,
}: {
  section: SectionType;
  image: BankConnectionContentsResponse["Image"];
  isReversed: boolean;
}) => {
  return (
    // Example: Use 'isReversed' to toggle background color
    <section
      className={`py-24 overflow-hidden ${isReversed ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex flex-col md:flex-row items-center gap-16 ${isReversed ? "md:flex-row-reverse" : ""}`}
        >
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {section.heading}
            </h2>
            <div className="text-lg text-gray-600 mb-8 leading-relaxed">
              <PortableText value={section.content} />
            </div>
            <div className="flex gap-4">
              {section.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b33556] font-bold hover:text-[#d94668] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Image */}
          {image && (
            <div className="flex-1 w-full flex justify-center">
              <div>
                <img
                  src={urlFor(image).url()}
                  alt={section.heading}
                  className="w-[35vw] max-w-93 min-w-[297.6px] h-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SetUpFinance;
