import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Github, ExternalLink } from 'lucide-react';
import experienceData from '../../../config/experience.json';

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-3 md:px-6">
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
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            {experienceData.map((experience, index) => (
              <div key={experience.id} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-soft"></div>

                {/* Content */}
                <div className="ml-8 md:ml-20">
                  <div className="bg-card p-4 md:p-6 rounded-lg shadow-soft hover:shadow-medium transition-shadow">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          {experience.logo ? (
                            <img 
                              src={experience.logo} 
                              alt={`${experience.company} logo`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              {experience.company.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {experience.position}
                          </h3>
                          <p className="text-lg text-muted-foreground">
                            {experience.link ? (
                              <a 
                                href={experience.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors inline-flex items-center gap-1"
                              >
                                {experience.company}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              experience.company
                            )}
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
                    <ul className="space-y-2 mb-4">
                      {experience.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-foreground/80">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                    {/* Misc - Hidden on mobile */}
                    {experience.misc && experience.misc.length > 0 && (
                      <div className="hidden md:block  mb-4">
                        <div className="flex flex-wrap gap-3">
                          {experience.misc.map((item, idx) => (
                            <div key={idx} className="flex flex-wrap gap-3">
                              {/* Work links */}
                              {item.work && item.work.map((workItem, workIdx) => (
                                <a
                                  key={workIdx}
                                  href={workItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                                >
                                  {workItem.text}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              ))}
                              
                              {/* Code links */}
                              {item.text && item.url && (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                                >
                                  <Github className="h-4 w-4" />
                                  <span>Code</span>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Tech Stack - Hidden on mobile */}
                    {experience.techStack && experience.techStack.length > 0 && (
                      <div className="hidden md:block">
                        {/* <h4 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4> */}
                        <div className="flex flex-wrap gap-2">
                          {experience.techStack.map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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