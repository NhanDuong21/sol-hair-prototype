import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { ServiceCategoryId } from '../types';
import { CategoryFilter } from '../components/service/CategoryFilter';
import { ServiceCard } from '../components/service/ServiceCard';
import { FeaturedServicePanel } from '../components/service/FeaturedServicePanel';
import { HairInspirationRail } from '../components/service/HairInspirationRail';
import { RevealOnScroll } from '../components/common/RevealOnScroll';

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryId>('all');

  // Filtered services
  const filteredServices = SERVICES.filter((s) => {
    if (s.isFeatured) return false; // Show in right panel
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 xl:col-span-7 z-10">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-terracotta uppercase block mb-3">
                Dịch vụ của chúng tôi
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.1] font-normal">
                Tìm dịch vụ <br />
                <span className="italic font-light">phù hợp với bạn.</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl font-normal">
                Khám phá các dịch vụ, thời lượng và mức giá trước khi đặt lịch tại Sol Hair Studio.
              </p>

              {/* Category Pills */}
              <div className="mt-6 pt-2">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
              </div>
            </div>

            {/* Right Hero Image & Editorial Accent */}
            <div className="lg:col-span-5 xl:col-span-5 relative hidden sm:block">
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-[4/3] bg-soft-surface shadow-soft border border-border/70">
                <img
                  src="/images/hero-model.png"
                  alt="Sol Hair Studio Model"
                  className="w-full h-full object-cover img-editorial-zoom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Service Discovery Grid & Featured Panel */}
      <section className="pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Catalog Grid (roughly 70% width on desktop) */}
            <div className="lg:col-span-8">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredServices.map((service) => (
                    <RevealOnScroll key={service.id} delay={(filteredServices.indexOf(service) % 3) * 70}>
                      <ServiceCard service={service} />
                    </RevealOnScroll>
                  ))}
                </div>
              ) : (
                <div className="bg-surface rounded-2xl p-12 text-center border border-border/80">
                  <p className="font-serif text-xl text-text-secondary">
                    Chưa có dịch vụ trong danh mục này.
                  </p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-4 px-5 py-2 rounded-full bg-terracotta text-white text-xs font-medium"
                  >
                    Xem tất cả dịch vụ
                  </button>
                </div>
              )}
            </div>

            {/* Right Featured Service Panel (roughly 30% width on desktop) */}
            <div className="lg:col-span-4 sticky top-24">
              <RevealOnScroll>
                <FeaturedServicePanel />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <HairInspirationRail />

      <div className="services-marquee" aria-label="Các dịch vụ tại Sol">
        <div className="services-marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="services-marquee-group" key={copy}>
              {['Cắt & tạo kiểu', 'Nhuộm thời trang', 'Uốn tự nhiên', 'Chăm sóc tóc', 'Phục hồi chuyên sâu'].map((service) => (
                <span className="services-marquee-item" key={service}>{service}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Editorial closing section before the footer */}
      <section aria-labelledby="sol-visit-title" className="pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-3xl border border-border/70 bg-soft-surface p-4 sm:p-6 lg:p-10 shadow-soft-sm">
            <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[390px]" aria-label="Không gian chăm sóc tóc tại Sol">
              <div className="absolute inset-x-0 top-0 h-[84%] w-[84%] overflow-hidden rounded-[28px_88px_28px_28px] bg-canvas shadow-soft">
                <img
                  src="/images/services/detail-cut.jpg"
                  alt="Stylist đang tạo kiểu tóc trong salon"
                  className="h-full w-full object-cover img-editorial-zoom"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-[48%] w-[46%] overflow-hidden rounded-3xl border-[6px] border-soft-surface bg-canvas shadow-soft-lg">
                <img
                  src="/images/services/detail-spa.jpg"
                  alt="Mái tóc được chăm sóc mềm mượt"
                  className="h-full w-full object-cover img-editorial-zoom"
                  loading="lazy"
                />
              </div>
              <span className="absolute bottom-[19%] left-4 sm:left-6 rounded-full border border-border/70 bg-surface/95 px-3.5 py-2 text-xs font-medium tracking-wide text-text-primary shadow-soft-sm">
                Cắt · Tạo kiểu · Chăm sóc
              </span>
            </div>

            <div className="px-2 pb-3 sm:px-4 lg:px-2 lg:py-8">
              <span className="text-xs font-semibold tracking-[0.24em] text-terracotta uppercase">
                Ghé Sol
              </span>
              <h2 id="sol-visit-title" className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.08] tracking-tight text-text-primary">
                Dành một chút thời gian cho mái tóc và chính mình.
              </h2>
              <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-text-secondary">
                Một cuộc trò chuyện, một chút chăm chút vừa vặn với bạn — để rời Sol với mái tóc nhẹ nhàng và tâm trí thảnh thơi hơn.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 border-y border-border/70 py-5 text-sm text-text-secondary">
                {['Stylist lắng nghe', 'Chăm sóc theo chất tóc', 'Thanh toán tại salon'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-canvas text-terracotta">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <Link to="/booking/stylist" className="button-primary min-h-12 px-6 text-sm whitespace-nowrap">
                  Chọn một lịch hẹn
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <span className="text-sm text-text-muted">Chọn dịch vụ, stylist và thời gian phù hợp.</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};
