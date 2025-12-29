import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { keynoteService } from '@/services/keynoteService';
import { Keynote, KeynoteRequest } from '@/types/conference';
import Layout from '@/components/layout/Layout';
import KeynoteCard from '@/components/keynotes/KeynoteCard';
import KeynoteForm from '@/components/keynotes/KeynoteForm';
import LoadingSpinner from '@/components/ui/loading-spinner';
import EmptyState from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search } from 'lucide-react';
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

const KeynotesPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedKeynote, setSelectedKeynote] = useState<Keynote | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [keynoteToDelete, setKeynoteToDelete] = useState<number | null>(null);

  const { data: keynotes, isLoading } = useQuery({
    queryKey: ['keynotes'],
    queryFn: () => keynoteService.getAll(token!),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: (data: KeynoteRequest) => keynoteService.create(token!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keynotes'] });
      toast.success('Keynote créé avec succès');
      setFormOpen(false);
    },
    onError: () => toast.error('Erreur lors de la création'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: KeynoteRequest }) =>
      keynoteService.update(token!, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keynotes'] });
      toast.success('Keynote modifié avec succès');
      setFormOpen(false);
      setSelectedKeynote(null);
    },
    onError: () => toast.error('Erreur lors de la modification'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => keynoteService.delete(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keynotes'] });
      toast.success('Keynote supprimé');
    },
    onError: () => toast.error('Erreur lors de la suppression'),
  });

  const filteredKeynotes = keynotes?.filter((k) =>
    `${k.prenom} ${k.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (data: KeynoteRequest) => {
    if (selectedKeynote) {
      updateMutation.mutate({ id: selectedKeynote.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (keynote: Keynote) => {
    setSelectedKeynote(keynote);
    setFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setKeynoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (keynoteToDelete) {
      deleteMutation.mutate(keynoteToDelete);
      setDeleteDialogOpen(false);
      setKeynoteToDelete(null);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Keynotes</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos keynote speakers
            </p>
          </div>
          <Button 
            onClick={() => { setSelectedKeynote(null); setFormOpen(true); }}
            className="gradient-primary text-primary-foreground shadow-glow"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouveau keynote
          </Button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un keynote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <LoadingSpinner className="py-20" size="lg" />
        ) : filteredKeynotes && filteredKeynotes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredKeynotes.map((keynote, index) => (
              <div 
                key={keynote.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <KeynoteCard
                  keynote={keynote}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            title="Aucun keynote"
            description="Commencez par ajouter votre premier keynote speaker"
            action={
              <Button 
                onClick={() => setFormOpen(true)}
                className="gradient-primary text-primary-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un keynote
              </Button>
            }
          />
        )}
      </div>

      <KeynoteForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setSelectedKeynote(null); }}
        onSubmit={handleSubmit}
        keynote={selectedKeynote}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce keynote ? Cette action est irréversible.
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

export default KeynotesPage;
