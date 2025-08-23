import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import experienceData from '../../../config/experience.json';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              My professional journey and key contributions
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            {experienceData.map((experience, index) => (
              <div key={experience.id} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-soft"></div>

                {/* Content */}
                <div className="ml-20">
                  <div className="bg-card p-6 rounded-lg shadow-soft hover:shadow-medium transition-shadow">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {experience.company.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {experience.position}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                        </span>
                        {experience.current && (
                          <Badge variant="secondary" className="ml-2">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;