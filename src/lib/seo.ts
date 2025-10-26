// filepath: /Users/dimuth/Documents/work/dimuth-portfolio/src/lib/seo.ts

/**
 * Returns the site base URL as a URL object, used for Next.js metadataBase.
 * Set NEXT_PUBLIC_SITE_URL in env for production (e.g., https://example.com).
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://dimuthmenikgama.com";
  // Ensure no trailing slash to avoid double slashes when resolving paths
  const base = raw.replace(/\/+$/, "");
  return new URL(base);
}

/**
 * Builds an absolute canonical URL for a given path using the site base URL.
 * Accepts paths with or without the leading slash.
 */
export function canonical(path: string = "/"): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, base).toString();
}

/**
 * Default Open Graph/Twitter image. This is a path under /public resolved via metadataBase.
 */
export const defaultOgImage = "/images/avatar.jpg";
