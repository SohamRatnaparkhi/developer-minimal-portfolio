import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import blogData from '../../config/blog.json';

const BlogPage: React.FC = () => {
  const publishedPosts = blogData.filter(post => post.published);

  return (
    <Layout>
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughts on development, technology, and innovation
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card rounded-lg border border-border/50 overflow-hidden hover:shadow-medium transition-all hover:-translate-y-1"
              >
                {/* Post Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-3xl font-bold text-primary/50">
                    {post.title.split(' ')[0].charAt(0)}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
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

                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {post.featured && (
                    <Badge className="text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;