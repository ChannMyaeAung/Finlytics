export type PricingPageProps = {
  title: string;
  description: string;
  backgroundImage?: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
  plans: PricingPlan[];
  billingPeriod: BillingPeriod[];
  featureComparison: FeatureComparison;
};

export type PricingPlan = {
  name: string;
  description?: string | null;
  features: string[];
  highlighted: boolean;
};

export type BillingPeriod = {
  label: string;
  pricePerMonth: number;
  billingNote?: string | null;
  savingsText?: string | null;
  highlighted: boolean;
};

export type FeatureAvailability = {
  status: "none" | "limited" | "included" | "unlimited";
  note?: string | null;
};

export type FeatureComparison = {
  title: string;
  plans: Array<{
    key: "free" | "pro" | "medici";
    label: string;
  }>;
  features: Array<{
    title: string;
    description?: string | null;
    availability: {
      free: FeatureAvailability;
      pro: FeatureAvailability;
      medici: FeatureAvailability;
    };
  }>;
};
