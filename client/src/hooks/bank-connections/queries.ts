// Queries related to bank connections

// Query to fetch popular bank connections for a given country
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

// Query to fetch bank connection page contents
export const BANK_CONNECTION_CONTENTS_QUERY = `
*[
  _type == "bankConnectionContents"
] | order(ContentOrder asc) {
  title,
  Image,
    SecondaryImage,
  sections[] {
    heading,
    content,
    links[] {
      label,
      url
    }
  }
}
`;
