import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BoltBadge } from './components/BoltBadge';
import { Dashboard } from './pages/Dashboard';
import { Incidents } from './pages/Incidents';
import { Resources } from './pages/Resources';
import { Communications } from './pages/Communications';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { supabase } from './lib/supabase';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) {
    return (
      <>
        <Login />
        <BoltBadge />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-light-bg-secondary via-blue-50 to-purple-50 dark:from-dark-bg-primary dark:via-blue-900 dark:to-dark-bg-primary transition-all duration-300">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-light-bg-secondary/50 dark:bg-dark-bg-primary/50 transition-colors duration-300">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'incidents' && <Incidents />}
          {currentPage === 'resources' && <Resources />}
          {currentPage === 'communications' && <Communications />}
          {currentPage === 'analytics' && <Analytics />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
      <BoltBadge />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;