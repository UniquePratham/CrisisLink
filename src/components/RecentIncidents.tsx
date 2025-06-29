import React from 'react';
import { Clock, AlertTriangle, Users, MapPin } from 'lucide-react';

const incidents = [
  {
    id: 1,
    type: 'Structure Fire',
    location: '123 Main Street',
    time: '2 minutes ago',
    severity: 'high',
    responders: 8,
    status: 'Active'
  },
  {
    id: 2,
    type: 'Medical Emergency',
    location: 'Central Park East',
    time: '5 minutes ago',
    severity: 'medium',
    responders: 3,
    status: 'En Route'
  },
  {
    id: 3,
    type: 'Traffic Accident',
    location: 'Highway 101 & 5th Ave',
    time: '12 minutes ago',
    severity: 'low',
    responders: 4,
    status: 'Resolved'
  },
  {
    id: 4,
    type: 'Flooding',
    location: 'River District',
    time: '18 minutes ago',
    severity: 'high',
    responders: 12,
    status: 'Active'
  }
];

export const RecentIncidents: React.FC = () => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="border border-light-border-primary dark:border-dark-border-primary rounded-lg p-4 bg-light-bg-secondary/50 dark:bg-dark-bg-tertiary/50 transition-colors duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${
                  incident.severity === 'high' ? 'bg-crisis-500' :
                  incident.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{incident.type}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{incident.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                incident.status === 'Active' ? 'bg-crisis-100 dark:bg-crisis-900/30 text-crisis-700 dark:text-crisis-300' :
                incident.status === 'En Route' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              }`}>
                {incident.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                <Users className="h-4 w-4" />
                <span>{incident.responders} responders</span>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};