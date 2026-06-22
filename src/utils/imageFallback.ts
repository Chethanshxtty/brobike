import React from 'react';

export const getFallbackImage = (category: string): string => {
  switch (category?.toLowerCase()) {
    case 'sport':
      return '/sport-bike.png';
    case 'adventure':
      return '/adventure-bike.png';
    case 'electric':
      return '/electric-bike.png';
    case 'premium':
      return '/premium-bike.png';
    case 'mileage':
      return '/mileage-bike.png';
    default:
      return '/sport-bike.png';
  }
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  category: string
) => {
  e.currentTarget.src = getFallbackImage(category);
};
