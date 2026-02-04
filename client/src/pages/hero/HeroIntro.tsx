import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { NavLink } from "react-router-dom";

type HeroIntroData = {
  headline?: PortableTextBlock[];
  subheading?: PortableTextBlock[];
  ctaLabel?: string;
  ctaUrl?: string;
  ipadImage?: SanityImageSource;
  phoneImage?: SanityImageSource;
};

const HeroIntro = ({ data }: { data?: HeroIntroData }) => {
  return (
    <section className="bg-[#f9f9f3] dark:bg-black overflow-hidden h-full min-h-[70vh] md:h-full ">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-16">
          {/* LEFT CONTENT */}
          <div className="items-center justify-start flex flex-col text-center">
            <div className="md:text-[3.5rem] lg:text-[5rem] text-4xl font-extrabold leading-[1em] text-gray-900 dark:text-white/80">
              {data?.headline && <PortableText value={data.headline} />}
            </div>

            <div className="mt-6 max-w-md text-sm md:text-base text-gray-600 dark:text-white/80">
              {data?.subheading && <PortableText value={data.subheading} />}
            </div>

            {data?.ctaLabel && data?.ctaUrl && (
              <Button
                variant={"outline"}
                size={"lg"}
                className="mt-10 md:px-10 py-6 md:py-8 rounded-full bg-[#006555] text-white hover:bg-emerald-800 transition uppercase cursor-pointer w-full max-w-110 text-base md:text-lg shadow-2xl font-normal"
              >
                <NavLink to={"/auth"}>{data.ctaLabel}</NavLink>
              </Button>
            )}
          </div>

          {/* RIGHT DEVICES */}
          <div className="relative md:h-130">
            {/* iPad */}
            {data?.ipadImage && (
              <img
                src={urlFor(data.ipadImage).url()}
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
            )}

            {/* iPhone */}
            {data?.phoneImage && (
              <img
                src={urlFor(data.phoneImage).url()}
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
