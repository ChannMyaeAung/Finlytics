import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { NavLink } from "react-router-dom";

type Badge = {
  store?: string;
  badgeIcon?: SanityImageSource;
  labelImage?: SanityImageSource;
  url?: string;
  caption?: string;
};

type WebButton = {
  provider?: string;
  label?: string;
  icon?: SanityImageSource;
  url?: string;
};

type AppsAccessData = {
  mobileTitle?: string;
  mobileBadges?: Badge[];
  mobileDirectLink?: { label?: string; url?: string };
  webTitle?: string;
  webButtons?: WebButton[];
  webSignupLink?: { label?: string; url?: string };
};

export default function AppsAccessSection({ data }: { data?: AppsAccessData }) {
  return (
    <section className="bg-[#f9f8f4] py-16">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Mobile Apps */}
        <div className="">
          <h3 className="text-lg font-medium tracking-wider text-gray-800 pb-12">
            {data?.mobileTitle}
          </h3>
          <div className="flex items-center flex-col justify-center gap-4 md:flex-row flex-wrap max-w-3xs md:container mx-auto">
            {data?.mobileBadges?.map((b, i) => (
              <div
                key={i}
                className="bg-black px-3 py-1.5 rounded-sm w-[80%] md:w-auto"
              >
                <NavLink
                  to={b.url || "#"}
                  className="flex items-center justify-center w-full"
                >
                  {b.badgeIcon && (
                    <img
                      src={urlFor(b.badgeIcon).url()}
                      alt={`Download on the ${b.store} Store`}
                      className="h-5 mr-1"
                    />
                  )}

                  <div className="flex items-start flex-col">
                    <span className="text-white text-[10px]">{b.caption}</span>
                    {b.labelImage && (
                      <img
                        src={urlFor(b.labelImage).url()}
                        alt="App Store Label"
                        className="h-4"
                      />
                    )}
                  </div>
                </NavLink>
              </div>
            ))}
          </div>

          {data?.mobileDirectLink?.label && (
            <p className="text-sm text-gray-600 my-4">
              or{" "}
              <NavLink
                to={data.mobileDirectLink.url || "#"}
                className="text-[#b33556] text-sm md:text-lg font-normal hover:underline"
              >
                {data.mobileDirectLink.label}
              </NavLink>
            </p>
          )}
        </div>

        {/* Web App */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-wider text-gray-800">
            {data?.webTitle}
          </h3>

          {/* Login with either Apple, Google or Facebook */}
          <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap max-w-3xs md:container mx-auto">
            {data?.webButtons?.map((btn, i) => (
              <NavLink
                to={btn.url || "#"}
                key={i}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-2xl w-auto justify-center ${btn.provider === "apple" ? "bg-black text-white" : btn.provider === "google" ? "bg-white text-gray-800" : btn.provider === "facebook" ? "bg-[#004db3] text-white" : "bg-gray-800"}`}
              >
                {btn.icon && (
                  <img
                    src={urlFor(btn.icon).url()}
                    alt={`${btn.provider} logo`}
                    className="h-4"
                  />
                )}
                {btn.label}
              </NavLink>
            ))}
          </div>

          {data?.webSignupLink?.label && (
            <p className="text-lg text-gray-600">
              or{" "}
              <NavLink
                to={data.webSignupLink.url || "#"}
                className="text-[#b33556] text-sm font-normal hover:underline"
              >
                {data.webSignupLink.label}
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
