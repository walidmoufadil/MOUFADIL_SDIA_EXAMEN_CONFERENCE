import { Keynote } from '@/types/conference';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, Mail, Briefcase } from 'lucide-react';

interface KeynoteCardProps {
  keynote: Keynote;
  onEdit: (keynote: Keynote) => void;
  onDelete: (id: number) => void;
}

const KeynoteCard = ({ keynote, onEdit, onDelete }: KeynoteCardProps) => {
  const initials = `${keynote.prenom?.[0] || ''}${keynote.nom?.[0] || ''}`.toUpperCase();

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-secondary/5 hover:-translate-y-1">
      <div className="absolute inset-x-0 top-0 h-1 bg-secondary opacity-0 transition-opacity group-hover:opacity-100" />
      
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-secondary/20">
            <AvatarFallback className="bg-secondary/10 text-secondary text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              {keynote.prenom} {keynote.nom}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3 w-3" />
              {keynote.fonction}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <a 
            href={`mailto:${keynote.email}`} 
            className="hover:text-primary transition-colors truncate"
          >
            {keynote.email}
          </a>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-3 border-t border-border/50">
        <Button variant="ghost" size="icon" onClick={() => onEdit(keynote)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(keynote.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KeynoteCard;
