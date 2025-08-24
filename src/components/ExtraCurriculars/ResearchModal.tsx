import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Users } from 'lucide-react';

interface Research {
  id: number;
  title: string;
  description?: string;
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
      <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold mb-4">
            {research.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6">
          {/* Publication Info */}
          <div className="bg-muted/30 rounded-lg p-3 md:p-4 space-y-2 md:space-y-3">
            <div className="flex items-center text-xs md:text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              {formatDate(research.date)}
            </div>
            <div className="flex items-center text-xs md:text-sm text-muted-foreground">
              <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              {research.authors.join(', ')}
            </div>
            <div className="text-xs md:text-sm font-medium">
              Published in: {research.publication}
            </div>
          </div>

          {/* Publication / Link */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Publication</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {research.publication}
            </p>
          </div>

          {/* Action Button and Category */}
          <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
            <Badge variant="secondary" className="text-xs md:text-sm">
              {research.category}
            </Badge>
            <Button 
              onClick={() => window.open(research.link, '_blank')}
              className="flex items-center gap-2 text-sm md:text-base"
              size="sm"
            >
              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
              Read Full Paper
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResearchModal;