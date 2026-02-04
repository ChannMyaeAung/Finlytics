import Plans from "./Plans";
import Features from "./Features";
import { usePricing } from "@/hooks/pricing/usePricing";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const PricingPage = () => {
  const { data, isLoading } = usePricing();
  console.log(data);

  if (isLoading) return null;
  return (
    <section
      className="max-w-7xl mx-auto px-6 py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: data?.backgroundImage
          ? `url(${urlFor(data.backgroundImage).url()})`
          : undefined,
      }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-semibold mb-4">{data?.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{data?.description}</p>
      </div>
      <Plans data={data} />
      <Features data={data} />

      {/* CTA */}
      {data?.cta && (
        <div className="grid grid-cols-2 items-end justify-between relative -bottom-20">
          <div className="">
            <img
              src={data?.cta.Image ? urlFor(data.cta.Image).url() : undefined}
              className="scale-80"
            />
          </div>

          <div className="self-center">
            <h2 className="text-3xl font-extrabold ">{data?.cta.title}</h2>
            <NavLink to={data?.cta.url}>
              <Button
                variant={"ghost"}
                className="text-[#b33556] font-extrabold text-3xl"
              >
                <ArrowRight className="scale-150" />
                {data?.cta.buttonText || "Get Started"}
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingPage;
