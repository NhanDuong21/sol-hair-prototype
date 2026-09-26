import type { HairArticle, HairNewsResponse } from './hairNews.types';

const CACHE_KEY = 'sol-hair-news';
const CACHE_TTL_MS = 45 * 60 * 1000;

type CacheEntry = { timestamp: number; articles: HairArticle[] };
let requestInFlight: Promise<HairArticle[]> | null = null;

const readCache = (): HairArticle[] | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw) as CacheEntry;
    if (Date.now() - cache.timestamp > CACHE_TTL_MS || !Array.isArray(cache.articles) || cache.articles.length === 0) return null;
    return cache.articles;
  } catch {
    return null;
  }
};

export const getHairNews = async (): Promise<HairArticle[]> => {
  const cached = readCache();
  if (cached) return cached;
  if (requestInFlight) return requestInFlight;

  requestInFlight = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch('/__prototype-api/hair-news', { signal: controller.signal });
      if (!response.ok) throw new Error(`Hair news proxy returned ${response.status}`);
      const payload = await response.json() as HairNewsResponse;
      const articles = Array.isArray(payload.articles) ? payload.articles : [];
      if (!articles.length) return [];

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), articles } satisfies CacheEntry));
      } catch {
        // Session storage may be unavailable; the live response still renders.
      }
      return articles;
    } finally {
      window.clearTimeout(timeout);
    }
  })().finally(() => { requestInFlight = null; });

  return requestInFlight;
};
