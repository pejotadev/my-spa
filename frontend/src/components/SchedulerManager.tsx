import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL Queries and Mutations
const GET_MY_CONFIGURATIONS = gql`
  query GetMyConfigurations {
    getMyConfigurations
  }
`;

const GET_MY_BOOKINGS = gql`
  query GetMyBookings($configurationId: String!, $limit: Float, $pageToken: String) {
    getMyBookings(configurationId: $configurationId, limit: $limit, pageToken: $pageToken)
  }
`;

const GET_AVAILABILITY = gql`
  query GetAvailability($configurationId: String!, $startTime: String!, $endTime: String!, $serviceProviderEmail: String!) {
    getAvailability(configurationId: $configurationId, startTime: $startTime, endTime: $endTime, serviceProviderEmail: $serviceProviderEmail)
  }
`;

const CREATE_CONFIGURATION = gql`
  mutation CreateConfiguration($configurationData: String!) {
    createConfiguration(configurationData: $configurationData)
  }
`;

const UPDATE_CONFIGURATION = gql`
  mutation UpdateConfiguration($configurationId: String!, $configurationData: String!) {
    updateConfiguration(configurationId: $configurationId, configurationData: $configurationData)
  }
`;

const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($bookingId: String!, $configurationId: String!) {
    confirmBooking(bookingId: $bookingId, configurationId: $configurationId)
  }
`;

const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: String!, $configurationId: String!) {
    cancelBooking(bookingId: $bookingId, configurationId: $configurationId)
  }
`;

const DELETE_CONFIGURATION = gql`
  mutation DeleteConfiguration($configurationId: String!) {
    deleteConfiguration(configurationId: $configurationId)
  }
`;

interface Booking {
  id: string;
  status: string;
  start_time: string;
  end_time: string;
  participants: Array<{
    email: string;
    name: string;
  }>;
  meeting_details?: {
    title?: string;
    description?: string;
  };
}

interface Configuration {
  id: string;
  name: string;
  description?: string;
  availability: {
    duration_minutes: number;
    interval_minutes: number;
    round_to: number;
    availability_rules: {
      availability_method: string;
      buffer: {
        before: number;
        after: number;
      };
      default_open_hours: Array<{
        days: number[];
        start: string;
        end: string;
        exdates: string[];
      }>;
    };
  };
}

const SchedulerManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'availability'>('bookings');
  const [selectedConfiguration, setSelectedConfiguration] = useState<string>('');
  const [newConfiguration, setNewConfiguration] = useState({
    name: '',
    description: '',
    duration_minutes: 30,
    interval_minutes: 15,
    round_to: 15,
    availability_method: 'collective',
    buffer_before: 0,
    buffer_after: 0,
    selectedDays: [1, 2, 3, 4, 5], // Monday to Friday by default
    startTime: '09:00',
    endTime: '17:00',
  });

  // Queries
  const { data: configurationsData, loading: configurationsLoading, refetch: refetchConfigurations } = useQuery(GET_MY_CONFIGURATIONS, {
    fetchPolicy: 'network-only'
  });

  const { data: bookingsData, loading: bookingsLoading, refetch: refetchBookings } = useQuery(GET_MY_BOOKINGS, {
    variables: { configurationId: selectedConfiguration, limit: 20 },
    skip: !selectedConfiguration,
    fetchPolicy: 'network-only'
  });

  // Mutations
  const [createConfiguration, { loading: creatingConfiguration }] = useMutation(CREATE_CONFIGURATION, {
    onCompleted: () => {
      setNewConfiguration({
        name: '',
        description: '',
        duration_minutes: 30,
        interval_minutes: 15,
        round_to: 15,
        availability_method: 'collective',
        buffer_before: 0,
        buffer_after: 0,
        selectedDays: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '17:00',
      });
      refetchConfigurations();
    },
    onError: (error) => {
      alert(`Error creating configuration: ${error.message}`);
    },
  });

  const [confirmBooking] = useMutation(CONFIRM_BOOKING, {
    onCompleted: () => {
      refetchBookings();
    },
    onError: (error) => {
      alert(`Error confirming booking: ${error.message}`);
    },
  });

  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    onCompleted: () => {
      refetchBookings();
    },
    onError: (error) => {
      alert(`Error canceling booking: ${error.message}`);
    },
  });

  const [deleteConfiguration] = useMutation(DELETE_CONFIGURATION, {
    onCompleted: () => {
      refetchConfigurations();
      if (selectedConfiguration) {
        setSelectedConfiguration('');
      }
    },
    onError: (error) => {
      alert(`Error deleting configuration: ${error.message}`);
    },
  });

  const configurations: Configuration[] = configurationsData?.getMyConfigurations 
    ? JSON.parse(configurationsData.getMyConfigurations).data || []
    : [];
  const bookings: Booking[] = bookingsData?.getMyBookings 
    ? JSON.parse(bookingsData.getMyBookings).data || []
    : [];

  const handleCreateConfiguration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfiguration.name.trim()) return;
    if (newConfiguration.selectedDays.length === 0) {
      alert('Please select at least one day of the week.');
      return;
    }

    const configurationData = {
      name: newConfiguration.name,
      description: newConfiguration.description,
      participants: [
        {
          email: "pejotabh@gmail.com",
          name: "Service Provider",
          is_organizer: true,
          availability: {
            calendar_ids: ["primary"],
            open_hours: [
              {
                days: newConfiguration.selectedDays,
                start: newConfiguration.startTime,
                end: newConfiguration.endTime,
                exdates: []
              }
            ]
          },
          booking: {
            calendar_id: "primary"
          }
        }
      ],
      availability: {
        duration_minutes: newConfiguration.duration_minutes,
        interval_minutes: newConfiguration.interval_minutes,
        round_to: newConfiguration.round_to,
        availability_rules: {
          availability_method: newConfiguration.availability_method,
          buffer: {
            before: newConfiguration.buffer_before,
            after: newConfiguration.buffer_after
          },
          default_open_hours: [
            {
              days: newConfiguration.selectedDays,
              start: newConfiguration.startTime,
              end: newConfiguration.endTime,
              exdates: []
            }
          ]
        }
      },
      event_booking: {
        title: `Meeting with {{invitee_name}}`,
        description: newConfiguration.description || `Scheduled meeting via ${newConfiguration.name}`,
        location: "",
        booking_type: "booking",
        hide_participants: null,
        disable_emails: null
      }
    };

    try {
      await createConfiguration({
        variables: {
          configurationData: JSON.stringify(configurationData),
        },
      });
    } catch (error) {
      console.error('Error creating configuration:', error);
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to confirm this booking?')) return;

    try {
      await confirmBooking({
        variables: { bookingId, configurationId: selectedConfiguration },
      });
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await cancelBooking({
        variables: { bookingId, configurationId: selectedConfiguration },
      });
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const handleDeleteConfiguration = async (configurationId: string) => {
    if (!confirm('Are you sure you want to delete this configuration? This action cannot be undone.')) return;

    try {
      await deleteConfiguration({
        variables: { configurationId },
      });
    } catch (error) {
      console.error('Error deleting configuration:', error);
    }
  };

  const toggleDay = (day: number) => {
    setNewConfiguration(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day].sort()
    }));
  };

  const getDayName = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Scheduler Management</h1>
        <p className="mt-2 text-gray-600">Manage your bookings and availability settings</p>
      </div>

      {/* Configuration Selection */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Configuration</h2>
        {configurationsLoading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading configurations...</p>
          </div>
        ) : configurations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No configurations found.</p>
            <p className="text-sm text-gray-400 mt-1">Create a configuration below to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {configurations.map((config) => (
              <div
                key={config.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedConfiguration === config.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedConfiguration(config.id)}
              >
                <h3 className="font-medium text-gray-900">{config.name}</h3>
                {config.description && (
                  <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Duration: {config.availability.duration_minutes}min
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'availability'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Availability Settings
          </button>
        </nav>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Bookings</h2>
          {!selectedConfiguration ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Please select a configuration to view bookings.</p>
            </div>
          ) : bookingsLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">
                          {booking.meeting_details?.title || 'Meeting'}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDateTime(booking.start_time)} - {formatDateTime(booking.end_time)}
                      </p>
                      {booking.participants && booking.participants.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          Participants: {booking.participants.map(p => p.name || p.email).join(', ')}
                        </p>
                      )}
                      {booking.meeting_details?.description && (
                        <p className="text-sm text-gray-600 mt-2">{booking.meeting_details.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Availability Tab */}
      {activeTab === 'availability' && (
        <div className="space-y-6">
          {/* Create New Configuration */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Configuration</h2>
            <form onSubmit={handleCreateConfiguration} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="configName" className="block text-sm font-medium text-gray-700">
                    Configuration Name *
                  </label>
                  <input
                    type="text"
                    id="configName"
                    value={newConfiguration.name}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Therapy Sessions"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="configDescription" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    id="configDescription"
                    value={newConfiguration.description}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, description: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Brief description"
                  />
                </div>
              </div>

              {/* Days of Week Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Days *
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                        newConfiguration.selectedDays.includes(day)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {getDayName(day).slice(0, 3)}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {newConfiguration.selectedDays.length === 0 
                    ? 'No days selected' 
                    : newConfiguration.selectedDays.map(day => getDayName(day)).join(', ')
                  }
                </p>
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={newConfiguration.startTime}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, startTime: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                    End Time *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={newConfiguration.endTime}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, endTime: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={newConfiguration.duration_minutes}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, duration_minutes: parseInt(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="15"
                    step="15"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="interval" className="block text-sm font-medium text-gray-700">
                    Interval (minutes) *
                  </label>
                  <input
                    type="number"
                    id="interval"
                    value={newConfiguration.interval_minutes}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, interval_minutes: parseInt(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="5"
                    step="5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="roundTo" className="block text-sm font-medium text-gray-700">
                    Round To (minutes) *
                  </label>
                  <input
                    type="number"
                    id="roundTo"
                    value={newConfiguration.round_to}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, round_to: parseInt(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="5"
                    step="5"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bufferBefore" className="block text-sm font-medium text-gray-700">
                    Buffer Before (minutes)
                  </label>
                  <input
                    type="number"
                    id="bufferBefore"
                    value={newConfiguration.buffer_before}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, buffer_before: parseInt(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="0"
                    step="5"
                  />
                </div>
                <div>
                  <label htmlFor="bufferAfter" className="block text-sm font-medium text-gray-700">
                    Buffer After (minutes)
                  </label>
                  <input
                    type="number"
                    id="bufferAfter"
                    value={newConfiguration.buffer_after}
                    onChange={(e) => setNewConfiguration({ ...newConfiguration, buffer_after: parseInt(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    min="0"
                    step="5"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={creatingConfiguration || !newConfiguration.name.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creatingConfiguration ? 'Creating...' : 'Create Configuration'}
              </button>
            </form>
          </div>

          {/* Existing Configurations */}
          {configurations.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Existing Configurations</h2>
              <div className="space-y-4">
                {configurations.map((config) => (
                  <div key={config.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{config.name}</h3>
                        {config.description && (
                          <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                        )}
                        <div className="mt-2 text-sm text-gray-500">
                          <div>Duration: {config.availability.duration_minutes} minutes</div>
                          <div>Interval: {config.availability.interval_minutes} minutes</div>
                          <div>Round to: {config.availability.round_to} minutes</div>
                          <div>Buffer: {config.availability.availability_rules.buffer.before}min before, {config.availability.availability_rules.buffer.after}min after</div>
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => setSelectedConfiguration(config.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {selectedConfiguration === config.id ? 'Selected' : 'Select'}
                        </button>
                        <button
                          onClick={() => handleDeleteConfiguration(config.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                          title="Delete configuration"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchedulerManager;
