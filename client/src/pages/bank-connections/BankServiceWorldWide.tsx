import { Input } from "@/components/ui/input";
import {
  useAllBankConnections,
  useBankCount,
  usePopularBankConnections,
} from "@/hooks/bank-connections/useBankConnections";
import { urlFor } from "@/lib/sanity";
import { ChevronDown, Loader2, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const countries = [
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Ireland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Pakistan",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Singapore",
  "Solvakia",
  "Solvenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Multiple Countries",
  "Crypto services",
];

type BankType = {
  _id: string;
  name: string;
  country: string;
  isPopular: boolean;
  logo: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
};

const BankServiceWorldWide = () => {
  const [country, setCountry] = useState("Thailand");
  const [search, setSearch] = useState("");
  const [showAllBanks, setShowAllBanks] = useState(false);

  const {
    data: popularBanks = [],
    isLoading,
    isError,
  } = usePopularBankConnections(country);

  const {
    data: allBanks = [],
    isLoading: allBanksLoading,
    isError: allBanksError,
  } = useAllBankConnections(country);

  const { data: bankCount } = useBankCount();

  const filteredBanks = popularBanks.filter((bank: BankType) =>
    bank.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSetCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCountry(e.target.value);
  };

  const handleShowAllBanks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowAllBanks(!showAllBanks);
  };

  return (
    <section className="relative bg-[#eaf7fb] py-12 min-h-[80vh] flex items-start justify-start overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/world.png"
          alt="world background image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10 ">
        {/* Header */}
        <div className="mb-16 w-full">
          <div>
            <h1 className="flex flex-col lg:flex-row items-center justify-between gap-10 text-6xl font-black text-gray-900">
              <span className="lg:text-8xl">14538</span>
              <span className="font-bold text-4xl">
                bank & financial service connections worldwide
              </span>
            </h1>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mt-12 items-center justify-between">
            <div className="relative lg:w-150 w-full bg-white">
              <Input
                type="text"
                placeholder="Find the financial institution that you want to add"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-6 pr-10 text-sm shadow-sm focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="text-black" />
              </span>
            </div>

            <div className="relative inline-flex items-center justify-between w-full">
              <span className="lg:mr-[10%] mr-[5%] lg:w-40 text-sm lg:text-base font-semibold whitespace-nowrap">
                Popular Banks in
              </span>
              <select
                value={country}
                onChange={handleSetCountry}
                className="rounded-md appearance-none border border-gray-300 px-4 pr-10 py-3 bg-white w-full lg:w-60 text-sm shadow-sm"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-1 text-black"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Banks grid */}
        <div className="bg-white rounded-xl shadow-xl min-h-100 relative px-4 lg:px-0">
          {isLoading ? (
            <div className="flex absolute inset-0 items-center justify-center bg-white/50 z-10 rounded-xl">
              <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-red-500">
              Failed to load banks. Please try again.
            </div>
          ) : (
            <div className="lg:flex lg:flex-wrap lg:gap-8 lg:p-8 grid grid-cols-3 lg:items-center justify-around">
              {filteredBanks.map((bank: BankType) => (
                <div
                  key={bank._id}
                  className="group flex flex-col lg:min-w-50 items-center gap-4 transition-all hover:bg-gray-400/20 cursor-pointer px-4 py-4 rounded-md lg:pb-12  hover:text-[#b33556]"
                >
                  <img
                    src={urlFor(bank.logo).url()}
                    alt={bank.name}
                    className="lg:h-20 lg:w-20 w-10 h-10 object-contain"
                  />
                  <p className="text-sm font-medium text-gray-800 transition-all group-hover:text-[#b33556] text-center">
                    {bank.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pb-6 text-center border-t border-gray-300 mt-4 pt-4">
            <a
              href="#"
              className="text-sm font-semibold text-[#b33556] transition-all hover:text-[#d94668]"
              onClick={handleShowAllBanks}
            >
              Full list of {bankCount} bank connections in {country}
            </a>
          </div>

          {/* Show all banks */}
          <AnimatePresence>
            {showAllBanks && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {allBanksLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
                  </div>
                ) : allBanksError ? (
                  <div className="p-12 text-center text-red-500">
                    Failed to load banks. Please try again.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 px-8 pb-8 pt-4">
                    {allBanks.map((bank: BankType) => (
                      <div
                        key={bank._id}
                        className="flex items-center gap-3 text-sm text-gray-700"
                      >
                        <img
                          src={urlFor(bank.logo).width(32).height(32).url()}
                          alt={bank.name}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="hover:text-[#b33556] cursor-pointer">
                          {bank.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BankServiceWorldWide;
