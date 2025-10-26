import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { 
  GetPlantsByEnvironmentDocument, 
  CreatePlantDocument, 
  DeletePlantDocument,
  GetAllGeneticsDocument,
  CreateGeneticsDocument,
  GetPlantHistoryDocument,
  CreatePlantHistoryDocument
} from '../generated/graphql';

interface Plant {
  id: string;
  code: string;
  description?: string;
  geneticsId: string;
  environmentId: string;
  currentStage?: string;
  createdAt: Date;
  updatedAt: Date;
  genetics?: {
    id: string;
    name: string;
    description?: string;
  };
}

interface Genetics {
  id: string;
  name: string;
  description?: string;
}

interface PlantHistory {
  id: string;
  plantId: string;
  stage: string;
  notes?: string;
  createdAt: Date;
}

interface PlantManagerProps {
  environmentId: string;
}

const PlantManager: React.FC<PlantManagerProps> = ({ environmentId }) => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  // editingId removed as it's not used in current implementation
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  // newGeneticsName removed as it's not used in current implementation
  const [formData, setFormData] = useState({
    description: '',
    geneticsId: '',
  });
  const [customGeneticsName, setCustomGeneticsName] = useState('');
  const [showGeneticsModal, setShowGeneticsModal] = useState(false);
  const [pendingGeneticsName, setPendingGeneticsName] = useState('');
  const [historyFormData, setHistoryFormData] = useState({
    stage: 'germination',
    notes: '',
  });

  const { data: plantsData, loading: plantsLoading, error: plantsError, refetch: refetchPlants } = useQuery(GetPlantsByEnvironmentDocument, {
    variables: { environmentId },
  });

  const { data: geneticsData, loading: geneticsLoading, refetch: refetchGenetics } = useQuery(GetAllGeneticsDocument);

  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery(GetPlantHistoryDocument, {
    variables: { 
      plantId: selectedPlantId || '', 
      environmentId 
    },
    skip: !selectedPlantId,
  });

  const [createPlant] = useMutation(CreatePlantDocument);
  // updatePlant mutation available but not used in current implementation
  const [deletePlant] = useMutation(DeletePlantDocument);
  const [createGenetics] = useMutation(CreateGeneticsDocument);
  const [createPlantHistory] = useMutation(CreatePlantHistoryDocument);

  const plants: Plant[] = plantsData?.getPlantsByEnvironment || [];
  const genetics: Genetics[] = geneticsData?.getAllGenetics || [];
  const plantHistory: PlantHistory[] = historyData?.getPlantHistory || [];

  const plantStages = [
    { value: 'germination', label: 'Germination' },
    { value: 'clone_seedling', label: 'Clone/Seedling' },
    { value: 'vegetative', label: 'Vegetative' },
    { value: 'flowering', label: 'Flowering' },
  ];

  const handleCreatePlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.geneticsId) return;

    try {
      await createPlant({
        variables: {
          environmentId,
          input: {
            description: formData.description || undefined,
            geneticsId: formData.geneticsId,
          },
        },
      });
      setFormData({ description: '', geneticsId: '' });
      setCustomGeneticsName('');
      setIsCreating(false);
      refetchPlants();
    } catch (error) {
      console.error('Error creating plant:', error);
    }
  };

  const handleCreateGeneticsFromModal = async () => {
    if (!pendingGeneticsName) return;

    try {
      const result = await createGenetics({
        variables: {
          input: {
            name: pendingGeneticsName,
          },
        },
      });
      if (result.data?.createGenetics) {
        setFormData({ ...formData, geneticsId: result.data.createGenetics.id });
        setCustomGeneticsName('');
        setShowGeneticsModal(false);
        setPendingGeneticsName('');
        refetchGenetics();
      }
    } catch (error) {
      console.error('Error creating genetics:', error);
    }
  };

  const handleCreateHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlantId || !historyFormData.stage) return;

    try {
      await createPlantHistory({
        variables: {
          plantId: selectedPlantId,
          environmentId,
          input: {
            stage: historyFormData.stage,
            notes: historyFormData.notes || undefined,
          },
        },
      });
      setHistoryFormData({ stage: 'germination', notes: '' });
      refetchHistory();
    } catch (error) {
      console.error('Error creating plant history:', error);
    }
  };

  const handleDeletePlant = async (plantId: string) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await deletePlant({
          variables: { plantId, environmentId },
        });
        refetchPlants();
        if (selectedPlantId === plantId) {
          setSelectedPlantId(null);
        }
      } catch (error) {
        console.error('Error deleting plant:', error);
      }
    }
  };

  if (plantsLoading || geneticsLoading) return <div className="text-center py-4">Loading...</div>;
  if (plantsError) return <div className="text-center py-4 text-red-600">Error: {plantsError.message}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Plants Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Each plant gets a unique code (e.g., A001, B002) for batch tracking
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Plant
        </button>
      </div>

      {/* Create Plant Form */}
      {isCreating && (
        <form onSubmit={handleCreatePlant} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Plant</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genetics (Plant Name) *
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select
                    value={formData.geneticsId ? 
                      genetics.find(g => g.id === formData.geneticsId) ? 
                        { value: formData.geneticsId, label: genetics.find(g => g.id === formData.geneticsId)?.name || '' } : 
                        null : 
                      (customGeneticsName ? { value: 'custom', label: customGeneticsName } : null)
                    }
                    onChange={(option) => {
                      if (option?.value) {
                        setFormData({ ...formData, geneticsId: option.value });
                        setCustomGeneticsName('');
                      } else {
                        setFormData({ ...formData, geneticsId: '' });
                        setCustomGeneticsName('');
                      }
                    }}
                    onInputChange={(inputValue) => {
                      setCustomGeneticsName(inputValue);
                      // Se não encontrar a genética digitada, limpar o geneticsId
                      if (!genetics.find(g => g.name.toLowerCase() === inputValue.toLowerCase())) {
                        setFormData({ ...formData, geneticsId: '' });
                      }
                    }}
                    onBlur={() => {
                      // Se tem um nome digitado mas não é uma genética existente, mostrar modal
                      if (customGeneticsName && !genetics.find(g => g.name.toLowerCase() === customGeneticsName.toLowerCase()) && !formData.geneticsId) {
                        setPendingGeneticsName(customGeneticsName);
                        setShowGeneticsModal(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      // Se pressionar Enter e tem um nome digitado mas não é uma genética existente, mostrar modal
                      if (e.key === 'Enter' && customGeneticsName && !genetics.find(g => g.name.toLowerCase() === customGeneticsName.toLowerCase()) && !formData.geneticsId) {
                        e.preventDefault();
                        setPendingGeneticsName(customGeneticsName);
                        setShowGeneticsModal(true);
                      }
                    }}
                    options={genetics.map(genetic => ({
                      value: genetic.id,
                      label: genetic.name
                    }))}
                    placeholder="Search genetics or type new name..."
                    isSearchable
                    isClearable
                    noOptionsMessage={() => "Type a new genetics name"}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '38px',
                        borderColor: '#d1d5db',
                        '&:hover': {
                          borderColor: '#9ca3af'
                        }
                      })
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="plantDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="plantDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Optional description"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              disabled={!formData.geneticsId && !customGeneticsName}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Create Plant
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}


      {/* Plants List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {plants.map((plant) => (
          <div key={plant.id} className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {plant.code}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">{plant.genetics?.name || 'Unknown Genetics'}</h3>
                </div>
                {plant.currentStage && (
                  <div className="mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      plant.currentStage === 'germination' ? 'bg-blue-100 text-blue-800' :
                      plant.currentStage === 'clone_seedling' ? 'bg-green-100 text-green-800' :
                      plant.currentStage === 'vegetative' ? 'bg-yellow-100 text-yellow-800' :
                      plant.currentStage === 'flowering' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {plantStages.find(s => s.value === plant.currentStage)?.label || plant.currentStage}
                    </span>
                  </div>
                )}
                {plant.description && (
                  <p className="text-sm text-gray-600 mt-1">{plant.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(plant.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/plant/${environmentId}/${plant.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => setSelectedPlantId(plant.id)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Quick History
                </button>
                <button
                  onClick={() => handleDeletePlant(plant.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plants.length === 0 && (
        <p className="text-gray-600 text-center py-8">No plants added to this environment yet.</p>
      )}

      {/* Plant History Section */}
      {selectedPlantId && (
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Plant History</h3>
            <button
              onClick={() => setSelectedPlantId(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>

          {/* Add History Form */}
          <form onSubmit={handleCreateHistory} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h4 className="text-md font-medium text-gray-800 mb-3">Add History Entry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                  Stage *
                </label>
                <select
                  id="stage"
                  value={historyFormData.stage}
                  onChange={(e) => setHistoryFormData({ ...historyFormData, stage: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  {plantStages.map(stage => (
                    <option key={stage.value} value={stage.value}>{stage.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  id="notes"
                  value={historyFormData.notes}
                  onChange={(e) => setHistoryFormData({ ...historyFormData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add History Entry
            </button>
          </form>

          {/* History List */}
          {historyLoading ? (
            <div className="text-center py-4">Loading history...</div>
          ) : (
            <div className="space-y-3">
              {plantHistory.map((entry) => (
                <div key={entry.id} className="bg-white border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {plantStages.find(s => s.value === entry.stage)?.label || entry.stage}
                      </p>
                      {entry.notes && (
                        <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {plantHistory.length === 0 && (
                <p className="text-gray-600 text-center py-4">No history entries yet.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Genetics Creation Modal */}
      {showGeneticsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Genetics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Do you want to create a new genetics called "<strong>{pendingGeneticsName}</strong>"?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCreateGeneticsFromModal}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Genetics
              </button>
              <button
                onClick={() => {
                  setShowGeneticsModal(false);
                  setPendingGeneticsName('');
                  setCustomGeneticsName('');
                }}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantManager;

