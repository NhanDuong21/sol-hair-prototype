import { assetUrl } from '../utils/assetUrl';
import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/mockData';
import { HairNewsSection } from '../components/editorial/HairNewsSection';
import { RevealOnScroll } from '../components/common/RevealOnScroll';

const previewServices = SERVICES.filter((service) => !service.isFeatured).slice(0, 3);

export const HomePage: React.FC = () => (
  <div className="min-h-screen">
    <section className="pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 md:gap-12 lg:grid-cols-12 lg:px-8">
        <RevealOnScroll className="lg:col-span-5">
          <span className="block text-xs font-semibold uppercase tracking-[0.26em] text-terracotta">Sol Hair Studio</span>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-[1.04] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Một khoảng thời gian dành riêng cho mái tóc.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
            Khám phá những dịch vụ, phong cách và trải nghiệm được thiết kế để bạn cảm thấy tự tin theo cách của riêng mình.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/services" className="button-primary min-h-12 px-6 text-sm">
              Khám phá dịch vụ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/booking/stylist" className="button-secondary min-h-12 px-6 text-sm">
              Đặt lịch
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 border-t border-border/70 pt-5 text-xs text-text-muted">
            <span className="font-serif text-2xl italic text-terracotta">01</span>
            <span>Chăm chút vừa vặn với mái tóc và nhịp sống của bạn.</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="relative lg:col-span-7" delay={100}>
          <div className="relative aspect-[1.18/1] overflow-hidden rounded-[2rem_2rem_2rem_7rem] border border-border/60 bg-soft-surface shadow-soft-lg sm:aspect-[1.42/1]">
            <img src={assetUrl('images/hero-model.png')} alt="Mái tóc được tạo kiểu tự nhiên tại Sol Hair Studio" className="h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl border border-border/70 bg-surface/95 px-4 py-3 shadow-soft sm:bottom-5 sm:left-5 sm:px-5">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-terracotta">Beauty shines within</span>
            <span className="mt-1 block font-serif text-lg text-text-primary">Chạm vào phiên bản tự tin hơn.</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>

    <section aria-labelledby="home-services-title" className="bg-soft-surface/75 py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Dịch vụ tại Sol</span>
            <h2 id="home-services-title" className="mt-2 font-serif text-3xl font-medium tracking-tight text-text-primary sm:text-4xl">Dịch vụ dành cho bạn.</h2>
            <p className="mt-2 text-sm text-text-secondary">Bắt đầu từ điều mái tóc bạn đang cần.</p>
          </div>
          <Link to="/services" className="button-ghost min-h-11 self-start sm:self-auto">
            Xem tất cả dịch vụ <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((service, index) => (
            <RevealOnScroll key={service.id} delay={index * 80}>
              <Link to={`/services/${service.id}`} className="group block rounded-2xl border border-border/70 bg-surface p-3.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4 sm:p-4">
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-soft-surface">
                  <img src={service.image} alt={service.name} loading="lazy" className="h-full w-full object-cover img-editorial-zoom" />
                </div>
                <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-text-primary transition-colors group-hover:text-terracotta">{service.name}</h3>
                    <p className="mt-1 text-xs text-text-muted">{service.duration}</p>
                  </div>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-terracotta transition-all group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-white">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="px-1 pb-1 text-sm font-medium text-terracotta">{service.formattedPrice}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    <section aria-labelledby="home-experience-title" className="py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <RevealOnScroll className="relative min-h-[330px] sm:min-h-[440px]">
          <div className="absolute left-0 top-0 h-[85%] w-[82%] overflow-hidden rounded-[2rem_6rem_2rem_2rem] bg-soft-surface shadow-soft">
            <img src={assetUrl('images/services/detail-spa.jpg')} alt="Khoảnh khắc thư giãn trong liệu trình chăm sóc tóc" loading="lazy" className="h-full w-full object-cover img-editorial-zoom" />
          </div>
          <div className="absolute bottom-0 right-0 h-[48%] w-[43%] overflow-hidden rounded-3xl border-[6px] border-canvas bg-soft-surface shadow-soft-lg">
            <img src={assetUrl('images/services/detail-cut.jpg')} alt="Stylist chăm chút từng đường cắt" loading="lazy" className="h-full w-full object-cover img-editorial-zoom" />
          </div>
          <span className="absolute bottom-[15%] left-4 rounded-full bg-surface/95 px-4 py-2 text-xs font-medium tracking-wide text-text-primary shadow-soft-sm">Một nghi thức nhỏ, dành cho bạn</span>
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Trải nghiệm Sol</span>
          <h2 id="home-experience-title" className="mt-3 max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Chăm chút trong từng điểm chạm.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Từ cuộc trò chuyện đầu tiên đến cách chăm sóc sau buổi hẹn, Sol dành thời gian để hiểu chất tóc và điều bạn mong muốn.
          </p>
          <ul className="mt-6 space-y-3 border-y border-border/70 py-5 text-sm text-text-secondary">
            {['Stylist lắng nghe mong muốn của bạn', 'Tư vấn dựa trên chất tóc thực tế', 'Không gian thư thái, nhịp hẹn vừa vặn'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-terracotta-light text-terracotta"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/services" className="button-ghost mt-5 min-h-11">
            Khám phá Sol <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>

    <HairNewsSection />

    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <RevealOnScroll className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-terracotta px-6 py-9 text-white shadow-soft-lg sm:flex-row sm:items-center sm:px-10 sm:py-12 lg:px-14">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">Your time at Sol</span>
          <h2 className="mt-2 max-w-2xl font-serif text-3xl font-medium leading-tight sm:text-4xl">Mái tóc mới bắt đầu từ một cuộc hẹn.</h2>
          <p className="mt-2 text-sm text-white/75">Chọn stylist và thời gian phù hợp với bạn.</p>
        </div>
        <Link to="/booking/stylist" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-canvas px-6 text-sm font-medium text-text-primary transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-terracotta">
          Đặt lịch tại Sol <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </RevealOnScroll>
    </section>
  </div>
);
