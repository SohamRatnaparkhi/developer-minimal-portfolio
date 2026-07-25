import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPostBySlug } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareOnX = () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const text = `${post.title} by @SohamR_7113`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <Layout>
      <article className="pt-20 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-foreground">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={shareOnX} className="gap-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5">
                <Share2 className="h-3.5 w-3.5" />
                Copy Link
              </Button>
            </div>
          </header>

          {(post.heroImage || post.image) && (
            <div className="mb-10 rounded-xl overflow-hidden border border-border/50">
              <img
                src={post.heroImage || post.image}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[400px]"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-2
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground/85 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-muted prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg
            prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-li:text-foreground/85
            prose-img:rounded-lg prose-img:border prose-img:border-border/50
            prose-hr:border-border/50
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={shareOnX} className="gap-1.5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Share on X
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPostPage;
