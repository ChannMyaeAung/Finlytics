import type { PricingPageProps } from "@/hooks/pricing/types";
import clsx from "clsx";
import { PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const Features = ({ data }: { data?: PricingPageProps }) => {
  const { features } = data?.featureComparison || {};

  const titlePadding = "px-9";
  const subtitlePadding = "px-4 ";
  const notePadding = "px-9 ";

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
      <div className="grid sm:grid-cols-3 gap-12 sm:gap-3">

        {/* Free Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0 }}
        >
          <h1 className={`text-xl font-bold ${titlePadding}`}>
            Free Features
          </h1>

          <div className="space-y-6 my-6">
            {features?.map(
              (feature, i) =>
                feature.availability.free.status === "included" && (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.03 }}
                  >
                    <div className="flex items-center gap-1">
                      <i><PrinterIcon className="w-4 h-4" /></i>
                      <span className={`${subtitlePadding} font-bold`}>
                        {feature.title}
                      </span>
                    </div>
                    <span className={`${notePadding} text-xs text-gray-500`}>
                      {feature.availability.free.note}
                    </span>
                  </motion.div>
                ),
            )}
          </div>
        </motion.div>

        {/* Pro Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          <h1 className={`text-xl font-bold ${titlePadding}`}>
            Pro Features
          </h1>

          {/* Small screens: only unique to Pro Plan */}
          <div className="space-y-6 my-6 sm:hidden">
            {proUnique?.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.03 }}
              >
                <div className="flex items-center gap-1 text-emerald-700">
                  <i><PrinterIcon className="w-4 h-4" /></i>
                  <span className={`${subtitlePadding} font-bold`}>
                    {feature.availability.pro.status === "unlimited" ? "Unlimited " : ""}
                    {feature.title}
                  </span>
                </div>
                <span className={clsx("flex items-center gap-1 text-xs text-emerald-700", notePadding)}>
                  {feature.availability.pro.note}
                </span>
              </motion.div>
            ))}
          </div>

          {/* sm+ screens: show all Pro features */}
          <div className="space-y-6 my-6 hidden sm:block">
            {features?.map((feature, i) =>
              feature.availability.pro.status === "included" ||
              feature.availability.pro.status === "unlimited" ? (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.03 }}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-1",
                      feature.availability.pro.status === "unlimited" ||
                        feature.availability.free.status === "none" ||
                        feature.availability.free.note !== feature.availability.pro.note
                        ? "text-emerald-700"
                        : "",
                    )}
                  >
                    <i><PrinterIcon className="w-4 h-4" /></i>
                    <span className={`${subtitlePadding} font-bold`}>
                      {feature.availability.pro.status === "unlimited" ? "Unlimited " : ""}
                      {feature.title}
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "flex items-center gap-1 text-xs",
                      feature.availability.free.status === "none" ||
                        feature.availability.free.note !== feature.availability.pro.note
                        ? "text-emerald-700"
                        : "text-gray-500",
                      notePadding,
                    )}
                  >
                    {feature.availability.pro.note}
                  </span>
                </motion.div>
              ) : null,
            )}
          </div>
        </motion.div>

        {/* Medici Plan Features */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className={`text-xl font-bold ${titlePadding}`}>
            Medici Features
          </h1>

          {/* Small screens: only unique to Medici */}
          <div className="space-y-6 my-6 sm:hidden">
            {mediciUnique?.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.03 }}
              >
                <div className="flex items-center gap-1 text-emerald-700">
                  <i><PrinterIcon className="w-4 h-4" /></i>
                  <span className={`${subtitlePadding} font-bold`}>
                    {feature.title}
                  </span>
                </div>
                <span className={clsx("flex items-center gap-1 text-xs text-emerald-700", notePadding)}>
                  {feature.availability.pro.note}
                </span>
              </motion.div>
            ))}
          </div>

          {/* sm+ screens: show all Medici features */}
          <div className="space-y-6 my-6 hidden sm:block">
            {features?.map((feature, i) =>
              feature.availability.medici.status === "included" ? (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.03 }}
                >
                  <div
                    className={clsx(
                      "flex items-center gap-1",
                      feature.availability.pro.status === "none" ? "text-emerald-700" : "",
                    )}
                  >
                    <i><PrinterIcon className="w-4 h-4" /></i>
                    <span className={`${subtitlePadding} font-bold`}>
                      {feature.title}
                    </span>
                  </div>
                  <span
                    className={clsx(
                      "flex items-center gap-1 text-xs",
                      feature.availability.pro.status === "none" ? "text-emerald-700" : "text-gray-500",
                      notePadding,
                    )}
                  >
                    {feature.availability.medici.note}
                  </span>
                </motion.div>
              ) : null,
            )}
          </div>

          <NavLink
            to="/bank-connections"
            className={`text-sm text-[#b33556] font-medium hover:text-[#d94668] transition-colors ${notePadding}`}
          >
            List of banks available for sync
          </NavLink>
        </motion.div>

      </div>
    </div>
  );
};

export default Features;
