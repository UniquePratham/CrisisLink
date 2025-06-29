import React from 'react';
import { Users, Truck, Zap, Shield } from 'lucide-react';

const resources = [
  {
    type: 'Fire Units',
    icon: Shield,
    available: 12,
    total: 15,
    deployed: 3,
    color: 'red'
  },
  {
    type: 'Medical Teams',
    icon: Users,
    available: 8,
    total: 10,
    deployed: 2,
    color: 'blue'
  },
  {
    type: 'Emergency Vehicles',
    icon: Truck,
    available: 18,
    total: 25,
    deployed: 7,
    color: 'green'
  },
  {
    type: 'Utility Crews',
    icon: Zap,
    available: 6,
    total: 8,
    deployed: 2,
    color: 'amber'
  }
];

export const ResourceStatus: React.FC = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const availabilityPercent = (resource.available / resource.total) * 100;
          
          return (
            <div key={resource.type} className="bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg p-4 border border-light-border-primary dark:border-dark-border-primary transition-colors duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  resource.color === 'red' ? 'bg-crisis-100 dark:bg-crisis-900/30 text-crisis-600 dark:text-crisis-400' :
                  resource.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                  resource.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">{resource.type}</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Available</span>
                  <span className="font-medium text-light-text-primary dark:text-dark-text-primary">{resource.available}/{resource.total}</span>
                </div>
                
                <div className="w-full bg-light-border-primary dark:bg-dark-border-primary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      resource.color === 'red' ? 'bg-crisis-500' :
                      resource.color === 'blue' ? 'bg-blue-500' :
                      resource.color === 'green' ? 'bg-green-500' :
                      'bg-amber-500'
                    }`}
                    style={{ width: `${availabilityPercent}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <span>Deployed: {resource.deployed}</span>
                  <span>{Math.round(availabilityPercent)}% available</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};