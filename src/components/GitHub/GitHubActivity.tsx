import React, { useState, useEffect, useRef } from 'react';
import { Github, ChevronDown } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import profileData from '../../../config/profile.json';
import { useTheme } from '@/hooks/useTheme';

const GitHubActivity: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | 'last'>('last');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const username = profileData.githubUsername;


  const yearOptions = [
    { value: 'last' as const, label: 'Last Year' },
    ...Array.from({ length: 4 }, (_, i) => {
      const year = currentYear - i;
      return { value: year, label: year.toString() };
    })
  ];

  const selectedYearLabel = yearOptions.find(option => option.value === selectedYear)?.label || 'Last Year';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <section id="github" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="h-8 w-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                GitHub Activity
              </h2>
            </div>
            
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-xl text-muted-foreground">
                Contribution activity for {selectedYearLabel.toLowerCase()}
              </p>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-card hover:bg-muted/50 border border-border/50 hover:border-primary/20 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span>{selectedYearLabel}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border/50 rounded-lg shadow-lg z-10 min-w-32 overflow-hidden">
                    {yearOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedYear(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors ${
                          selectedYear === option.value ? 'bg-primary/10 text-primary font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              @{profileData.githubUsername}
            </a>
          </div>

          <div className="bg-card p-6 rounded-lg border border-border/50 overflow-x-auto">
            <GitHubCalendar
              username={username}
              year={selectedYear}
              blockSize={12}
              blockMargin={4}
              blockRadius={2}
              fontSize={12}
              colorScheme={isDark ? 'dark' : 'light'}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
              }}
              style={{
                color: 'hsl(var(--muted-foreground))'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;