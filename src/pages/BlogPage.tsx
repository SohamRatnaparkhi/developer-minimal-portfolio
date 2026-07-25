import React, { useState, useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Search, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import blogData from '../../config/blog.json';
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

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mdPosts = getAllPosts();
  const publishedPosts: BlogEntry[] = (blogData as BlogEntry[])
    .filter(post => post.published)
    .map(post => {
      if (post.slug) {
        const mdPost = mdPosts.find(p => p.slug === post.slug);
        if (mdPost) {
          return { ...post, excerpt: mdPost.excerpt || post.excerpt };
        }
      }
      return post;
    });

  const categories = useMemo(() => {
    const allTags = publishedPosts.flatMap(post => post.tags);
    return ['all', ...new Set(allTags)];
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || post.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [publishedPosts, searchTerm, selectedCategory]);

  const handlePostClick = (post: BlogEntry) => {
    if (post.slug) {
      navigate(`/blog/${post.slug}`);
    } else if (post.url) {
      window.open(post.url, '_blank');
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thoughts on infrastructure, distributed systems, and building in production
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Tags' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredPosts.length} of {publishedPosts.length} articles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col bg-card rounded-lg border border-border/50 overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full"
                onClick={() => handlePostClick(post)}
              >
                <div className="h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
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

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.filter(t => t !== 'HydraDB').slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      {post.slug ? 'Read Article' : externalBlogCta(post.url)}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    {post.featured && (
                      <Badge className="text-xs">Featured</Badge>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
