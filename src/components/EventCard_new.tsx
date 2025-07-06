import React, { useState } from 'react';
import { WeddingEvent } from '@/types/wedding';
import EventIcon from './EventIcon';

interface EventCardProps {
  event: WeddingEvent;
  index: number;
  isActive?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  isActive = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLocationClick = () => {
    if (event.location?.googleMapsUrl) {
      window.open(event.location.googleMapsUrl, '_blank');
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex items-start mb-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Event Content Card */}
      <div className={`flex-1 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <div
          className={`p-6 rounded-xl shadow-md border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
            isActive
              ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 shadow-rose-100'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Time Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center px-4 py-2 text-sm font-medium tracking-wide uppercase rounded-full ${
                isActive
                  ? 'bg-rose-200 text-rose-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {event.time}
            </span>
          </div>

          {/* Event Title */}
          <h3
            className={`text-xl font-semibold mb-3 ${
              isActive ? 'text-rose-900' : 'text-gray-800'
            }`}
          >
            {event.title}
          </h3>

          {/* Event Description */}
          <p className="text-gray-600 mb-4 leading-relaxed">
            {event.description}
          </p>

          {/* Location */}
          {event.location && (
            <div className="mb-4">
              <button
                onClick={handleLocationClick}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <svg
                  className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">{event.location.name}</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
              {event.location.address && (
                <p className="text-sm text-gray-500 mt-1 ml-6">
                  {event.location.address}
                </p>
              )}
            </div>
          )}

          {/* Expandable Details */}
          {event.notes && (
            <div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm text-rose-600 hover:text-rose-800 font-medium transition-colors flex items-center"
              >
                {isExpanded ? 'Show Less' : 'More Details'}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isExpanded && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{event.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Icon with decorative circle - positioned in the center */}
      <div className="flex-shrink-0 relative z-10 order-first md:order-none">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
            isActive
              ? 'bg-gradient-to-br from-rose-100 to-pink-100 border-rose-300'
              : 'bg-white border-rose-200'
          }`}
        >
          <EventIcon
            icon={event.icon}
            className={`w-7 h-7 ${
              isActive ? 'text-rose-600' : 'text-rose-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
