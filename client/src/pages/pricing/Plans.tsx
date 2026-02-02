import type { PricingPageProps } from "@/hooks/pricing/types";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const Plans = ({ data }: { data?: PricingPageProps }) => {
  const [selectedPlan, setSelectedPlan] = useState(
    data?.plans.find((p) => p.highlighted) || data?.plans[0],
  );

  const [selectedBilling, setSelectedBilling] = useState(
    data?.billingPeriod.find((b) => b.highlighted) || data?.billingPeriod[0],
  );

  return (
    <div className="mb-20">
      <h2 className="text-center font-semibold md:font-normal text-xl md:text-lg mb-8">
        Choose your plan
      </h2>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-12 ">
        {data?.plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => setSelectedPlan(plan)}
            className={clsx(
              "border relative rounded-sm px-8 py-4 text-center transition bg-[#f3fbff]",
              selectedPlan?.name === plan.name
                ? "border-emerald-800 shadow-lg border-4"
                : "border-gray-200",
            )}
          >
            <h3 className="text-2xl md:text-4xl font-extrabold mb-4">
              {plan.name}
            </h3>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature} className="text-sm text-gray-500">
                  {feature}
                </li>
              ))}
            </ul>

            {selectedPlan?.name === plan.name && (
              <motion.span
                initial={{ opacity: 0, translateY: 6 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-2 right-1"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-emerald-800"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M4 13l5 5L20 7"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </motion.svg>
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Billing period */}
      <div>
        <h3 className="text-center font-semibold md:font-normal text-xl md:text-lg mb-8">
          Choose a time period
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {data?.billingPeriod.map((p) => (
            <div
              key={p.label}
              onClick={() => setSelectedBilling(p)}
              className={clsx(
                "border relative rounded-sm px-8 py-4 text-center transition bg-[#f3fbff]",
                selectedBilling?.label === p.label
                  ? "border-emerald-800 shadow-lg border-4"
                  : "border-gray-200",
              )}
            >
              <p className="text-sm text-gray-500 mb-2">
                ${p.pricePerMonth} PER MONTH
              </p>

              <h4 className="font-extrabold text-3xl md:text-4xl">{p.label}</h4>

              <p className="text-xs text-gray-500 my-2">{p.billingNote}</p>

              {p.savingsText && <p className=" font-medium">{p.savingsText}</p>}

              {selectedBilling?.label === p.label && (
                <motion.span
                  initial={{ opacity: 0, translateY: 6 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-2 right-1"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 text-emerald-800"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M4 13l5 5L20 7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />
                  </motion.svg>
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Button className="bg-emerald-800 hover:bg-emerald-900 text-white p-8 rounded-full text-sm w-full font-medium max-w-sm">
          GET FINLYTICS MEDICI
        </Button>
      </div>
    </div>
  );
};

export default Plans;
