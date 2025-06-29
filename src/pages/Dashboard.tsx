import React from 'react';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Clock,
  TrendingUp,
  Radio,
  Shield,
  Activity,
  Zap
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { IncidentMap } from '../components/IncidentMap';
import { RecentIncidents } from '../components/RecentIncidents';
import { ResourceStatus } from '../components/ResourceStatus';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg-secondary via-blue-50 to-purple-50 dark:from-dark-bg-primary dark:via-blue-900 dark:to-dark-bg-primary relative overflow-hidden transition-all duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-40 w-24 h-24 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Alert Banner */}
        <div className="backdrop-blur-xl bg-crisis-500/10 dark:bg-crisis-500/20 border border-crisis-400/30 dark:border-crisis-400/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-crisis-400/5 to-orange-400/5 dark:from-crisis-400/10 dark:to-orange-400/10"></div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-crisis-400/20 dark:bg-crisis-400/30 rounded-full blur-xl animate-pulse"></div>
          
          <div className="relative flex items-start space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-crisis-500/30 rounded-xl blur-lg"></div>
              <div className="relative bg-gradient-to-br from-crisis-500 to-crisis-600 p-3 rounded-xl shadow-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-crisis-800 dark:text-crisis-200">Active Emergency Alert</h3>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-crisis-600 dark:text-crisis-400" />
                  <span className="text-xs font-medium text-crisis-600 dark:text-crisis-400 bg-crisis-100 dark:bg-crisis-900/50 px-2 py-1 rounded-full">PRIORITY</span>
                </div>
              </div>
              <p className="text-crisis-700 dark:text-crisis-300 mb-4">
                Severe weather warning in effect for downtown area. Multiple incidents reported with coordinated response in progress.
              </p>
              <div className="flex space-x-3">
                <button className="bg-gradient-to-r from-crisis-600 to-crisis-700 text-white px-6 py-2 rounded-xl hover:from-crisis-500 hover:to-crisis-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                  View Details
                </button>
                <button className="backdrop-blur-sm bg-light-bg-primary/80 dark:bg-dark-bg-secondary/80 border border-crisis-300 dark:border-crisis-600 text-crisis-700 dark:text-crisis-300 px-6 py-2 rounded-xl hover:bg-light-bg-primary dark:hover:bg-dark-bg-tertiary transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Incidents"
            value="12"
            change="+3"
            changeType="increase"
            icon={AlertTriangle}
            color="red"
          />
          <StatsCard
            title="Personnel Deployed"
            value="48"
            change="+8"
            changeType="increase"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Response Time"
            value="4.2m"
            change="-0.8m"
            changeType="decrease"
            icon={Clock}
            color="green"
          />
          <StatsCard
            title="Resources Available"
            value="86%"
            change="+2%"
            changeType="increase"
            icon={Shield}
            color="amber"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Incident Map */}
          <div className="backdrop-blur-xl bg-light-bg-primary/80 dark:bg-dark-bg-secondary/80 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/10 pointer-events-none"></div>
            <div className="relative p-6 border-b border-light-border-primary/20 dark:border-dark-border-primary/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent">
                  Incident Map
                </h2>
              </div>
            </div>
            <div className="relative">
              <IncidentMap />
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="backdrop-blur-xl bg-light-bg-primary/80 dark:bg-dark-bg-secondary/80 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-2xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-crisis-50/50 to-orange-50/30 dark:from-crisis-900/20 dark:to-orange-900/10 pointer-events-none"></div>
            <div className="relative p-6 border-b border-light-border-primary/20 dark:border-dark-border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-crisis-500/20 rounded-lg blur-lg"></div>
                    <div className="relative bg-gradient-to-br from-crisis-500 to-crisis-600 p-2 rounded-lg shadow-lg">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent">
                    Recent Incidents
                  </h2>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1 rounded-lg transition-colors">
                  View All
                </button>
              </div>
            </div>
            <RecentIncidents />
          </div>
        </div>

        {/* Resource Status */}
        <div className="backdrop-blur-xl bg-light-bg-primary/80 dark:bg-dark-bg-secondary/80 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-2xl shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 dark:from-green-900/20 dark:to-blue-900/10 pointer-events-none"></div>
          <div className="relative p-6 border-b border-light-border-primary/20 dark:border-dark-border-primary/20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg"></div>
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
                  <Radio className="h-5 w-5 text-white" />
                </div>
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-light-text-primary to-light-text-secondary dark:from-dark-text-primary dark:to-dark-text-secondary bg-clip-text text-transparent">
                Resource Status
              </h2>
            </div>
          </div>
          <ResourceStatus />
        </div>
      </div>
    </div>
  );
};