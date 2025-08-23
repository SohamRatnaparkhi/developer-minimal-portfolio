import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import profileData from '../../../config/profile.json';

// Types for bio data structure
interface HighlightWord {
  text: string;
  color: string;
  occurrence: string;
}

interface Hyperlink {
  text: string;
  url: string;
}

interface BioData {
  highlight_words: (string | HighlightWord)[];
  hyperlinks: Hyperlink[];
  paragraphs: string[];
}

const processBioText = (text: string, bioData: BioData) => {
  const processedText = text;
  const elements: JSX.Element[] = [];
  let lastIndex = 0;

  const transformations: Array<{
    start: number;
    end: number;
    type: 'highlight' | 'hyperlink';
    color?: string;
    url?: string;
    text: string;
  }> = [];

  bioData.highlight_words.forEach(word => {
    const wordData = typeof word === 'string' ? { text: word, color: undefined, occurrence: undefined } : word;
    const wordText = wordData.text;
    
    if (wordData.occurrence === 'first') {
      const index = processedText.indexOf(wordText);
      if (index !== -1) {
        transformations.push({
          start: index,
          end: index + wordText.length,
          type: 'highlight',
          color: wordData.color,
          text: wordText
        });
      }
    } else {
      let searchIndex = 0;
      while (true) {
        const index = processedText.indexOf(wordText, searchIndex);
        if (index === -1) break;
        
        transformations.push({
          start: index,
          end: index + wordText.length,
          type: 'highlight',
          color: wordData.color,
          text: wordText
        });
        
        searchIndex = index + wordText.length;
      }
    }
  });

  bioData.hyperlinks.forEach(link => {
    let searchIndex = 0;
    while (true) {
      const index = processedText.indexOf(link.text, searchIndex);
      if (index === -1) break;
      
      transformations.push({
        start: index,
        end: index + link.text.length,
        type: 'hyperlink',
        url: link.url,
        text: link.text
      });
      
      searchIndex = index + link.text.length;
    }
  });

  const mergedTransformations: Array<{
    start: number;
    end: number;
    type: 'highlight' | 'hyperlink' | 'highlight-link';
    color?: string;
    url?: string;
    text: string;
  }> = [];

  const sortedTransformations = transformations.sort((a, b) => a.start - b.start);
  
  for (let i = 0; i < sortedTransformations.length; i++) {
    const current = sortedTransformations[i];
    const next = sortedTransformations[i + 1];
    
    if (next && 
        current.start === next.start && 
        current.end === next.end && 
        current.text === next.text &&
        ((current.type === 'highlight' && next.type === 'hyperlink') ||
         (current.type === 'hyperlink' && next.type === 'highlight'))) {
      
      const highlight = current.type === 'highlight' ? current : next;
      const hyperlink = current.type === 'hyperlink' ? current : next;
      
      mergedTransformations.push({
        start: current.start,
        end: current.end,
        type: 'highlight-link',
        color: highlight.color,
        url: hyperlink.url,
        text: current.text
      });
      
      i++;
    } else {
      mergedTransformations.push(current);
    }
  }

  mergedTransformations.forEach((transform, i) => {
    if (transform.start > lastIndex) {
      elements.push(
        <span key={`text-${i}`}>
          {processedText.slice(lastIndex, transform.start)}
        </span>
      );
    }

    if (transform.type === 'highlight') {
      elements.push(
        <span 
          key={`highlight-${i}`}
          style={{ color: transform.color || 'hsl(var(--primary))' }}
          className="font-semibold"
        >
          {transform.text}
        </span>
      );
    } else if (transform.type === 'hyperlink') {
      elements.push(
        <a
          key={`link-${i}`}
          href={transform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
        >
          {transform.text}
        </a>
      );
    } else if (transform.type === 'highlight-link') {
      elements.push(
        <a
          key={`highlight-link-${i}`}
          href={transform.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: transform.color || 'hsl(var(--primary))' }}
          className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          {transform.text}
        </a>
      );
    }

    lastIndex = transform.end;
  });

  if (lastIndex < processedText.length) {
    elements.push(
      <span key="text-end">
        {processedText.slice(lastIndex)}
      </span>
    );
  }

  return elements.length > 0 ? elements : [<span key="original">{text}</span>];
};

const HeroSection: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: profileData.socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: profileData.socialLinks.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profileData.socialLinks.twitter, label: 'Twitter' },
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-gradient">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-float">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-hero-accent p-1 shadow-strong">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-primary">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
              {profileData.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
              {profileData.title}
            </p>
          </div>

          <div className="mb-8 max-w-3xl mx-auto section-surface p-4 md:p-6">
            <div className="md:hidden text-foreground/80 text-center">
              {profileData.bio.sm.paragraphs.map((paragraph: string, idx: number) => (
                <p
                  key={`bio-sm-${idx}`}
                  className={`text-base leading-relaxed ${idx !== profileData.bio.sm.paragraphs.length - 1 ? 'mb-3' : ''}`}
                >
                  {processBioText(paragraph, profileData.bio.sm as BioData)}
                </p>
              ))}
            </div>

            <div className="hidden md:block lg:hidden text-foreground/80">
              {profileData.bio.md.paragraphs.map((paragraph: string, idx: number) => (
                <p
                  key={`bio-md-${idx}`}
                  className={`text-lg leading-relaxed ${idx !== profileData.bio.md.paragraphs.length - 1 ? 'mb-3.5' : ''}`}
                >
                  {processBioText(paragraph, profileData.bio.md as BioData)}
                </p>
              ))}
            </div>

            <div className="hidden lg:block text-foreground/80">
              {profileData.bio.lg.paragraphs.map((paragraph: string, idx: number) => (
                <p
                  key={`bio-lg-${idx}`}
                  className={`text-lg leading-relaxed ${idx !== profileData.bio.lg.paragraphs.length - 1 ? 'mb-4' : ''}`}
                >
                  {processBioText(paragraph, profileData.bio.lg as BioData)}
                </p>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-accent transition-all hover:scale-110 shadow-soft hover:shadow-medium"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-medium"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-3 transition-all hover:scale-105"
              asChild
            >
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2"
              >
                Get In Touch
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;