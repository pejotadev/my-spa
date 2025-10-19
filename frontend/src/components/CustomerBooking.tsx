import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// GraphQL Queries
const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
    }
  }
`;

const GET_SERVICE_PROVIDERS_BY_CATEGORY = gql`
  query GetServiceProvidersByCategory($categoryId: String!) {
    getServiceProvidersByCategory(categoryId: $categoryId)
  }
`;

const GET_PROVIDER_CONFIGURATIONS = gql`
  query GetProviderConfigurations($providerEmail: String!) {
    getProviderConfigurations(providerEmail: $providerEmail)
  }
`;

const GET_AVAILABILITY = gql`
  query GetAvailability($configurationId: String!, $startTime: String!, $endTime: String!) {
    getAvailability(configurationId: $configurationId, startTime: $startTime, endTime: $endTime)
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking(
    $configurationId: String!
    $startTime: String!
    $endTime: String!
    $customerEmail: String!
    $customerName: String!
  ) {
    createBooking(
      configurationId: $configurationId
      startTime: $startTime
      endTime: $endTime
      customerEmail: $customerEmail
      customerName: $customerName
    )
  }
`;

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface ServiceProvider {
  id: string;
  serviceProvider: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface Configuration {
  id: string;
  name: string;
  description?: string;
  availability: {
    duration_minutes: number;
    interval_minutes: number;
  };
}

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

const CustomerBooking: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedConfiguration, setSelectedConfiguration] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loadingDates, setLoadingDates] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');
  const [isCreatingBooking, setIsCreatingBooking] = useState<boolean>(false);

  // Queries
  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only'
  });

  const { data: providersData, loading: providersLoading } = useQuery(GET_SERVICE_PROVIDERS_BY_CATEGORY, {
    variables: { categoryId: selectedCategory },
    skip: !selectedCategory,
    fetchPolicy: 'network-only'
  });

  const { data: configurationsData, loading: configurationsLoading } = useQuery(GET_PROVIDER_CONFIGURATIONS, {
    variables: { providerEmail: selectedProvider },
    skip: !selectedProvider,
    fetchPolicy: 'network-only'
  });

  const { data: availabilityData, loading: availabilityLoading } = useQuery(GET_AVAILABILITY, {
    variables: { 
      configurationId: selectedConfiguration,
      startTime: selectedDate ? `${selectedDate}T00:00:00Z` : '',
      endTime: selectedDate ? `${selectedDate}T23:59:59Z` : ''
    },
    skip: !selectedConfiguration || !selectedDate,
    fetchPolicy: 'network-only'
  });

  // Mutations
  const [createBooking, { loading: creatingBooking }] = useMutation(CREATE_BOOKING, {
    onCompleted: (data) => {
      setBookingSuccess(true);
      setIsCreatingBooking(false);
      setBookingError('');
    },
    onError: (error) => {
      setBookingError(error.message);
      setIsCreatingBooking(false);
    },
  });

  const categories: Category[] = categoriesData?.categories || [];
  const providers: ServiceProvider[] = providersData?.getServiceProvidersByCategory 
    ? JSON.parse(providersData.getServiceProvidersByCategory) 
    : [];
  const configurations: Configuration[] = configurationsData?.getProviderConfigurations 
    ? JSON.parse(configurationsData.getProviderConfigurations).data || []
    : [];
  const availability: TimeSlot[] = availabilityData?.getAvailability 
    ? JSON.parse(availabilityData.getAvailability).data?.time_slots?.map((slot: any) => ({
        start: new Date(slot.start_time * 1000).toISOString(),
        end: new Date(slot.end_time * 1000).toISOString(),
        available: true
      })) || []
    : [];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedProvider('');
    setSelectedConfiguration('');
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const handleProviderSelect = (providerEmail: string) => {
    setSelectedProvider(providerEmail);
    setSelectedConfiguration('');
    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const handleConfigurationSelect = async (configurationId: string) => {
    setSelectedConfiguration(configurationId);
    setSelectedDate('');
    setSelectedTimeSlot('');
    
    // Fetch available dates for the next 30 days
    await fetchAvailableDates(configurationId);
  };

  const fetchAvailableDates = async (configurationId: string) => {
    setLoadingDates(true);
    try {
      const dates: string[] = [];
      const today = new Date();
      
      // Check availability for the next 30 days
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() + i);
        const dateStr = checkDate.toISOString().split('T')[0];
        
        // For now, we'll assume all weekdays are available
        // In a real implementation, you'd check actual availability
        if (checkDate.getDay() >= 1 && checkDate.getDay() <= 5) { // Monday to Friday
          dates.push(dateStr);
        }
      }
      
      setAvailableDates(dates);
    } catch (error) {
      console.error('Error fetching available dates:', error);
    } finally {
      setLoadingDates(false);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmBooking = async () => {
    if (!selectedConfiguration || !selectedTimeSlot) return;

    setIsCreatingBooking(true);
    setBookingError('');
    setBookingSuccess(false);

    try {
      // Calculate end time (assuming 30 minutes duration)
      const startTime = new Date(selectedTimeSlot);
      const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

      await createBooking({
        variables: {
          configurationId: selectedConfiguration,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          customerEmail: 'customer@example.com', // In a real app, get from user context
          customerName: 'Customer Name', // In a real app, get from user context
        },
      });
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleResetBooking = () => {
    setSelectedCategory('');
    setSelectedProvider('');
    setSelectedConfiguration('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setAvailableDates([]);
    setBookingSuccess(false);
    setBookingError('');
    setIsCreatingBooking(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
        <p className="mt-2 text-gray-600">Select a category and service provider to book your appointment</p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Category Selection */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Step 1: Choose a Category
          </h2>
          {categoriesLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step 2: Service Provider Selection */}
        {selectedCategory && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step 2: Choose a Service Provider
            </h2>
            {providersLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading service providers...</p>
              </div>
            ) : providers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No service providers available for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider.serviceProvider.email)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedProvider === provider.serviceProvider.email
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">
                      {provider.serviceProvider.firstName} {provider.serviceProvider.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{provider.serviceProvider.email}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Configuration Selection */}
        {selectedProvider && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step 3: Choose Service Type
            </h2>
            {configurationsLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading service types...</p>
              </div>
            ) : configurations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No service types available for this provider.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {configurations.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => handleConfigurationSelect(config.id)}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedConfiguration === config.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{config.name}</h3>
                    {config.description && (
                      <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      Duration: {config.availability.duration_minutes} minutes
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Date Selection */}
        {selectedConfiguration && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step 4: Choose a Date
            </h2>
            {loadingDates ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading available dates...</p>
              </div>
            ) : availableDates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No available dates found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 text-center border rounded-lg transition-colors ${
                      selectedDate === date
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-semibold">
                      {new Date(date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 5: Time Slot Selection */}
        {selectedDate && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Step 5: Choose a Time Slot
            </h2>
            {availabilityLoading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading available times...</p>
              </div>
            ) : availability.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">No available time slots for this date.</p>
                <p className="text-sm text-gray-400 mt-1">Please try a different date.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Available time slots for {formatDate(selectedDate)}
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {availability.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSlotSelect(slot.start)}
                      disabled={!slot.available}
                      className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                        selectedTimeSlot === slot.start
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                          : slot.available
                          ? 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{formatTime(slot.start)}</div>
                        {slot.available && (
                          <div className="text-xs text-green-600 mt-1">Available</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking Summary */}
        {selectedTimeSlot && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h2 className="text-xl font-semibold text-green-900">Ready to Book!</h2>
                <p className="text-sm text-green-700">Review your appointment details below</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium text-gray-900">{formatDate(selectedDate)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Time</div>
                      <div className="font-medium text-gray-900">{formatTime(selectedTimeSlot)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Service</div>
                      <div className="font-medium text-gray-900">{configurations.find(c => c.id === selectedConfiguration)?.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Provider</div>
                      <div className="font-medium text-gray-900">
                        {providers.find(p => p.serviceProvider.email === selectedProvider)?.serviceProvider.firstName} {providers.find(p => p.serviceProvider.email === selectedProvider)?.serviceProvider.lastName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handleConfirmBooking}
                disabled={isCreatingBooking}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
              >
                {isCreatingBooking ? (
                  <>
                    <svg className="inline-block animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Booking...
                  </>
                ) : (
                  <>
                    <svg className="inline-block h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm Booking
                  </>
                )}
              </button>
              <button 
                onClick={() => setSelectedTimeSlot('')}
                disabled={isCreatingBooking}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Time
              </button>
            </div>
          </div>
        )}

        {/* Booking Success */}
        {bookingSuccess && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">Booking Confirmed!</h2>
              <p className="text-green-700 mb-6">
                🎉 Your appointment has been successfully scheduled and added to the service provider's calendar!
              </p>
              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-sm text-gray-500">Date & Time</div>
                    <div className="font-medium text-gray-900">
                      {formatDate(selectedDate)} at {formatTime(selectedTimeSlot)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Service</div>
                    <div className="font-medium text-gray-900">
                      {configurations.find(c => c.id === selectedConfiguration)?.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 justify-center">
                <button 
                  onClick={handleResetBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Book Another Service
                </button>
                <button 
                  onClick={() => window.print()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Print Confirmation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Error */}
        {bookingError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-900">Booking Failed</h3>
                <p className="text-red-700 mt-1">{bookingError}</p>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => setBookingError('')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerBooking;
