export const POPULAR_BANK_CONNECTIONS_QUERY = `
*[
  _type == "bankConnection" &&
  country == $country && isPopular == true
]
| order(popularOrder asc) {
  _id,
  name,
  country,
  isPopular,
  logo
}
`;

export const ALL_BANK_CONNECTIONS_QUERY = `
*[
  _type == "bankConnection" &&
  country == $country
]
| order(listOrder asc) {
  _id,
  name,
  country,
  isPopular,
  logo
}
`;
export const BANK_COUNT_QUERY = `count(*[_type == "bankConnection"])`;
