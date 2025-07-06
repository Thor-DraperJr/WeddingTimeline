'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { WeddingEvent } from '@/types/wedding';
import { getWeddingTimeline } from '@/data/weddingTimeline';
import { getCurrentEventStatus, createEventDateTime } from '@/utils/timeUtils';
import EventCard from './EventCard';
import TimelineNavigation from './TimelineNavigation';

interface WeddingTimelineProps {
  className?: string;
}

const WeddingTimeline: React.FC<WeddingTimelineProps> = ({
  className = '',
}) => {
  const events = getWeddingTimeline();
  const [currentView, setCurrentView] = useState<'all' | 'next' | 'upcoming'>(
    'all'
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter events based on current view
  const filteredEvents = useMemo(() => {
    // Always return events during SSR, but also return them initially on client
    if (!isClient) {
      return events;
    }
    
    const now = new Date();
    
    let result: WeddingEvent[];
    switch (currentView) {
      case 'next': {
        // Find the next upcoming event
        const futureEvents = events.filter(event => {
          const eventDateTime = createEventDateTime(event.date, event.time);
          return eventDateTime > now;
        });
        
        if (futureEvents.length === 0) {
          result = [];
        } else {
          // Sort by time and return just the next one
          const sortedFuture = futureEvents.sort((a, b) => {
            const timeA = createEventDateTime(a.date, a.time);
            const timeB = createEventDateTime(b.date, b.time);
            return timeA.getTime() - timeB.getTime();
          });
          
          result = [sortedFuture[0]];
        }
        break;
      }
      
      case 'upcoming': {
        // Show all future events
        const upcoming = events.filter(event => {
          const eventDateTime = createEventDateTime(event.date, event.time);
          return eventDateTime > now;
        });
        result = upcoming;
        break;
      }
      
      case 'all':
      default:
        result = events;
        break;
    }
    
    return result;
  }, [events, currentView, isClient]);

  // Get current event status for highlighting
  const eventStatus = useMemo(() => {
    if (!isClient) return { currentEvent: null };
    
    const now = new Date();
    const currentEvent = events.find(event => {
      const eventStart = createEventDateTime(event.date, event.time);
      const eventEnd = event.endTime 
        ? createEventDateTime(event.date, event.endTime)
        : new Date(eventStart.getTime() + 30 * 60 * 1000); // Default 30 min
      
      return now >= eventStart && now <= eventEnd;
    });
    
    return { currentEvent };
  }, [events, isClient]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 ${className}`}
    >
      {!isClient ? (
        // Show a simple loading state during hydration
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-serif text-rose-900 mb-4">
              Lina & Thor
            </h1>
            <p className="text-xl text-rose-700 mb-2">Wedding Timeline</p>
            <p className="text-rose-600">July 10-11, 2025 • Banff, Alberta</p>
          </div>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-serif text-rose-900 mb-4">
            Lina & Thor
          </h1>
          <p className="text-xl text-rose-700 mb-2">Wedding Timeline</p>
          <p className="text-rose-600">July 10-11, 2025 • Banff, Alberta</p>
        </div>

        {/* Navigation */}
        <TimelineNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        {/* Quick Links */}
        <div className="mb-8 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/GXnhYAKikvREQv6GsHWGb4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <span className="mr-2">💬</span>
              WhatsApp Group
            </a>
            <a
              href="https://blue-ocean-05fae780f.1.azurestaticapps.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              <span className="mr-2">🎲</span>
              Board Games App
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 to-pink-400"></div>

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  index={index}
                  isActive={eventStatus.currentEvent?.id === event.id}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">🎉</div>
                <p className="text-gray-600">
                  {currentView === 'next' && 'No more events scheduled'}
                  {currentView === 'upcoming' && 'No upcoming events'}
                  {currentView === 'all' && 'No events to show'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-rose-200">
          <p className="text-rose-600 text-sm">
            Can't wait to celebrate with you! 💕
          </p>
        </div>
      </div>
      )}
    </div>
  );
};

export default WeddingTimeline;
