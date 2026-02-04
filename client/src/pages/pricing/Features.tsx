import type { PricingPageProps } from "@/hooks/pricing/types";
import clsx from "clsx";
import { PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Features = ({ data }: { data?: PricingPageProps }) => {
  const { features } = data?.featureComparison || {};

  const titlePadding = "px-9";
  const subtitlePadding = "px-4 ";
  const notePadding = "px-9 ";

  // Since toshl.com pricing page show only unique features in small screens, we need to filter out unique features for Pro plan and Medici plan
  // For large screens above sm which is >= 640px, we will show all features
  const isAvailable = (status?: string) => {
    return status === "included" || status === "unlimited";
  };

  const proUnique = features?.filter(
    (feature) =>
      isAvailable(feature.availability.pro.status) &&
      (!isAvailable(feature.availability.free.status) ||
        feature.availability.free.note !== feature.availability.pro.note),
  );

  const mediciUnique = features?.filter(
    (feature) =>
      isAvailable(feature.availability.medici.status) &&
      (!isAvailable(feature.availability.pro.status) ||
        feature.availability.pro.note !== feature.availability.medici.note),
  );

  return (
    <div>
      <div className="">
        {/* Plans */}
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-3">
          {/* Free Plan Features */}
          <div className="">
            <h1 className={`text-xl font-bold ${titlePadding}`}>
              Free Features
            </h1>

            <div className="space-y-6 my-6">
              {features?.map(
                (feature) =>
                  feature.availability.free.status === "included" && (
                    <div key={feature.title}>
                      <div className="flex items-center gap-1 ">
                        <i>
                          <PrinterIcon className="w-4 h-4" />
                        </i>
                        <span className={`${subtitlePadding} font-bold`}>
                          {feature.title}
                        </span>
                      </div>
                      <span className={`${notePadding} text-xs text-gray-500`}>
                        {feature.availability.free.note}
                      </span>
                    </div>
                  ),
              )}
            </div>
          </div>

          {/* Pro Plan Features */}
          <div className="">
            <h1 className={`text-xl font-bold ${titlePadding}`}>
              Pro Features
            </h1>

            {/* Map all features available in Pro Plan and highlight differences with Free Plan with emerald green color */}
            {/* Small screens: only unique to Pro Plan*/}
            <div className="space-y-6 my-6 sm:hidden">
              {proUnique?.map((feature) => (
                <div key={feature.title}>
                  <div className="flex items-center gap-1 text-emerald-700">
                    <i>
                      <PrinterIcon className="w-4 h-4" />
                    </i>
                    <span className={`${subtitlePadding} font-bold`}>
                      {feature.availability.pro.status === "unlimited"
                        ? "Unlimited "
                        : ""}
                      {feature.title}
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "flex items-center gap-1 text-xs text-emerald-700",
                      notePadding,
                    )}
                  >
                    {feature.availability.pro.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Map all features available in Pro Plan and highlight differences with Free Plan with emerald green color */}
            {/* sm+ screens: show all Pro features*/}
            <div className="space-y-6 my-6 hidden sm:block">
              {features?.map((feature) =>
                feature.availability.pro.status === "included" ||
                feature.availability.pro.status === "unlimited" ? (
                  <div key={feature.title}>
                    <div
                      className={clsx(
                        "flex items-center gap-1 ",
                        feature.availability.pro.status === "unlimited" ||
                          feature.availability.free.status === "none" ||
                          feature.availability.free.note !==
                            feature.availability.pro.note
                          ? "text-emerald-700"
                          : "",
                      )}
                    >
                      <i>
                        <PrinterIcon className="w-4 h-4" />
                      </i>
                      <span className={`${subtitlePadding} font-bold`}>
                        {feature.availability.pro.status === "unlimited"
                          ? "Unlimited "
                          : ""}
                        {feature.title}
                      </span>
                    </div>
                    <span
                      className={clsx(
                        "flex items-center gap-1 text-xs",
                        feature.availability.free.status === "none" ||
                          feature.availability.free.note !==
                            feature.availability.pro.note
                          ? "text-emerald-700 "
                          : "text-gray-500",
                        notePadding,
                      )}
                    >
                      {feature.availability.pro.note}
                    </span>
                  </div>
                ) : null,
              )}
            </div>
          </div>

          {/* Medici Plan Features */}
          <div className="">
            <h1 className={`text-xl font-bold ${titlePadding}`}>
              Medici Features
            </h1>

            {/* Small screens: only unique to Medici */}
            <div className="space-y-6 my-6 sm:hidden">
              {mediciUnique?.map((feature) => (
                <div key={feature.title}>
                  <div className="flex items-center gap-1 text-emerald-700">
                    <i>
                      <PrinterIcon className="w-4 h-4" />
                    </i>
                    <span className={`${subtitlePadding} font-bold`}>
                      {feature.title}
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "flex items-center gap-1 text-xs text-emerald-700",
                      notePadding,
                    )}
                  >
                    {feature.availability.pro.note}
                  </span>
                </div>
              ))}
            </div>

            {/* sm+ screens: show all Medici features */}
            <div className="space-y-6 my-6 hidden sm:block">
              {features?.map((feature) =>
                feature.availability.medici.status === "included" ? (
                  <div key={feature.title}>
                    <div
                      className={clsx(
                        "flex items-center gap-1 ",
                        feature.availability.pro.status === "none"
                          ? "text-emerald-700 "
                          : "",
                      )}
                    >
                      <i>
                        <PrinterIcon className="w-4 h-4" />
                      </i>
                      <span className={`${subtitlePadding} font-bold`}>
                        {feature.title}
                      </span>
                    </div>
                    <span
                      className={clsx(
                        "flex items-center gap-1 text-xs",
                        feature.availability.pro.status === "none"
                          ? "text-emerald-700 "
                          : "text-gray-500",
                        notePadding,
                      )}
                    >
                      {feature.availability.medici.note}
                    </span>
                  </div>
                ) : null,
              )}
            </div>

            <NavLink
              to={`/bank-connections`}
              className={`text-sm text-[#b33556] font-medium hover:text-[#d94668] transition-colors ${notePadding}`}
            >
              List of banks available for sync
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
