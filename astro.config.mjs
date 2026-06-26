// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pangdonglai.us.kg',
  integrations: [
    sitemap({
      serialize(item) {
        // 教程页面比首页和软件详情页优先级低
        if (item.url.includes('/tutorials/')) {
          item.changefreq = 'weekly';
          item.priority = 0.7;
        } else if (item.url.includes('/software/')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else {
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        return item;
      },
    }),
  ],
});
