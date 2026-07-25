/** Label for external blog CTA based on destination. */
export function externalBlogCta(url?: string): string {
  if (!url) return 'Read Article';
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'hydradb.com' || host.endsWith('.hydradb.com')) {
      return 'Read on HydraDB';
    }
    if (host.includes('hashnode')) {
      return 'Read on Hashnode';
    }
  } catch {
    // ignore invalid urls
  }
  return 'Read Article';
}
