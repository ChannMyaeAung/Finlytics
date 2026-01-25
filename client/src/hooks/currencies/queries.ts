export const CURRENCIES_CONTENT_QUERY = `
*[
  _type == "currencies"
] | order(ContentOrder asc) {
  title,
  Image,
    SecondaryImage,
  description,
    links[]{
      label,
      url
    }
}`;
