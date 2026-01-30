import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { NavLink } from "react-router-dom";

type DataEntryItem = {
  title?: string;
  description?: string;
  image?: SanityImageSource;
  linkLabel?: string;
  linkUrl?: string;
};

type DataEntryData = {
  title?: string;
  items?: DataEntryItem[];
};

const DataEntry = ({ data }: { data?: DataEntryData }) => {
  return (
    <section className="bg-white py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        {/* Title */}
        <h2 className="text-5xl font-black text-center text-gray-900 mb-24">
          {data?.title}
        </h2>

        {/* Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 text-center">
          {/* Bank connections */}
          {data?.items?.map((item, index) => (
            <div
              key={index}
              className="space-y-6 flex items-center flex-col justify-between"
            >
              <div className="space-y-4 mb-16">
                <h3 className="text-3xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base">{item.description}</p>
              </div>
              {item.image && (
                <div>
                  <img
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    className="mx-auto max-w-xs w-full h-full drop-shadow-lg"
                  />
                </div>
              )}
              {item.linkLabel && (
                <NavLink
                  to={item.linkUrl || "#"}
                  className="text-[#b33556] text-xs md:text-base pt-16"
                >
                  {item.linkLabel}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataEntry;
