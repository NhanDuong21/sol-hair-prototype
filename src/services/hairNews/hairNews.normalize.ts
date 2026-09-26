import type { HairArticle } from './hairNews.types';

type NewsDataArticle = {
  article_id?: unknown;
  title?: unknown;
  description?: unknown;
  content?: unknown;
  image_url?: unknown;
  source_name?: unknown;
  source_id?: unknown;
  source_url?: unknown;
  pubDate?: unknown;
  link?: unknown;
  language?: unknown;
};

const hairKeywords = [
  'hair', 'hairstyle', 'haircut', 'haircare', 'hair care', 'hair color', 'hair colour',
  'hairstyl', 'hairdressing', 'hairdresser', 'salon', 'tóc', 'kiểu tóc', 'màu tóc',
  'nhuộm tóc', 'nhuộm', 'uốn tóc', 'duỗi tóc', 'chăm sóc tóc', 'phục hồi tóc',
];

const normalizeForSearch = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .toLocaleLowerCase();

const safeUrl = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
};

export const isHairRelated = (title: string, description: string) => {
  const searchableText = normalizeForSearch(`${title} ${description}`);
  return hairKeywords.some((keyword) => searchableText.includes(normalizeForSearch(keyword)));
};

export const normalizeNewsDataArticles = (input: unknown): HairArticle[] => {
  if (!input || typeof input !== 'object' || !('results' in input) || !Array.isArray(input.results)) return [];

  const seen = new Set<string>();
  const results: HairArticle[] = [];

  for (const item of input.results as NewsDataArticle[]) {
    const title = typeof item.title === 'string' ? item.title.trim() : '';
    const description = typeof item.description === 'string' ? item.description.trim() : '';
    const content = typeof item.content === 'string' ? item.content.trim() : '';
    const url = safeUrl(item.link);
    if (!title || !url || !isHairRelated(title, `${description} ${content}`)) continue;

    const id = typeof item.article_id === 'string' && item.article_id.trim()
      ? item.article_id.trim()
      : url;
    if (seen.has(id)) continue;
    seen.add(id);

    const imageUrl = safeUrl(item.image_url) ?? null;
    const sourceUrl = safeUrl(item.source_url);
    const sourceName = typeof item.source_name === 'string' && item.source_name.trim()
      ? item.source_name.trim()
      : typeof item.source_id === 'string' && item.source_id.trim()
        ? item.source_id.trim()
        : new URL(url).hostname.replace(/^www\./, '');

    results.push({
      id,
      title,
      excerpt: description || content.slice(0, 220),
      imageUrl,
      sourceName,
      ...(sourceUrl ? { sourceUrl } : {}),
      publishedAt: typeof item.pubDate === 'string' ? item.pubDate : '',
      url,
      ...(typeof item.language === 'string' ? { language: item.language } : {}),
    });
  }

  return results;
};
