import { assetUrl } from '../../utils/assetUrl';
import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../common/RevealOnScroll';

const looks = [
  { title: 'Nâu trà sữa', label: 'Màu sắc · Tự nhiên', image: assetUrl('images/services/detail-milktea.jpg'), serviceId: 'nhuom-nau-tra-sua' },
  { title: 'Layer mềm mại', label: 'Cắt & tạo kiểu', image: assetUrl('images/services/detail-cut.jpg'), serviceId: 'cat-va-tao-kieu' },
  { title: 'Sóng tóc thư thái', label: 'Uốn · Vào nếp', image: assetUrl('images/services/detail-perm.jpg'), serviceId: 'uon-nhe-tu-nhien' },
  { title: 'Chăm tóc bóng khỏe', label: 'Hair spa · Phục hồi', image: assetUrl('images/services/detail-spa.jpg'), serviceId: 'hair-spa-phuc-hoi' },
  { title: 'Màu nhuộm thời trang', label: 'Nhuộm · Tôn da', image: assetUrl('images/services/detail-color.jpg'), serviceId: 'nhuom-thoi-trang' },
];

export const HairInspirationRail: React.FC = () => {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>('[data-look-card]');
    rail.scrollBy({ left: direction * ((firstCard?.offsetWidth ?? 280) + 20), behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="hair-inspiration-title" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Cảm hứng từ Sol</span>
            <h2 id="hair-inspiration-title" className="mt-2 font-serif text-3xl font-medium tracking-tight text-text-primary sm:text-4xl">
              Một chút cảm hứng cho mái tóc mới.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
              Những sắc độ và kiểu tóc để bạn lưu lại trước buổi hẹn.
            </p>
          </div>
          <div className="flex items-center gap-2 self-end">
            <button type="button" onClick={() => scrollRail(-1)} aria-label="Xem cảm hứng trước" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-terracotta hover:text-terracotta">
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollRail(1)} aria-label="Xem thêm cảm hứng" className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-colors hover:border-terracotta hover:text-terracotta">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </RevealOnScroll>

        <div ref={railRef} className="hair-inspiration-rail mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-5" aria-label="Bộ sưu tập cảm hứng tóc">
          {looks.map((look, index) => (
            <RevealOnScroll key={look.title} delay={index * 65} className="min-w-[78vw] snap-start sm:min-w-[calc(50%-10px)] lg:min-w-[calc(33.333%-14px)]">
              <Link to={`/services/${look.serviceId}`} data-look-card aria-label={`Xem dịch vụ ${look.title}`} className="group relative block aspect-[4/4.7] overflow-hidden rounded-2xl bg-soft-surface shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2">
                <img src={look.image} alt={look.title} loading="lazy" className="h-full w-full object-cover img-editorial-zoom" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">{look.label}</span>
                    <h3 className="mt-1 font-serif text-2xl text-white sm:text-3xl">{look.title}</h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
