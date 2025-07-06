'use client';

import React from 'react';
import { EventCategory } from '@/types/wedding';

interface CategoryFilterProps {
  selectedCategories: EventCategory[];
  onCategoryToggle: (category: EventCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryToggle,
}) => {
  const categories: {
    key: EventCategory;
    label: string;
    color: string;
    icon: string;
  }[] = [
    {
      key: 'preparation',
      label: 'Preparation',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: '✨',
    },
    {
      key: 'ceremony',
      label: 'Ceremony',
      color: 'bg-rose-100 text-rose-700 border-rose-200',
      icon: '💍',
    },
    {
      key: 'reception',
      label: 'Reception',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: '🎉',
    },
    {
      key: 'transportation',
      label: 'Transport',
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: '🚗',
    },
    {
      key: 'photography',
      label: 'Photos',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: '📸',
    },
    {
      key: 'dining',
      label: 'Dining',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      icon: '🍽️',
    },
    {
      key: 'rehearsal',
      label: 'Rehearsal',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: '🎭',
    },
  ];

  return (
    <div className="category-filter">
      <div className="flex items-center mb-3">
        <svg
          className="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <h3 className="text-sm font-medium text-gray-700">
          Filter by Category
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={() =>
              selectedCategories.forEach((cat) => onCategoryToggle(cat))
            }
            className="ml-auto text-xs text-gray-500 hover:text-rose-600 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.key);

          return (
            <button
              key={category.key}
              onClick={() => onCategoryToggle(category.key)}
              className={`
                inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  isSelected
                    ? `${category.color} shadow-md transform scale-105`
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              {isSelected && (
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          Showing {selectedCategories.length} categor
          {selectedCategories.length === 1 ? 'y' : 'ies'}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
