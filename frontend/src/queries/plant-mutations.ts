import { gql } from '@apollo/client';

export const UPDATE_PLANT_STAGE = gql`
  mutation UpdatePlantStage($plantId: ID!, $environmentId: ID!, $input: UpdatePlantStageDto!) {
    updatePlantStage(plantId: $plantId, environmentId: $environmentId, input: $input) {
      id
      code
      currentStage
    }
  }
`;

export const UPDATE_PLANT_HISTORY = gql`
  mutation UpdatePlantHistory($historyId: ID!, $plantId: ID!, $environmentId: ID!, $input: UpdatePlantHistoryDto!) {
    updatePlantHistory(historyId: $historyId, plantId: $plantId, environmentId: $environmentId, input: $input) {
      id
      stage
      notes
      createdAt
    }
  }
`;

export const DELETE_PLANT_HISTORY = gql`
  mutation DeletePlantHistory($historyId: ID!, $plantId: ID!, $environmentId: ID!) {
    deletePlantHistory(historyId: $historyId, plantId: $plantId, environmentId: $environmentId)
  }
`;
