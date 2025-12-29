export interface Review {
  id?: number;
  date: string;
  commentaire: string;
}

export interface ReviewRequest {
  date: string;
  commentaire: string;
}

export interface Keynote {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  fonction: string;
}

export interface KeynoteRequest {
  nom: string;
  prenom: string;
  email: string;
  fonction: string;
}

export type ConferenceType = 'Academic' | 'commercial';

export interface Conference {
  id: number;
  titre: string;
  type: ConferenceType;
  date: string;
  duree: number;
  nombreInscrits: number;
  score: number;
  reviews: Review[];
  keynoteId: number;
  keynote?: Keynote;
}

export interface ConferenceRequest {
  titre: string;
  type: ConferenceType;
  date: string;
  duree: number;
  nombreInscrits: number;
  score: number;
  reviews?: ReviewRequest[];
  keynoteId: number;
}
