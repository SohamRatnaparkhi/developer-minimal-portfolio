import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import blogData from '../../../config/blog.json';
import { getAllPosts } from '@/lib/blog';
import { externalBlogCta } from '@/lib/blogLinks';

interface BlogEntry {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
  url?: string;
  slug?: string;
  featured?: boolean;
  published?: boolean;
}

const BlogSection: React.FC = () => {
  const navigate = useNavigate();
  const mdPosts = getAllPosts();

  // Exactly 3 featured cards so the home grid is a clean full row
  const allPosts: BlogEntry[] = (blogData as BlogEntry[])
    .filter(post => post.featured && post.published)
    .map(post => {
      if (post.slug) {
        const mdPost = mdPosts.find(p => p.slug === post.slug);
        if (mdPost) {
          return { ...post, excerpt: mdPost.excerpt || post.excerpt };
        }
      }
      return post;
    })
    .slice(0, 3);

  const handlePostClick = (post: BlogEntry) => {
    if (post.slug) {
      navigate(`/blog/${post.slug}`);
    } else if (post.url) {
      window.open(post.url, '_blank');
    }
  };

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Latest Articles
          </h2>
          <p className="text-xl text-muted-foreground">
            Writing on agents, context graphs, and production infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {allPosts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-card rounded-lg border border-border/50 overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full"
              onClick={() => handlePostClick(post)}
            >
              <div className="h-40 shrink-0 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                {post.image ? (
                  <>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="h-full flex items-center justify-center" style={{ display: 'none' }}>
                      <div className="text-4xl font-bold text-primary/30">
                        {post.title.split(' ')[0].charAt(0)}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-5xl font-bold text-primary/20">
                      {post.title.split(' ').slice(0, 2).map(w => w.charAt(0)).join('')}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[2.75rem]">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.filter(t => t !== 'HydraDB').slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all mt-auto">
                  {post.slug ? 'Read More' : externalBlogCta(post.url)}
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 transition-all hover:scale-105"
            asChild
          >
            <Link to="/blog" className="flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
