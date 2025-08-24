import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  isOpenSource: boolean;
  category: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] md:max-w-[75vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Banner Image */}
          <div className="h-64 bg-gradient-to-br from-project-accent/20 to-project-accent/10 rounded-lg flex items-center justify-center">
            <div className="text-6xl font-bold text-project-accent">
              {project.name.charAt(0)}
            </div>
          </div>

          {/* Project Info */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-project-accent to-project-accent/70 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {project.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold truncate">{project.name}</h3>
                <Badge variant="outline">{project.category}</Badge>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {project.isOpenSource && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold mb-3">About This Project</h4>
            <p className="text-muted-foreground leading-relaxed break-words">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Gallery</h4>
              <Carousel className="w-full overflow-x-hidden">
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="h-64 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Screenshot {index + 1}</span>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;