import type { MetadataRoute } from 'next';
import { INDEXABLE_PATHS, SITEMAP_LASTMOD, absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: SITEMAP_LASTMOD,
  }));
}
