import { gql } from '@apollo/client';

export const GET_PLANTS_BY_ENVIRONMENT = gql`
  query GetPlantsByEnvironment($environmentId: ID!) {
    getPlantsByEnvironment(environmentId: $environmentId) {
      id
      code
      description
      geneticsId
      environmentId
      currentStage
      createdAt
      updatedAt
      genetics {
        id
        name
        description
      }
    }
  }
`;

export const GET_PLANT_BY_ID = gql`
  query GetPlantById($plantId: ID!, $environmentId: ID!) {
    getPlantById(plantId: $plantId, environmentId: $environmentId) {
      id
      code
      description
      geneticsId
      environmentId
      currentStage
      createdAt
      updatedAt
      genetics {
        id
        name
        description
      }
    }
  }
`;

export const CREATE_PLANT = gql`
  mutation CreatePlant($environmentId: ID!, $input: CreatePlantDto!) {
    createPlant(environmentId: $environmentId, input: $input) {
      id
      code
      description
      geneticsId
      environmentId
      createdAt
      genetics {
        id
        name
        description
      }
    }
  }
`;

export const UPDATE_PLANT = gql`
  mutation UpdatePlant($plantId: ID!, $environmentId: ID!, $input: UpdatePlantDto!) {
    updatePlant(plantId: $plantId, environmentId: $environmentId, input: $input) {
      id
      code
      description
      geneticsId
      environmentId
      updatedAt
      genetics {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_PLANT = gql`
  mutation DeletePlant($plantId: ID!, $environmentId: ID!) {
    deletePlant(plantId: $plantId, environmentId: $environmentId) {
      id
    }
  }
`;

export const GET_ALL_GENETICS = gql`
  query GetAllGenetics {
    getAllGenetics {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_GENETICS = gql`
  mutation CreateGenetics($input: CreateGeneticsDto!) {
    createGenetics(input: $input) {
      id
      name
      description
      createdAt
    }
  }
`;

export const GET_PLANT_HISTORY = gql`
  query GetPlantHistory($plantId: ID!, $environmentId: ID!) {
    getPlantHistory(plantId: $plantId, environmentId: $environmentId) {
      id
      plantId
      stage
      notes
      createdAt
    }
  }
`;

export const CREATE_PLANT_HISTORY = gql`
  mutation CreatePlantHistory($plantId: ID!, $environmentId: ID!, $input: CreatePlantHistoryDto!) {
    createPlantHistory(plantId: $plantId, environmentId: $environmentId, input: $input) {
      id
      plantId
      stage
      notes
      createdAt
    }
  }
`;
