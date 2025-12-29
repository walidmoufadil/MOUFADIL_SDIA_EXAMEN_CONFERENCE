import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { conferenceService } from '@/services/conferenceService';
import { keynoteService } from '@/services/keynoteService';
import { Conference, ConferenceRequest, ReviewRequest } from '@/types/conference';
import Layout from '@/components/layout/Layout';
import ConferenceCard from '@/components/conferences/ConferenceCard';
import ConferenceForm from '@/components/conferences/ConferenceForm';
import ReviewsDialog from '@/components/conferences/ReviewsDialog';
import LoadingSpinner from '@/components/ui/loading-spinner';
import EmptyState from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ConferencesPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [reviewsDialogOpen, setReviewsDialogOpen] = useState(false);
  const [conferenceForReviews, setConferenceForReviews] = useState<Conference | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conferenceToDelete, setConferenceToDelete] = useState<number | null>(null);

  const { data: conferences, isLoading } = useQuery({
    queryKey: ['conferences'],
    queryFn: () => conferenceService.getAll(token!),
    enabled: !!token,
  });

  const { data: keynotes } = useQuery({
    queryKey: ['keynotes'],
    queryFn: () => keynoteService.getAll(token!),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (data: ConferenceRequest) => conferenceService.create(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
      toast.success('Conférence créée avec succès');
      setFormOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ConferenceRequest }) =>
      conferenceService.update(token!, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
      toast.success('Conférence modifiée avec succès');
      setFormOpen(false);
      setSelectedConference(null);
    },
    onError: () => toast.error('Erreur lors de la modification'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => conferenceService.delete(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
      toast.success('Conférence supprimée');
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  const addReviewMutation = useMutation({
    mutationFn: ({ id, reviews }: { id: number; reviews: ReviewRequest[] }) =>
      conferenceService.addReviews(token!, id, reviews),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
      toast.success('Review ajoutée');
    },
    onError: () => toast.error('Erreur lors de l\'ajout de la review'),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: ({ conferenceId, reviewId }: { conferenceId: number; reviewId: number }) =>
      conferenceService.deleteReview(token!, conferenceId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
      toast.success('Review supprimée');
    },
    onError: () => toast.error('Erreur lors de la suppression de la review'),
  });

  const filteredConferences = conferences?.filter((c) =>
    c.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (data: ConferenceRequest) => {
    if (selectedConference) {
      updateMutation.mutate({ id: selectedConference.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (conference: Conference) => {
    setSelectedConference(conference);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setConferenceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (conferenceToDelete) {
      deleteMutation.mutate(conferenceToDelete);
      setDeleteDialogOpen(false);
      setConferenceToDelete(null);
    }
  };

  const handleViewReviews = (conference: Conference) => {
    setConferenceForReviews(conference);
    setReviewsDialogOpen(true);
  };

  const handleAddReview = (conferenceId: number, review: ReviewRequest) => {
    addReviewMutation.mutate({ id: conferenceId, reviews: [review] });
  };

  const handleDeleteReview = (conferenceId: number, reviewId: number) => {
    deleteReviewMutation.mutate({ conferenceId, reviewId });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Conférences</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos conférences et événements
            </p>
          </div>
          <Button 
            onClick={() => { setSelectedConference(null); setFormOpen(true); }}
            className="gradient-primary text-primary-foreground shadow-glow"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle conférence
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une conférence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <LoadingSpinner className="py-20" size="lg" />
        ) : filteredConferences && filteredConferences.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredConferences.map((conference, index) => (
              <div 
                key={conference.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ConferenceCard
                  conference={conference}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewReviews={handleViewReviews}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="Aucune conférence"
            description="Commencez par créer votre première conférence"
            action={
              <Button 
                onClick={() => setFormOpen(true)}
                className="gradient-primary text-primary-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Créer une conférence
              </Button>
            }
          />
        )}
      </div>

      <ConferenceForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setSelectedConference(null); }}
        onSubmit={handleSubmit}
        conference={selectedConference}
        keynotes={keynotes || []}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ReviewsDialog
        open={reviewsDialogOpen}
        onClose={() => { setReviewsDialogOpen(false); setConferenceForReviews(null); }}
        conference={conferenceForReviews}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette conférence ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default ConferencesPage;
