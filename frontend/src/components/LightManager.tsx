import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  GetLightsByEnvironmentDocument, 
  CreateLightDocument, 
  DeleteLightDocument 
} from '../generated/graphql';

// Using generated queries and mutations from codegen

interface Light {
  id: string;
  type: string;
  watts?: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateLightInput {
  type: string;
  watts?: number;
}

interface LightManagerProps {
  environmentId: string;
}

const LIGHT_TYPES = [
  { value: 'LED', label: 'LED' },
  { value: 'CFL', label: 'Compact Fluorescent Light (CFL)' },
  { value: 'HPS', label: 'High Pressure Sodium (HPS)' },
  { value: 'Metal Halide', label: 'Metal Halide' },
  { value: 'LEC', label: 'LEC' },
  { value: 'T5', label: 'T5' },
  { value: 'Sun', label: 'Sun' },
];

const LightManager: React.FC<LightManagerProps> = ({ environmentId }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateLightInput>({
    type: 'LED',
    watts: undefined,
  });

  const { data, loading, error, refetch } = useQuery(GetLightsByEnvironmentDocument, {
    variables: { environmentId },
  });
  const [createLight] = useMutation(CreateLightDocument);
  // updateLight mutation available but not used in current implementation
  const [deleteLight] = useMutation(DeleteLightDocument);

  const lights: Light[] = data?.getLightsByEnvironment || [];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLight({
        variables: { 
          environmentId, 
          input: formData 
        },
      });
      setIsCreating(false);
      setFormData({
        type: 'LED',
        watts: undefined,
      });
      refetch();
    } catch (error) {
      console.error('Error creating light:', error);
    }
  };

  // handleUpdate function removed as it's not used in the current implementation

  const handleDelete = async (lightId: string) => {
    if (window.confirm('Are you sure you want to delete this light?')) {
      try {
        await deleteLight({
          variables: { lightId, environmentId },
        });
        refetch();
      } catch (error) {
        console.error('Error deleting light:', error);
      }
    }
  };

  const startEdit = (light: Light) => {
    setEditingId(light.id);
    setFormData({
      type: light.type,
      watts: light.watts,
    });
  };

  const isSunType = (type: string) => type === 'Sun';

  if (loading) return <div className="text-center py-8">Loading lights...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error loading lights: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Lights</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Light
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-4">
            {isCreating ? 'Add New Light' : 'Edit Light'}
          </h4>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Light Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {LIGHT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {!isSunType(formData.type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Watts
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.watts || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      watts: e.target.value ? parseFloat(e.target.value) : undefined 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter watts"
                    required={!isSunType(formData.type)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                {isCreating ? 'Add Light' : 'Update Light'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                  setFormData({
                    type: 'LED',
                    watts: undefined,
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

      {/* Lights List */}
      {lights.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" clipRule="evenodd" />
            </svg>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No lights configured</h4>
            <p className="text-gray-600 mb-4">Add lights to your environment to provide proper lighting for your plants.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Your First Light
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lights.map((light) => (
            <div key={light.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-900">{light.type}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(light)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(light.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {!isSunType(light.type) && light.watts && (
                  <div className="text-sm text-gray-600">
                    <p><strong>Power:</strong> {light.watts}W</p>
                  </div>
                )}
                
                {isSunType(light.type) && (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Natural Light
                    </span>
                  </div>
                )}

                <div className="text-xs text-gray-500">
                  Added: {new Date(light.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LightManager;
