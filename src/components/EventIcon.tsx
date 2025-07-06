'use client';

import React from 'react';
import { EventIcon as EventIconType } from '@/types/wedding';

// Import wedding-appropriate icons from React Icons
import {
  GiChurch,
  GiDiamondRing,
  GiFlowers,
  GiWineGlass,
  GiPartyPopper,
  GiMusicalNotes,
  GiCakeSlice,
} from 'react-icons/gi';
import {
  MdLocalDining,
  MdDirectionsBus,
  MdCameraAlt,
  MdGroup,
  MdAccessTime,
  MdLocationOn,
  MdFavorite,
  MdFace,
} from 'react-icons/md';
import {
  FaHeart,
  FaCamera,
  FaUtensils,
  FaCar,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaRing,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

interface EventIconProps {
  icon: EventIconType;
  className?: string;
}

const EventIcon: React.FC<EventIconProps> = ({
  icon,
  className = 'w-6 h-6',
}) => {
  const icons: Record<EventIconType, JSX.Element> = {
    heart: <FaHeart className={`${className} text-rose-500`} />,
    camera: <MdCameraAlt className={`${className} text-indigo-600`} />,
    utensils: <FaUtensils className={`${className} text-amber-600`} />,
    car: <FaCar className={`${className} text-blue-600`} />,
    music: <GiMusicalNotes className={`${className} text-purple-600`} />,
    users: <MdGroup className={`${className} text-green-600`} />,
    clock: <FaClock className={`${className} text-gray-600`} />,
    'map-pin': <MdLocationOn className={`${className} text-red-500`} />,
    sparkles: <HiSparkles className={`${className} text-yellow-500`} />,
    rings: <GiDiamondRing className={`${className} text-rose-600`} />,
    church: <GiChurch className={`${className} text-gray-700`} />,
    bouquet: <GiFlowers className={`${className} text-pink-500`} />,
    cake: <GiCakeSlice className={`${className} text-pink-400`} />,
    wine: <GiWineGlass className={`${className} text-red-600`} />,
    makeup: <MdFace className={`${className} text-rose-400`} />,
  };

  return icons[icon] || icons.heart;
};

export default EventIcon;
