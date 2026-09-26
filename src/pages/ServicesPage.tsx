import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { ServiceCategoryId } from '../types';
import { CategoryFilter } from '../components/service/CategoryFilter';
import { ServiceCard } from '../components/service/ServiceCard';
import { FeaturedServicePanel } from '../components/service/FeaturedServicePanel';

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
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Catalog Grid (roughly 70% width on desktop) */}
            <div className="lg:col-span-8">
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
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
              <FeaturedServicePanel />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
