import { gql } from '@apollo/client';

export const GET_LIGHTS_BY_ENVIRONMENT = gql`
  query GetLightsByEnvironment($environmentId: ID!) {
    getLightsByEnvironment(environmentId: $environmentId) {
      id
      type
      watts
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_LIGHT = gql`
  mutation CreateLight($environmentId: ID!, $input: CreateLightDto!) {
    createLight(environmentId: $environmentId, input: $input) {
      id
      type
      watts
      createdAt
    }
  }
`;

export const UPDATE_LIGHT = gql`
  mutation UpdateLight($lightId: ID!, $environmentId: ID!, $input: UpdateLightDto!) {
    updateLight(lightId: $lightId, environmentId: $environmentId, input: $input) {
      id
      type
      watts
      updatedAt
    }
  }
`;

export const DELETE_LIGHT = gql`
  mutation DeleteLight($lightId: ID!, $environmentId: ID!) {
    deleteLight(lightId: $lightId, environmentId: $environmentId) {
      id
      type
    }
  }
`;
