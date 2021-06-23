import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query getProducts($currency: Currency) {
    products {
      id
      title
      image_url
      price(currency: $currency)
    }
  }
`;
