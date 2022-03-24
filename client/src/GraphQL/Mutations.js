import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $price: Float
    $description: String
  ) {
    UpdateProduct(
      id: $id
      name: $name
      price: $price
      description: $description
    ) {
      id
      name
      price
      description
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String, $price: Float, $description: String) {
    CreateProduct(name: $name, price: $price, description: $description) {
      id
      name
      price
      description
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    DeleteProduct(id: $id) {
      id
      name
      price
      description
    }
  }
`;
