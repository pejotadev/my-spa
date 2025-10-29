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

export const UPDATE_HARVEST_STAGE = gql`
  mutation UpdateHarvestStage($harvestId: ID!, $input: UpdateHarvestStageDto!) {
    updateHarvestStage(harvestId: $harvestId, input: $input) {
      id
      stage
      harvestDate
      plant {
        id
        code
        genetics {
          name
        }
      }
      history {
        id
        harvestId
        stage
        typeId
        notes
        data
        createdAt
        type {
          id
          name
          displayName
          fields
        }
      }
    }
  }
`;

export const DELETE_PLANT_HISTORY = gql`
  mutation DeletePlantHistory($historyId: ID!, $plantId: ID!, $environmentId: ID!) {
    deletePlantHistory(historyId: $historyId, plantId: $plantId, environmentId: $environmentId)
  }
`;
