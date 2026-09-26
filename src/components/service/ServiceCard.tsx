import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { useBooking } from '../../state/BookingContext';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedService(service);
    navigate('/booking/stylist');
  };

  return (
    <article
      className="group relative flex flex-col rounded-2xl border border-border/70 bg-surface p-3.5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta/40 hover:shadow-soft-lg sm:p-4"
    >
      <Link
        to={`/services/${service.id}`}
        aria-label={`Xem chi tiết dịch vụ ${service.name}`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
      />

      <div className="relative z-10 pointer-events-none">
        {/* Hair Image */}
        <div className="relative aspect-[16/9.5] rounded-xl overflow-hidden bg-soft-surface">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover img-editorial-zoom"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="pt-3.5">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-text-primary group-hover:text-terracotta transition-colors leading-snug">
            {service.name}
          </h3>
          <p className="mt-1 text-xs sm:text-[13px] text-text-secondary leading-relaxed line-clamp-2 min-h-[36px]">
            {service.shortDescription}
          </p>

          <div className="mt-2.5 flex items-center text-xs text-text-muted">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-text-secondary/70" />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      {/* Footer / Price & Actions */}
      <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between gap-2">
        <span className="font-sans font-semibold text-sm sm:text-base text-terracotta tracking-tight">
          {service.formattedPrice}
        </span>

        <div className="relative z-20 flex shrink-0 flex-col items-end gap-1">
          <button
            type="button"
            onClick={handleBookNow}
            className="button-primary h-10 min-w-[92px] px-3 rounded-full text-[13px] whitespace-nowrap"
          >
            Đặt lịch
          </button>
          <Link
            to={`/services/${service.id}`}
            className="button-ghost h-8 px-1 text-[13px] whitespace-nowrap group/link"
          >
            <span>Xem chi tiết</span>
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
