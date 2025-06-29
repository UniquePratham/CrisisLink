import React from 'react';

export const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 px-3 py-2 bg-gray-500/40 hover:bg-gray-500/60 text-gray-200 hover:text-white text-xs font-medium rounded border border-gray-400/30 hover:border-gray-300/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
      style={{ 
        fontSize: '11px',
        lineHeight: '1.2',
        opacity: 0.5,
        backdropFilter: 'blur(8px)',
      }}
    >
      Made with bolt.new
    </a>
  );
};