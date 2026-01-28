import { Button } from "@/components/ui/button";
import React from "react";

const HeroIntro = () => {
  return (
    <section className="bg-[#f9f9f3] dark:bg-black overflow-hidden h-full min-h-[70vh] md:h-full ">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-16">
          {/* LEFT CONTENT */}
          <div className="items-center flex flex-col text-center">
            <h1 className="md:text-[3.5rem] lg:text-[5rem] text-4xl font-extrabold leading-[1em] text-gray-900 dark:text-white/80">
              Track all
              <br />
              your cards
              <br />
              and cash
              <br />
              <i>in one place.</i>
            </h1>

            <p className="mt-6 max-w-md text-sm md:text-base text-gray-600 dark:text-white/80">
              Connect your financial accounts, or enter expenses using our quick
              and slick <strong>Finlytics apps</strong>. Toshl helps you with
              the financial means. So you can{" "}
              <strong>focus on the goals.</strong>
            </p>

            <Button
              variant={"outline"}
              size={"lg"}
              className="mt-10 px-10 py-8 rounded-full bg-[#006555] text-white font-semibold hover:bg-emerald-800 transition cursor-pointer w-full max-w-110 text-lg shadow-2xl"
            >
              START FREE TRIAL
            </Button>
          </div>

          {/* RIGHT DEVICES */}
          <div className="relative md:h-130">
            {/* iPad */}
            <img
              src="ipad.png"
              alt="iPad dashboard"
              className="
                absolute
                -top-40
                md:top-40
                sm:top-20
                w-[80vw]
                sm:max-w-224.75
                min-w-[449.5px]
                sm:rotate-x-0
                sm:rotate-y-0
                sm:rotate-z-0
                sm:scale-3d
                scale-100
                mt-25
                sm:-mt-24
                md:-mt-50
                -left-38
                sm:left-[4vw]
                md:-left-10
                sm:z-10
                sm:drop-shadow-2xl
              "
            />

            {/* iPhone */}
            <img
              src="phone.png"
              alt="iPhone app"
              className="
                absolute
                top-30
                md:-top-11
                sm:top-[-11%]
                -left-8
                sm:left-1/2
                md:left-25
                lg:left-20
                sm:w-[50vw]
                rotate-x-0
                rotate-y-0
                rotate-z-0
                w-[90vw]
                scale-140
                lg:scale-110
                sm:scale-3d
                z-20
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
