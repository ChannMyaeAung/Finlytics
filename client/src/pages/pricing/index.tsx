import Plans from "./Plans";
import Features from "./Features";
import { usePricing } from "@/hooks/pricing/usePricing";
import { urlFor } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const PricingPage = () => {
  const { data, isLoading } = usePricing();

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
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-semibold mb-4">{data?.title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{data?.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        <Plans data={data} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Features data={data} />
      </motion.div>

      {/* CTA */}
      {data?.cta && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-2 items-end justify-between relative -bottom-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
          >
            <img
              src={data?.cta.Image ? urlFor(data.cta.Image).url() : undefined}
              className="scale-80"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
            className="self-center"
          >
            <h2 className="text-3xl font-extrabold">{data?.cta.title}</h2>
            <NavLink to={data?.cta.url}>
              <motion.div whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Button
                  variant={"ghost"}
                  className="text-[#b33556] font-extrabold text-3xl"
                >
                  <ArrowRight className="scale-150" />
                  {data?.cta.buttonText || "Get Started"}
                </Button>
              </motion.div>
            </NavLink>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PricingPage;
