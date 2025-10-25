import { gql } from '@apollo/client';

export const GET_ENVIRONMENT = gql`
  query GetEnvironment($id: ID!) {
    getEnvironment(id: $id) {
      id
      name
      isIndoor
      width
      height
      depth
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ENVIRONMENT = gql`
  mutation UpdateEnvironment($id: ID!, $input: UpdateEnvironmentDto!) {
    updateEnvironment(id: $id, input: $input) {
      id
      name
      isIndoor
      width
      height
      depth
      updatedAt
    }
  }
`;
