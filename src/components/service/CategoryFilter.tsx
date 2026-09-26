import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { ServiceCategoryId } from '../../types';

interface CategoryFilterProps {
  activeCategory: ServiceCategoryId;
  onSelectCategory: (category: ServiceCategoryId) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div role="group" aria-label="Lọc dịch vụ theo danh mục" className="flex items-center gap-2.5 overflow-x-auto pb-2 py-1">
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            aria-pressed={isActive}
            className={`min-h-10 whitespace-nowrap px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-terracotta-dark text-white shadow-soft-sm'
                : 'bg-white/60 hover:bg-white text-text-secondary hover:text-text-primary border border-border/80'
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};
