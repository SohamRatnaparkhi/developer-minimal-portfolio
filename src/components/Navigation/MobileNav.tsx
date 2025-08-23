import React, { useState } from 'react';
import { Home, User, Code, FolderOpen, Github, Linkedin, Twitter } from 'lucide-react';
import profileData from '../../../config/profile.json';

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'experience', icon: User },
    { id: 'skills', icon: Code },
    { id: 'projects', icon: FolderOpen },
    { id: 'extra-curriculars', icon: User },
    { id: 'blog', icon: Code },
  ];

  const socialLinks = [
    { icon: Github, href: profileData.socialLinks.github },
    { icon: Linkedin, href: profileData.socialLinks.linkedin },
    { icon: Twitter, href: profileData.socialLinks.twitter },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="mobile-nav-pill rounded-2xl px-4 py-3">
        {/* Single row for larger mobile screens (sm and up) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Navigation Icons */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`p-2 rounded-full transition-all ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-5 w-5" />
            </button>
          ))}
          
          {/* Divider */}
          <div className="w-px h-6 bg-border" />
          
          {/* Social Links */}
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Two rows for small mobile screens */}
        <div className="sm:hidden">
          {/* First row - Navigation Icons */}
          <div className="flex items-center justify-center space-x-6 mb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-2 rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <item.icon className="h-5 w-5" />
              </button>
            ))}
          </div>
          
          {/* Second row - Social Links */}
          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;