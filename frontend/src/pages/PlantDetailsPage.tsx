import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GetPlantByIdDocument,
  GetPlantHistoryDocument,
  UpdatePlantStageDocument,
  UpdatePlantHistoryDocument,
  DeletePlantHistoryDocument,
  CreatePlantHistoryDocument,
  GetPlantHistoryTypesDocument
} from '../generated/graphql';

const PlantDetailsPage: React.FC = () => {
  const { plantId, environmentId } = useParams<{ plantId: string; environmentId: string }>();
  const navigate = useNavigate();
  
  const [isEditingStage, setIsEditingStage] = useState(false);
  const [isEditingHistory, setIsEditingHistory] = useState<string | null>(null);
  const [isAddingHistory, setIsAddingHistory] = useState(false);
  const nutrientMixesRef = useRef<HTMLDivElement>(null);


  const [stageFormData, setStageFormData] = useState({
    currentStage: '',
  });
  const [historyFormData, setHistoryFormData] = useState({
    stage: '',
    notes: '',
    typeId: '',
    data: '',
  });

  // Render nutrient mixes dynamically
  useEffect(() => {
    if (nutrientMixesRef.current && historyFormData.typeId === 'type4') {
      const currentData = JSON.parse(historyFormData.data || '{}');
      const nutrientMixes = currentData.nutrientMixes || [];
      const applicationMethod = currentData.applicationMethod;

      // Add global functions for nutrient mix manipulation
      (window as any).updateNutrientMix = (index: number, field: string, value: any) => {
        const currentData = JSON.parse(historyFormData.data || '{}');
        const nutrientMixes = [...(currentData.nutrientMixes || [])];
        
        if (field === 'amount') {
          nutrientMixes[index] = { ...nutrientMixes[index], amount: value };
        } else {
          nutrientMixes[index] = { ...nutrientMixes[index], [field]: value };
        }
        
        setHistoryFormData({
          ...historyFormData,
          data: JSON.stringify({ ...currentData, nutrientMixes })
        });
      };

      (window as any).removeNutrientMix = (index: number) => {
        const currentData = JSON.parse(historyFormData.data || '{}');
        const nutrientMixes = [...(currentData.nutrientMixes || [])];
        nutrientMixes.splice(index, 1);
        
        setHistoryFormData({
          ...historyFormData,
          data: JSON.stringify({ ...currentData, nutrientMixes })
        });
      };

      if (nutrientMixesRef.current) {
        nutrientMixesRef.current.innerHTML = '';
        
        nutrientMixes.forEach((mix: any, index: number) => {
          const mixDiv = document.createElement('div');
          mixDiv.className = 'border border-gray-300 rounded-md p-3 bg-gray-50';
          
          mixDiv.innerHTML = `
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-medium text-gray-700">Nutrient Mix ${index + 1}</h4>
              <button type="button" onclick="removeNutrientMix(${index})" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nutrient Name *</label>
                <input type="text" value="${mix.nutrientName || ''}" onchange="updateNutrientMix(${index}, 'nutrientName', this.value)" 
                       class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="e.g., NPK 20-20-20" required />
              </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Solvent Quantity *</label>
              <input type="number" value="${mix.solvent?.quantity || ''}" onchange="updateNutrientMix(${index}, 'solvent', {quantity: this.value, volumeUnit: '${mix.solvent?.volumeUnit || 'L'}'})" 
                     class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="e.g., 1" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Solvent Volume Unit *</label>
              <select onchange="updateNutrientMix(${index}, 'solvent', {quantity: '${mix.solvent?.quantity || ''}', volumeUnit: this.value})" 
                      class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                <option value="ml" ${mix.solvent?.volumeUnit === 'ml' ? 'selected' : ''}>ml</option>
                <option value="L" ${mix.solvent?.volumeUnit === 'L' ? 'selected' : ''}>L</option>
                <option value="gal" ${mix.solvent?.volumeUnit === 'gal' ? 'selected' : ''}>gal</option>
                <option value="qt" ${mix.solvent?.volumeUnit === 'qt' ? 'selected' : ''}>qt</option>
              </select>
            </div>
              ${applicationMethod === 'Solid' ? `
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Weight *</label>
                  <input type="number" value="${mix.amount?.weight || ''}" onchange="updateNutrientMix(${index}, 'amount', {weight: this.value})" 
                         class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="e.g., 5" required />
                </div>
              ` : `
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Quantity *</label>
                  <input type="number" value="${mix.amount?.quantity || ''}" onchange="updateNutrientMix(${index}, 'amount', {quantity: this.value, volumeUnit: '${mix.amount?.volumeUnit || 'ml'}'})" 
                         class="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="e.g., 10" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-1">Volume Unit *</label>
                  <select onchange="updateNutrientMix(${index}, 'amount', {quantity: '${mix.amount?.quantity || ''}', volumeUnit: this.value})" 
                          class="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                    <option value="ml" ${mix.amount?.volumeUnit === 'ml' ? 'selected' : ''}>ml</option>
                    <option value="L" ${mix.amount?.volumeUnit === 'L' ? 'selected' : ''}>L</option>
                    <option value="gal" ${mix.amount?.volumeUnit === 'gal' ? 'selected' : ''}>gal</option>
                    <option value="qt" ${mix.amount?.volumeUnit === 'qt' ? 'selected' : ''}>qt</option>
                  </select>
                </div>
              `}
            </div>
          `;
          
          if (nutrientMixesRef.current) {
            nutrientMixesRef.current.appendChild(mixDiv);
          }
        });
      }
    }
  }, [historyFormData.data, historyFormData.typeId]);

  const { data: plantData, loading: plantLoading, refetch: refetchPlant } = useQuery(GetPlantByIdDocument, {
    variables: { plantId: plantId!, environmentId: environmentId! },
    skip: !plantId || !environmentId,
  });

  const { data: historyData, loading: historyLoading, refetch: refetchHistory } = useQuery(GetPlantHistoryDocument, {
    variables: { plantId: plantId!, environmentId: environmentId! },
    skip: !plantId || !environmentId,
  });

  const { data: historyTypesData } = useQuery(GetPlantHistoryTypesDocument);

  const [updatePlantStage] = useMutation(UpdatePlantStageDocument);
  const [updatePlantHistory] = useMutation(UpdatePlantHistoryDocument);
  const [deletePlantHistory] = useMutation(DeletePlantHistoryDocument);
  const [createPlantHistory] = useMutation(CreatePlantHistoryDocument);

  const plant = plantData?.getPlantById;
  const plantHistory = historyData?.getPlantHistory || [];
  const historyTypes = historyTypesData?.getPlantHistoryTypes || [];

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

  const handleCreateHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!historyFormData.stage || !historyFormData.typeId || !plantId || !environmentId) return;

    try {
      await createPlantHistory({
        variables: {
          plantId,
          environmentId,
          input: {
            stage: historyFormData.stage,
            typeId: historyFormData.typeId,
            notes: historyFormData.notes || undefined,
            data: historyFormData.data || undefined,
          },
        },
      });
      setHistoryFormData({ stage: '', notes: '', typeId: '', data: '' });
      setIsAddingHistory(false);
      refetchHistory();
    } catch (error) {
      console.error('Error creating plant history:', error);
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
      setHistoryFormData({ stage: '', notes: '', typeId: '', data: '' });
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
      typeId: '',
      data: '',
    });
  };

  const cancelEditingHistory = () => {
    setIsEditingHistory(null);
    setHistoryFormData({ stage: '', notes: '', typeId: '', data: '' });
  };

  const startAddingHistory = () => {
    setIsAddingHistory(true);
    setHistoryFormData({
      stage: plant?.currentStage || 'germination',
      notes: '',
      typeId: 'type1', // Default to notes type
      data: '',
    });
  };

  const cancelAddingHistory = () => {
    setIsAddingHistory(false);
    setHistoryFormData({ stage: '', notes: '', typeId: '', data: '' });
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
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Plant History</h3>
            <button
              onClick={startAddingHistory}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              + Add History Entry
            </button>
          </div>
          
          <div className="p-6">
            {/* Add History Form */}
            {isAddingHistory && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Add New History Entry</h4>
                <form onSubmit={handleCreateHistory} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="addStage" className="block text-sm font-medium text-gray-700 mb-2">
                        Stage *
                      </label>
                      <select
                        id="addStage"
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
                      <label htmlFor="addType" className="block text-sm font-medium text-gray-700 mb-2">
                        History Type *
                      </label>
                      <select
                        id="addType"
                        value={historyFormData.typeId}
                        onChange={(e) => setHistoryFormData({ ...historyFormData, typeId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        {historyTypes.map((type: any) => (
                          <option key={type.id} value={type.id}>{type.displayName}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="addNotes" className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <input
                      type="text"
                      id="addNotes"
                      value={historyFormData.notes}
                      onChange={(e) => setHistoryFormData({ ...historyFormData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Optional notes"
                    />
                  </div>
                  {/* Water type specific fields */}
                  {historyFormData.typeId === 'type2' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="addQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          id="addQuantity"
                          step="0.1"
                          onChange={(e) => {
                            const quantity = e.target.value;
                            const volumeUnit = JSON.parse(historyFormData.data || '{}').volumeUnit || 'L';
                            setHistoryFormData({ 
                              ...historyFormData, 
                              data: JSON.stringify({ quantity: parseFloat(quantity), volumeUnit })
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="2.5"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="addVolumeUnit" className="block text-sm font-medium text-gray-700 mb-2">
                          Volume Unit *
                        </label>
                        <select
                          id="addVolumeUnit"
                          onChange={(e) => {
                            const volumeUnit = e.target.value;
                            const quantity = JSON.parse(historyFormData.data || '{}').quantity || 0;
                            setHistoryFormData({ 
                              ...historyFormData, 
                              data: JSON.stringify({ quantity, volumeUnit })
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select unit</option>
                          <option value="L">Liters (L)</option>
                          <option value="ml">Milliliters (ml)</option>
                          <option value="gal">Gallons (gal)</option>
                          <option value="qt">Quarts (qt)</option>
                        </select>
                      </div>
                    </div>
                  )}
                  {/* Pruning type specific fields */}
                  {historyFormData.typeId === 'type3' && (
                    <div>
                      <label htmlFor="addPruningType" className="block text-sm font-medium text-gray-700 mb-2">
                        Pruning Type *
                      </label>
                      <select
                        id="addPruningType"
                        onChange={(e) => {
                          const pruningType = e.target.value;
                          setHistoryFormData({ 
                            ...historyFormData, 
                            data: JSON.stringify({ pruningType })
                          });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      >
                        <option value="">Select pruning type</option>
                        <option value="Topping">Topping</option>
                        <option value="FIM">FIM</option>
                        <option value="LST">LST</option>
                        <option value="Defoliation">Defoliation</option>
                        <option value="Lollipopping">Lollipopping</option>
                        <option value="Super Cropping">Super Cropping</option>
                      </select>
                    </div>
                  )}

                  {/* Nutrients type specific fields */}
                  {historyFormData.typeId === 'type4' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="addApplicationMethod" className="block text-sm font-medium text-gray-700 mb-2">
                          Application Method *
                        </label>
                        <select
                          id="addApplicationMethod"
                          onChange={(e) => {
                            const applicationMethod = e.target.value;
                            const currentData = JSON.parse(historyFormData.data || '{}');
                            setHistoryFormData({ 
                              ...historyFormData, 
                              data: JSON.stringify({ 
                                ...currentData, 
                                applicationMethod,
                                nutrientMixes: currentData.nutrientMixes || []
                              })
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">Select application method</option>
                          <option value="Liquid">Liquid</option>
                          <option value="Spray">Spray</option>
                          <option value="Solid">Solid</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nutrient Mixes *
                        </label>
                        <div ref={nutrientMixesRef} className="space-y-3">
                          {/* Nutrient mixes will be added dynamically */}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const currentData = JSON.parse(historyFormData.data || '{}');
                            const nutrientMixes = currentData.nutrientMixes || [];
                            const applicationMethod = currentData.applicationMethod;
                            
                            let newMix;
                            if (applicationMethod === 'Solid') {
                              newMix = {
                                nutrientName: '',
                                amount: { weight: '' },
                                solvent: { quantity: '', volumeUnit: 'L' }
                              };
                            } else {
                              newMix = {
                                nutrientName: '',
                                amount: { quantity: '', volumeUnit: 'ml' },
                                solvent: { quantity: '', volumeUnit: 'L' }
                              };
                            }
                            
                            setHistoryFormData({ 
                              ...historyFormData, 
                              data: JSON.stringify({ 
                                ...currentData, 
                                nutrientMixes: [...nutrientMixes, newMix]
                              })
                            });
                          }}
                          className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          + Add Nutrient Mix
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={!historyFormData.stage || !historyFormData.typeId}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Add History Entry
                    </button>
                    <button
                      type="button"
                      onClick={cancelAddingHistory}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {historyLoading ? (
              <div className="text-center py-8">Loading history...</div>
            ) : (
              <div className="space-y-4">
                {plantHistory.map((entry: any) => (
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
                            {entry.type && (
                              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                {entry.type.displayName}
                              </span>
                            )}
                          </div>
                          {entry.notes && (
                            <p className="text-sm text-gray-600 mb-2">{entry.notes}</p>
                          )}
                          {entry.data && entry.type?.name === 'water' && (
                            <div className="text-sm text-gray-600 mb-2">
                              {(() => {
                                try {
                                  const data = JSON.parse(entry.data);
                                  return `Watered: ${data.quantity} ${data.volumeUnit}`;
                                } catch {
                                  return entry.data;
                                }
                              })()}
                            </div>
                          )}
                          {entry.data && entry.type?.name === 'pruning' && (
                            <div className="text-sm text-gray-600 mb-2">
                              {(() => {
                                try {
                                  const data = JSON.parse(entry.data);
                                  return `Pruning: ${data.pruningType}`;
                                } catch {
                                  return entry.data;
                                }
                              })()}
                            </div>
                          )}
                          {entry.data && entry.type?.name === 'nutrients' && (
                            <div className="text-sm text-gray-600 mb-2">
                              {(() => {
                                try {
                                  const data = JSON.parse(entry.data);
                                  const method = data.applicationMethod;
                                  const mixes = data.nutrientMixes || [];
                                  const mixDetails = mixes.map((mix: any) => {
                                    const solventText = typeof mix.solvent === 'string' 
                                      ? mix.solvent 
                                      : `${mix.solvent?.quantity || ''}${mix.solvent?.volumeUnit || ''}`;
                                    
                                    if (method === 'Solid') {
                                      return `${mix.nutrientName} (${mix.amount?.weight}g in ${solventText})`;
                                    } else {
                                      return `${mix.nutrientName} (${mix.amount?.quantity}${mix.amount?.volumeUnit} in ${solventText})`;
                                    }
                                  }).join(', ');
                                  return `Nutrients (${method}): ${mixDetails}`;
                                } catch {
                                  return entry.data;
                                }
                              })()}
                            </div>
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
