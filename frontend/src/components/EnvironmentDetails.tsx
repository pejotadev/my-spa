import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import LightManager from './LightManager';

const GET_ENVIRONMENT = gql`
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

const UPDATE_ENVIRONMENT = gql`
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

interface Environment {
  id: string;
  name: string;
  isIndoor: boolean;
  width: number;
  height: number;
  depth?: number;
  createdAt: string;
  updatedAt: string;
}

interface UpdateEnvironmentInput {
  name?: string;
  isIndoor?: boolean;
  width?: number;
  height?: number;
  depth?: number;
}

interface EnvironmentDetailsProps {
  environmentId: string;
}

const EnvironmentDetails: React.FC<EnvironmentDetailsProps> = ({ environmentId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'lights'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateEnvironmentInput>({});

  const { data, loading, error, refetch } = useQuery(GET_ENVIRONMENT, {
    variables: { id: environmentId },
  });
  const [updateEnvironment] = useMutation(UPDATE_ENVIRONMENT);

  const environment: Environment | undefined = data?.getEnvironment;

  const handleEdit = () => {
    if (environment) {
      setFormData({
        name: environment.name,
        isIndoor: environment.isIndoor,
        width: environment.width,
        height: environment.height,
        depth: environment.depth,
      });
      setIsEditing(true);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateEnvironment({
        variables: { 
          id: environmentId, 
          input: formData 
        },
      });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Error updating environment:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  if (loading) return <div className="text-center py-8">Loading environment...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading environment: {error.message}</div>;
  if (!environment) return <div className="text-center py-8">Environment not found</div>;

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{environment.name}</h1>
            <p className="text-gray-600">
              {environment.isIndoor ? 'Indoor' : 'Outdoor'} Environment
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Edit Environment
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('lights')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'lights'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Lights
          </button>
        </nav>
      </div>

      {/* Details Tab */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {isEditing ? (
            /* Edit Form */
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Environment</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Environment Name
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={formData.isIndoor ? 'indoor' : 'outdoor'}
                      onChange={(e) => setFormData({ ...formData, isIndoor: e.target.value === 'indoor' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.width || ''}
                      onChange={(e) => setFormData({ ...formData, width: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Depth (meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.depth || ''}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        depth: e.target.value ? parseFloat(e.target.value) : undefined 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (meters)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={formData.height || ''}
                      onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* View Details */
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Environment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{environment.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                      environment.isIndoor 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {environment.isIndoor ? 'Indoor' : 'Outdoor'}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {environment.width}m × {environment.depth || environment.height}m
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Height</label>
                    <p className="mt-1 text-sm text-gray-900">{environment.height}m</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {(environment.width * (environment.depth || environment.height)).toFixed(1)}m²
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Volume</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {(environment.width * (environment.depth || environment.height) * environment.height).toFixed(1)}m³
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <label className="block font-medium text-gray-700">Created</label>
                    <p>{new Date(environment.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700">Last Updated</label>
                    <p>{new Date(environment.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lights Tab */}
      {activeTab === 'lights' && (
        <LightManager environmentId={environmentId} />
      )}
        </div>
      </div>
    </Layout>
  );
};

export default EnvironmentDetails;
