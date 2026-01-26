import { motion } from "motion/react";
import CurrencyConverter from "./CurrencyConverter";

const CurrencyHero = () => {
  return (
    <div className="bg-[#f4f9f4] py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        {/* LEFT – PHONES */}
        <motion.div className="relative h-full min-h-[50vh] hidden lg:block">
          <motion.img
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            src="/currencies/curr-phone1.png"
            alt="Currency app preview"
            className="drop-shadow-2xl absolute left-1/4 -bottom-25 z-10"
          />
          <motion.img
            initial={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            src="/currencies/curr-phone2.png"
            alt="Currency app preview"
            className="drop-shadow-2xl absolute -right-1/9 bottom-[18%]"
          />
        </motion.div>

        {/* RIGHT – CONTENT */}
        <div className="relative inline-flex items-center flex-col">
          <img
            src="/currencies/curr-globe.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/5 right-1/4 z-10"
          />
          <h1 className="font-serif text-5xl text-center font-black text-gray-900 z-20">
            <span className="text-7xl">Currencies</span> <br />
            <span className="italic">of the world</span>
          </h1>

          <p className="mt-15 text-lg font-normal w-full text-center mx-auto text-gray-900 max-w-md">
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
