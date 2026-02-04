export const PRICING_FEATURE_COMPARISON_QUERY = `*[_type == "pricing"][0]{
  title,
  description,
  backgroundImage,
  plans[]{
    name,
    description,
    features,
    highlighted
  },
  billingPeriod[]{
    label,
    pricePerMonth,
    billingNote,
    savingsText,
    highlighted
  },
  featureComparison{
    title,
    plans[]{ key, label },
    features[]{
      title,
      description,
      availability{
        free{ status, note },
        pro{ status, note },
        medici{ status, note }
      }
    }
  },
  cta{
    Image,
    title,
    buttonText,
    url
  }
}`;
