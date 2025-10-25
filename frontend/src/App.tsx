import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { client } from './utils/apollo';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import EnvironmentDetails from './components/EnvironmentDetails';

const EnvironmentDetailsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <EnvironmentDetails environmentId={id!} />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/service-provider" 
        element={
          <ProtectedRoute requireRole="SERVICE_PROVIDER">
            <ServiceProviderDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/environment/:id" 
        element={
          <ProtectedRoute>
            <EnvironmentDetailsWrapper />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
