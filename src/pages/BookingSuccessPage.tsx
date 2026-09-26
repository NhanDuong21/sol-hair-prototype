import { assetUrl } from '../utils/assetUrl';
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useBooking } from '../state/BookingContext';

export const BookingSuccessPage: React.FC = () => {
  const { appointments } = useBooking();

  // Latest appointment
  const latestAppointment = appointments[0] || {
    serviceName: 'Cắt & tạo kiểu',
    stylistName: 'Minh Anh',
    stylistTitle: 'Senior Stylist',
    formattedDate: 'Thứ Bảy, 17/10/2026',
    time: '14:30',
    duration: '45–60 phút',
    formattedPrice: '450.000đ',
  };

  return (
    <div className="min-h-0 py-12 sm:py-14 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
        {/* Subtle, tasteful brand mark */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-surface border border-border/80 shadow-soft mb-6 p-2">
            <img
              src={assetUrl('sol-logo.png')}
              alt="Sol Hair Studio"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="text-xs font-semibold tracking-[0.3em] text-terracotta uppercase block mb-2">
            Lịch hẹn thành công
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight">
            Hẹn bạn tại Sol.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-md mx-auto">
            Lịch hẹn của bạn đã được ghi nhận. <br />
            Sol sẽ chuẩn bị mọi thứ trước khi bạn đến.
          </p>
        </div>

        {/* Appointment Recap Card */}
        <div className="mt-8 bg-surface rounded-3xl border border-border/80 p-6 sm:p-8 shadow-soft-lg">
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Tóm tắt phiếu hẹn
            </span>
            <span className="text-xs text-status-success font-semibold px-2.5 py-0.5 rounded-full bg-status-success-bg border border-status-success/20">
              ĐÃ XÁC NHẬN
            </span>
          </div>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Dịch vụ:</span>
              <span className="font-serif text-lg font-medium text-text-primary">
                {latestAppointment.serviceName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Stylist:</span>
              <span className="font-medium text-text-primary">
                {latestAppointment.stylistName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Thời gian:</span>
              <span className="font-medium text-terracotta">
                {latestAppointment.time} • {latestAppointment.formattedDate}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Thời lượng dự kiến:</span>
              <span className="text-text-primary">{latestAppointment.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-muted">Tổng chi phí:</span>
              <span className="font-sans font-bold text-lg text-text-primary">
                {latestAppointment.formattedPrice}
              </span>
            </div>

            <div className="pt-3 border-t border-border/50 flex items-start gap-2.5 text-xs text-text-secondary">
              <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <span>128 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/appointments"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-medium text-sm tracking-wide shadow-soft-sm transition-all text-center"
          >
            Xem lịch hẹn
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-surface hover:bg-soft-surface text-text-primary border border-border font-medium text-sm tracking-wide transition-all text-center"
          >
            Về dịch vụ
          </Link>
        </div>

        {/* Editorial signoff */}
        <div className="mt-12 text-center">
          <span className="font-editorial-script text-xl text-text-secondary/70">
            Beauty shines within
          </span>
        </div>
      </div>
    </div>
  );
};
