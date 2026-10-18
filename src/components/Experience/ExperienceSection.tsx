import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, Github, ExternalLink, MapPin, ArrowUpRight } from 'lucide-react';
import experienceData from '../../../config/experience.json';
import CollapsibleBlock from '@/components/ui/collapsible-block';

interface WorkLink {
  text: string;
  url: string;
}

interface MiscItem {
  work?: WorkLink[];
  text?: string;
  url?: string;
}

interface Role {
  position: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  responsibilities: string[];
}

interface Experience {
  id: number;
  link?: string;
  company: string;
  logo?: string;
  position?: string;
  employmentType?: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  highlight?: string;
  summary?: string;
  responsibilities?: string[];
  roles?: Role[];
  techStack?: string[];
  misc?: MiscItem[];
}

const ExperienceSection: React.FC = () => {
  const data = experienceData as Experience[];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-3 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
              Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              Founding engineer to product lead
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />

            {data.map((experience) => {
              const multiRole = Boolean(experience.roles && experience.roles.length > 0);
              const dateLabel = `${experience.startDate} – ${experience.current ? 'Present' : experience.endDate}`;

              return (
                <div key={experience.id} className="relative mb-12 last:mb-0">
                  <div className="absolute left-2 md:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-soft" />

                  <div className="ml-8 md:ml-20">
                    <div className="bg-card p-4 md:p-6 rounded-xl border border-border/60 shadow-soft hover:shadow-medium transition-shadow">
                      {/* Company header (LinkedIn-style) */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-muted rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-border/50">
                            {experience.logo ? (
                              <img
                                src={experience.logo}
                                alt={`${experience.company} logo`}
                                className="w-full h-full object-contain p-1.5"
                              />
                            ) : (
                              <span className="text-lg font-bold text-primary">
                                {experience.company.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {experience.link ? (
                                <a
                                  href={experience.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xl font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                                >
                                  {experience.company}
                                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                                </a>
                              ) : (
                                <h3 className="text-xl font-semibold text-foreground">
                                  {experience.company}
                                </h3>
                              )}
                              {experience.highlight && (
                                <Badge className="bg-brand/10 text-brand border border-brand/25 hover:bg-brand/15">
                                  {experience.highlight}
                                </Badge>
                              )}
                              {experience.current && (
                                <Badge variant="secondary">Current</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {[experience.employmentType, dateLabel].filter(Boolean).join(' · ')}
                            </p>
                            {experience.location && (
                              <p className="text-sm text-muted-foreground mt-0.5 inline-flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {experience.location}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {experience.summary && (
                        <p className="text-sm md:text-[15px] text-foreground/85 leading-relaxed mb-5 pl-0 sm:pl-[3.75rem]">
                          {experience.summary}
                        </p>
                      )}

                      {/* Long role histories collapse; click to expand */}
                      <CollapsibleBlock maxHeight={300}>
                      {/* Multi-role growth path (LinkedIn nested roles) */}
                      {multiRole ? (
                        <div className="relative pl-0 sm:pl-[3.75rem]">
                          <div className="absolute left-[1.35rem] sm:left-[5.1rem] top-2 bottom-2 w-px bg-border hidden sm:block" />
                          <div className="space-y-6">
                            {experience.roles!.map((role, roleIdx) => (
                              <div key={`${experience.id}-role-${roleIdx}`} className="relative">
                                <div className="flex items-start gap-3 mb-2">
                                  <div className="hidden sm:flex absolute -left-[2.05rem] top-1.5 w-2.5 h-2.5 rounded-full bg-primary/80 ring-4 ring-card" />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h4 className="text-base md:text-lg font-semibold text-foreground">
                                        {role.position}
                                      </h4>
                                      {role.current && roleIdx === 0 && (
                                        <Badge variant="secondary" className="text-xs">
                                          Latest
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5 mt-0.5">
                                      <Calendar className="h-3.5 w-3.5" />
                                      {role.startDate} – {role.current ? 'Present' : role.endDate}
                                    </p>
                                  </div>
                                </div>
                                <ul className="space-y-2 mt-2">
                                  {role.responsibilities.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-sm md:text-[15px] text-foreground/80 leading-relaxed"
                                    >
                                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Single-role company */
                        <div className="pl-0 sm:pl-[3.75rem]">
                          {experience.position && (
                            <div className="mb-3">
                              <h4 className="text-base md:text-lg font-semibold text-foreground">
                                {experience.position}
                              </h4>
                              <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5 mt-0.5">
                                <Calendar className="h-3.5 w-3.5" />
                                {dateLabel}
                              </p>
                            </div>
                          )}
                          {experience.responsibilities && (
                            <ul className="space-y-2">
                              {experience.responsibilities.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm md:text-[15px] text-foreground/80 leading-relaxed"
                                >
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      </CollapsibleBlock>

                      {/* Footer links + stack */}
                      <div className="mt-5 pt-4 border-t border-border/50 pl-0 sm:pl-[3.75rem] space-y-3">
                        {experience.misc && experience.misc.length > 0 && (
                          <div className="hidden md:flex flex-wrap gap-3">
                            {experience.misc.map((item, idx) => (
                              <div key={idx} className="flex flex-wrap gap-3">
                                {item.work?.map((workItem, workIdx) => (
                                  <a
                                    key={workIdx}
                                    href={workItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                                  >
                                    {workItem.text}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  </a>
                                ))}
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
                        )}

                        {experience.techStack && experience.techStack.length > 0 && (
                          <div className="hidden md:flex flex-wrap gap-2">
                            {experience.techStack.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs font-normal">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
