import { assetUrl } from '../utils/assetUrl';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBooking } from '../state/BookingContext';
import { SERVICES } from '../data/mockData';
import { CalendarPicker } from '../components/booking/CalendarPicker';
import { TimeSlotPicker } from '../components/booking/TimeSlotPicker';
import { BookingProgress } from '../components/booking/BookingProgress';
import { Stylist } from '../types';

export const DateTimeSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedService,
    selectedStylist,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
  } = useBooking();

  const currentService = selectedService || SERVICES[0];
  const isAnyStylist = selectedStylist === 'any' || !selectedStylist;
  const currentStylist = isAnyStylist
    ? { name: 'Sol chọn giúp (Stylist phù hợp)', title: 'Chuyên viên chỉ định', avatar: assetUrl('sol-logo.png') }
    : (selectedStylist as Stylist);

  const activeDate = selectedDate || '2026-10-17';
  const activeTime = selectedTime || '14:30';

  const handleContinue = () => {
    if (!selectedDate) setSelectedDate('2026-10-17');
    if (!selectedTime) setSelectedTime('14:30');
    navigate('/booking/summary');
  };

  // Format active date display
  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T00:00:00');
      const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const dayName = days[d.getDay()];
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      return `${dayName}, ${day}/${month}/${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress */}
        <BookingProgress currentStep={3} />

        {/* Current Booking Context Card */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface rounded-2xl p-4 sm:p-5 border border-border/80 shadow-soft-sm">
          {/* Selected Service */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-soft-surface shrink-0">
              <img
                src={currentService.image}
                alt={currentService.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                Dịch vụ
              </span>
              <h4 className="font-serif text-base font-medium text-text-primary leading-tight">
                {currentService.name}
              </h4>
              <p className="text-xs text-text-secondary mt-0.5">
                {currentService.duration} • <span className="text-terracotta font-semibold">{currentService.formattedPrice}</span>
              </p>
            </div>
          </div>

          {/* Selected Stylist */}
          <div className="flex items-center justify-between sm:border-l sm:border-border/60 sm:pl-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-soft-surface border border-border shrink-0">
                <img
                  src={currentStylist.avatar}
                  alt={currentStylist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">
                  Stylist đồng hành
                </span>
                <h4 className="font-serif text-base font-medium text-text-primary leading-tight">
                  {currentStylist.name}
                </h4>
                <p className="text-xs text-text-secondary mt-0.5">
                  {currentStylist.title}
                </p>
              </div>
            </div>

            <Link
              to="/booking/stylist"
              className="text-xs text-terracotta hover:underline font-medium shrink-0 ml-2"
            >
              Chọn lại
            </Link>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase block mb-2">
            Bước 3 / 4 — Thời gian
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight leading-tight">
            Chọn một khoảng thời gian <br className="hidden sm:block" />
            <span className="italic font-light">thuận tiện cho bạn.</span>
          </h1>
          <p className="mt-3 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Đang chọn:{' '}
            <span className="font-medium text-terracotta">
              {activeTime} • {formatDateDisplay(activeDate)}
            </span>
          </p>
        </div>

        {/* Interactive Calendar and Time Slots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Calendar Picker (7 cols) */}
          <div className="lg:col-span-7">
            <CalendarPicker
              selectedDate={activeDate}
              onSelectDate={(d) => setSelectedDate(d)}
            />
          </div>

          {/* Time Slots (5 cols) */}
          <div className="lg:col-span-5">
            <TimeSlotPicker
              selectedTime={activeTime}
              onSelectTime={(t) => setSelectedTime(t)}
            />
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mt-10 pt-6 border-t border-border/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <Link
            to="/booking/stylist"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors py-2 px-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Chọn lại stylist</span>
          </Link>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-medium text-sm sm:text-base tracking-wide shadow-soft transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Tiếp tục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
