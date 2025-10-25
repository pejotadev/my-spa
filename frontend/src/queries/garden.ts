import { gql } from '@apollo/client';

export const GET_MY_ENVIRONMENTS = gql`
  query GetMyEnvironments {
    getMyEnvironments {
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

export const CREATE_ENVIRONMENT = gql`
  mutation CreateEnvironment($input: CreateEnvironmentDto!) {
    createEnvironment(input: $input) {
      id
      name
      isIndoor
      width
      height
      depth
      createdAt
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

export const DELETE_ENVIRONMENT = gql`
  mutation DeleteEnvironment($id: ID!) {
    deleteEnvironment(id: $id) {
      id
      name
    }
  }
`;
