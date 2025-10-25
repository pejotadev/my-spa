import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      firstName
      lastName
      role
      createdAt
      updatedAt
    }
  }
`;
