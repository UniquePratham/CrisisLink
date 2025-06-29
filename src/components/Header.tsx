import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Shield, Zap, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { AlertModal } from './Modal';
import { useAlertModal } from '../hooks/useModal';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showAlert('Search Results', `Searching for: ${searchQuery}`, 'info');
      // In a real app, this would trigger a search function
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <header className="backdrop-blur-xl bg-white/80 dark:bg-dark-bg-primary/80 border-b border-light-border-primary/20 dark:border-dark-border-primary/50 shadow-lg relative transition-all duration-300">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/30 dark:from-dark-bg-secondary/50 dark:to-dark-bg-tertiary/30 pointer-events-none"></div>
        
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent">
                    CrisisLink
                  </h1>
                  <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">Connecting Signals. Coordinating Response.</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center backdrop-blur-sm bg-green-50/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse shadow-lg shadow-green-500/50"></div>
                <Zap className="h-3 w-3 mr-1" />
                System Active
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-dark-bg-secondary dark:to-dark-bg-tertiary rounded-xl blur-sm"></div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary h-5 w-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search incidents, resources..."
                    className="pl-10 pr-4 py-2.5 backdrop-blur-sm bg-light-bg-primary/70 dark:bg-dark-bg-secondary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-xl focus:ring-2 focus:ring-crisis-400/50 focus:border-crisis-400/50 w-64 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary shadow-sm transition-all duration-300"
                  />
                </div>
              </form>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary backdrop-blur-sm bg-light-bg-primary/60 dark:bg-dark-bg-secondary/60 hover:bg-light-bg-primary/80 dark:hover:bg-dark-bg-tertiary/80 rounded-xl border border-light-border-primary/40 dark:border-dark-border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 transform group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                  <Moon className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={handleNotificationClick}
                  className="relative p-2.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary backdrop-blur-sm bg-light-bg-primary/60 dark:bg-dark-bg-secondary/60 hover:bg-light-bg-primary/80 dark:hover:bg-dark-bg-tertiary/80 rounded-xl border border-light-border-primary/40 dark:border-dark-border-primary/40 transition-all duration-300 hover:shadow-lg group"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-crisis-500 to-crisis-600 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 backdrop-blur-xl bg-light-bg-primary/90 dark:bg-dark-bg-primary/90 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-xl shadow-xl z-50">
                    <div className="p-4 border-b border-light-border-primary dark:border-dark-border-primary">
                      <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary/50 border-b border-light-border-primary dark:border-dark-border-primary">
                        <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Emergency Alert</p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Structure fire reported at Main St.</p>
                        <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">2 minutes ago</p>
                      </div>
                      <div className="p-3 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary/50 border-b border-light-border-primary dark:border-dark-border-primary">
                        <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Resource Update</p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Ambulance 5 now available</p>
                        <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">5 minutes ago</p>
                      </div>
                      <div className="p-3 hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary/50">
                        <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">System Status</p>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">All systems operational</p>
                        <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 backdrop-blur-sm bg-light-bg-primary/60 dark:bg-dark-bg-secondary/60 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-xl px-3 py-2 shadow-sm">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                    <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                      {user?.email || 'Emergency Coordinator'}
                    </p>
                    <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">Administrator</p>
                  </div>
                </div>
                
                <button
                  onClick={signOut}
                  className="p-2.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-crisis-600 dark:hover:text-crisis-400 backdrop-blur-sm bg-light-bg-primary/60 dark:bg-dark-bg-secondary/60 hover:bg-crisis-50/80 dark:hover:bg-crisis-900/20 rounded-xl border border-light-border-primary/40 dark:border-dark-border-primary/40 transition-all duration-300 hover:shadow-lg group"
                >
                  <LogOut className="h-5 w-5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-crisis-400/10 to-crisis-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={closeAlert}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </>
  );
};