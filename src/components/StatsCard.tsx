import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  color: 'red' | 'blue' | 'green' | 'amber';
}

const colorClasses = {
  red: {
    bg: 'from-crisis-500/20 to-crisis-600/20',
    border: 'border-crisis-400/30',
    icon: 'from-crisis-500 to-crisis-600',
    text: 'text-crisis-600 dark:text-crisis-400',
    glow: 'shadow-crisis-500/20'
  },
  blue: {
    bg: 'from-blue-500/20 to-blue-600/20',
    border: 'border-blue-400/30',
    icon: 'from-blue-500 to-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
    glow: 'shadow-blue-500/20'
  },
  green: {
    bg: 'from-green-500/20 to-green-600/20',
    border: 'border-green-400/30',
    icon: 'from-green-500 to-green-600',
    text: 'text-green-600 dark:text-green-400',
    glow: 'shadow-green-500/20'
  },
  amber: {
    bg: 'from-amber-500/20 to-amber-600/20',
    border: 'border-amber-400/30',
    icon: 'from-amber-500 to-amber-600',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'shadow-amber-500/20'
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const colors = colorClasses[color];

  return (
    <div className="group relative overflow-hidden">
      {/* Glassmorphism card */}
      <div className={`backdrop-blur-xl bg-light-bg-primary/80 dark:bg-dark-bg-secondary/80 border border-light-border-primary/30 dark:border-dark-border-primary/30 rounded-2xl p-6 shadow-xl ${colors.glow} hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden`}>
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Animated background elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 dark:bg-white/5 rounded-full blur-xl group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-all duration-300"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/5 dark:bg-white/3 rounded-full blur-lg"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">{title}</p>
              <p className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">{value}</p>
              <div className="flex items-center">
                <span className={`text-sm font-semibold ${
                  changeType === 'increase' 
                    ? color === 'red' ? 'text-crisis-600 dark:text-crisis-400' : 'text-green-600 dark:text-green-400'
                    : color === 'red' ? 'text-green-600 dark:text-green-400' : 'text-crisis-600 dark:text-crisis-400'
                }`}>
                  {change}
                </span>
                <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary ml-1">from last hour</span>
              </div>
            </div>
            
            <div className="relative">
              {/* Icon glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.icon} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Icon container */}
              <div className={`relative p-4 bg-gradient-to-br ${colors.icon} rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      </div>
    </div>
  );
};