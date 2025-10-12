import React from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import { GenerationProvider } from './context/GenerationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import GenerationsPage from './pages/GenerationsPage';
import ProfilePage from './pages/ProfilePage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import MainLayout from './components/layout/MainLayout';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, loading } = useAuth();
    if (loading) {
        return <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">Loading...</div>;
    }
    if (!session) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};


const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/assets" element={<GenerationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<GenerationsPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GenerationProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </GenerationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;