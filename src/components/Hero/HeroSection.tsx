import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import profileData from '../../../config/profile.json';

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
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 animate-float">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-hero-accent p-1 shadow-strong">
              <div className="w-full h-full rounded-full bg-muted flex items-center justify-center text-4xl font-bold text-primary">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">
              {profileData.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
              {profileData.title}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              {profileData.bio}
            </p>
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