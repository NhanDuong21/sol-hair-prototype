import { assetUrl } from '../utils/assetUrl';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { useBooking } from '../state/BookingContext';
import { SERVICES } from '../data/mockData';
import { BookingProgress } from '../components/booking/BookingProgress';
import { Stylist } from '../types';

export const BookingSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedService, selectedStylist, selectedDate, selectedTime, userProfile, confirmBooking } = useBooking();
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentService = selectedService || SERVICES[0];
  const currentStylist = selectedStylist && selectedStylist !== 'any'
    ? selectedStylist as Stylist
    : { name: 'Sol chọn giúp', title: 'Chuyên viên chỉ định', avatar: assetUrl('sol-logo.png') };
  const chosenDateStr = selectedDate || '2026-10-17';
  const date = new Date(`${chosenDateStr}T00:00:00`);
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const formattedDate = `${days[date.getDay()]}, ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

  const handleConfirm = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      confirmBooking();
      navigate('/booking/success');
    }, 300);
  };

  return (
    <div className="min-h-screen pb-24 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingProgress currentStep={4} />

        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-[0.22em] text-terracotta uppercase block mb-2">Bước 4 / 4 — Kiểm tra thông tin</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight">Mọi thứ đã sẵn sàng.</h1>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed">Vui lòng kiểm tra lại chi tiết buổi hẹn trước khi gửi xác nhận đến Sol Hair Studio.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(290px,0.85fr)] gap-6 lg:gap-8 items-start">
          <div className="space-y-6">
            <section className="bg-surface rounded-3xl border border-border/80 shadow-soft overflow-hidden">
              <div className="bg-soft-surface px-5 sm:px-7 py-4 border-b border-border/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Thông tin buổi hẹn</span>
              </div>
              <div className="p-5 sm:p-7 space-y-5">
                <div className="flex items-start gap-4 pb-5 border-b border-border/50">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-soft-surface shrink-0 border border-border/80">
                    <img src={currentService.image} alt={currentService.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-text-muted">Dịch vụ</span>
                    <h2 className="font-serif text-xl sm:text-2xl font-medium text-text-primary mt-0.5">{currentService.name}</h2>
                    <div className="flex items-center gap-1.5 text-sm text-text-secondary mt-1"><Clock className="w-4 h-4 text-terracotta" /><span>{currentService.duration}</span></div>
                  </div>
                  <Link to="/services" className="button-ghost whitespace-nowrap text-xs">Thay đổi</Link>
                </div>

                <div className="flex items-start gap-4 pb-5 border-b border-border/50">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-soft-surface shrink-0 border border-border/80">
                    <img src={currentStylist.avatar} alt={currentStylist.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-text-muted">Stylist phụ trách</span>
                    <h2 className="font-serif text-xl sm:text-2xl font-medium text-text-primary mt-0.5">{currentStylist.name}</h2>
                    <p className="text-sm text-text-secondary mt-1">{currentStylist.title}</p>
                  </div>
                  <Link to="/booking/stylist" className="button-ghost whitespace-nowrap text-xs">Thay đổi</Link>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-canvas border border-border/80 flex flex-col items-center justify-center shrink-0 text-text-primary">
                    <Calendar className="w-5 h-5 text-terracotta mb-0.5" aria-hidden="true" />
                    <span className="text-[10px] font-bold tracking-tight">SOL</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase tracking-wider text-text-muted">Thời gian hẹn</span>
                    <h2 className="font-serif text-xl sm:text-2xl font-medium text-text-primary mt-0.5">{selectedTime || '14:30'} · {formattedDate}</h2>
                    <div className="flex items-start gap-2 text-sm text-text-secondary mt-1"><MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" /><span>128 Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh</span></div>
                  </div>
                  <Link to="/booking/time" className="button-ghost whitespace-nowrap text-xs">Thay đổi</Link>
                </div>
              </div>
            </section>

            <section className="bg-surface rounded-3xl border border-border/80 shadow-soft p-5 sm:p-7">
              <h2 className="font-serif text-2xl font-medium text-text-primary">Thông tin của bạn</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-soft-surface/70 p-3.5"><span className="block text-xs text-text-muted">Họ và tên</span><span className="font-medium text-text-primary">{userProfile.name}</span></div>
                <div className="rounded-xl bg-soft-surface/70 p-3.5"><span className="block text-xs text-text-muted">Số điện thoại</span><span className="font-medium text-text-primary">{userProfile.phone}</span></div>
                <div className="rounded-xl bg-soft-surface/70 p-3.5 sm:col-span-2"><span className="block text-xs text-text-muted">Email</span><span className="font-medium text-text-primary break-all">{userProfile.email}</span></div>
              </div>
              <label htmlFor="customer-note" className="block text-sm font-medium text-text-primary mt-5 mb-2">Ghi chú cho stylist <span className="font-normal text-text-muted">(không bắt buộc)</span></label>
              <textarea id="customer-note" value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} placeholder="Chia sẻ điều Sol nên biết để chuẩn bị cho buổi hẹn…" rows={3} className="w-full text-sm p-3.5 rounded-xl border border-border bg-white text-text-primary focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-colors resize-y placeholder:text-text-muted" />
            </section>
          </div>

          <aside className="bg-surface rounded-3xl border border-border/80 shadow-soft overflow-hidden lg:sticky lg:top-24">
            <div className="bg-soft-surface px-5 sm:px-6 py-4 border-b border-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">Chi phí dự kiến</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div><p className="font-medium text-text-primary">{currentService.name}</p><p className="text-sm text-text-secondary mt-1">Thanh toán sau buổi hẹn</p></div>
                <span className="font-semibold text-text-primary whitespace-nowrap">{currentService.formattedPrice}</span>
              </div>
              <div className="mt-5 pt-5 border-t border-border/60 flex items-end justify-between gap-3">
                <div><span className="text-sm text-text-secondary block">Tổng thanh toán tại salon</span><span className="text-xs text-text-muted">Giá cuối cùng xác nhận tại salon</span></div>
                <span className="font-sans font-bold text-2xl text-terracotta tracking-tight whitespace-nowrap">{currentService.formattedPrice}</span>
              </div>
              <div className="mt-5 rounded-2xl bg-soft-surface/80 border border-border/60 p-4">
                <span className="text-sm font-medium text-text-primary">Thanh toán tại salon</span>
                <p className="text-sm text-text-secondary leading-relaxed mt-1">Bạn chưa cần thanh toán trực tuyến để giữ lịch hẹn.</p>
              </div>
              <button type="button" disabled={isSubmitting} onClick={handleConfirm} className="button-primary w-full min-h-12 mt-6 text-sm whitespace-nowrap">
                {isSubmitting ? <span>Đang ghi nhận lịch hẹn…</span> : <><span>Xác nhận đặt lịch</span><CheckCircle className="w-4 h-4" /></>}
              </button>
              <Link to="/booking/time" className="button-ghost w-full min-h-11 mt-2 text-sm"><ArrowLeft className="w-4 h-4" />Quay lại bước trước</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
