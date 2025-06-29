import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Radio,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'incidents', name: 'Incidents', icon: AlertTriangle },
  { id: 'resources', name: 'Resources', icon: Users },
  { id: 'communications', name: 'Communications', icon: Radio },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { isDark } = useTheme();

  return (
    <div className="relative w-64 h-full">
      {/* Glassmorphism sidebar */}
      <div className="h-full backdrop-blur-xl bg-dark-bg-primary/90 dark:bg-dark-bg-primary/95 border-r border-dark-border-primary/10 dark:border-dark-border-primary/50 shadow-2xl relative overflow-hidden transition-all duration-300">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg-secondary/50 to-dark-bg-primary/80 dark:from-dark-bg-secondary/50 dark:to-dark-bg-primary/80"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 -right-10 w-16 h-16 bg-crisis-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo section */}
          <div className="p-6 border-b border-dark-border-primary/10 dark:border-dark-border-primary/50">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-crisis-500/30 rounded-xl"></div>
                <div className="relative w-14 h-14 bg-blue-700 rounded-xl flex items-center justify-center p-1 ">
                  <img 
                    src="../../public/CrisisLink.png" 
                    alt="CrisisLink Logo" 
                    className="h-24 w-28 object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">CrisisLink</span>
                <p className="text-xs text-white/60">Connecting Signals</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-crisis-500/20 to-crisis-600/20 border border-crisis-400/30 shadow-lg'
                      : 'hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center space-x-3 px-4 py-3">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-crisis-500/20 text-crisis-300' 
                        : 'text-white/70 group-hover:text-white group-hover:bg-white/10'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/70 group-hover:text-white'
                    }`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-crisis-400 to-crisis-600 rounded-l-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* System status */}
          <div className="p-4 border-t border-dark-border-primary/10 dark:border-dark-border-primary/50">
            <div className="backdrop-blur-sm bg-white/5 border border-dark-border-primary/10 dark:border-dark-border-primary/30 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5"></div>
              <div className="relative">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-medium text-white/90">System Status</span>
                  <Zap className="h-3 w-3 text-green-400" />
                </div>
                <p className="text-xs text-white/60">All systems operational</p>
                <div className="mt-2 w-full bg-white/10 rounded-full h-1">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-1 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};