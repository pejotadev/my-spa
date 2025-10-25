import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const CHECK_FEATURE = gql`
  query CheckFeature($featureName: String!) {
    isFeatureEnabled(featureName: $featureName)
  }
`;

const GET_MY_FEATURES = gql`
  query GetMyFeatures {
    getMyEnabledFeatures {
      id
      name
      description
      score
      isActive
    }
  }
`;

const GET_MY_SCORE = gql`
  query GetMyScore {
    getMyScore
  }
`;

export const useFeature = (featureName: string) => {
  const { data, loading, error } = useQuery(CHECK_FEATURE, {
    variables: { featureName },
    fetchPolicy: 'cache-first',
  });

  return {
    isEnabled: data?.isFeatureEnabled || false,
    loading,
    error,
  };
};

export const useMyFeatures = () => {
  const { data, loading, error } = useQuery(GET_MY_FEATURES, {
    fetchPolicy: 'cache-first',
  });

  return {
    features: data?.getMyEnabledFeatures || [],
    loading,
    error,
  };
};

export const useMyScore = () => {
  const { data, loading, error } = useQuery(GET_MY_SCORE, {
    fetchPolicy: 'cache-first',
  });

  return {
    score: data?.getMyScore || 0,
    loading,
    error,
  };
};
