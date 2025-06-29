import React, { useState } from 'react';
import { Filter, X, Calendar, MapPin, Users, AlertTriangle, Search } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'text' | 'number';
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
}

interface FilterValue {
  [key: string]: any;
}

interface FilterPanelProps {
  filters: FilterOption[];
  values: FilterValue;
  onChange: (values: FilterValue) => void;
  onReset: () => void;
  onApply?: () => void;
  isOpen: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  values,
  onChange,
  onReset,
  onApply,
  isOpen,
  onToggle,
  loading = false
}) => {
  const [localValues, setLocalValues] = useState<FilterValue>(values);

  const handleValueChange = (filterId: string, value: any) => {
    const newValues = { ...localValues, [filterId]: value };
    setLocalValues(newValues);
    onChange(newValues);
  };

  const handleReset = () => {
    setLocalValues({});
    onReset();
  };

  const handleApply = () => {
    onApply?.();
    onToggle();
  };

  const getActiveFilterCount = () => {
    return Object.values(localValues).filter(value => 
      value !== undefined && value !== null && value !== '' && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  const renderFilterInput = (filter: FilterOption) => {
    const value = localValues[filter.id];

    switch (filter.type) {
      case 'text':
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary h-4 w-4" />
            <input
              type="text"
              value={value || ''}
              onChange={(e) => handleValueChange(filter.id, e.target.value)}
              placeholder={filter.placeholder}
              className="pl-10 pr-4 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleValueChange(filter.id, e.target.value ? Number(e.target.value) : '')}
            placeholder={filter.placeholder}
            min={filter.min}
            max={filter.max}
            className="px-3 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleValueChange(filter.id, e.target.value)}
            className="px-3 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {filter.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleValueChange(filter.id, newValues);
                  }}
                  className="rounded border-light-border-primary dark:border-dark-border-primary text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary h-4 w-4" />
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleValueChange(filter.id, e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        );

      case 'daterange':
        return (
          <div className="space-y-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary h-4 w-4" />
              <input
                type="date"
                value={value?.start || ''}
                onChange={(e) => handleValueChange(filter.id, { ...value, start: e.target.value })}
                placeholder="Start date"
                className="pl-10 pr-4 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary h-4 w-4" />
              <input
                type="date"
                value={value?.end || ''}
                onChange={(e) => handleValueChange(filter.id, { ...value, end: e.target.value })}
                placeholder="End date"
                className="pl-10 pr-4 py-2 w-full border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-tertiary text-light-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="relative flex items-center space-x-2 px-4 py-2 border border-light-border-primary dark:border-dark-border-primary bg-light-bg-primary dark:bg-dark-bg-secondary text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-tertiary transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onToggle}
          />
          
          {/* Panel */}
          <div className="relative ml-auto w-full max-w-md bg-light-bg-primary dark:bg-dark-bg-primary border-l border-light-border-primary dark:border-dark-border-primary shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-light-bg-primary dark:bg-dark-bg-primary border-b border-light-border-primary dark:border-dark-border-primary p-4 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                  Filters
                </h3>
                <button
                  onClick={onToggle}
                  className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-6">
              {filters.map(filter => (
                <div key={filter.id} className="space-y-2">
                  <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    {filter.label}
                  </label>
                  {renderFilterInput(filter)}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-light-bg-primary dark:bg-dark-bg-primary border-t border-light-border-primary dark:border-dark-border-primary p-4 space-y-3">
              <button
                onClick={handleReset}
                disabled={loading}
                className="w-full px-4 py-2 border border-light-border-primary dark:border-dark-border-primary text-light-text-primary dark:text-dark-text-primary rounded-lg hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary transition-colors disabled:opacity-50"
              >
                Reset Filters
              </button>
              {onApply && (
                <button
                  onClick={handleApply}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                  <span>Apply Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};