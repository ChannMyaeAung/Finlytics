import Plans from "./Plans";
import Features from "./Features";
import { usePricing } from "@/hooks/pricing/usePricing";
import { urlFor } from "@/lib/sanity";

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
    </section>
  );
};

export default PricingPage;
