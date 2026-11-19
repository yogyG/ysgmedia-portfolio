import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services/index.html'),
        caseStudies: resolve(__dirname, 'case-studies/index.html'),
        industries: resolve(__dirname, 'industries/index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        landing: resolve(__dirname, 'landing/index.html'),
        blog_b2b: resolve(__dirname, 'blog/b2b-lead-generation-for-manufacturers.html'),
        blog_google_vs_meta: resolve(__dirname, 'blog/google-ads-vs-meta-ads.html'),
        blog_gbp: resolve(__dirname, 'blog/google-business-profile-guide.html'),
        blog_ig_boutiques: resolve(__dirname, 'blog/instagram-marketing-for-boutiques.html'),
        blog_meta_budget: resolve(__dirname, 'blog/meta-ads-budget-small-business-2026.html'),
        services_analytics: resolve(__dirname, 'services/analytics-tracking.html'),
        services_content: resolve(__dirname, 'services/content-creation.html'),
        services_creative: resolve(__dirname, 'services/creative-design.html'),
        services_google_ads: resolve(__dirname, 'services/google-ads.html'),
        services_landing_pages: resolve(__dirname, 'services/landing-pages.html'),
        services_meta_ads: resolve(__dirname, 'services/meta-ads.html'),
        services_social_media: resolve(__dirname, 'services/social-media-management.html'),
                                                                                                city_amravati: resolve(__dirname, 'amravati/index.html'),
        city_chandrapur: resolve(__dirname, 'chandrapur/index.html'),
        city_nagpur: resolve(__dirname, 'nagpur/index.html'),
        city_wadi: resolve(__dirname, 'wadi/index.html'),
        city_wardha: resolve(__dirname, 'wardha/index.html')
}
    }
  }
});
