import { getConferenceApiUrl } from '@/config/api';
import { Conference, ConferenceRequest, ReviewRequest } from '@/types/conference';

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export const conferenceService = {
  async getAll(token: string): Promise<Conference[]> {
    const response = await fetch(getConferenceApiUrl('/api/conferences'), {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch conferences');
    return response.json();
  },

  async getById(token: string, id: number): Promise<Conference> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${id}`), {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch conference');
    return response.json();
  },

  async create(token: string, data: ConferenceRequest): Promise<void> {
    const response = await fetch(getConferenceApiUrl('/api/conferences/create'), {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create conference');
  },

  async update(token: string, id: number, data: ConferenceRequest): Promise<void> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${id}`), {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update conference');
  },

  async patch(token: string, id: number, data: Partial<ConferenceRequest>): Promise<void> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${id}`), {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to patch conference');
  },

  async delete(token: string, id: number): Promise<void> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${id}`), {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete conference');
  },

  async addReviews(token: string, id: number, reviews: ReviewRequest[]): Promise<void> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${id}/reviews`), {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(reviews),
    });
    if (!response.ok) throw new Error('Failed to add reviews');
  },

  async deleteReview(token: string, conferenceId: number, reviewId: number): Promise<void> {
    const response = await fetch(getConferenceApiUrl(`/api/conferences/${conferenceId}/reviews/${reviewId}`), {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete review');
  },
};
