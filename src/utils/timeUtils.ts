import {
  format,
  parseISO,
  isAfter,
  isBefore,
  addDays,
  differenceInMinutes,
} from 'date-fns';
import { WeddingEvent, CurrentEventStatus } from '@/types/wedding';

export const isEventActive = (
  event: WeddingEvent & { startTime?: string; endTime?: string }
): boolean => {
  const now = new Date();

  if (event.startTime) {
    const eventStart = new Date(event.startTime);
    const eventEnd = event.endTime
      ? new Date(event.endTime)
      : new Date(eventStart.getTime() + 30 * 60 * 1000); // Default 30 min duration

    return now >= eventStart && now <= eventEnd;
  } else {
    // Fallback for events without startTime
    const eventDateTime = createEventDateTime(event.date, event.time);
    const eventEnd = event.endTime
      ? createEventDateTime(event.date, event.endTime)
      : new Date(eventDateTime.getTime() + 30 * 60 * 1000);

    return now >= eventDateTime && now <= eventEnd;
  }
};

export const formatEventTime = (
  startTime: string,
  endTime?: string
): string => {
  const start = new Date(startTime);
  const formattedStart = start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (endTime) {
    const end = new Date(endTime);
    const formattedEnd = end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart;
};

export const formatEventDate = (dateStr: string): string => {
  // Parse date string manually to avoid timezone issues
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  return format(date, 'EEEE, MMMM do, yyyy');
};

export const createEventDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(':');
  // Parse date string manually to avoid timezone issues
  const [year, month, day] = date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day); // month is 0-indexed
  eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return eventDate;
};

export const getCurrentEventStatus = (
  events: WeddingEvent[]
): CurrentEventStatus => {
  const now = new Date();
  const sortedEvents = events
    .map((event) => ({
      ...event,
      dateTime: createEventDateTime(event.date, event.time),
    }))
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

  let currentEvent: WeddingEvent | undefined;
  let nextEvent: WeddingEvent | undefined;

  for (let i = 0; i < sortedEvents.length; i++) {
    const event = sortedEvents[i];
    const eventStart = event.dateTime;
    const eventEnd = event.endTime
      ? createEventDateTime(event.date, event.endTime)
      : addDays(eventStart, 0.5); // Default 30 min duration

    // Check if we're currently in this event
    if (isAfter(now, eventStart) && isBefore(now, eventEnd)) {
      currentEvent = event;
      nextEvent = sortedEvents[i + 1];
      break;
    }

    // Check if this is the next upcoming event
    if (isAfter(eventStart, now)) {
      nextEvent = event;
      break;
    }
  }

  return {
    currentEvent,
    nextEvent,
    isEventActive: !!currentEvent,
    timeUntilNext: nextEvent
      ? `${differenceInMinutes(createEventDateTime(nextEvent.date, nextEvent.time), now)} minutes`
      : undefined,
  };
};

export const isEventInRange = (
  event: WeddingEvent,
  startDate: Date,
  endDate: Date
): boolean => {
  const eventDateTime = createEventDateTime(event.date, event.time);
  return isAfter(eventDateTime, startDate) && isBefore(eventDateTime, endDate);
};

export const groupEventsByDate = (
  events: WeddingEvent[]
): Map<string, WeddingEvent[]> => {
  const grouped = new Map<string, WeddingEvent[]>();

  events.forEach((event) => {
    const date = event.date;
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(event);
  });

  // Sort events within each date
  grouped.forEach((events) => {
    events.sort((a, b) => {
      const timeA = createEventDateTime(a.date, a.time);
      const timeB = createEventDateTime(b.date, b.time);
      return timeA.getTime() - timeB.getTime();
    });
  });

  return grouped;
};

export const getTimeUntilEvent = (event: WeddingEvent): string => {
  const now = new Date();
  const eventDateTime = createEventDateTime(event.date, event.time);
  const diffMinutes = differenceInMinutes(eventDateTime, now);

  if (diffMinutes < 0) {
    return 'Event has passed';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes`;
  } else if (diffMinutes < 1440) {
    // Less than 24 hours
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  } else {
    const days = Math.floor(diffMinutes / 1440);
    const hours = Math.floor((diffMinutes % 1440) / 60);
    return `${days}d ${hours}h`;
  }
};
