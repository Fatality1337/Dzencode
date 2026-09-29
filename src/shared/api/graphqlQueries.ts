import { gql } from '@apollo/client';
export const ORDERS_QUERY = gql`
  query Orders {
    orders {
      id
      name
      createdAt
      updatedAt
      supplier
      products {
        id
        name
        serialNumber
        type
        status
        price
        currency
        warrantyUntil
        orderId
      }
    }
  }
`;
export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      serialNumber
      type
      status
      price
      currency
      warrantyUntil
      orderId
    }
  }
`;
