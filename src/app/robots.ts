import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://medhasamvardhangurukul.com'; // Placeholder, replace with actual production URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Disallow crawling admin and API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
