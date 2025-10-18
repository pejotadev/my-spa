import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

// GraphQL Queries and Mutations
const GET_MY_CATEGORIES = gql`
  query GetMyCategories {
    myCategories {
      id
      name
      description
      createdAt
    }
  }
`;

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      id
      name
      description
    }
  }
`;

const ADD_CATEGORY_TO_ME = gql`
  mutation AddCategoryToMe($addCategoryDto: AddCategoryToProviderDto!) {
    addCategoryToMe(addCategoryDto: $addCategoryDto) {
      id
      category {
        id
        name
        description
      }
      createdAt
    }
  }
`;

const REMOVE_CATEGORY_FROM_ME = gql`
  mutation RemoveCategoryFromMe($categoryId: String!) {
    removeCategoryFromMe(categoryId: $categoryId) {
      id
      category {
        id
        name
        description
      }
    }
  }
`;

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

interface ServiceProviderCategory {
  id: string;
  category: Category;
  createdAt: string;
}

const ServiceProviderDashboard: React.FC = () => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  // Queries
  const { data: myCategoriesData, loading: myCategoriesLoading, refetch: refetchMyCategories } = useQuery(GET_MY_CATEGORIES, {
    fetchPolicy: 'network-only' // Always fetch fresh data from server
  });
  const { data: allCategoriesData, loading: allCategoriesLoading } = useQuery(GET_ALL_CATEGORIES, {
    fetchPolicy: 'network-only' // Always fetch fresh data from server
  });

  // Mutations
  const [addCategoryToMe, { loading: addingCategory }] = useMutation(ADD_CATEGORY_TO_ME, {
    onCompleted: () => {
      setNewCategoryName('');
      setNewCategoryDescription('');
      refetchMyCategories();
    },
    onError: (error) => {
      alert(`Error adding category: ${error.message}`);
    },
  });

  const [removeCategoryFromMe, { loading: removingCategory }] = useMutation(REMOVE_CATEGORY_FROM_ME, {
    onCompleted: () => {
      refetchMyCategories();
    },
    onError: (error) => {
      alert(`Error removing category: ${error.message}`);
    },
  });

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      await addCategoryToMe({
        variables: {
          addCategoryDto: {
            categoryName: newCategoryName.trim(),
            description: newCategoryDescription.trim() || undefined,
          },
        },
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleRemoveCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to remove this category?')) return;

    try {
      await removeCategoryFromMe({
        variables: { categoryId },
      });
    } catch (error) {
      console.error('Error removing category:', error);
    }
  };

  const myCategories = myCategoriesData?.myCategories || [];
  const allCategories = allCategoriesData?.categories || [];

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Provider Dashboard</h1>
              <p className="mt-2 text-gray-600">Manage your service categories</p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Add New Category Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                Category Name *
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Therapy, Fitness, Education"
                required
              />
            </div>
            <div>
              <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="categoryDescription"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief description of this category"
              />
            </div>
            <button
              type="submit"
              disabled={addingCategory || !newCategoryName.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingCategory ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>

        {/* My Categories */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Categories</h2>
          {myCategoriesLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading your categories...</p>
            </div>
          ) : myCategories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">You haven't added any categories yet.</p>
              <p className="text-sm text-gray-400 mt-1">Add a category above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myCategories.map((category: Category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      disabled={removingCategory}
                      className="ml-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="Remove category"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Available Categories */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Categories</h2>
          {allCategoriesLoading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading available categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCategories.map((category: Category) => {
                const isMyCategory = myCategories.some((myCat: Category) => myCat.id === category.id);
                return (
                  <div
                    key={category.id}
                    className={`border rounded-lg p-4 ${
                      isMyCategory
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:shadow-md transition-shadow'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        )}
                      </div>
                      {isMyCategory && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Added
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServiceProviderDashboard;
