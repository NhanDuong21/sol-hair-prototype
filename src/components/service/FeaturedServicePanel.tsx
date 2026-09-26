import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Feather, ArrowRight } from 'lucide-react';
import { useBooking } from '../../state/BookingContext';
import { SERVICES } from '../../data/mockData';

export const FeaturedServicePanel: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  const featuredService = SERVICES.find((s) => s.id === 'nhuom-nau-tra-sua') || SERVICES[1];

  const handleOpenDetail = () => {
    setSelectedService(featuredService);
    navigate(`/services/${featuredService.id}`);
  };

  const handleBookFeatured = () => {
    setSelectedService(featuredService);
    navigate('/booking/stylist');
  };

  const benefits = [
    {
      icon: Feather,
      title: 'Sản phẩm cao cấp',
      description: 'An toàn, thân thiện với mái tóc và da đầu.',
    },
    {
      icon: Heart,
      title: 'Đội ngũ chuyên nghiệp',
      description: 'Tư vấn tận tâm, tận tình với từng khách hàng.',
    },
    {
      icon: Star,
      title: 'Trải nghiệm thư giãn',
      description: 'Không gian ấm cúng, hiện đại, mang lại cảm giác thư thái.',
    },
  ];

  return (
    <aside className="bg-soft-surface rounded-3xl p-5 sm:p-6 border border-border/70 flex flex-col">
      <div>
        <span className="text-[11px] font-semibold tracking-[0.22em] text-terracotta uppercase block">
          Dịch vụ nổi bật
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary mt-1 tracking-tight">
          Gợi ý hôm nay
        </h2>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Một sắc nâu mềm mại, tôn da và dễ chăm sóc cho diện mạo mới tự nhiên.
        </p>
      </div>

      <div className="mt-5 rounded-2xl overflow-hidden bg-surface border border-border/60 shadow-soft">
        <div className="aspect-[16/10] overflow-hidden bg-subtle-surface">
          <img
            src="/images/service-1.png"
            alt="Mái tóc nhuộm nâu trà sữa óng mượt"
            className="w-full h-full object-cover img-editorial-zoom"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium tracking-[0.16em] text-terracotta uppercase">
            Màu sắc xu hướng
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-text-primary mt-1">
            {featuredService.name}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" onClick={handleOpenDetail} className="button-secondary h-10 px-4 text-[13px] whitespace-nowrap">
              Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={handleBookFeatured} className="button-primary h-10 px-4 text-[13px] whitespace-nowrap">
              Đặt lịch
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3.5 pt-4 border-t border-border/60">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-canvas border border-border/80 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-terracotta" aria-hidden="true" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                <p className="text-[13px] text-text-secondary leading-relaxed mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
