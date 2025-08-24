import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogData from '../../../config/blog.json';

const BlogSection: React.FC = () => {
  const featuredPosts = blogData.filter(post => post.featured && post.published).slice(0, 3);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-1/2">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Latest Articles
          </h2>
          <p className="text-xl text-muted-foreground">
            Thoughts on development, technology, and innovation
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-lg border border-border/50 overflow-hidden hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => window.open(post.url, '_blank')}
            >
              {/* Post Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className="h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-3xl font-bold text-primary/50">
                    {post.title.split(' ')[0].charAt(0)}
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Read More
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
                <div className="flex items-center gap-1 text-xs p-2 justify-end">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
            </article>
          ))}
        </div>

        {/* See All Posts Button */}
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