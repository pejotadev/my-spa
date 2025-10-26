import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GetPlantByIdDocument,
  GetPlantHistoryDocument,
  UpdatePlantStageDocument,
  UpdatePlantHistoryDocument,
  DeletePlantHistoryDocument
} from '../generated/graphql';

const PlantDetailsPage: React.FC = () => {
  const { plantId, environmentId } = useParams<{ plantId: string; environmentId: string }>();
  const navigate = useNavigate();
  
  const [isEditingStage, setIsEditingStage] = useState(false);
  const [isEditingHistory, setIsEditingHistory] = useState<string | null>(null);
  const [stageFormData, setStageFormData] = useState({
    currentStage: '',
  });
  const [historyFormData, setHistoryFormData] = useState({
    stage: '',
    notes: '',
  });

  const { data: plantData, loading: plantLoading, refetch: refetchPlant } = useQuery(GetPlantByIdDocument, {
    variables: { plantId: plantId!, environmentId: environmentId! },
    skip: !plantId || !environmentId,
  });

  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery(GetPlantHistoryDocument, {
    variables: { plantId: plantId!, environmentId: environmentId! },
    skip: !plantId || !environmentId,
  });

  const [updatePlantStage] = useMutation(UpdatePlantStageDocument);
  const [updatePlantHistory] = useMutation(UpdatePlantHistoryDocument);
  const [deletePlantHistory] = useMutation(DeletePlantHistoryDocument);

  const plant = plantData?.getPlantById;
  const plantHistory = historyData?.getPlantHistory || [];

  const plantStages = [
    { value: 'germination', label: 'Germination' },
    { value: 'clone_seedling', label: 'Clone/Seedling' },
    { value: 'vegetative', label: 'Vegetative' },
    { value: 'flowering', label: 'Flowering' },
  ];

  const handleUpdateStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stageFormData.currentStage || !plantId || !environmentId) return;

    try {
      await updatePlantStage({
        variables: {
          plantId,
          environmentId,
          input: {
            currentStage: stageFormData.currentStage,
          },
        },
      });
      setStageFormData({ currentStage: '' });
      setIsEditingStage(false);
      refetchPlant();
      refetchHistory();
    } catch (error) {
      console.error('Error updating plant stage:', error);
    }
  };

  const handleUpdateHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingHistory || !historyFormData.stage || !plantId || !environmentId) return;

    try {
      await updatePlantHistory({
        variables: {
          historyId: isEditingHistory,
          plantId,
          environmentId,
          input: {
            stage: historyFormData.stage,
            notes: historyFormData.notes || undefined,
          },
        },
      });
      setHistoryFormData({ stage: '', notes: '' });
      setIsEditingHistory(null);
      refetchHistory();
    } catch (error) {
      console.error('Error updating plant history:', error);
    }
  };

  const handleDeleteHistory = async (historyId: string) => {
    if (window.confirm('Are you sure you want to delete this history entry?')) {
      try {
        await deletePlantHistory({
          variables: {
            historyId,
            plantId: plantId!,
            environmentId: environmentId!,
          },
        });
        refetchHistory();
      } catch (error) {
        console.error('Error deleting plant history:', error);
      }
    }
  };

  const startEditingHistory = (entry: any) => {
    setIsEditingHistory(entry.id);
    setHistoryFormData({
      stage: entry.stage,
      notes: entry.notes || '',
    });
  };

  const cancelEditingHistory = () => {
    setIsEditingHistory(null);
    setHistoryFormData({ stage: '', notes: '' });
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (plantLoading) return <div className="text-center py-8">Loading...</div>;

  if (!plant) return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plant not found</h1>
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Plant Details</h1>
          <p className="mt-2 text-gray-600">Manage and track your plant's development</p>
        </div>

        {/* Plant Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Plant Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Code:</span>
                <span className="font-medium">{plant.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Genetics:</span>
                <span className="font-medium">{plant.genetics?.name || 'Unknown'}</span>
              </div>
              {plant.description && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium">{plant.description}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Current Stage:</span>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    plant.currentStage === 'germination' ? 'bg-blue-100 text-blue-800' :
                    plant.currentStage === 'clone_seedling' ? 'bg-green-100 text-green-800' :
                    plant.currentStage === 'vegetative' ? 'bg-yellow-100 text-yellow-800' :
                    plant.currentStage === 'flowering' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {plantStages.find(s => s.value === plant.currentStage)?.label || plant.currentStage || 'Not set'}
                  </span>
                  <button
                    onClick={() => {
                      setIsEditingStage(true);
                      setStageFormData({ currentStage: plant.currentStage || '' });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">{new Date(plant.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(plant.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Stage Form */}
        {isEditingStage && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Change Plant Stage</h4>
            <form onSubmit={handleUpdateStage} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="currentStage" className="block text-sm font-medium text-gray-700 mb-2">
                    New Stage *
                  </label>
                  <select
                    id="currentStage"
                    value={stageFormData.currentStage}
                    onChange={(e) => setStageFormData({ currentStage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a stage</option>
                    {plantStages.map(stage => (
                      <option key={stage.value} value={stage.value}>{stage.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!stageFormData.currentStage}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Update Stage
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingStage(false);
                    setStageFormData({ currentStage: '' });
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Plant History */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Plant History</h3>
          </div>
          
          <div className="p-6">
            {historyLoading ? (
              <div className="text-center py-8">Loading history...</div>
            ) : (
              <div className="space-y-4">
                {plantHistory.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                    {isEditingHistory === entry.id ? (
                      <form onSubmit={handleUpdateHistory} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="editStage" className="block text-sm font-medium text-gray-700 mb-2">
                              Stage *
                            </label>
                            <select
                              id="editStage"
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
                            <label htmlFor="editNotes" className="block text-sm font-medium text-gray-700 mb-2">
                              Notes
                            </label>
                            <input
                              type="text"
                              id="editNotes"
                              value={historyFormData.notes}
                              onChange={(e) => setHistoryFormData({ ...historyFormData, notes: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Optional notes"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={cancelEditingHistory}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              entry.stage === 'germination' ? 'bg-blue-100 text-blue-800' :
                              entry.stage === 'clone_seedling' ? 'bg-green-100 text-green-800' :
                              entry.stage === 'vegetative' ? 'bg-yellow-100 text-yellow-800' :
                              entry.stage === 'flowering' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {plantStages.find(s => s.value === entry.stage)?.label || entry.stage}
                            </span>
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-gray-600 mb-2">{entry.notes}</p>
                          )}
                          <p className="text-xs text-gray-400">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditingHistory(entry)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(entry.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {plantHistory.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No history entries yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
