import React from 'react';
import { Check, Star, Scissors } from 'lucide-react';
import { Stylist } from '../../types';

interface StylistCardProps {
  stylist: Stylist;
  isSelected: boolean;
  onSelect: (stylist: Stylist) => void;
}

export const StylistCard: React.FC<StylistCardProps> = ({
  stylist,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(stylist)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(stylist);
        }
      }}
      className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border text-left flex flex-col justify-between ${
        isSelected
          ? 'bg-surface border-terracotta ring-2 ring-terracotta/20 shadow-soft-lg'
          : 'bg-surface border-border/80 hover:border-terracotta/40 hover:bg-soft-surface/30 shadow-soft'
      }`}
    >
      {/* Selection Badge */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-terracotta text-white flex items-center justify-center shadow-sm">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      )}

      <div>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-soft-surface border border-border/80 shrink-0">
            <img
              src={stylist.avatar}
              alt={stylist.name}
              className="w-full h-full object-cover img-editorial-zoom"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-terracotta font-medium mb-0.5">
              <span>{stylist.title}</span>
              <span>•</span>
              <span className="text-text-muted">{stylist.experience}</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-text-primary tracking-tight">
              {stylist.name}
            </h3>
            {stylist.rating && (
              <div className="flex items-center gap-1 mt-1 text-xs text-amber-700 font-medium">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{stylist.rating.toFixed(1)}</span>
                <span className="text-text-muted font-normal">(Đánh giá hàng đầu)</span>
              </div>
            )}
          </div>
        </div>

        {/* Focus tag */}
        <div className="mt-4 pt-3.5 border-t border-border/50">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-surface border border-border/60 text-xs text-text-primary font-medium">
            <Scissors className="w-3 h-3 text-terracotta" />
            <span>Focus: {stylist.focus}</span>
          </div>
          <p className="mt-2.5 text-xs sm:text-[13px] text-text-secondary leading-relaxed">
            {stylist.bio}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3 flex items-center justify-between text-xs">
        <span
          className={`font-medium ${
            isSelected ? 'text-terracotta' : 'text-text-secondary'
          }`}
        >
          {isSelected ? 'Đang chọn stylist này' : 'Nhấn để chọn'}
        </span>
        <span
          className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            isSelected
              ? 'bg-terracotta text-white'
              : 'border border-border text-text-primary hover:border-terracotta hover:text-terracotta'
          }`}
        >
          {isSelected ? 'Đã chọn' : 'Chọn stylist'}
        </span>
      </div>
    </div>
  );
};
