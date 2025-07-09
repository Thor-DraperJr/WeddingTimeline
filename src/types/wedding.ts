export interface WeddingEvent {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  date: string;
  startTime?: string; // Full datetime string for computed events
  description?: string;
  location?: EventLocation;
  category: EventCategory;
  participants?: string[];
  responsibility?: string;
  icon: EventIcon;
  isPrivate?: boolean; // For bride/groom specific events
  notes?: string[];
}

export interface EventLocation {
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  googleMapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type EventCategory =
  | 'preparation'
  | 'ceremony'
  | 'reception'
  | 'transportation'
  | 'photography'
  | 'dining'
  | 'rehearsal';

export type EventIcon =
  | 'heart'
  | 'camera'
  | 'utensils'
  | 'car'
  | 'music'
  | 'users'
  | 'clock'
  | 'map-pin'
  | 'sparkles'
  | 'rings'
  | 'church'
  | 'bouquet'
  | 'cake'
  | 'wine'
  | 'makeup'
  | 'mountain';

export interface WeddingDay {
  date: string;
  title: string;
  description?: string;
  events: WeddingEvent[];
}

export interface WeddingTimeline {
  coupleNames: string;
  weddingDate: string;
  days: WeddingDay[];
  metadata: {
    timezone: string;
    lastUpdated: string;
    version: string;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  dateTime: string;
  description?: string;
  location?: EventLocation;
  category: EventCategory;
  icon: EventIcon;
  notes?: string[];
}

export interface CurrentEventStatus {
  currentEvent?: WeddingEvent;
  nextEvent?: WeddingEvent;
  isEventActive: boolean;
  timeUntilNext?: string;
}
