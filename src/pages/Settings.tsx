import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Wifi,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { AlertModal } from '../components/Modal';
import { useAlertModal } from '../hooks/useModal';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    systemUpdates: false,
    maintenanceAlerts: true,
    weeklyReports: true
  });
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'system', name: 'System', icon: Database },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Success', 'Profile settings saved successfully!', 'success');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Success', 'Password updated successfully!', 'success');
  };

  const handleRunDiagnostics = () => {
    showAlert('System Diagnostics', 'Running system diagnostics... This may take a few minutes.', 'info');
  };

  const handleClearCache = () => {
    showAlert('Cache Cleared', 'System cache cleared successfully! (1.2 GB freed)', 'success');
  };

  const handleExportLogs = () => {
    showAlert('Export Started', 'Exporting system logs for the last 30 days...', 'info');
  };

  const handleEnable2FA = () => {
    showAlert('2FA Setup', 'Two-Factor Authentication setup initiated. Please check your email for instructions.', 'info');
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Settings</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Manage your account and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300">
              <div className="p-4 border-b border-light-border-primary dark:border-dark-border-primary">
                <h2 className="font-semibold text-light-text-primary dark:text-dark-text-primary flex items-center space-x-2">
                  <SettingsIcon className="h-5 w-5" />
                  <span>Settings</span>
                </h2>
              </div>
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary border border-transparent'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300">
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">Profile Information</h3>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Emergency"
                          className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Coordinator"
                          className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="coordinator@crisislink.gov"
                        className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Department
                      </label>
                      <select className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300">
                        <option>Emergency Management</option>
                        <option>Fire Department</option>
                        <option>Police Department</option>
                        <option>Medical Services</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue="(555) 911-0000"
                        className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-crisis-600 text-white px-6 py-2 rounded-lg hover:bg-crisis-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">Notification Preferences</h3>
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h4>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {key === 'emergencyAlerts' && 'Receive immediate notifications for emergency situations'}
                            {key === 'systemUpdates' && 'Get notified about system updates and maintenance'}
                            {key === 'maintenanceAlerts' && 'Alerts about scheduled maintenance windows'}
                            {key === 'weeklyReports' && 'Weekly summary reports of emergency activities'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications(prev => ({
                              ...prev,
                              [key]: e.target.checked
                            }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-light-border-primary dark:bg-dark-border-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-crisis-300 dark:peer-focus:ring-crisis-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-light-border-secondary dark:after:border-dark-border-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-crisis-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">Security Settings</h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 pr-10 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5 text-light-text-tertiary dark:text-dark-text-tertiary" /> : <Eye className="h-5 w-5 text-light-text-tertiary dark:text-dark-text-tertiary" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300"
                      />
                    </div>

                    <div className="border-t border-light-border-primary dark:border-dark-border-primary pt-6">
                      <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button 
                          type="button"
                          onClick={handleEnable2FA}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-crisis-600 text-white px-6 py-2 rounded-lg hover:bg-crisis-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-5 w-5" />
                      <span>Update Password</span>
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">System Configuration</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border border-light-border-primary dark:border-dark-border-primary rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Wifi className="h-6 w-6 text-green-600 dark:text-green-400" />
                          <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">Network Status</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Primary Connection</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Online</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Backup Connection</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Standby</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Last Test</span>
                            <span className="text-light-text-primary dark:text-dark-text-primary">2 minutes ago</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-light-border-primary dark:border-dark-border-primary rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary">Database Status</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Primary DB</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Healthy</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Backup DB</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Synced</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-light-text-secondary dark:text-dark-text-secondary">Last Backup</span>
                            <span className="text-light-text-primary dark:text-dark-text-primary">1 hour ago</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-light-border-primary dark:border-dark-border-primary pt-6">
                      <h4 className="font-medium text-light-text-primary dark:text-dark-text-primary mb-4">System Maintenance</h4>
                      <div className="space-y-3">
                        <button 
                          onClick={handleRunDiagnostics}
                          className="w-full text-left p-3 border border-light-border-primary dark:border-dark-border-primary rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Run System Diagnostics</span>
                            <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Last run: 6 hours ago</span>
                          </div>
                        </button>
                        <button 
                          onClick={handleClearCache}
                          className="w-full text-left p-3 border border-light-border-primary dark:border-dark-border-primary rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Clear System Cache</span>
                            <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Size: 1.2 GB</span>
                          </div>
                        </button>
                        <button 
                          onClick={handleExportLogs}
                          className="w-full text-left p-3 border border-light-border-primary dark:border-dark-border-primary rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Export System Logs</span>
                            <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Last 30 days</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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