import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../../../config/projects.json';
import ProjectDetailModal from './ProjectDetailModal';

const ProjectsSection: React.FC = () => {
  const featuredProjects = projectsData.filter(project => project.featured).slice(0, 4);
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 w-full md:w-2/3 lg:w-1/2 section-surface p-6 md:p-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground">
            Some of my recent work and contributions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-card rounded-lg overflow-hidden border border-border/50"
            >
              {/* Project Image */}
              {project.image && project.image.trim() !== '' ? (
                <div className="h-32 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.name} project`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gradient-to-br from-project-accent/20 to-project-accent/10 flex items-center justify-center">
                  <div className="text-3xl font-bold text-project-accent">
                    {project.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Project Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <div className="flex gap-2">
                    {project.isOpenSource && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Github className="h-3 w-3" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-muted rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[10px] py-0.5 px-1.5">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge variant="outline" className="text-[10px] py-0.5 px-1.5">
                      +{project.techStack.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] py-0.5 px-1.5">
                    {project.category}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs px-2"
                    onClick={() => handleLearnMore(project)}
                  >
                    Learn More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Projects Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-3 transition-all hover:scale-105"
            asChild
          >
            <Link to="/projects" className="flex items-center gap-2">
              See All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal 
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;