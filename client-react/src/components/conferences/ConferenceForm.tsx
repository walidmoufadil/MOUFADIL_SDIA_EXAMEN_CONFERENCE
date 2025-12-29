import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Conference, ConferenceRequest, ConferenceType, Keynote } from '@/types/conference';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const conferenceSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis'),
  type: z.enum(['Academic', 'commercial'] as const),
  date: z.string().min(1, 'La date est requise'),
  duree: z.coerce.number().min(0.5, 'La durée minimum est 0.5h'),
  nombreInscrits: z.coerce.number().min(0, 'Le nombre d\'inscrits doit être positif'),
  score: z.coerce.number().min(0).max(10, 'Le score doit être entre 0 et 10'),
  keynoteId: z.coerce.number().min(1, 'Un keynote est requis'),
});

type ConferenceFormData = z.infer<typeof conferenceSchema>;

interface ConferenceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ConferenceRequest) => void;
  conference?: Conference | null;
  keynotes: Keynote[];
  isLoading?: boolean;
}

const ConferenceForm = ({ 
  open, 
  onClose, 
  onSubmit, 
  conference, 
  keynotes,
  isLoading 
}: ConferenceFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ConferenceFormData>({
    resolver: zodResolver(conferenceSchema),
    defaultValues: conference ? {
      titre: conference.titre,
      type: conference.type as ConferenceType,
      date: conference.date ? new Date(conference.date).toISOString().slice(0, 16) : '',
      duree: conference.duree,
      nombreInscrits: conference.nombreInscrits,
      score: conference.score,
      keynoteId: conference.keynoteId,
    } : {
      titre: '',
      type: 'Academic',
      date: '',
      duree: 1,
      nombreInscrits: 0,
      score: 0,
      keynoteId: 0,
    },
  });

  const selectedType = watch('type');

  const handleFormSubmit = (data: ConferenceFormData) => {
    const requestData: ConferenceRequest = {
      titre: data.titre,
      type: data.type,
      date: new Date(data.date).toISOString(),
      duree: data.duree,
      nombreInscrits: data.nombreInscrits,
      score: data.score,
      keynoteId: data.keynoteId,
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {conference ? 'Modifier la conférence' : 'Nouvelle conférence'}
          </DialogTitle>
          <DialogDescription>
            {conference 
              ? 'Modifiez les informations de la conférence.' 
              : 'Créez une nouvelle conférence en remplissant les informations ci-dessous.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre</Label>
            <Input
              id="titre"
              {...register('titre')}
              placeholder="Titre de la conférence"
            />
            {errors.titre && (
              <p className="text-sm text-destructive">{errors.titre.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => setValue('type', value as ConferenceType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Academic">Académique</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="keynoteId">Keynote</Label>
              <Select
                value={watch('keynoteId')?.toString()}
                onValueChange={(value) => setValue('keynoteId', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {keynotes.map((keynote) => (
                    <SelectItem key={keynote.id} value={keynote.id.toString()}>
                      {keynote.prenom} {keynote.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.keynoteId && (
                <p className="text-sm text-destructive">{errors.keynoteId.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date et heure</Label>
            <Input
              id="date"
              type="datetime-local"
              {...register('date')}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duree">Durée (h)</Label>
              <Input
                id="duree"
                type="number"
                step="0.5"
                {...register('duree')}
              />
              {errors.duree && (
                <p className="text-sm text-destructive">{errors.duree.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nombreInscrits">Inscrits</Label>
              <Input
                id="nombreInscrits"
                type="number"
                {...register('nombreInscrits')}
              />
              {errors.nombreInscrits && (
                <p className="text-sm text-destructive">{errors.nombreInscrits.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                step="0.1"
                max="10"
                {...register('score')}
              />
              {errors.score && (
                <p className="text-sm text-destructive">{errors.score.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="gradient-primary text-primary-foreground">
              {isLoading ? 'Chargement...' : conference ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConferenceForm;
