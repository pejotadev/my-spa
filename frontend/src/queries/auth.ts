import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      access_token
      user {
        id
        email
        firstName
        lastName
        role
        createdAt
        updatedAt
      }
    }
  }
`;
