import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        
        <Route path="/project/:id" element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;