import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Keynote, KeynoteRequest } from '@/types/conference';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const keynoteSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  fonction: z.string().min(1, 'La fonction est requise'),
});

type KeynoteFormData = z.infer<typeof keynoteSchema>;

interface KeynoteFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: KeynoteRequest) => void;
  keynote?: Keynote | null;
  isLoading?: boolean;
}

const KeynoteForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  keynote, 
  isLoading 
}: KeynoteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KeynoteFormData>({
    resolver: zodResolver(keynoteSchema),
    defaultValues: keynote ? {
      nom: keynote.nom,
      prenom: keynote.prenom,
      email: keynote.email,
      fonction: keynote.fonction,
    } : {
      nom: '',
      prenom: '',
      email: '',
      fonction: '',
    },
  });

  const handleFormSubmit = (data: KeynoteFormData) => {
    const requestData: KeynoteRequest = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      fonction: data.fonction,
    };
    onSubmit(requestData);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {keynote ? 'Modifier le keynote' : 'Nouveau keynote'}
          </DialogTitle>
          <DialogDescription>
            {keynote 
              ? 'Modifiez les informations du keynote speaker.' 
              : 'Ajoutez un nouveau keynote speaker.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                {...register('prenom')}
                placeholder="Jean"
              />
              {errors.prenom && (
                <p className="text-sm text-destructive">{errors.prenom.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                {...register('nom')}
                placeholder="Dupont"
              />
              {errors.nom && (
                <p className="text-sm text-destructive">{errors.nom.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jean.dupont@email.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fonction">Fonction</Label>
            <Input
              id="fonction"
              {...register('fonction')}
              placeholder="Professeur, CEO, Chercheur..."
            />
            {errors.fonction && (
              <p className="text-sm text-destructive">{errors.fonction.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="gradient-primary text-primary-foreground">
              {isLoading ? 'Chargement...' : keynote ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KeynoteForm;
