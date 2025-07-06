import { WeddingTimeline, WeddingEvent, EventLocation } from '@/types/wedding';
import { config } from '@/utils/config';

// Location data - using secure config for any API integrations
const locations: Record<string, EventLocation> = {
  samsara: {
    name: 'Samsara Properties',
    address: '108 Montane Road, Unit 1',
    city: 'Canmore',
    province: 'AB',
    postalCode: 'T1W 3J2',
    country: 'Canada',
    googleMapsUrl: config.getGoogleMapsUrl(
      '108 Montane Road Unit 1 Canmore AB T1W 3J2 Canada'
    ),
    coordinates: { lat: 51.0918, lng: -115.3654 },
  },
  tunnelMountain: {
    name: 'Tunnel Mountain Reservoir',
    address: '190 Tunnel Mountain Dr',
    city: 'Banff',
    province: 'AB',
    postalCode: 'T1L 1K2',
    country: 'Canada',
    googleMapsUrl: config.getGoogleMapsUrl(
      '190 Tunnel Mountain Dr Banff AB T1L 1K2 Canada'
    ),
    coordinates: { lat: 51.1784, lng: -115.5708 },
  },
  murrietas: {
    name: "Murrieta's Mountain Bar & Grill",
    address: '737 8 St #200',
    city: 'Canmore',
    province: 'AB',
    postalCode: 'T1W 2B6',
    country: 'Canada',
    googleMapsUrl: config.getGoogleMapsUrl(
      '737 8 St 200 Canmore AB T1W 2B6 Canada'
    ),
    coordinates: { lat: 51.0918, lng: -115.3654 },
  },
  highRollers: {
    name: 'High Rollers',
    address: '110 Banff Ave',
    city: 'Banff',
    province: 'AB',
    postalCode: 'T1L 1A4',
    country: 'Canada',
    googleMapsUrl: config.getGoogleMapsUrl(
      '110 Banff Ave Banff AB T1L 1A4 Canada'
    ),
    coordinates: { lat: 51.1784, lng: -115.5708 },
  },
};

export const carolinaAndThorWedding: WeddingTimeline = {
  coupleNames: config.getWeddingConfig().coupleNames,
  weddingDate: config.getWeddingConfig().date,
  days: [
    {
      date: '2025-07-10',
      title: 'Welcome Events',
      description: 'Night before the big day - rehearsal and welcome dinner',
      events: [
        {
          id: 'rehearsal_001',
          title: 'Ceremony Rehearsal',
          time: '16:30',
          date: '2025-07-10',
          description: 'Bride, Groom and parents practice for the ceremony',
          location: locations.tunnelMountain,
          category: 'rehearsal',
          icon: 'church',
        },
        {
          id: 'welcome_dinner_001',
          title: 'Welcome Dinner',
          time: '18:00',
          endTime: '21:00',
          date: '2025-07-10',
          description: 'Welcome dinner for all wedding guests',
          location: locations.highRollers,
          category: 'dining',
          icon: 'utensils',
        },
      ],
    },
    {
      date: '2025-07-11',
      title: 'Wedding Day',
      description: 'The big day - ceremony and celebration',
      events: [
        // Bride's Timeline
        {
          id: 'bride_prep_001',
          title: 'Bride Wakes Up & Breakfast',
          time: '06:30',
          date: '2025-07-11',
          description: 'Have a good breakfast as you will be busy later on',
          location: locations.samsara,
          category: 'preparation',
          icon: 'heart',
        },
        {
          id: 'hair_makeup_001',
          title: 'Hair & Makeup Begins',
          time: '07:00',
          date: '2025-07-11',
          description: 'Hair and makeup for the ladies',
          location: locations.samsara,
          category: 'preparation',
          participants: [
            'Inga',
            'Sarah',
            'Iris',
            'Lauren',
            'Karen',
            'Carolina',
            'Rachel V.',
            'Rachel G.',
            'Marissa',
          ],
          icon: 'makeup',
        },
        {
          id: 'transport001',
          title: 'Shuttle to Ceremony',
          time: '11:00',
          date: '2025-07-11',
          description: 'Shuttle transport to ceremony venue',
          location: locations.samsara,
          category: 'transportation',
          responsibility: 'Patagonia Shuttle',
          icon: 'car',
          notes: ['Shuttle pickup at Samsara Properties'],
        },
        // Ceremony
        {
          id: 'ceremony_001',
          title: 'Wedding Ceremony',
          time: '12:00',
          endTime: '12:30',
          date: '2025-07-11',
          description: 'The wedding ceremony begins with processional',
          location: locations.tunnelMountain,
          category: 'ceremony',
          icon: 'rings',
        },
        {
          id: 'family_photos_001',
          title: 'Family Photos',
          time: '12:30',
          endTime: '13:00',
          date: '2025-07-11',
          description: 'Family photography session',
          location: locations.tunnelMountain,
          category: 'photography',
          icon: 'camera',
        },
        {
          id: 'couple_photos_001',
          title: 'Couple Photo Session',
          time: '13:00',
          endTime: '15:30',
          date: '2025-07-11',
          description: 'Intimate photo and video session for the couple',
          location: locations.tunnelMountain,
          category: 'photography',
          icon: 'camera',
        },
        // Reception
        {
          id: 'cocktails_001',
          title: 'Cocktail Hour',
          time: '16:00',
          date: '2025-07-11',
          description: 'Cocktails and mingling begin',
          location: locations.murrietas,
          category: 'reception',
          icon: 'wine',
        },
        {
          id: 'dinner_001',
          title: 'Reception Dinner',
          time: '17:00',
          date: '2025-07-11',
          description: 'Three-course dinner service',
          location: locations.murrietas,
          category: 'dining',
          icon: 'utensils',
          notes: [
            '1st course: Artisan Salad or Daily Soup',
            '2nd course: Grilled Chicken Supreme, Tenderloin, or Pasta Primavera (vegetarian)',
            '3rd course: Honey Brown Butter Custard',
          ],
        },
      ],
    },
  ],
  metadata: {
    timezone: config.getWeddingConfig().timezone,
    lastUpdated: '2025-07-05T10:00:00Z',
    version: '1.0.0',
  },
};

// Export functions to get the data
export const getWeddingTimeline = (): (WeddingEvent & {
  startTime: string;
  endTime?: string;
})[] => {
  // Flatten all events from all days
  const allEvents: (WeddingEvent & { startTime: string; endTime?: string })[] =
    [];

  carolinaAndThorWedding.days.forEach((day) => {
    day.events.forEach((event) => {
      allEvents.push({
        ...event,
        // Convert time to full datetime
        startTime: `${day.date}T${event.time}:00`,
        endTime: event.endTime ? `${day.date}T${event.endTime}:00` : undefined,
      });
    });
  });

  return allEvents.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
};

export const getWeddingTimelineStructured = (): WeddingTimeline => {
  return carolinaAndThorWedding;
};

export { locations };
