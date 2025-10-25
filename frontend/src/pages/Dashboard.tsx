import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGetMeQuery } from '../utils/graphql';
import { useFeature } from '../hooks/useFeature';
import Layout from '../components/Layout';
import CustomerBooking from '../components/CustomerBooking';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'booking'>('profile');
  const { data, loading, error } = useGetMeQuery({
    fetchPolicy: 'network-only' // Always fetch fresh data from server
  });
  
  // Check if user has BOOK_SERVICE feature enabled
  const { isEnabled: hasBookService, loading: featureLoading } = useFeature('BOOK_SERVICE');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const currentUser = data?.me || user;

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to your Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            {currentUser?.role === 'CUSTOMER' 
              ? 'Book services or view your profile'
              : 'Manage your account and services'
            }
          </p>
        </div>

        {/* Tab Navigation for Customers */}
        {currentUser?.role === 'CUSTOMER' && (
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
              {/* Only show Book Service tab if user has the feature enabled */}
              {hasBookService && (
                <button
                  onClick={() => setActiveTab('booking')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'booking'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Book Service
                </button>
              )}
            </nav>
          </div>
        )}

        {/* Booking Tab for Customers - Only show if user has BOOK_SERVICE feature */}
        {currentUser?.role === 'CUSTOMER' && activeTab === 'booking' && hasBookService && (
          <CustomerBooking />
        )}

        {/* Feature not available message for customers without BOOK_SERVICE */}
        {currentUser?.role === 'CUSTOMER' && !hasBookService && !featureLoading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Booking Service Not Available
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    The booking service is not available for your account. 
                    Please contact support to enable this feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab or Default Dashboard */}
        {(currentUser?.role !== 'CUSTOMER' || activeTab === 'profile') && (
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{currentUser?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentUser?.role?.replace('_', ' ')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Member Since</label>
                <p className="mt-1 text-sm text-gray-900">
                  {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentUser?.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            {currentUser?.role === 'SERVICE_PROVIDER' && (
              <Link
                to="/service-provider"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
              >
                Manage Categories
              </Link>
            )}
            <div className="bg-gray-100 px-4 py-3 rounded-lg text-center text-gray-600">
              More features coming soon...
            </div>
          </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
