import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shanilpraveen.com';

  const routes = ['', '/about', '/projects', '/blogs', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '/blogs' || route === '/projects' ? 'weekly' : 'monthly') as
      | 'weekly'
      | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
