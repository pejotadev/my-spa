import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from '../hooks/useAuth';

const GET_MY_ENVIRONMENTS = gql`
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

const CREATE_ENVIRONMENT = gql`
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

const DELETE_ENVIRONMENT = gql`
  mutation DeleteEnvironment($id: ID!) {
    deleteEnvironment(id: $id) {
      id
      name
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

interface CreateEnvironmentInput {
  name: string;
  isIndoor: boolean;
  width: number;
  height: number;
  depth?: number;
}

const GardenManager: React.FC = () => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateEnvironmentInput>({
    name: '',
    isIndoor: true,
    width: 1,
    height: 1,
    depth: undefined,
  });

  const { data, loading, error, refetch } = useQuery(GET_MY_ENVIRONMENTS);
  const [createEnvironment] = useMutation(CREATE_ENVIRONMENT);
  const [updateEnvironment] = useMutation(UPDATE_ENVIRONMENT);
  const [deleteEnvironment] = useMutation(DELETE_ENVIRONMENT);

  const environments: Environment[] = data?.getMyEnvironments || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEnvironment({
        variables: { input: formData },
      });
      setIsCreating(false);
      setFormData({
        name: '',
        isIndoor: true,
        width: 1,
        height: 1,
        depth: undefined,
      });
      refetch();
    } catch (error) {
      console.error('Error creating environment:', error);
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<CreateEnvironmentInput>) => {
    try {
      await updateEnvironment({
        variables: { id, input: updatedData },
      });
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error('Error updating environment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this environment?')) {
      try {
        await deleteEnvironment({
          variables: { id },
        });
        refetch();
      } catch (error) {
        console.error('Error deleting environment:', error);
      }
    }
  };

  const startEdit = (env: Environment) => {
    setEditingId(env.id);
    setFormData({
      name: env.name,
      isIndoor: env.isIndoor,
      width: env.width,
      height: env.height,
      depth: env.depth,
    });
  };

  if (loading) return <div className="text-center py-8">Loading environments...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading environments: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Garden Environments</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Environment
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            {isCreating ? 'Create New Environment' : 'Edit Environment'}
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Environment Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Living Room Garden"
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
                  value={formData.width}
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
                  value={formData.height}
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
                {isCreating ? 'Create Environment' : 'Update Environment'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    isIndoor: true,
                    width: 1,
                    height: 1,
                    depth: undefined,
                  });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Environments List */}
      {environments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No environments yet</h3>
            <p className="text-gray-600 mb-4">Create your first garden environment to get started.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First Environment
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {environments.map((env) => (
            <div key={env.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{env.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(env)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(env.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    env.isIndoor 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {env.isIndoor ? 'Indoor' : 'Outdoor'}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <p><strong>Dimensions:</strong> {env.width}m × {env.depth || env.height}m</p>
                  <p><strong>Height:</strong> {env.height}m</p>
                  <p><strong>Area:</strong> {(env.width * (env.depth || env.height)).toFixed(1)}m²</p>
                  <p><strong>Volume:</strong> {(env.width * (env.depth || env.height) * env.height).toFixed(1)}m³</p>
                </div>

                <div className="text-xs text-gray-500">
                  Created: {new Date(env.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GardenManager;
