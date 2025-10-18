import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { 
  useGetUsersQuery,
  useGetCustomersQuery,
  useGetServiceProvidersQuery,
  useCreateUserMutation
} from '../utils/graphql';
import { CreateUserDto, User, UserRole } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'customers' | 'serviceProviders' | 'create'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateUserDto>();
  
  const { data: allUsers, loading: loadingAll, refetch: refetchAll } = useGetUsersQuery();
  const { data: customers, loading: loadingCustomers, refetch: refetchCustomers } = useGetCustomersQuery();
  const { data: serviceProviders, loading: loadingServiceProviders, refetch: refetchServiceProviders } = useGetServiceProvidersQuery();
  
  const [createUser, { loading: creating }] = useCreateUserMutation({
    onCompleted: () => {
      reset();
      setShowCreateForm(false);
      setActiveTab('all');
      refetchAll();
      refetchCustomers();
      refetchServiceProviders();
    },
  });

  const onSubmit = async (data: CreateUserDto) => {
    try {
      await createUser({
        variables: { createUserDto: data }
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.CUSTOMER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.SERVICE_PROVIDER:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderUserList = (users: User[], loading: boolean) => {
    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (!users || users.length === 0) return <div className="text-center py-4 text-gray-500">No users found</div>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <ProtectedRoute requireAdmin>
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage users and system settings</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Users', count: allUsers?.users?.length || 0 },
                { key: 'customers', label: 'Customers', count: customers?.customers?.length || 0 },
                { key: 'serviceProviders', label: 'Service Providers', count: serviceProviders?.serviceProviders?.length || 0 },
                { key: 'create', label: 'Create User' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key as any);
                    setShowCreateForm(tab.key === 'create');
                  }}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.key
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white shadow rounded-lg">
            {activeTab === 'all' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">All Users</h2>
                {renderUserList(allUsers?.users || [], loadingAll)}
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Customers</h2>
                {renderUserList(customers?.customers || [], loadingCustomers)}
              </div>
            )}

            {activeTab === 'serviceProviders' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Service Providers</h2>
                {renderUserList(serviceProviders?.serviceProviders || [], loadingServiceProviders)}
              </div>
            )}

            {activeTab === 'create' && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Create New User</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        {...register('firstName', { required: 'First name is required' })}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        {...register('lastName', { required: 'Last name is required' })}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type="password"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      {...register('role', { required: 'Role is required' })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a role</option>
                      <option value={UserRole.CUSTOMER}>Customer</option>
                      <option value={UserRole.SERVICE_PROVIDER}>Service Provider</option>
                      <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                    {errors.role && (
                      <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('all');
                        setShowCreateForm(false);
                        reset();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {creating ? 'Creating...' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
