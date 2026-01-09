import AppsAccessSection from "./AppsAccessSection";
import DataEntry from "./DataEntry";
import HeroIntro from "./HeroIntro";
import MoneyFlowsPage from "./money-flows";
import TestimonialSection from "./TestimonialSection";

export default function Hero() {
  return (
    <section>
      <HeroIntro />
      <MoneyFlowsPage />
      <AppsAccessSection />
      <DataEntry />
      <TestimonialSection />
    </section>
  );
}
