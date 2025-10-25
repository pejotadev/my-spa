import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useAuth } from './useAuth';

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
  const { user } = useAuth();
  
  // Temporary solution: hardcode feature access based on user email
  // This will be replaced with proper GraphQL queries once the schema is fixed
  const isEnabled = user?.email === 'ocaradorune@hotmail.com' && (featureName === 'BOOK_SERVICE' || featureName === 'GARDEN');
  
  return {
    isEnabled,
    loading: false,
    error: null,
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
