import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Users } from 'lucide-react';

interface Research {
  id: number;
  title: string;
  description: string;
  authors: string[];
  publication: string;
  date: string;
  link: string;
  category: string;
  featured: boolean;
}

interface ResearchModalProps {
  research: Research | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResearchModal: React.FC<ResearchModalProps> = ({ research, isOpen, onClose }) => {
  if (!research) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <DialogTitle className="text-2xl font-bold pr-4">
              {research.title}
            </DialogTitle>
            <Badge variant="secondary" className="shrink-0">
              {research.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Publication Info */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(research.date)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {research.authors.join(', ')}
            </div>
            <div className="text-sm font-medium">
              Published in: {research.publication}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Abstract</h3>
            <p className="text-muted-foreground leading-relaxed">
              {research.description}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={() => window.open(research.link, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Read Full Paper
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResearchModal;