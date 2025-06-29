import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, MapPin, Users } from 'lucide-react';

const incidentData = [
  { month: 'Jan', incidents: 45, resolved: 42 },
  { month: 'Feb', incidents: 52, resolved: 48 },
  { month: 'Mar', incidents: 38, resolved: 35 },
  { month: 'Apr', incidents: 61, resolved: 58 },
  { month: 'May', incidents: 55, resolved: 52 },
  { month: 'Jun', incidents: 48, resolved: 46 },
];

const responseTimeData = [
  { day: 'Mon', avgTime: 4.2 },
  { day: 'Tue', avgTime: 3.8 },
  { day: 'Wed', avgTime: 4.5 },
  { day: 'Thu', avgTime: 3.9 },
  { day: 'Fri', avgTime: 4.1 },
  { day: 'Sat', avgTime: 5.2 },
  { day: 'Sun', avgTime: 4.8 },
];

const incidentTypeData = [
  { name: 'Fire', value: 30, color: '#DC2626' },
  { name: 'Medical', value: 45, color: '#2563EB' },
  { name: 'Accident', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 10, color: '#16A34A' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Analytics Dashboard</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Emergency response metrics and insights</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-crisis-500 focus:border-crisis-500 transition-colors duration-300">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-crisis-100 dark:bg-crisis-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-crisis-600 dark:text-crisis-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Total Incidents</p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">299</p>
              <p className="text-sm text-green-600 dark:text-green-400">+12% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Avg Response Time</p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">4.2m</p>
              <p className="text-sm text-green-600 dark:text-green-400">-8% improvement</p>
            </div>
          </div>
        </div>

        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Resolution Rate</p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">94.2%</p>
              <p className="text-sm text-green-600 dark:text-green-400">+2.1% increase</p>
            </div>
          </div>
        </div>

        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Areas Covered</p>
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">28</p>
              <p className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">Districts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Trends */}
        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Incident Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.2} />
              <XAxis dataKey="month" stroke="currentColor" opacity={0.7} />
              <YAxis stroke="currentColor" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-light-bg-primary)',
                  border: '1px solid var(--color-light-border-primary)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="incidents" fill="#DC2626" name="Reported" />
              <Bar dataKey="resolved" fill="#16A34A" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Trends */}
        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Response Time Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.2} />
              <XAxis dataKey="day" stroke="currentColor" opacity={0.7} />
              <YAxis stroke="currentColor" opacity={0.7} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-light-bg-primary)',
                  border: '1px solid var(--color-light-border-primary)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="avgTime" stroke="#2563EB" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Types */}
        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Incident Types Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incidentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="bg-light-bg-primary dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-light-border-primary dark:border-dark-border-primary p-6 transition-colors duration-300">
          <h2 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg">
              <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Fastest Response</span>
              <span className="font-bold text-green-600 dark:text-green-400">1.2 minutes</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg">
              <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Peak Hour</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">2:00 PM - 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg">
              <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Busiest Day</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">Friday</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-light-bg-secondary dark:bg-dark-bg-tertiary rounded-lg">
              <span className="font-medium text-light-text-primary dark:text-dark-text-primary">Success Rate</span>
              <span className="font-bold text-green-600 dark:text-green-400">98.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};