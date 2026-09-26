import React, { useEffect, useState } from 'react';
import { getHairNews } from '../../services/hairNews/hairNews.client';
import { HAIR_NEWS_MOCK } from '../../services/hairNews/hairNews.mock';
import type { HairArticle } from '../../services/hairNews/hairNews.types';
import { RevealOnScroll } from '../common/RevealOnScroll';
import { HairArticleCard } from './HairArticleCard';
import { HairNewsSkeleton } from './HairNewsSkeleton';

export const HairNewsSection: React.FC = () => {
  const [articles, setArticles] = useState<HairArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;
    getHairNews()
      .then((liveArticles) => {
        if (!active) return;
        if (liveArticles.length) setArticles(liveArticles.slice(0, 3));
        else {
          setArticles(HAIR_NEWS_MOCK.slice(0, 3));
          setUsingFallback(true);
        }
      })
      .catch(() => {
        if (!active) return;
        setArticles(HAIR_NEWS_MOCK.slice(0, 3));
        setUsingFallback(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <section aria-labelledby="hair-news-title" className="bg-surface/70 py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">Góc Sol</span>
            <h2 id="hair-news-title" className="mt-2 font-serif text-3xl font-medium tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Xu hướng & cảm hứng.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Những câu chuyện, kiểu tóc và xu hướng đang được quan tâm.
            </p>
          </div>
          {usingFallback && !loading && <span className="text-[10px] tracking-wide text-text-muted">Gợi ý biên tập mẫu</span>}
        </RevealOnScroll>

        {loading ? <HairNewsSkeleton /> : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {articles.map((article, index) => (
              <RevealOnScroll key={article.id} delay={index * 90}>
                <HairArticleCard article={article} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
