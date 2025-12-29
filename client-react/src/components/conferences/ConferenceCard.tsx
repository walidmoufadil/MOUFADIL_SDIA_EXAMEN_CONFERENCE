import { Conference } from '@/types/conference';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Star, Edit, Trash2, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ConferenceCardProps {
  conference: Conference;
  onEdit: (conference: Conference) => void;
  onDelete: (id: number) => void;
  onViewReviews: (conference: Conference) => void;
}

const ConferenceCard = ({ conference, onEdit, onDelete, onViewReviews }: ConferenceCardProps) => {
  const formattedDate = conference.date 
    ? format(new Date(conference.date), 'dd MMMM yyyy à HH:mm', { locale: fr })
    : 'Date non définie';

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="absolute inset-x-0 top-0 h-1 gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">
              {conference.titre}
            </h3>
            {conference.keynote && (
              <p className="text-sm text-muted-foreground">
                Par {conference.keynote.prenom} {conference.keynote.nom}
              </p>
            )}
          </div>
          <Badge 
            variant={conference.type === 'Academic' ? 'default' : 'secondary'}
            className={conference.type === 'Academic' 
              ? 'bg-primary/10 text-primary hover:bg-primary/20' 
              : 'bg-secondary/10 text-secondary hover:bg-secondary/20'}
          >
            {conference.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{conference.duree}h</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-secondary" />
            <span>{conference.nombreInscrits} inscrits</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="h-4 w-4 text-warning" />
            <span>{conference.score?.toFixed(1) || '0.0'}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-3 border-t border-border/50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onViewReviews(conference)}
          className="flex-1"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Reviews ({conference.reviews?.length || 0})
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(conference)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(conference.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConferenceCard;
