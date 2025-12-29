import { getKeynoteApiUrl } from '@/config/api';
import { Keynote, KeynoteRequest } from '@/types/conference';

const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
});

export const keynoteService = {
  async getAll(token: string): Promise<Keynote[]> {
    const response = await fetch(getKeynoteApiUrl('/api/keynotes'), {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch keynotes');
    return response.json();
  },

  async getById(token: string, id: number): Promise<Keynote> {
    const response = await fetch(getKeynoteApiUrl(`/api/keynotes/${id}`), {
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to fetch keynote');
    return response.json();
  },

  async create(token: string, data: KeynoteRequest): Promise<void> {
    const response = await fetch(getKeynoteApiUrl('/api/keynotes/create'), {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create keynote');
  },

  async update(token: string, id: number, data: KeynoteRequest): Promise<void> {
    const response = await fetch(getKeynoteApiUrl(`/api/keynotes/${id}`), {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update keynote');
  },

  async patch(token: string, id: number, data: Partial<KeynoteRequest>): Promise<void> {
    const response = await fetch(getKeynoteApiUrl(`/api/keynotes/${id}`), {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to patch keynote');
  },

  async delete(token: string, id: number): Promise<void> {
    const response = await fetch(getKeynoteApiUrl(`/api/keynotes/delete/${id}`), {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (!response.ok) throw new Error('Failed to delete keynote');
  },
};
