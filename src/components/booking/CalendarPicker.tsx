import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  // Base month: October 2026 as per prompt example
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const formatDayDateString = (day: number) => {
    const m = (currentMonth + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  return (
    <div className="bg-surface rounded-2xl border border-border/80 p-5 sm:p-6 shadow-soft">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-text-primary tracking-tight">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevMonth}
            className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-text-secondary hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Tháng trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-text-secondary hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Tháng sau"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs font-semibold text-text-muted py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-10" />;
          }

          const dateStr = formatDayDateString(day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              aria-pressed={isSelected}
              aria-label={`${day} ${monthNames[currentMonth].toLowerCase()} ${currentYear}`}
              onClick={() => onSelectDate(dateStr)}
              className={`h-10 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center transition-all duration-200 relative ${
                isSelected
                  ? 'bg-terracotta text-white font-bold shadow-soft scale-105'
                  : 'hover:bg-soft-surface text-text-primary hover:text-terracotta'
              }`}
            >
              <span>{day}</span>
              {/* Subtle indicator for dates with high slot availability */}
              {!isSelected && (day === 17 || day === 18 || day === 24) && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-terracotta/70" />
              )}
            </button>
          );
        })}
      </div>

      {/* Calendar note */}
      <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between text-[11px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-terracotta" />
          <span>Ngày đang chọn</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70" />
          <span>Còn nhiều khung giờ</span>
        </span>
      </div>
    </div>
  );
};
