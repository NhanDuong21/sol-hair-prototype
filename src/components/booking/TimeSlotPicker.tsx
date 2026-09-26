import React from 'react';
import { Clock, Sun, Moon } from 'lucide-react';
import { TIME_SLOTS } from '../../data/mockData';

interface TimeSlotPickerProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedTime,
  onSelectTime,
}) => {
  const morningSlots = TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) < 12);
  const afternoonSlots = TIME_SLOTS.filter((t) => parseInt(t.split(':')[0], 10) >= 12);

  return (
    <div className="bg-surface rounded-2xl border border-border/80 p-5 sm:p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-text-primary">
        <Clock className="w-4 h-4 text-terracotta" />
        <span>Khung giờ khả dụng</span>
      </div>

      {/* Morning Section */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2 font-medium">
          <Sun className="w-3.5 h-3.5 text-amber-600" />
          <span>Buổi sáng</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {morningSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectTime(slot)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-terracotta text-white border-terracotta shadow-soft font-semibold scale-102'
                    : 'bg-soft-surface/50 border-border/80 text-text-primary hover:border-terracotta/50 hover:bg-soft-surface'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Afternoon Section */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted mb-2 font-medium">
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Buổi chiều</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {afternoonSlots.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectTime(slot)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-terracotta text-white border-terracotta shadow-soft font-semibold scale-102'
                    : 'bg-soft-surface/50 border-border/80 text-text-primary hover:border-terracotta/50 hover:bg-soft-surface'
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-border/50 text-[11px] text-text-secondary leading-relaxed">
        * Sol giữ chỗ tối đa 15 phút sau giờ hẹn đã đăng ký. Vui lòng đến sớm 5 phút để được đón tiếp chu đáo nhất.
      </div>
    </div>
  );
};
