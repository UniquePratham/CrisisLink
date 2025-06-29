import React, { useState } from 'react';
import { Users, Truck, Shield, Zap, Plus, Search, MapPin, Phone, X } from 'lucide-react';
import { Modal, AlertModal } from '../components/Modal';
import { useModal, useAlertModal } from '../hooks/useModal';

const personnel = [
  {
    id: 1,
    name: 'Captain Sarah Johnson',
    role: 'Fire Captain',
    unit: 'Engine 12',
    status: 'Available',
    location: 'Station 12',
    contact: '(555) 123-4567'
  },
  {
    id: 2,
    name: 'Paramedic Mike Chen',
    role: 'Paramedic',
    unit: 'Ambulance 5',
    status: 'On Call',
    location: 'Downtown Hospital',
    contact: '(555) 234-5678'
  },
  {
    id: 3,
    name: 'Officer David Williams',
    role: 'Police Officer',
    unit: 'Patrol 23',
    status: 'Deployed',
    location: 'Highway 101',
    contact: '(555) 345-6789'
  }
];

const equipment = [
  {
    id: 1,
    name: 'Engine 12',
    type: 'Fire Engine',
    status: 'Available',
    location: 'Station 12',
    lastMaintenance: '2024-01-10'
  },
  {
    id: 2,
    name: 'Rescue 8',
    type: 'Rescue Vehicle',
    status: 'In Use',
    location: 'Main Street Fire',
    lastMaintenance: '2024-01-08'
  },
  {
    id: 3,
    name: 'Ambulance 5',
    type: 'Emergency Medical',
    status: 'Available',
    location: 'Hospital Station',
    lastMaintenance: '2024-01-12'
  }
];

export const Resources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personnel');
  const [searchTerm, setSearchTerm] = useState('');
  const [newResource, setNewResource] = useState({
    name: '',
    type: '',
    location: '',
    contact: ''
  });

  const { isOpen: addResourceOpen, openModal: openAddResource, closeModal: closeAddResource } = useModal();
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const tabs = [
    { id: 'personnel', name: 'Personnel', icon: Users, count: personnel.length },
    { id: 'equipment', name: 'Equipment', icon: Truck, count: equipment.length },
    { id: 'stations', name: 'Stations', icon: Shield, count: 8 },
  ];

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Resource Added', `New ${activeTab} added: ${newResource.name}`, 'success');
    closeAddResource();
    setNewResource({ name: '', type: '', location: '', contact: '' });
  };

  const handleContactPerson = (person: any) => {
    showAlert(
      'Contact Information',
      `Contacting ${person.name} at ${person.contact}\n\nRole: ${person.role}\nUnit: ${person.unit}\nLocation: ${person.location}`,
      'info'
    );
  };

  const handleManageEquipment = (equipment: any) => {
    showAlert(
      'Equipment Management',
      `Managing ${equipment.name}\n\nType: ${equipment.type}\nStatus: ${equipment.status}\nLocation: ${equipment.location}\nLast Maintenance: ${equipment.lastMaintenance}`,
      'info'
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Resource Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage personnel, equipment, and stations</p>
            </div>
            <button 
              onClick={openAddResource}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Resource</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-600/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-white/20 dark:border-slate-600/30">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                      <span className="bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-white/20 dark:border-slate-600/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full max-w-md backdrop-blur-sm bg-white/70 dark:bg-slate-700/70 border border-white/40 dark:border-slate-600/40 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'personnel' && (
                <div className="space-y-4">
                  {personnel.map((person) => (
                    <div key={person.id} className="backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/40 dark:border-slate-600/40 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-slate-600/70 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{person.role} - {person.unit}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{person.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="h-4 w-4" />
                                <span>{person.contact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            person.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            person.status === 'On Call' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {person.status}
                          </span>
                          <button 
                            onClick={() => handleContactPerson(person)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-lg transition-colors"
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'equipment' && (
                <div className="space-y-4">
                  {equipment.map((item) => (
                    <div key={item.id} className="backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/40 dark:border-slate-600/40 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-slate-600/70 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <Truck className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.type}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.location}</span>
                              </div>
                              <span>Last maintenance: {item.lastMaintenance}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            item.status === 'In Use' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                            'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                          }`}>
                            {item.status}
                          </span>
                          <button 
                            onClick={() => handleManageEquipment(item)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-lg transition-colors"
                          >
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'stations' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Station Management</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Emergency station details and management would be displayed here.</p>
                  <button 
                    onClick={() => showAlert('Stations', 'Station management interface would be displayed here.', 'info')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    View Stations
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      <Modal isOpen={addResourceOpen} onClose={closeAddResource} title={`Add New ${activeTab}`} size="md">
        <form onSubmit={handleAddResource} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Name
            </label>
            <input
              type="text"
              value={newResource.name}
              onChange={(e) => setNewResource({...newResource, name: e.target.value})}
              placeholder={`Enter ${activeTab} name`}
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              {activeTab === 'personnel' ? 'Role' : 'Type'}
            </label>
            <input
              type="text"
              value={newResource.type}
              onChange={(e) => setNewResource({...newResource, type: e.target.value})}
              placeholder={`Enter ${activeTab === 'personnel' ? 'role' : 'type'}`}
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              value={newResource.location}
              onChange={(e) => setNewResource({...newResource, location: e.target.value})}
              placeholder="Enter location"
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              required
            />
          </div>
          
          {activeTab === 'personnel' && (
            <div>
              <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                Contact
              </label>
              <input
                type="text"
                value={newResource.contact}
                onChange={(e) => setNewResource({...newResource, contact: e.target.value})}
                placeholder="Enter contact information"
                className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              />
            </div>
          )}
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeAddResource}
              className="flex-1 px-4 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-bg-tertiary/80 dark:hover:bg-dark-bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Add {activeTab}
            </button>
          </div>
        </form>
      </Modal>

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