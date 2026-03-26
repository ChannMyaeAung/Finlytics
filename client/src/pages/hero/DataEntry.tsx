import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { motion } from "motion/react";
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
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-5xl font-black text-center text-gray-900 mb-24"
        >
          {data?.title}
        </motion.h2>

        {/* Features — staggered reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 text-center">
          {data?.items?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                ease: [0.22, 0.61, 0.36, 1],
                delay: index * 0.12,
              }}
              className="space-y-6 flex items-center flex-col justify-between"
            >
              <div className="space-y-4 mb-16">
                <h3 className="text-3xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base">{item.description}</p>
              </div>
              {item.image && (
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <img
                    src={urlFor(item.image).url()}
                    alt={item.title}
                    className="mx-auto max-w-xs w-full h-full drop-shadow-lg"
                  />
                </motion.div>
              )}
              {item.linkLabel && (
                <NavLink
                  to={item.linkUrl || "#"}
                  className="text-[#b33556] text-xs md:text-base pt-16 hover:underline transition-colors"
                >
                  {item.linkLabel}
                </NavLink>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataEntry;
