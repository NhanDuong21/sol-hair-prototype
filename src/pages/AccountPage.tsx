import { assetUrl } from '../utils/assetUrl';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Mail, Sparkles, Scissors, Bell } from 'lucide-react';
import { useBooking } from '../state/BookingContext';

export const AccountPage: React.FC = () => {
  const { userProfile } = useBooking();
  const [notificationSaved, setNotificationSaved] = useState(false);

  const handleSavePref = () => {
    setNotificationSaved(true);
    setTimeout(() => setNotificationSaved(false), 2500);
  };

  return (
    <div className="min-h-screen pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border/80 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-soft-surface border-2 border-terracotta/30 flex items-center justify-center p-1.5 shadow-soft">
                <img
                  src={assetUrl('sol-logo.png')}
                  alt="Sol Avatar"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-terracotta text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                VIP
              </span>
            </div>

            {/* Profile Info */}
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase block mb-1">
                Tài khoản khách hàng
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-text-primary">
                Chào {userProfile.name}.
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-text-secondary">
                <span className="px-3 py-1 rounded-full bg-soft-surface border border-border text-terracotta font-medium">
                  {userProfile.membershipTier}
                </span>
                <span>•</span>
                <span>{userProfile.visitCount} lần ghé Sol Hair Studio</span>
              </div>
            </div>

            {/* Quick action: Book */}
            <div className="shrink-0">
              <Link
                to="/services"
                className="button-primary min-h-11 px-5 text-sm"
              >
                Đặt lịch mới
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8 items-start">
        {/* Section 1: Thông tin cá nhân */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border/80 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-terracotta font-semibold block">
                Thông tin hồ sơ
              </span>
              <h2 className="font-serif text-2xl font-medium text-text-primary mt-0.5">
                Thông tin cá nhân
              </h2>
            </div>
            <span className="text-xs text-text-muted">Đã xác thực</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-2xl bg-soft-surface/50 border border-border/60">
              <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
                <User className="w-3.5 h-3.5 text-terracotta" />
                <span>Họ và tên</span>
              </div>
              <p className="font-medium text-text-primary text-sm sm:text-base">
                {userProfile.name}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-soft-surface/50 border border-border/60">
              <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                <span>Số điện thoại</span>
              </div>
              <p className="font-medium text-text-primary text-sm sm:text-base">
                {userProfile.phone}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-soft-surface/50 border border-border/60">
              <div className="flex items-center gap-2 text-text-muted text-xs mb-1">
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>Email</span>
              </div>
              <p className="font-medium text-text-primary text-sm sm:text-base truncate">
                {userProfile.email}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Sở thích tại Sol */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border/80 shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-terracotta font-semibold block">
                Cá nhân hóa trải nghiệm
              </span>
              <h2 className="font-serif text-2xl font-medium text-text-primary mt-0.5">
                Sở thích tại Sol
              </h2>
            </div>
            <span className="text-xs text-text-muted">Đồng bộ tự động</span>
          </div>

          <div className="space-y-5">
            {/* Stylist thường chọn */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-soft-surface/50 border border-border/60 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-border shrink-0">
                  <Scissors className="w-4 h-4 text-terracotta" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted">
                    Stylist thường chọn
                  </h4>
                  <p className="font-serif text-lg font-medium text-text-primary">
                    {userProfile.preferredStylist} (Senior Stylist)
                  </p>
                </div>
              </div>

              <Link
                to="/booking/stylist"
                className="button-ghost min-h-11 px-3 text-sm"
              >
                Đặt cùng Minh Anh
              </Link>
            </div>

            {/* Dịch vụ gần đây */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-soft-surface/50 border border-border/60 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-border shrink-0">
                  <Sparkles className="w-4 h-4 text-terracotta" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted">
                    Dịch vụ gần đây
                  </h4>
                  <p className="font-serif text-lg font-medium text-text-primary">
                    {userProfile.recentService} (45–60 phút)
                  </p>
                </div>
              </div>

              <Link
                to="/services/cat-va-tao-kieu"
                className="button-ghost min-h-11 px-3 text-sm"
              >
                Xem chi tiết
              </Link>
            </div>

            {/* Nhắc lịch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-soft-surface/50 border border-border/60 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-border shrink-0">
                  <Bell className="w-4 h-4 text-terracotta" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-text-muted">
                    Kênh nhắc lịch hẹn
                  </h4>
                  <p className="text-sm font-medium text-text-primary">
                    {userProfile.reminderChannel} trước giờ hẹn 2 tiếng
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSavePref}
                className="button-ghost min-h-11 px-3 text-sm self-start sm:self-auto"
              >
                {notificationSaved ? 'Đã lưu thay đổi ✓' : 'Tùy chỉnh'}
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* Prototype Notice */}
        <div className="mt-8 text-center text-xs text-text-muted">
          Bản mẫu giao diện Sol Hair Studio (Frontend UI/UX). Dữ liệu khách hàng đang mô phỏng trên trình duyệt.
        </div>
      </div>
    </div>
  );
};
