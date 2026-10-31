import type { ImageMetadata } from 'astro';
import patrykPortrait from '../assets/team/patryk.jpg';
import dominikaPortrait from '../assets/team/dominika.jpg';

export interface Photo {
  readonly image: ImageMetadata;
  readonly alt: string;
}

// Team portraits: Booksy employee cards; reuse permission confirmed by the user in chat, 2026-10-31.
// Provenance: src/assets/team/SOURCES.md. TODO: Supply approved hero and gallery photos.
// Example: import interior from '../assets/interior.jpg'; then hero: { image: interior, alt: '...' }.
export const photos: Record<'hero' | 'patryk' | 'dominika' | 'interior' | 'haircut' | 'beard', Photo | null> = {
  hero: null,
  patryk: { image: patrykPortrait, alt: 'Patryk — barber w Sqoonay’s Barbershop' },
  dominika: { image: dominikaPortrait, alt: 'Dominika — barberka w Sqoonay’s Barbershop' },
  interior: null,
  haircut: null,
  beard: null,
};

export const gallery = [
  { number: '01', label: 'Wnętrze', key: 'interior' },
  { number: '02', label: 'Strzyżenie', key: 'haircut' },
  { number: '03', label: 'Broda', key: 'beard' },
] as const;
