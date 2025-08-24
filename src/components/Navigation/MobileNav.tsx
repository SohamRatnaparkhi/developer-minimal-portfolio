import React, { useEffect, useState } from 'react';
import { Home, User, Code, FolderOpen, Github, Linkedin, Twitter, Sun, Moon, NotebookPen, Medal } from 'lucide-react';
import profileData from '../../../config/profile.json';
import { useTheme } from '../../hooks/useTheme';

const SECTION_IDS = ['home', 'experience', 'skills', 'github', 'projects', 'extra-curriculars', 'blog'] as const;

const MobileNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();
  const handleToggleTheme = () => {
    const html = document.documentElement;
    html.classList.add('transition-colors', 'duration-300');
    toggleTheme();
    window.setTimeout(() => {
      html.classList.remove('transition-colors', 'duration-300');
    }, 350);
  };

  const navItems = [
    { id: 'home', icon: Home },
    { id: 'experience', icon: User },
    { id: 'skills', icon: Code },
    { id: 'projects', icon: FolderOpen },
    { id: 'extra-curriculars', icon: Medal },
    { id: 'blog', icon: NotebookPen },
  ];

  const navItemIds = navItems.map(item => item.id);

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

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const currentId = (visible[0].target as HTMLElement).id;
          
          // Map sections to nav items
          let navId = currentId;
          if (currentId === 'github') {
            // GitHub section maps to projects nav item since it's between skills and projects
            navId = 'projects';
          }
          
          // Only update if this section has a corresponding nav item
          if (navItemIds.includes(navId)) {
            setActiveSection(navId);
          }
        }
      },
      {
        root: null,
        // Focus on center portion of viewport for stable highlighting
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0.1, 0.3, 0.5, 0.7, 1.0]
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Prime the active section on mount
    const prime = () => {
      let bestNavId = 'home';
      let bestScore = Number.NEGATIVE_INFINITY;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const distanceToCenter = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        const score = -distanceToCenter; // closer to center => higher score
        if (score > bestScore) {
          bestScore = score;
          // Map sections to nav items for consistency
          let navId = el.id;
          if (el.id === 'github') {
            navId = 'projects';
          }
          // Only consider sections that have nav items
          if (navItemIds.includes(navId)) {
            bestNavId = navId;
          }
        }
      });
      setActiveSection(bestNavId);
    };
    
    // Delay prime to ensure DOM is ready
    setTimeout(prime, 100);

    return () => observer.disconnect();
  }, [navItemIds]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <div className="mobile-nav-pill rounded-2xl px-3 py-2 m-1">
        {/* Single row for larger mobile screens (sm and up) */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Navigation Icons */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`p-1 rounded-full transition-all ${
                activeSection === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
          
          {/* Divider */}
          <div className="w-px h-4 bg-border" />
          
          {/* Social Links */}
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <social.icon className="h-3 w-3" />
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            {isDark ? (
              <Sun className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
            )}
          </button>
        </div>

        {/* Two rows for small mobile screens */}
        <div className="sm:hidden">
          {/* First row - Navigation Icons */}
          <div className="flex items-center justify-center space-x-4 mb-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`p-1 rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <item.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          
          {/* Second row - Social Links + Theme Toggle */}
          <div className="flex items-center justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="h-3 w-3" />
              </a>
            ))}
            <button
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
              className="p-1 rounded-full text-muted-foreground hover:text-primary transition-colors"
            >
              {isDark ? (
                <Sun className="h-3 w-3" />
              ) : (
                <Moon className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;