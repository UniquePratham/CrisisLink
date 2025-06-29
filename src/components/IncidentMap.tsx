import React, { useState } from 'react';
import { MapPin, AlertTriangle, Clock, Users, Zap, Navigation } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';
import { AlertModal } from './Modal';
import { useAlertModal } from '../hooks/useModal';

const incidents = [
  { 
    id: 'INC-001', 
    type: 'Structure Fire', 
    location: 'Downtown District', 
    severity: 'high' as const, 
    status: 'active' as const, 
    time: '2m ago', 
    coordinates: { lat: 40.7589, lng: -73.9851 },
    responders: 8,
    description: 'Large structure fire with multiple units responding. Evacuation in progress.'
  },
  { 
    id: 'INC-002', 
    type: 'Medical Emergency', 
    location: 'Central Park', 
    severity: 'medium' as const, 
    status: 'en-route' as const, 
    time: '5m ago', 
    coordinates: { lat: 40.7614, lng: -73.9776 },
    responders: 3,
    description: 'Cardiac arrest reported. ALS unit dispatched.'
  },
  { 
    id: 'INC-003', 
    type: 'Traffic Accident', 
    location: 'Highway 101', 
    severity: 'low' as const, 
    status: 'resolved' as const, 
    time: '12m ago', 
    coordinates: { lat: 40.7505, lng: -73.9934 },
    responders: 4,
    description: 'Minor vehicle collision, no injuries reported. Traffic cleared.'
  },
  { 
    id: 'INC-004', 
    type: 'Flooding', 
    location: 'River District', 
    severity: 'high' as const, 
    status: 'active' as const, 
    time: '18m ago', 
    coordinates: { lat: 40.7282, lng: -74.0776 },
    responders: 12,
    description: 'Flash flooding due to storm water overflow. Multiple rescues in progress.'
  }
];

export const IncidentMap: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const { isOpen: alertOpen, title: alertTitle, message: alertMessage, type: alertType, showAlert, closeAlert } = useAlertModal();

  const handleIncidentSelect = (incident: any) => {
    setSelectedIncident(incident.id);
    showAlert(
      `Incident Details - ${incident.type}`,
      `ID: ${incident.id}\nLocation: ${incident.location}\nStatus: ${incident.status.toUpperCase()}\nSeverity: ${incident.severity.toUpperCase()}\nResponders: ${incident.responders}\nReported: ${incident.time}\n\nDescription: ${incident.description}`,
      incident.severity === 'high' ? 'error' : incident.severity === 'medium' ? 'warning' : 'info'
    );
  };

  const handleViewIncidentDetails = (incidentId: string) => {
    const incident = incidents.find(i => i.id === incidentId);
    if (incident) {
      handleIncidentSelect(incident);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Interactive Map */}
        <InteractiveMap
          incidents={incidents}
          onIncidentSelect={handleIncidentSelect}
          height="400px"
          showControls={true}
        />
        
        {/* Incident List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">Active Incidents</h3>
            <div className="flex items-center space-x-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>
          
          {incidents.map((incident) => (
            <div 
              key={incident.id} 
              className="flex items-center justify-between p-3 bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300 hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-secondary cursor-pointer"
              onClick={() => handleViewIncidentDetails(incident.id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  incident.severity === 'high' ? 'bg-crisis-500' :
                  incident.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                } ${incident.status === 'active' ? 'animate-pulse' : ''}`}></div>
                <div>
                  <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{incident.type}</p>
                  <div className="flex items-center space-x-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{incident.responders}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  incident.status === 'active' ? 'bg-crisis-100 dark:bg-crisis-900/30 text-crisis-700 dark:text-crisis-300' :
                  incident.status === 'en-route' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                }`}>
                  {incident.status.replace('-', ' ').toUpperCase()}
                </span>
                <div className="flex items-center space-x-1 text-light-text-tertiary dark:text-dark-text-tertiary">
                  <Clock className="h-3 w-3" />
                  <span>{incident.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-3 border border-light-border-primary dark:border-dark-border-primary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-crisis-500 rounded-full"></div>
              <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">High Priority</span>
            </div>
            <p className="text-lg font-bold text-crisis-600 dark:text-crisis-400 mt-1">
              {incidents.filter(i => i.severity === 'high').length}
            </p>
          </div>
          
          <div className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-3 border border-light-border-primary dark:border-dark-border-primary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Medium Priority</span>
            </div>
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">
              {incidents.filter(i => i.severity === 'medium').length}
            </p>
          </div>
          
          <div className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-3 border border-light-border-primary dark:border-dark-border-primary">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Active</span>
            </div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
              {incidents.filter(i => i.status === 'active').length}
            </p>
          </div>
          
          <div className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-3 border border-light-border-primary dark:border-dark-border-primary">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">Total Responders</span>
            </div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
              {incidents.reduce((sum, i) => sum + i.responders, 0)}
            </p>
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