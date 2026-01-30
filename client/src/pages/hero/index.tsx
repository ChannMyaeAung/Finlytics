import { useHeroPage } from "@/hooks/hero/useHero";
import AppsAccessSection from "./AppsAccessSection";
import DataEntry from "./DataEntry";
import HeroIntro from "./HeroIntro";
import MoneyFlowsPage from "./money-flows";
import TestimonialSection from "./TestimonialSection";

export default function Hero() {
  const { data, isLoading } = useHeroPage();

  if (isLoading) return null;

  return (
    <section>
      <HeroIntro data={data?.heroIntro} />
      <MoneyFlowsPage data={data?.moneyFlows} />
      <AppsAccessSection data={data?.appsAccess} />
      <DataEntry data={data?.dataEntry} />
      <TestimonialSection data={data?.testimonials} />
    </section>
  );
}
