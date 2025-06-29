import React, { useState } from 'react';
import { Plus, Filter, Search, MapPin, Clock, Users, AlertTriangle, X } from 'lucide-react';
import { Modal, AlertModal } from '../components/Modal';
import { useModal, useAlertModal } from '../hooks/useModal';

const incidents = [
  {
    id: 'INC-001',
    type: 'Structure Fire',
    location: '123 Main Street, Downtown',
    severity: 'High',
    status: 'Active',
    reportedAt: '2024-01-15 14:30',
    responders: 8,
    description: 'Large structure fire with multiple units responding. Evacuation in progress.'
  },
  {
    id: 'INC-002',
    type: 'Medical Emergency',
    location: 'Central Park, East Side',
    severity: 'Medium',
    status: 'En Route',
    reportedAt: '2024-01-15 14:25',
    responders: 3,
    description: 'Cardiac arrest reported. ALS unit dispatched.'
  },
  {
    id: 'INC-003',
    type: 'Traffic Accident',
    location: 'Highway 101 & 5th Avenue',
    severity: 'Low',
    status: 'Resolved',
    reportedAt: '2024-01-15 14:18',
    responders: 4,
    description: 'Minor vehicle collision, no injuries reported. Traffic cleared.'
  },
  {
    id: 'INC-004',
    type: 'Flooding',
    location: 'River District, Low Areas',
    severity: 'High',
    status: 'Active',
    reportedAt: '2024-01-15 14:12',
    responders: 12,
    description: 'Flash flooding due to storm water overflow. Multiple rescues in progress.'
  }
];

export const Incidents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [newIncident, setNewIncident] = useState({
    type: '',
    location: '',
    severity: 'Medium',
    description: ''
  });

  const { isOpen: newIncidentOpen, openModal: openNewIncident, closeModal: closeNewIncident } = useModal();
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Incident Created', `New incident created: ${newIncident.type} at ${newIncident.location}`, 'success');
    closeNewIncident();
    setNewIncident({ type: '', location: '', severity: 'Medium', description: '' });
  };

  const handleViewDetails = (incidentId: string) => {
    setSelectedIncident(incidentId);
    const incident = incidents.find(i => i.id === incidentId);
    showAlert(
      `Incident Details - ${incident?.type}`,
      `ID: ${incident?.id}\nLocation: ${incident?.location}\nStatus: ${incident?.status}\nResponders: ${incident?.responders}\n\nDescription: ${incident?.description}`,
      'info'
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 space-y-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Incident Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor and coordinate emergency responses</p>
            </div>
            <button
              onClick={openNewIncident}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Incident</span>
            </button>
          </div>

          {/* Filters */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-600/30 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full backdrop-blur-sm bg-white/70 dark:bg-slate-700/70 border border-white/40 dark:border-slate-600/40 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 backdrop-blur-sm bg-white/70 dark:bg-slate-700/70 border border-white/40 dark:border-slate-600/40 rounded-xl focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-gray-700 dark:text-gray-200"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="en route">En Route</option>
                  <option value="resolved">Resolved</option>
                </select>
                
                <button className="px-4 py-3 backdrop-blur-sm bg-white/70 dark:bg-slate-700/70 border border-white/40 dark:border-slate-600/40 rounded-xl hover:bg-white/80 dark:hover:bg-slate-600/80 flex items-center space-x-2 transition-colors">
                  <Filter className="h-5 w-5" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Incidents List */}
          <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-600/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/20 dark:border-slate-600/30">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Incidents ({filteredIncidents.length})
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-slate-600">
              {filteredIncidents.map((incident) => (
                <div key={incident.id} className="p-6 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        incident.severity === 'High' ? 'bg-red-500' :
                        incident.severity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                      }`}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{incident.type}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">#{incident.id}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{incident.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{incident.reportedAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{incident.responders} responders</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300">{incident.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        incident.status === 'Active' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        incident.status === 'En Route' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        {incident.status}
                      </span>
                      
                      <button 
                        onClick={() => handleViewDetails(incident.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Incident Modal */}
      <Modal isOpen={newIncidentOpen} onClose={closeNewIncident} title="Report New Incident" size="md">
        <form onSubmit={handleCreateIncident} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Incident Type
            </label>
            <select 
              value={newIncident.type}
              onChange={(e) => setNewIncident({...newIncident, type: e.target.value})}
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-light-text-primary dark:text-dark-text-primary"
              required
            >
              <option value="">Select type...</option>
              <option value="Fire">Fire</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Traffic Accident">Traffic Accident</option>
              <option value="Natural Disaster">Natural Disaster</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              value={newIncident.location}
              onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
              placeholder="Enter incident location"
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Severity
            </label>
            <select 
              value={newIncident.severity}
              onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-light-text-primary dark:text-dark-text-primary"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={newIncident.description}
              onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
              placeholder="Describe the incident"
              className="w-full px-3 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 rounded-lg focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary"
              required
            ></textarea>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeNewIncident}
              className="flex-1 px-4 py-2 backdrop-blur-sm bg-light-bg-secondary/70 dark:bg-dark-bg-tertiary/70 border border-light-border-primary/40 dark:border-dark-border-primary/40 text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-bg-tertiary/80 dark:hover:bg-dark-bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Create Incident
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