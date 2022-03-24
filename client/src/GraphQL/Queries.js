import { gql } from '@apollo/client';

export const LOAD_PRODUCTS = gql`
  query {
    products {
      name
      price
      description
      id
    }
  }
`;
