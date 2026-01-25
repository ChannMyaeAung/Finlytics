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
  SecondaryImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  sections: SectionType[];
};
export type BankConnectionContentsType = BankConnectionContentsResponse[];

const Content = () => {
  const { data, isLoading } = useBankConnectionContents();

  const fetchedContents = (data || []) as BankConnectionContentsType;

  return (
    <section id="set-up finance" className="bg-white relative">
      {isLoading && (
        <div className="flex absolute inset-0 items-center justify-center bg-white/50 z-10 rounded-xl">
          <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
        </div>
      )}

      {fetchedContents.map((contentDoc, idx) => (
        <div key={`content-${idx}`}>
          {contentDoc.sections?.map((section, sectionIdx) => (
            <SectionComponent
              key={`${idx}-${sectionIdx}`}
              section={section}
              image={contentDoc.Image}
              secondaryImage={contentDoc.SecondaryImage}
              index={idx}
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
  index,
  section,
  image,
  secondaryImage,
  isReversed,
}: {
  index: number;
  section: SectionType;
  image: BankConnectionContentsResponse["Image"];
  secondaryImage: BankConnectionContentsResponse["SecondaryImage"];
  isReversed: boolean;
}) => {
  // custom styles based on specific indices
  const customImageStyles = () => {
    switch (index) {
      case 0:
        return "w-[35vw] max-w-93 min-w-[297.6px] h-auto object-cover";
      case 1:
        return "absolute opacity-100 transform -translate-x-3.5 scale-100 max-w-314 min-w-[1004.8px] sm:-right-24 min-w-0 w-auto h-[400px] -left-34 ";
      case 2:
        return "w-full max-w-md";
      default:
        return "w-[35vw] max-w-93 min-w-[297.6px] h-auto object-cover";
    }
  };

  return (
    <section
      className={`py-24 overflow-hidden  border-t ${isReversed ? "bg-[#f9f9f3]" : "bg-white"}`}
    >
      <div className={`max-w-6xl px-6 mx-auto`}>
        <div
          className={`flex flex-col md:flex-row items-center gap-16  ${isReversed ? "md:flex-row-reverse" : ""}`}
        >
          {/* Text Content */}
          <div className="">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {section.heading}
            </h2>
            <div className="text-base text-gray-900/95 mb-8 ">
              <PortableText value={section.content} />
            </div>
            <div className="flex flex-col gap-4">
              {section.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b33556] font-medium hover:text-[#d94668] transition-colors text-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <span>{index}</span>
          </div>

          {/* Image */}
          {image && (
            <div
              className={`flex justify-center w-full ${index === 2 ? "relative" : ""}`}
            >
              {/* Primary Image */}
              <div className={index === 2 ? "relative z-10" : ""}>
                <img
                  src={urlFor(image).url()}
                  alt={section.heading}
                  className={`relative ${customImageStyles()} `}
                />
              </div>
              {/* Secondary Image - Behind (only for index 2) */}
              {secondaryImage && index === 2 && (
                <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
                  <img
                    src={urlFor(secondaryImage).url()}
                    alt={section.heading}
                    className="absolute -right-14 left-[8vw] bottom-0 scale-100 w-[32vw] max-w-105 min-w-65 opacity-100 transform rotate-6 origin-bottom-right hidden md:block"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Content;
