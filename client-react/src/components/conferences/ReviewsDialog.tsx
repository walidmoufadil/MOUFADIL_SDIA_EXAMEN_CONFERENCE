import { useState } from 'react';
import { Conference, ReviewRequest } from '@/types/conference';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessageSquare, Plus, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import EmptyState from '@/components/ui/empty-state';

interface ReviewsDialogProps {
  open: boolean;
  onClose: () => void;
  conference: Conference | null;
  onAddReview: (conferenceId: number, review: ReviewRequest) => void;
  onDeleteReview: (conferenceId: number, reviewId: number) => void;
}

const ReviewsDialog = ({ 
  open, 
  onClose, 
  conference,
  onAddReview,
  onDeleteReview 
}: ReviewsDialogProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState('');

  if (!conference) return null;

  const handleAddReview = () => {
    if (newComment.trim()) {
      onAddReview(conference.id, {
        date: new Date().toISOString(),
        commentaire: newComment.trim(),
      });
      setNewComment('');
      setShowAddForm(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Reviews - {conference.titre}
          </DialogTitle>
          <DialogDescription>
            Gérez les reviews de cette conférence
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              className="gradient-primary text-primary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une review
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4 space-y-3">
                <Textarea
                  placeholder="Écrivez votre commentaire..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleAddReview}
                    disabled={!newComment.trim()}
                  >
                    Publier
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {conference.reviews && conference.reviews.length > 0 ? (
            <div className="space-y-3">
              {conference.reviews.map((review) => (
                <Card key={review.id} className="group">
                  <CardHeader className="pb-2 flex-row items-start justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {review.date 
                        ? format(new Date(review.date), 'dd MMM yyyy à HH:mm', { locale: fr })
                        : 'Date inconnue'}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => review.id && onDeleteReview(conference.id, review.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{review.commentaire}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={MessageSquare}
              title="Aucune review"
              description="Cette conférence n'a pas encore de reviews."
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewsDialog;
