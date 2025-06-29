import React, { useState, useRef, useEffect } from 'react';
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
  
  // Ref for notification dropdown and button
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showAlert('Search Results', `Searching for: ${searchQuery}`, 'info');
      // In a real app, this would trigger a search function
    }
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showNotifications]);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'emergency',
      title: 'Emergency Alert',
      message: 'Structure fire reported at Main St.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'resource',
      title: 'Resource Update',
      message: 'Ambulance 5 now available',
      time: '5 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Status',
      message: 'All systems operational',
      time: '10 minutes ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'weather',
      title: 'Weather Alert',
      message: 'Severe thunderstorm warning issued',
      time: '15 minutes ago',
      read: true,
      priority: 'high'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'resource':
        return '🚑';
      case 'system':
        return '⚙️';
      case 'weather':
        return '🌩️';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-crisis-500 bg-crisis-50/50 dark:bg-crisis-900/20';
      case 'medium':
        return 'border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/20';
      case 'low':
        return 'border-l-green-500 bg-green-50/50 dark:bg-green-900/20';
      default:
        return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/20';
    }
  };

  return (
    <>
      <header className="backdrop-blur-xl bg-white/80 dark:bg-dark-bg-primary/80 border-b border-light-border-primary/20 dark:border-dark-border-primary/50 shadow-lg relative transition-all duration-300 z-40">
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
                  ref={notificationButtonRef}
                  onClick={handleNotificationClick}
                  className="relative p-2.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary backdrop-blur-sm bg-light-bg-primary/60 dark:bg-dark-bg-secondary/60 hover:bg-light-bg-primary/80 dark:hover:bg-dark-bg-tertiary/80 rounded-xl border border-light-border-primary/40 dark:border-dark-border-primary/40 transition-all duration-300 hover:shadow-lg group"
                  aria-label="Notifications"
                  aria-expanded={showNotifications}
                  aria-haspopup="true"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-gradient-to-r from-crisis-500 to-crisis-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div 
                    ref={notificationRef}
                    className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] backdrop-blur-xl bg-light-bg-primary/95 dark:bg-dark-bg-primary/95 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
                    role="menu"
                    aria-labelledby="notifications-button"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-light-border-primary/20 dark:border-dark-border-primary/20">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="bg-crisis-100 dark:bg-crisis-900/30 text-crisis-700 dark:text-crisis-300 px-2 py-1 rounded-full text-xs font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-light-bg-secondary/50 dark:hover:bg-dark-bg-secondary/50 border-l-4 transition-colors duration-200 ${getPriorityColor(notification.priority)} ${
                              !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                            }`}
                            role="menuitem"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 text-lg">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-crisis-500 rounded-full flex-shrink-0 ml-2"></div>
                                  )}
                                </div>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="h-12 w-12 text-light-text-tertiary dark:text-dark-text-tertiary mx-auto mb-3 opacity-50" />
                          <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            No notifications
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                      <div className="p-4 border-t border-light-border-primary/20 dark:border-dark-border-primary/20">
                        <div className="flex items-center justify-between">
                          <button 
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                            onClick={() => {
                              showAlert('Mark All Read', 'All notifications marked as read', 'success');
                              setShowNotifications(false);
                            }}
                          >
                            Mark all as read
                          </button>
                          <button 
                            className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary font-medium transition-colors"
                            onClick={() => {
                              showAlert('View All', 'Opening notifications page...', 'info');
                              setShowNotifications(false);
                            }}
                          >
                            View all
                          </button>
                        </div>
                      </div>
                    )}
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