import { motion } from "motion/react";
import CurrencyConverter from "./CurrencyConverter";

const CurrencyHero = () => {
  return (
    <div className="bg-[#f4f9f4] py-8 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row md:gap-24 items-center">
        {/* LEFT – PHONES */}
        <motion.div className="relative w-full h-full min-h-90 md:min-h-[50vh] block">
          <motion.img
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            src="/currencies/curr-phone1.png"
            alt="Currency app preview"
            className="drop-shadow-2xl absolute scale-150 md:scale-100 left-4 -bottom-2/3 md:left-1/4 md:-bottom-25 z-20 w-40 sm:w-48 md:w-auto"
          />
          <motion.img
            initial={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            src="/currencies/curr-phone2.png"
            alt="Currency app preview"
            className="drop-shadow-2xl absolute right-10 scale-200 md:scale-100 bottom-0 md:-right-1/9 md:bottom-[18%] z-10 w-36 sm:w-44 md:w-auto"
          />
        </motion.div>

        {/* RIGHT – CONTENT */}
        <div className="relative inline-flex items-center flex-col">
          <img
            src="/currencies/curr-globe.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute md:-top-1/5 md:right-1/4 -top-1/5 scale-50 md:scale-100 z-10"
          />
          <h1 className="font-serif text-3xl md:text-5xl text-center font-black text-gray-900 z-20">
            <span className="md:text-7xl text-5xl">Currencies</span> <br />
            <span className="italic">of the world</span>
          </h1>

          <p className="mt-15 text-base md:text-lg font-normal w-full text-center mx-auto text-gray-900 max-w-md">
            We have <strong className="text-3xl font-medium">305</strong> of
            those in the Toshl apps. Fiat, crypto, precious metals, you name it.
            Only the freshest exchange rates!
          </p>

          <div className="mt-12">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyHero;
