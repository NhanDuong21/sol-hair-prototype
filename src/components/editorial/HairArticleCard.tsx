import { assetUrl } from '../../utils/assetUrl';
import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { HairArticle } from '../../services/hairNews/hairNews.types';

const FALLBACK_IMAGE = assetUrl('images/services/detail-cut.jpg');

const formatDate = (value: string) => {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

export const HairArticleCard: React.FC<{ article: HairArticle }> = ({ article }) => {
  const [imageSrc, setImageSrc] = useState(article.imageUrl || FALLBACK_IMAGE);
  const [showImage, setShowImage] = useState(true);
  const external = /^https?:\/\//i.test(article.url);
  const meta = [article.sourceName, formatDate(article.publishedAt)].filter(Boolean).join(' · ');

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft-surface">
        {showImage && (
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover img-editorial-zoom"
            onError={() => {
              if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
              else setShowImage(false);
            }}
          />
        )}
        {!showImage && <div className="h-full w-full bg-gradient-to-br from-soft-surface to-subtle-surface" aria-hidden="true" />}
      </div>
      <div className="pt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">{meta}</p>
        <h3 className="mt-2 line-clamp-2 font-serif text-xl font-medium leading-snug text-text-primary transition-colors group-hover:text-terracotta sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">{article.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-terracotta">
          Đọc bài <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </>
  );

  return external ? (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4">
      {content}
    </a>
  ) : (
    <Link to={article.url} className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-4">
      {content}
    </Link>
  );
};
