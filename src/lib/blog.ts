export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  published: boolean;
  featured: boolean;
  readTime: string;
  tags: string[];
  image?: string;
  heroImage?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

function parseFrontmatter(raw: string): { meta: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const meta: Record<string, unknown> = {};

  let currentKey = '';
  let inArray = false;
  let arrayValues: string[] = [];

  for (const line of frontmatter.split('\n')) {
    if (inArray) {
      const itemMatch = line.match(/^\s+-\s+"?([^"]*)"?\s*$/);
      if (itemMatch) {
        arrayValues.push(itemMatch[1]);
        continue;
      } else {
        meta[currentKey] = arrayValues.length > 0 ? arrayValues : '';
        inArray = false;
        arrayValues = [];
      }
    }

    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value: string | boolean | string[] = kvMatch[2].trim();

      if (value === '') {
        currentKey = key;
        inArray = true;
        arrayValues = [];
        continue;
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        meta[key] = value
          .slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/^["']|["']$/g, ''));
        continue;
      }

      if (value === 'true') meta[key] = true;
      else if (value === 'false') meta[key] = false;
      else if (value.startsWith('"') && value.endsWith('"')) meta[key] = value.slice(1, -1);
      else meta[key] = value;
    }
  }

  if (inArray) {
    meta[currentKey] = arrayValues.length > 0 ? arrayValues : '';
  }

  return { meta, content };
}

const mdModules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(mdModules)) {
    const slug = path.replace('/content/blog/', '').replace('.md', '');
    const { meta, content } = parseFrontmatter(raw as string);

    posts.push({
      slug,
      title: (meta.title as string) || slug,
      excerpt: (meta.excerpt as string) || '',
      date: (meta.date as string) || '',
      published: meta.published !== false,
      featured: (meta.featured as boolean) || false,
      readTime: (meta.readTime as string) || '5 min read',
      tags: (meta.tags as string[]) || [],
      image: (typeof meta.image === 'string' && meta.image.length > 0) ? meta.image : undefined,
      heroImage: (typeof meta.heroImage === 'string' && meta.heroImage.length > 0) ? meta.heroImage : undefined,
      content,
    });
  }

  return posts
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug);
}
