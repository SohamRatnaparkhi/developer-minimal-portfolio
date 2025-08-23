import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import achievementsData from '../../../config/achievements.json';
import researchData from '../../../config/research.json';
import ResearchModal from './ResearchModal';

const ExtraCurricularsSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResearchIndex, setCurrentResearchIndex] = useState(0);
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const researchScrollRef = useRef<HTMLDivElement>(null);
  const achievementScrollRef = useRef<HTMLDivElement>(null);

  const featuredAchievements = achievementsData.filter(achievement => achievement.featured);
  const featuredResearch = researchData.filter(research => research.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleResearchClick = (research: any) => {
    setSelectedResearch(research);
    setIsModalOpen(true);
  };

  const scrollToNext = (type: 'research' | 'achievement') => {
    if (type === 'research') {
      const nextIndex = (currentResearchIndex + 1) % featuredResearch.length;
      setCurrentResearchIndex(nextIndex);
      scrollToItem(researchScrollRef.current, nextIndex);
    } else {
      const nextIndex = (currentAchievementIndex + 1) % featuredAchievements.length;
      setCurrentAchievementIndex(nextIndex);
      scrollToItem(achievementScrollRef.current, nextIndex);
    }
  };

  const scrollToPrev = (type: 'research' | 'achievement') => {
    if (type === 'research') {
      const prevIndex = currentResearchIndex === 0 ? featuredResearch.length - 1 : currentResearchIndex - 1;
      setCurrentResearchIndex(prevIndex);
      scrollToItem(researchScrollRef.current, prevIndex);
    } else {
      const prevIndex = currentAchievementIndex === 0 ? featuredAchievements.length - 1 : currentAchievementIndex - 1;
      setCurrentAchievementIndex(prevIndex);
      scrollToItem(achievementScrollRef.current, prevIndex);
    }
  };

  const scrollToItem = (container: HTMLDivElement | null, index: number) => {
    if (container) {
      const itemWidth = 256 + 16; // w-64 + gap-4
      container.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      scrollToNext('research');
      scrollToNext('achievement');
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, currentResearchIndex, currentAchievementIndex, featuredResearch.length, featuredAchievements.length]);

  return (
    <section id="extra-curriculars" className="py-20">
      <div className="container mx-auto px-6 w-1/2">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Extra-Curriculars
          </h2>
          <p className="text-xl text-muted-foreground">
            Research contributions and achievements beyond development
          </p>
        </div>

        {/* Tabs for Desktop / Horizontal Scroll for Mobile */}
        <Tabs defaultValue="research" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Research Tab */}
          <TabsContent value="research" className="mt-0">
            {/* Desktop Research Cards */}
            <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredResearch.map((research) => (
                <div
                  key={research.id}
                  className="research-card bg-card rounded-lg p-6 border border-border/50 hover:border-primary/20 transition-all hover:shadow-lg cursor-pointer"
                  onClick={() => handleResearchClick(research)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className="text-xs">
                      {research.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {research.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {research.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(research.date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Research Horizontal Scroll */}
            <div className="md:hidden overflow-hidden">
              <div 
                ref={researchScrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredResearch.map((research, index) => (
                  <div
                    key={research.id}
                    className="research-card-mobile bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-all flex-shrink-0 w-64 cursor-pointer"
                    onClick={() => handleResearchClick(research)}
                  >
                    <Badge variant="outline" className="text-xs mb-2">
                      {research.category}
                    </Badge>
                    <h3 className="text-sm font-semibold mb-1 text-foreground line-clamp-2">
                      {research.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(research.date)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Controls for Mobile */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToPrev('research')}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToNext('research')}
                  className="flex items-center gap-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-0">
            {/* Desktop Achievements Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="achievement-card bg-card rounded-lg p-6 border border-border/50 hover:border-primary/20 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-achievement-accent to-achievement-accent/70 rounded-lg flex items-center justify-center text-2xl">
                      {achievement.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(achievement.date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Achievements Horizontal Scroll */}
            <div className="md:hidden overflow-hidden">
              <div 
                ref={achievementScrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredAchievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="achievement-card-mobile bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-all flex-shrink-0 w-64"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-achievement-accent to-achievement-accent/70 rounded-lg flex items-center justify-center text-lg">
                        {achievement.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold mb-2 text-foreground line-clamp-2">
                      {achievement.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(achievement.date)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Controls for Mobile */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToPrev('achievement')}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToNext('achievement')}
                  className="flex items-center gap-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {researchData.length}
            </div>
            <div className="text-sm text-muted-foreground">Research Papers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievementsData.length}
            </div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievementsData.filter(a => a.category === 'Competition').length}
            </div>
            <div className="text-sm text-muted-foreground">Competitions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {achievementsData.filter(a => a.category === 'Recognition').length}
            </div>
            <div className="text-sm text-muted-foreground">Recognition</div>
          </div>
        </div>

        {/* Research Modal */}
        <ResearchModal
          research={selectedResearch}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default ExtraCurricularsSection;