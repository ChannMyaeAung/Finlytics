import React from "react";
import BankServiceWorldWide from "./BankServiceWorldWide";
import SetUpFinance from "./SetUpFinance";
import AutoCategorization from "./AutoCategorization";
import Splitting from "./Splitting";
import Security from "./Security";
import HowBankConnectionsWork from "./HowBankConnectionsWork";

const BankConnections = () => {
  return (
    <section id="Bank-Connections">
      <BankServiceWorldWide />
      <SetUpFinance />
      <AutoCategorization />
      <Splitting />
      <Security />
      <HowBankConnectionsWork />
    </section>
  );
};

export default BankConnections;
