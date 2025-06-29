import React, { useState, useEffect, useRef } from 'react';
import { MapPin, AlertTriangle, Clock, Users, Zap, Navigation, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MapIncident {
  id: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'en-route' | 'resolved';
  time: string;
  responders: number;
  description: string;
}

interface InteractiveMapProps {
  incidents?: MapIncident[];
  onIncidentSelect?: (incident: MapIncident) => void;
  height?: string;
  showControls?: boolean;
}

const defaultIncidents: MapIncident[] = [
  {
    id: 'INC-001',
    type: 'Structure Fire',
    location: 'Downtown District',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    severity: 'high',
    status: 'active',
    time: '2m ago',
    responders: 8,
    description: 'Large structure fire with multiple units responding. Evacuation in progress.'
  },
  {
    id: 'INC-002',
    type: 'Medical Emergency',
    location: 'Central Park',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    severity: 'medium',
    status: 'en-route',
    time: '5m ago',
    responders: 3,
    description: 'Cardiac arrest reported. ALS unit dispatched.'
  },
  {
    id: 'INC-003',
    type: 'Traffic Accident',
    location: 'Highway 101',
    coordinates: { lat: 40.7505, lng: -73.9934 },
    severity: 'low',
    status: 'resolved',
    time: '12m ago',
    responders: 4,
    description: 'Minor vehicle collision, no injuries reported. Traffic cleared.'
  },
  {
    id: 'INC-004',
    type: 'Flooding',
    location: 'River District',
    coordinates: { lat: 40.7282, lng: -74.0776 },
    severity: 'high',
    status: 'active',
    time: '18m ago',
    responders: 12,
    description: 'Flash flooding due to storm water overflow. Multiple rescues in progress.'
  }
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  incidents = defaultIncidents,
  onIncidentSelect,
  height = '400px',
  showControls = true
}) => {
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7589, lng: -73.9851 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map loading
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadTimer);
  }, []);

  const handleIncidentClick = (incident: MapIncident) => {
    setSelectedIncident(incident);
    setMapCenter(incident.coordinates);
    onIncidentSelect?.(incident);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const handleResetView = () => {
    setMapCenter({ lat: 40.7589, lng: -73.9851 });
    setZoomLevel(12);
    setSelectedIncident(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 border-red-600';
      case 'medium': return 'bg-amber-500 border-amber-600';
      case 'low': return 'bg-green-500 border-green-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 dark:text-red-400';
      case 'en-route': return 'text-amber-600 dark:text-amber-400';
      case 'resolved': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (mapError) {
    return (
      <div className="w-full bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Map Loading Error</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">{mapError}</p>
            <button 
              onClick={() => {
                setMapError(null);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1500);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg border border-light-border-primary dark:border-dark-border-primary overflow-hidden transition-colors duration-300" style={{ height }}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-light-bg-secondary dark:bg-dark-bg-tertiary flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">Loading interactive map...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-gray-200 dark:from-green-800 dark:via-blue-800 dark:to-gray-800"></div>
          {/* Grid overlay for map-like appearance */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Map Controls */}
        {showControls && !isLoading && (
          <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4 text-light-text-primary dark:text-dark-text-primary" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4 text-light-text-primary dark:text-dark-text-primary" />
            </button>
            <button
              onClick={handleResetView}
              className="p-2 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors"
              title="Reset View"
            >
              <RotateCcw className="h-4 w-4 text-light-text-primary dark:text-dark-text-primary" />
            </button>
          </div>
        )}

        {/* Incident Markers */}
        {!isLoading && incidents.map((incident, index) => {
          const isSelected = selectedIncident?.id === incident.id;
          return (
            <div
              key={incident.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-125 z-20' : 'z-10 hover:scale-110'
              }`}
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 12) % 40}%`
              }}
              onClick={() => handleIncidentClick(incident)}
            >
              {/* Marker */}
              <div className={`relative w-8 h-8 ${getSeverityColor(incident.severity)} rounded-full border-2 shadow-lg flex items-center justify-center`}>
                <div className="w-3 h-3 bg-white rounded-full"></div>
                {incident.status === 'active' && (
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                )}
              </div>

              {/* Tooltip */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-xl p-3 z-30">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{incident.type}</h4>
                      <span className={`text-xs font-medium ${getStatusColor(incident.status)}`}>
                        {incident.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-1 text-light-text-secondary dark:text-dark-text-secondary">
                        <MapPin className="h-3 w-3" />
                        <span>{incident.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-light-text-secondary dark:text-dark-text-secondary">
                        <Clock className="h-3 w-3" />
                        <span>{incident.time}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-light-text-secondary dark:text-dark-text-secondary">
                        <Users className="h-3 w-3" />
                        <span>{incident.responders} responders</span>
                      </div>
                    </div>
                    <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                      {incident.description}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-dark-bg-primary"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Map Info */}
        {!isLoading && (
          <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg p-3">
            <div className="flex items-center space-x-2 text-sm">
              <Navigation className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-light-text-secondary dark:text-dark-text-secondary">
                Zoom: {zoomLevel} | Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {!isLoading && (
        <div className="absolute top-4 left-4 bg-white dark:bg-dark-bg-primary border border-light-border-primary dark:border-dark-border-primary rounded-lg shadow-lg p-3">
          <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">Incident Severity</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Low</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};