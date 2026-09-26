import { assetUrl } from '../../utils/assetUrl';
import type { HairArticle } from './hairNews.types';

export const HAIR_NEWS_MOCK: HairArticle[] = [
  {
    id: 'mock-warm-brown',
    title: 'Sắc nâu ấm trở lại với vẻ đẹp tự nhiên, dễ chăm sóc',
    excerpt: 'Những sắc nâu dịu và giàu chiều sâu mang đến thay đổi vừa đủ, tôn làn da mà vẫn giữ nét riêng.',
    imageUrl: assetUrl('images/services/detail-milktea.jpg'),
    sourceName: 'Nội dung mẫu · Góc Sol',
    publishedAt: '',
    url: '/services/nhuom-nau-tra-sua',
    language: 'vi',
    isMock: true,
  },
  {
    id: 'mock-soft-layers',
    title: 'Layer mềm và chuyển động nhẹ cho mái tóc hàng ngày',
    excerpt: 'Một phom cắt được cân chỉnh theo gương mặt giúp tóc vào nếp tự nhiên, không cần tạo kiểu cầu kỳ.',
    imageUrl: assetUrl('images/services/detail-cut.jpg'),
    sourceName: 'Nội dung mẫu · Góc Sol',
    publishedAt: '',
    url: '/services/cat-va-tao-kieu',
    language: 'vi',
    isMock: true,
  },
  {
    id: 'mock-color-care',
    title: 'Chăm sóc mái tóc sau nhuộm để màu luôn mềm bóng',
    excerpt: 'Từ cách gội đến dưỡng ẩm, vài thói quen nhỏ sẽ giúp màu tóc bền đẹp và bề mặt tóc óng khỏe hơn.',
    imageUrl: assetUrl('images/services/detail-color.jpg'),
    sourceName: 'Nội dung mẫu · Góc Sol',
    publishedAt: '',
    url: '/services/nhuom-thoi-trang',
    language: 'vi',
    isMock: true,
  },
  {
    id: 'mock-hair-repair',
    title: 'Khi nào mái tóc cần một liệu trình phục hồi chuyên sâu?',
    excerpt: 'Tóc khô, dễ rối sau nhiều lần tạo kiểu có thể cần được chăm sóc theo đúng tình trạng và chất tóc.',
    imageUrl: assetUrl('images/services/detail-spa.jpg'),
    sourceName: 'Nội dung mẫu · Góc Sol',
    publishedAt: '',
    url: '/services/hair-spa-phuc-hoi',
    language: 'vi',
    isMock: true,
  },
];
