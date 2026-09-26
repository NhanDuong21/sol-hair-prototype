import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-border/80 bg-soft-surface/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/sol-logo.png"
                alt="Sol Hair Studio"
                className="w-10 h-10 object-contain rounded-full border border-border"
              />
              <div>
                <span className="font-serif tracking-[0.2em] text-xl font-medium text-text-primary uppercase block">
                  Sol Hair Studio
                </span>
                <span className="text-[10px] tracking-[0.25em] text-text-muted uppercase">
                  Beauty Shines Within
                </span>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md pt-2">
              Không gian chăm sóc tóc thư thái, chuẩn mực nghệ thuật và tôn vinh cá tính tự nhiên. Mỗi trải nghiệm tại Sol là một cuộc hẹn với sự tự tin của chính bạn.
            </p>
            <div className="pt-2 font-editorial-script text-xl text-terracotta/90 tracking-wide">
              More than a haircut — it’s your ritual.
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider uppercase text-text-primary font-medium">
              Salon & Giờ mở cửa
            </h4>
            <div className="space-y-2.5 text-sm text-text-secondary">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>128 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-terracotta shrink-0" />
                <span>Thứ 2 – Chủ Nhật: 09:00 – 20:30</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>Hotline: 0908 123 456</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider uppercase text-text-primary font-medium">
              Điều hướng
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <Link to="/services" className="hover:text-terracotta transition-colors">
                  Dịch vụ tạo kiểu & Chăm sóc
                </Link>
              </li>
              <li>
                <Link to="/booking/stylist" className="hover:text-terracotta transition-colors">
                  Đặt lịch cùng Stylist
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-terracotta transition-colors">
                  Quản lý lịch hẹn
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-terracotta transition-colors">
                  Hồ sơ cá nhân & Ưu đãi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {new Date().getFullYear()} Sol Hair Studio. Bản mẫu Visual Prototype (Frontend UI/UX).</p>
          <div className="flex items-center gap-4">
            <span className="text-text-secondary/70">Quiet Luxury • Editorial Haircare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
