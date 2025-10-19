import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGetMeQuery } from '../utils/graphql';
import Layout from '../components/Layout';
import CustomerBooking from '../components/CustomerBooking';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'booking'>('profile');
  const { data, loading, error } = useGetMeQuery({
    fetchPolicy: 'network-only' // Always fetch fresh data from server
  });

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
            </nav>
          </div>
        )}

        {/* Booking Tab for Customers */}
        {currentUser?.role === 'CUSTOMER' && activeTab === 'booking' && (
          <CustomerBooking />
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
