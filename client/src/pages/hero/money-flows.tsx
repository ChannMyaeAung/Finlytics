import React, { useState } from "react";

interface TabsType {
  id: string;
  label: string;
  phone: string;
  tablet: string;
  description: string;
}

const TABS: TabsType[] = [
  {
    id: "river",
    label: "River flow",
    phone: "/flows/river-iphone.png",
    tablet: "/flows/river-ipad.png",
    description:
      "Money flows in, but where does it go next? See your financial flows for the current month or over a longer time period. Set up budgets and saving accounts so it doesn't flow away too quickly.",
  },
  {
    id: "monthly",
    label: "Monthly overview",
    phone: "/flows/monthly-iphone.png",
    tablet: "/flows/monthly-ipad.png",
    description:
      "Instantly compare how much you spent to the time already passed in the month. Add your main budget into the mix and you'll know exactly how much you have Left to spend while stacking to your financial goals.",
  },
  {
    id: "planning",
    label: "Planning",
    phone: "/flows/planning-iphone.png",
    tablet: "/flows/planning-ipad.png",
    description:
      "Learn from the past, plan for the future. See your finances across a longer time period. Evaluate your past monthly balances, spending on individual categories and marvel in the growth of your net worth. Hopefully.",
  },
  {
    id: "expenses",
    label: "Expenses",
    phone: "/flows/expenses-iphone.png",
    tablet: "/flows/expenses-ipad.png",
    description:
      "Do you know where your money really goes each month? Break it down by category, tag and discover where your hidden money sinkhole lie.",
  },
  {
    id: "locations",
    label: "Locations",
    phone: "/flows/locations-iphone.png",
    tablet: "/flows/locations-ipad.png",
    description:
      "Put your spending on the map. But just for your eyes. Get the sum of your spending per store, restaurant or bar and find out why those waiters love you so much.",
  },
];

const MoneyFlowsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("river");

  const activeIndex = Math.max(
    TABS.findIndex((tab) => tab.id === activeTab),
    0,
  );

  return (
    <section className="bg-white py-16" role="money-flow">
      <div className="max-w-6xl w-full mx-auto md:px-6 text-center">
        {/* Title */}
        <h2 className="font-serif text-3xl md:text-6xl text-gray-900 font-black">
          Finlytics shows how your
          <br />
          money flows.
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
          <div className="flex w-full justify-center flex-wrap md:gap-6">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "relative py-4 border-0 font-normal uppercase tracking-normal transition-colors cursor-pointer w-full max-w-20 md:max-w-40",
                    isActive && "text-gray-900",
                  ].join(" ")}
                >
                  <span className="text-xs">{tab.label}</span>

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
            {TABS.map((tab) => (
              <div
                key={tab.id}
                className="min-w-full overflow-hidden md:shrink-0 flex flex-col items-center gap-16 "
              >
                <div className="relative h-120 md:h-full w-full flex items-end justify-center gap-12">
                  <img
                    src={tab.phone}
                    alt={`${tab.label} mobile preview`}
                    className="translate-y-4 self-center absolute -left-10 right-0 -top-3 z-20 drop-shadow-xs scale-75 md:scale-100 md:static"
                    loading="lazy"
                  />
                  <img
                    src={tab.tablet}
                    alt={`${tab.label} tablet preview`}
                    className="drop-shadow-xs absolute left-10 z-10 scale-120 md:scale-100 md:static"
                    loading="lazy"
                  />
                </div>
                <div className="w-full max-w-3xl text-center">
                  <p className="mt-6 text-sm md:text-lg font-medium leading-relaxed text-gray-600">
                    {tab.description}
                  </p>
                  <button className="mt-8 text-lg cursor-pointer font-bold text-[#b33556] hover:underline">
                    Find out more
                  </button>
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
