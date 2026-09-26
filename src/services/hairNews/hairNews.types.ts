export type HairArticle = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  sourceName: string;
  sourceUrl?: string;
  publishedAt: string;
  url: string;
  language?: string;
  isMock?: boolean;
};

export type HairNewsResponse = {
  articles: HairArticle[];
};
