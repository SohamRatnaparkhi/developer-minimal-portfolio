import React from 'react';
import { ArrowUp, LinkIcon } from 'lucide-react';

const sections: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'github', label: 'GitHub' },
  { id: 'projects', label: 'Projects' },
  { id: 'extra-curriculars', label: 'Extracurriculars' },
  { id: 'blog', label: 'Blog' },
];

const ScrollQuickLinks: React.FC = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      <div className="relative group">
        {/* Hover menu */}
        <div className="pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 absolute bottom-16 right-0 w-56">
          <div className="pointer-events-auto bg-card/95 backdrop-blur border border-border/60 rounded-xl shadow-strong p-2 space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNavigate(s.id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/70 transition-colors"
              >
                <LinkIcon className="h-4 w-4 text-primary" />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main circular button */}
        <button
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-medium hover:shadow-strong flex items-center justify-center transition-transform duration-200 active:scale-95"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ScrollQuickLinks;


