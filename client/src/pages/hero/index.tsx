import AppsAccessSection from "./AppsAccessSection";
import HeroIntro from "./HeroIntro";
import MoneyFlowsPage from "./money-flows";

export default function Hero() {
  return (
    <section>
      <HeroIntro />
      <MoneyFlowsPage />
      <AppsAccessSection />
    </section>
  );
}
