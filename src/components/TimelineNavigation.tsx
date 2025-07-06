'use client';

import React from 'react';

interface TimelineNavigationProps {
  currentView: 'all' | 'next' | 'upcoming';
  onViewChange: (view: 'all' | 'next' | 'upcoming') => void;
}

const TimelineNavigation: React.FC<TimelineNavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  const views = [
    {
      key: 'all' as const,
      label: 'All Events',
      icon: '📅',
      description: 'Complete timeline',
    },
    {
      key: 'next' as const,
      label: 'Next Event',
      icon: '⭐',
      description: "What's happening next",
    },
    {
      key: 'upcoming' as const,
      label: 'Upcoming',
      icon: '🔜',
      description: 'Future events',
    },
  ];

  return (
    <div className="timeline-navigation">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-200 rounded-xl mr-3 shadow-sm">
          <svg
            className="w-5 h-5 text-rose-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800">Timeline View</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 p-3 rounded-2xl border border-pink-200/50 shadow-sm">
        {views.map((view) => (
          <button
            key={view.key}
            onClick={() => onViewChange(view.key)}
            className={`
              relative px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105
              ${
                currentView === view.key
                  ? 'bg-gradient-to-br from-white to-rose-50 text-rose-700 shadow-lg shadow-rose-200/50 border-2 border-rose-200 scale-105'
                  : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:text-rose-600 hover:bg-white hover:shadow-md border-2 border-transparent hover:border-pink-200'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl filter drop-shadow-sm">
                {view.icon}
              </span>
              <span className="font-bold">{view.label}</span>
              <span className="text-xs opacity-75 font-medium">
                {view.description}
              </span>
            </div>

            {currentView === view.key && (
              <>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-full"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimelineNavigation;
