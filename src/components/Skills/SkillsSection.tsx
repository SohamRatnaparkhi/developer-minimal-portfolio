import React from 'react';
import skillsData from '../../../config/skills.json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Wrench, MoreHorizontal } from 'lucide-react';

const SkillsSection: React.FC = () => {
  // Group skills for mobile tabs
  const languages = skillsData.filter((s) => s.category === 'Language');
  const frameworks = skillsData.filter((s) => s.category === 'Framework');
  const databases = skillsData.filter((s) => s.category === 'Database');
  const tools = skillsData.filter((s) => s.category === 'Tools');
  const others = skillsData.filter(
    (s) => !['Language', 'Framework', 'Database', 'Tools'].includes(s.category)
  );

  console.log(languages, frameworks, databases, tools, others);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-1/2 section-surface p-6 md:p-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Skills
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies and tools I am working with
          </p>
        </div>

        {/* Mobile: Categorized tabs with continuous marquee */}
        <Tabs defaultValue="languages" className="w-full md:hidden">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="languages" className="flex flex-col items-center gap-1 p-1">
              <Code className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger value="databases" className="flex flex-col items-center gap-1 p-1">
              <Database className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex flex-col items-center gap-1 p-1">
              <Wrench className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger value="others" className="flex flex-col items-center gap-1 p-1">
              <MoreHorizontal className="w-5 h-5" />
            </TabsTrigger>
          </TabsList>

          {[
            { key: 'languages', data: languages },
            { key: 'databases', data: databases },
            { key: 'tools', data: tools },
            { key: 'others', data: others },
          ].map(({ key, data }) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="relative overflow-hidden">
                <div className="flex gap-4 animate-slide py-2">
                  {[...data, ...data].map((skill, i) => (
                    <div
                      key={`${skill.name}-${i}`}
                      className="skill-item bg-card rounded-lg p-4 border border-border/50 hover:border-primary/20 transition-all flex-shrink-0 w-48"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center p-1 shadow-sm border border-gray-100">
                          <img 
                            src={skill.logo} 
                            alt={`${skill.name} logo`}
                            className="w-14 h-14 object-contain"
                            onError={(e) => {
                              // Fallback to first character if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <span className="text-lg font-bold text-white hidden">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-sm font-medium text-center text-foreground line-clamp-2">
                          {skill.name}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gradient overlays for edges */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent" />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Skills Grid for Static View - Desktop only */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="skill-item bg-card p-4 rounded-lg shadow-soft border border-border/50 hover:border-primary/20"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center p-1 shadow-sm border border-gray-100">
                  <img 
                    src={skill.logo} 
                    alt={`${skill.name} logo`}
                    className="w-14 h-14 object-contain"
                    onError={(e) => {
                      // Fallback to first character if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span className="text-lg font-bold text-white hidden">
                    {skill.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-center">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;