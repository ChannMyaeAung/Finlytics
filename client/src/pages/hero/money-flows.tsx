import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { useState } from "react";
import { NavLink } from "react-router-dom";

type MoneyFlowTab = {
  id?: string;
  label?: string;
  phoneImage?: SanityImageSource;
  tabletImage?: SanityImageSource;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

type MoneyFlowsData = {
  title?: string;
  tabs?: MoneyFlowTab[];
};

const MoneyFlowsPage = ({ data }: { data?: MoneyFlowsData }) => {
  const tabs = data?.tabs || [];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");

  const activeIndex = Math.max(
    tabs.findIndex((tab) => tab.id === activeTab),
    0,
  );

  return (
    <section className="bg-white py-16" role="money-flow">
      <div className="max-w-6xl w-full mx-auto md:px-6 text-center">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-6xl text-gray-900 font-black">
          {data?.title}
        </h2>

        {/* Tabs */}
        <div
          className="
            relative mt-12 
            before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2
            before:bottom-0 before:w-screen before:border-b before:border-gray-200
            before:pointer-events-none
            "
        >
          <div className="flex w-full flex-wrap gap-6 px-4 md:px-0 justify-around">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id || "")}
                  className={[
                    "relative py-4 border-0 font-normal uppercase tracking-normal transition-colors cursor-pointer text-xs w-full max-w-fit md:max-w-40",
                    isActive && "text-gray-900",
                  ].join(" ")}
                >
                  <span className="text-xs! whitespace-nowrap">
                    {tab.label}
                  </span>

                  {/* Underline */}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px  h-0.75 bg-[#b33556]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative md:mt-20 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {tabs.map((tab, i) => (
              <div
                key={tab.id || i}
                className="min-w-full overflow-hidden md:shrink-0 flex flex-col items-center gap-16 "
              >
                <div className="relative h-auto min-h-120 sm:min-h-120 md:h-full container mx-auto flex items-end justify-center gap-0 md:gap-12">
                  {tab.phoneImage && (
                    <div className="absolute left-1/11 bottom-5 z-20 -translate-x-1/6 w-40 sm:w-48 md:translate-x-0 md:top-auto md:static md:w-auto self-center drop-shadow-xs">
                      <img
                        src={urlFor(tab.phoneImage).url()}
                        alt={`${tab.label} mobile preview`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {tab.tabletImage && (
                    <div className="absolute left-1/2 md:left-1/4 bottom-0 z-10 -translate-x-1/2 w-64 scale-120 md:scale-100 sm:w-72 md:h-full md:static md:translate-x-0 md:w-auto drop-shadow-xs">
                      <img
                        src={urlFor(tab.tabletImage).url()}
                        alt={`${tab.label} tablet preview`}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
                <div className="w-full max-w-3xl text-center">
                  <p className="mt-6 text-sm md:text-lg font-medium leading-relaxed text-gray-600 px-2">
                    {tab.description}
                  </p>
                  {tab.ctaLabel && (
                    <NavLink
                      to={tab.ctaUrl || "#"}
                      className="mt-8 text-lg inline-block cursor-pointer font-bold text-[#b33556] hover:underline"
                    >
                      {tab.ctaLabel}
                    </NavLink>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoneyFlowsPage;
