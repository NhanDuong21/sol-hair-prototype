import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../data/mockData';
import { useBooking } from '../state/BookingContext';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { setSelectedService } = useBooking();

  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const handleBookNow = () => {
    setSelectedService(service);
    navigate('/booking/stylist');
  };

  // Other suggested services
  const otherServices = SERVICES.filter((s) => s.id !== service.id && !s.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Top Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-terracotta transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại tất cả dịch vụ</span>
        </Link>
      </div>

      {/* Main Editorial Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-soft-surface shadow-soft-lg border border-border/80">
              <img
                src={service.detailImage || service.image}
                alt={service.name}
                className="w-full h-full object-cover img-editorial-zoom"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-canvas/90 backdrop-blur-md text-text-primary border border-border/80 shadow-soft-sm">
                  {service.category === 'cut'
                    ? 'Cắt & Tạo kiểu'
                    : service.category === 'color'
                    ? 'Nhuộm thời trang'
                    : service.category === 'care'
                    ? 'Chăm sóc & Phục hồi'
                    : 'Uốn & Duỗi cao cấp'}
                </span>
              </div>
            </div>

            {/* Subtle editorial quote */}
            <div className="bg-soft-surface rounded-2xl p-5 border border-border/70 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-terracotta tracking-wider uppercase">
                  Cam kết tại Sol
                </span>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Sử dụng 100% dòng sản phẩm organic, an toàn cho da đầu và thân thiện môi trường.
                </p>
              </div>
              <ShieldCheck className="w-6 h-6 text-terracotta shrink-0 ml-4" />
            </div>
          </div>

          {/* Right Column: Editorial Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase block mb-2">
                Chi tiết dịch vụ
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-text-primary tracking-tight leading-tight">
                {service.name}
              </h1>

              {/* Price & Duration highlight bar */}
              <div className="mt-5 flex items-center gap-6 pb-6 border-b border-border/80">
                <div>
                  <span className="text-xs text-text-muted block uppercase tracking-wider">
                    Chi phí dịch vụ
                  </span>
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-terracotta mt-0.5 block">
                    {service.formattedPrice}
                  </span>
                </div>

                <div className="h-10 w-[1px] bg-border" />

                <div>
                  <span className="text-xs text-text-muted block uppercase tracking-wider">
                    Thời lượng dự kiến
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 text-sm sm:text-base font-medium text-text-primary">
                    <Clock className="w-4 h-4 text-terracotta" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 space-y-4">
                <p className="text-base sm:text-lg text-text-primary/90 font-serif leading-relaxed italic">
                  "{service.fullDescription}"
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Mỗi khách hàng đến với Sol đều được lắng nghe và kiểm tra độ đàn hồi, chất tóc thực tế. Chúng tôi luôn thiết kế phom dáng tôn vinh đường nét gương mặt và phong cách sống của bạn.
                </p>
              </div>

              {/* "Bao gồm" list */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-primary mb-3.5">
                  Dịch vụ bao gồm
                </h3>
                <ul className="space-y-2.5">
                  {service.includes.map((inc, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-terracotta shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking CTA Button */}
            <div className="mt-10 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-terracotta hover:bg-terracotta-dark text-white font-medium text-sm sm:text-base tracking-wide shadow-soft-sm transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Chọn stylist</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-text-muted">
                Thanh toán linh hoạt trực tiếp tại salon sau khi hoàn tất trải nghiệm.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-border/80">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] text-terracotta uppercase block">
              Gợi ý bổ sung
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-text-primary mt-1">
              Dịch vụ thường kết hợp
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-medium text-terracotta hover:underline flex items-center gap-1"
          >
            <span>Tất cả dịch vụ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                navigate(`/services/${item.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-surface rounded-2xl p-4 border border-border/70 hover:border-terracotta/40 shadow-soft cursor-pointer transition-all flex items-center gap-4 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-soft-surface shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover img-editorial-zoom"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-base font-medium text-text-primary group-hover:text-terracotta truncate">
                  {item.name}
                </h4>
                <div className="text-xs text-text-muted mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <div className="text-xs font-semibold text-terracotta mt-1.5">
                  {item.formattedPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
