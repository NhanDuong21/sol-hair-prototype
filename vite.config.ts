import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { normalizeNewsDataArticles } from './src/services/hairNews/hairNews.normalize';

const HAIR_NEWS_QUERY = 'hairstyle OR haircare OR "hair care" OR "hair trends" OR "hair color" OR hairdressing';

const hairNewsPrototypeProxy = (apiKey: string): Plugin => ({
  name: 'sol-prototype-hair-news',
  configureServer(server) {
    server.middlewares.use('/__prototype-api/hair-news', async (request, response, next) => {
      if (request.method !== 'GET') {
        response.statusCode = 405;
        response.setHeader('Allow', 'GET');
        response.end();
        return;
      }

      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('Cache-Control', 'no-store');

      if (!apiKey) {
        response.statusCode = 200;
        response.end(JSON.stringify({ articles: [] }));
        return;
      }

      const params = new URLSearchParams({ apikey: apiKey, qInTitle: HAIR_NEWS_QUERY, language: 'en' });
      const upstreamUrl = `https://newsdata.io/api/1/latest?${params.toString()}`;
      try {
        const upstream = await fetch(upstreamUrl, { signal: AbortSignal.timeout(8000) });
        if (!upstream.ok) {
          console.info(`[Sol prototype] NewsData.io returned HTTP ${upstream.status}; using mock content.`);
          response.statusCode = 200;
          response.end(JSON.stringify({ articles: [] }));
          return;
        }

        const data: unknown = await upstream.json();
        const articles = normalizeNewsDataArticles(data).slice(0, 6);
        response.statusCode = 200;
        response.end(JSON.stringify({ articles }));
      } catch {
        console.info('[Sol prototype] NewsData.io is unavailable; using mock content.');
        response.statusCode = 200;
        response.end(JSON.stringify({ articles: [] }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const apiKey = command === 'serve'
    ? loadEnv(mode, process.cwd(), '').NEWSDATA_API_KEY ?? ''
    : '';

  return {
    plugins: [react(), hairNewsPrototypeProxy(apiKey)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
