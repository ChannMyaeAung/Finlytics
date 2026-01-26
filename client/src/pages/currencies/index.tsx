import Footer from "@/components/footer";
import CurrencyContents from "./Content";
import CurrencyHero from "./CurrencyHero";

const CurrenciesPage = () => {
  return (
    <section id="Currencies Page">
      <CurrencyHero />
      <CurrencyContents />
      <Footer />
    </section>
  );
};

export default CurrenciesPage;
