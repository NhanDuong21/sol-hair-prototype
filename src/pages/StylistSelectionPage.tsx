import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../state/BookingContext';
import { STYLISTS, SERVICES } from '../data/mockData';
import { Stylist } from '../types';
import { StylistCard } from '../components/booking/StylistCard';
import { BookingProgress } from '../components/booking/BookingProgress';

export const StylistSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedService, selectedStylist, setSelectedStylist } = useBooking();

  // If no service selected, fallback to first service
  const currentService = selectedService || SERVICES[0];

  const handleSelectStylist = (stylist: Stylist) => {
    setSelectedStylist(stylist);
    navigate('/booking/time');
  };

  const handleSolSelectForMe = () => {
    setSelectedStylist('any');
    navigate('/booking/time');
  };

  const isAnySelected = selectedStylist === 'any';

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Progress */}
        <BookingProgress currentStep={2} />

        {/* Selected Service Context Pill */}
        <div className="mb-6 flex items-center justify-between bg-surface rounded-2xl p-4 border border-border/80 shadow-soft-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-soft-surface shrink-0">
              <img
                src={currentService.image}
                alt={currentService.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">
                Dịch vụ đã chọn
              </span>
              <h4 className="font-serif text-base sm:text-lg font-medium text-text-primary leading-tight">
                {currentService.name}
              </h4>
              <div className="text-xs text-text-secondary mt-0.5">
                <span>{currentService.duration}</span> • <span className="text-terracotta font-semibold">{currentService.formattedPrice}</span>
              </div>
            </div>
          </div>

          <Link
            to="/services"
            className="text-xs text-terracotta hover:underline font-medium px-3 py-1.5 rounded-lg hover:bg-terracotta/5 transition-colors"
          >
            Đổi dịch vụ
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase block mb-2">
            Bước 2 / 4 — Stylist
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight leading-tight">
            Chọn người bạn muốn <br className="hidden sm:block" />
            <span className="italic font-light">gửi mái tóc hôm nay.</span>
          </h1>
          <p className="mt-3 text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Các chuyên viên tại Sol đều được đào tạo chuyên sâu và sở hữu gu thẩm mỹ tinh tế.
          </p>
        </div>

        {/* Stylists List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STYLISTS.map((stylist) => {
            const isSelected = selectedStylist !== 'any' && selectedStylist?.id === stylist.id;
            return (
              <StylistCard
                key={stylist.id}
                stylist={stylist}
                isSelected={isSelected}
                onSelect={handleSelectStylist}
              />
            );
          })}
        </div>

        {/* Option: Sol chọn giúp */}
        <div className="mt-10 bg-soft-surface/80 rounded-2xl p-6 border border-border/80 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <h4 className="font-serif text-xl font-medium text-text-primary">
              Không có stylist yêu thích?
            </h4>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Hãy để Sol chỉ định chuyên viên có lịch trình và chuyên môn phù hợp nhất cho dịch vụ <span className="font-medium text-text-primary">"{currentService.name}"</span> của bạn.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSolSelectForMe}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isAnySelected
                    ? 'bg-terracotta text-white shadow-soft font-semibold'
                    : 'bg-white hover:bg-white/80 border border-border text-text-primary hover:border-terracotta hover:text-terracotta'
                }`}
              >
                Sol chọn giúp →
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại chọn dịch vụ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
