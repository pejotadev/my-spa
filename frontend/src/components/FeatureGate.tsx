import React from 'react';
import { useFeature } from '../hooks/useFeature';

interface FeatureGateProps {
  featureName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  featureName,
  children,
  fallback = <div>This feature is not available for your account</div>,
  loading = <div>Loading...</div>,
}) => {
  const { isEnabled, loading: isLoading, error } = useFeature(featureName);

  if (isLoading) return <>{loading}</>;
  if (error) return <div>Error loading feature status</div>;
  if (!isEnabled) return <>{fallback}</>;

  return <>{children}</>;
};

// Exemplo de uso:
export const BookServiceComponent = () => {
  return (
    <FeatureGate
      featureName="BOOK_SERVICE"
      fallback={
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
          <h3 className="text-yellow-800 font-semibold">Feature Not Available</h3>
          <p className="text-yellow-700">
            The booking service is not available for your account. 
            Please contact support to enable this feature.
          </p>
        </div>
      }
    >
      <div className="p-4 bg-green-100 border border-green-400 rounded">
        <h3 className="text-green-800 font-semibold">Book Service Available</h3>
        <p className="text-green-700">
          You can now book appointments with service providers!
        </p>
        {/* Aqui você colocaria o componente de booking real */}
      </div>
    </FeatureGate>
  );
};
