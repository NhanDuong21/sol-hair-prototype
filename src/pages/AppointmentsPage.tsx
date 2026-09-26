import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, X } from 'lucide-react';
import { useBooking } from '../state/BookingContext';
import { SERVICES } from '../data/mockData';
import { Appointment } from '../types';

export const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment, setSelectedService, setSelectedDate, setSelectedTime } = useBooking();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedAptDetail, setSelectedAptDetail] = useState<Appointment | null>(null);

  const upcomingAppointments = appointments.filter((a) => a.status === 'upcoming');
  const completedAppointments = appointments.filter((a) => a.status === 'completed');

  const currentList = activeTab === 'upcoming' ? upcomingAppointments : completedAppointments;

  const handleReschedule = (apt: Appointment) => {
    const service = SERVICES.find((s) => s.id === apt.serviceId) || SERVICES[0];
    setSelectedService(service);
    setSelectedDate(apt.date);
    setSelectedTime(apt.time);
    navigate('/booking/time');
  };

  const handleRebook = (apt: Appointment) => {
    const service = SERVICES.find((s) => s.id === apt.serviceId) || SERVICES[0];
    setSelectedService(service);
    navigate('/booking/stylist');
  };

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase block mb-2">
            Lịch hẹn của tôi
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight">
            Những cuộc hẹn <br className="hidden sm:block" />
            <span className="italic font-light">đang chờ bạn.</span>
          </h1>
          <p className="mt-2.5 text-sm text-text-secondary max-w-lg leading-relaxed">
            Theo dõi, điều chỉnh lịch hẹn hoặc đặt lại dịch vụ yêu thích tại Sol Hair Studio.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-3 border-b border-border/80 pb-4 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'upcoming'
                ? 'bg-terracotta text-white shadow-soft font-semibold'
                : 'bg-surface text-text-secondary hover:text-text-primary border border-border/80'
            }`}
          >
            Sắp tới ({upcomingAppointments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'completed'
                ? 'bg-terracotta text-white shadow-soft font-semibold'
                : 'bg-surface text-text-secondary hover:text-text-primary border border-border/80'
            }`}
          >
            Đã hoàn tất ({completedAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        {currentList.length > 0 ? (
          <div className="space-y-5">
            {currentList.map((apt) => {
              const isUpcoming = apt.status === 'upcoming';

              return (
                <div
                  key={apt.id}
                  className="bg-surface rounded-3xl border border-border/80 hover:border-terracotta/40 p-5 sm:p-7 shadow-soft transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-5 border-b border-border/50">
                    {/* Left: Date Badge + Details */}
                    <div className="flex items-start gap-4">
                      {/* Date Badge */}
                      <div className="w-16 h-16 rounded-2xl bg-soft-surface border border-border/80 flex flex-col items-center justify-center shrink-0 text-center">
                        <span className="font-serif text-2xl font-bold text-text-primary leading-none">
                          {apt.dayOfMonth}
                        </span>
                        <span className="text-[10px] font-semibold tracking-wider text-terracotta uppercase mt-1">
                          {apt.monthLabel}
                        </span>
                      </div>

                      <div className="hidden md:block w-24 h-24 rounded-2xl overflow-hidden bg-soft-surface border border-border/70 shrink-0">
                        <img src={apt.serviceImage} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                              isUpcoming
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-status-success-bg text-status-success'
                            }`}
                          >
                            {isUpcoming ? 'SẮP TỚI' : 'HOÀN TẤT'}
                          </span>
                          <span className="text-xs text-text-muted">
                            {apt.formattedDate}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-text-primary">
                          {apt.serviceName}
                        </h3>

                        <div className="mt-1 text-xs sm:text-sm text-text-secondary flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>Stylist: <strong className="text-text-primary">{apt.stylistName}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-terracotta" />
                            {apt.time} ({apt.duration})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price */}
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs text-text-muted block">Tổng chi phí</span>
                      <span className="font-sans font-bold text-xl text-terracotta">
                        {apt.formattedPrice}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      <span>128 Nguyễn Đình Chiểu, Quận 3, TP.HCM</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {isUpcoming ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleReschedule(apt)}
                            className="button-secondary min-h-11 px-4 text-sm"
                          >
                            Đổi lịch
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedAptDetail(apt)}
                            className="button-secondary min-h-11 px-4 text-sm"
                          >
                            Xem chi tiết
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setSelectedAptDetail(apt)}
                            className="button-secondary min-h-11 px-4 text-sm"
                          >
                            Xem chi tiết
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRebook(apt)}
                            className="button-primary min-h-11 px-4 text-sm"
                          >
                            Đặt lại
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-surface rounded-2xl p-12 text-center border border-border/80 shadow-soft">
            <Calendar className="w-12 h-12 text-text-muted mx-auto mb-3" />
            <h3 className="font-serif text-xl font-medium text-text-primary">
              {activeTab === 'upcoming' ? 'Chưa có lịch hẹn sắp tới' : 'Chưa có lịch hẹn đã hoàn tất'}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary max-w-sm mx-auto">
              Hãy chọn cho mình một dịch vụ ưng ý để làm mới mái tóc và diện mạo hôm nay.
            </p>
            <div className="mt-6">
              <Link
                to="/services"
                className="px-6 py-2.5 rounded-full bg-terracotta text-white text-xs sm:text-sm font-medium hover:bg-terracotta-dark transition-colors inline-block"
              >
                Khám phá dịch vụ
              </Link>
            </div>
          </div>
        )}

        {/* Appointment Detail Modal / Sheet */}
        {selectedAptDetail && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-surface max-w-md w-full rounded-3xl p-6 sm:p-7 border border-border shadow-soft-lg relative">
              <button
                type="button"
                onClick={() => setSelectedAptDetail(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-soft-surface flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta block mb-1">
                Chi tiết lịch hẹn #{selectedAptDetail.id}
              </span>
              <h3 className="font-serif text-2xl font-medium text-text-primary mb-4">
                {selectedAptDetail.serviceName}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm border-t border-b border-border/60 py-4 my-4">
                <div className="flex justify-between">
                  <span className="text-text-muted">Stylist:</span>
                  <span className="font-medium text-text-primary">{selectedAptDetail.stylistName} ({selectedAptDetail.stylistTitle})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Thời gian:</span>
                  <span className="font-medium text-terracotta">{selectedAptDetail.time} • {selectedAptDetail.formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Thời lượng:</span>
                  <span className="text-text-primary">{selectedAptDetail.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Trạng thái:</span>
                  <span className="font-bold text-amber-700">
                    {selectedAptDetail.status === 'upcoming' ? 'Sắp tới (Đã xác nhận)' : 'Đã hoàn tất'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Hình thức thanh toán:</span>
                  <span className="text-text-primary">Thanh toán tại quầy lễ tân</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Chi phí dự kiến:</span>
                  <span className="font-sans font-bold text-base text-terracotta">{selectedAptDetail.formattedPrice}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                {selectedAptDetail.status === 'upcoming' && (
                  <button
                    type="button"
                    onClick={() => {
                      cancelAppointment(selectedAptDetail.id);
                      setSelectedAptDetail(null);
                    }}
                    className="flex-1 py-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-colors"
                  >
                    Hủy lịch hẹn này
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedAptDetail(null)}
                  className="flex-1 py-2.5 rounded-full bg-terracotta text-white hover:bg-terracotta-dark text-xs font-medium transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
