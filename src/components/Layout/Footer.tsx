import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Heart } from 'lucide-react';
import profileData from '../../../config/profile.json';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Schedule Call Button */}
          <Button 
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold"
          >
            <a 
              href="https://cal.com/soham-ratnaparkhi/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Call
            </a>
          </Button>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2025 {profileData.name}. All rights reserved.
          </p>

          {/* Developed with love */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Developed with <Heart className="h-4 w-4 text-red-500 fill-current" /> by{' '}
            <a 
              href={profileData.socialLinks.portfolio}
              target="_blank"
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-medium"
            >
              {profileData.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;