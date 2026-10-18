import React from 'react';
import skillsData from '../../../config/skills.json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LaptopMinimalCheck, Code, Database, Wrench, Layers3, Server } from 'lucide-react';

const SPEED_PX_PER_SEC = 30;
const ITEM_WIDTH_PX = 172;

function marqueeDuration(count: number): string {
  const totalWidth = count * ITEM_WIDTH_PX;
  return `${totalWidth / SPEED_PX_PER_SEC}s`;
}

const SkillsSection: React.FC = () => {
  const languages = skillsData.filter((s) => s.category === 'Language');
  const frameworks = skillsData.filter((s) => s.category === 'Framework');
  const databases = skillsData.filter((s) => s.category === 'Database');
  const infra = skillsData.filter((s) => s.category === 'Infrastructure');
  const tools = skillsData.filter((s) => s.category === 'Tools');
  const allSkills = skillsData;

  const tabGroups = [
    { key: 'all', label: 'All', icon: LaptopMinimalCheck, data: allSkills },
    { key: 'languages', label: 'Languages', icon: Code, data: languages },
    { key: 'frameworks', label: 'Frameworks', icon: Layers3, data: frameworks },
    { key: 'databases', label: 'Databases', icon: Database, data: databases },
    { key: 'infra', label: 'Infra', icon: Server, data: infra },
    { key: 'tools', label: 'Tools', icon: Wrench, data: tools },
  ];

  const SkillCard = ({ skill, compact = false }: { skill: typeof skillsData[0]; compact?: boolean }) => (
    <div className={`skill-item bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-md group ${compact ? 'p-2 flex-shrink-0 w-40' : 'p-4'}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className={`${compact ? 'w-12 h-12' : 'w-14 h-14'} bg-white/90 dark:bg-white/10 rounded-lg flex items-center justify-center p-1.5 shadow-sm border border-gray-100 dark:border-white/10 group-hover:scale-105 transition-transform duration-200`}>
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <span className="text-lg font-bold text-primary hidden items-center justify-center w-full h-full">
            {skill.name.charAt(0)}
          </span>
        </div>
        <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-center text-foreground`}>
          {skill.name}
        </span>
      </div>
    </div>
  );

  const Marquee = ({ data }: { data: typeof skillsData }) => {
    const duration = marqueeDuration(data.length);
    return (
      <div className="relative overflow-hidden">
        <div
          className="flex flex-nowrap gap-3 w-max py-2 animate-marquee"
          style={{ animationDuration: duration }}
        >
          {[...data, ...data].map((skill, i) => (
            <SkillCard key={`${skill.name}-${i}`} skill={skill} compact />
          ))}
        </div>
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent" />
      </div>
    );
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-3/5 section-surface p-6 md:p-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Skills
          </h2>
          <p className="text-xl text-muted-foreground">
            What I build with
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full md:hidden">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {tabGroups.map(({ key, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="flex flex-col items-center gap-1 p-1">
                <Icon className="w-4 h-4" />
              </TabsTrigger>
            ))}
          </TabsList>

          {tabGroups.map(({ key, data }) => (
            <TabsContent key={key} value={key} className="mt-0">
              <Marquee data={data} />
            </TabsContent>
          ))}
        </Tabs>

        <div className="hidden md:block">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex w-full mb-8 gap-1">
              {tabGroups.map(({ key, label, icon: Icon }) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2 px-4 py-2">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tabGroups.map(({ key, data }) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
