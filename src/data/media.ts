import type { ImageMetadata } from 'astro';
import patrykPortrait from '../assets/team/patryk.jpg';
import dominikaPortrait from '../assets/team/dominika.jpg';
import salonInterior from '../assets/salon/interior.jpg';
import sqoonayHaircut from '../assets/gallery/sqoonay-haircut.webp';
import dominikaHaircut from '../assets/gallery/dominika-haircut.jpg';

export interface Photo {
  readonly image: ImageMetadata;
  readonly alt: string;
}

// Team portraits: Booksy employee cards; reuse permission confirmed by the user in chat, 2026-10-31.
// Salon image supplied by the user; portfolio reuse permission confirmed in chat, 2026-11-01.
// Provenance: src/assets/SOURCES.md and src/assets/team/SOURCES.md.
const interior: Photo = {
  image: salonInterior,
  alt: 'Wnętrze Sqoonay’s Barbershop przy Mylnej 1 w Gdyni — fotele barberskie, lustra i poczekalnia',
};
export const photos: Record<'hero' | 'patryk' | 'dominika' | 'interior' | 'haircut' | 'styling', Photo | null> = {
  hero: interior,
  patryk: { image: patrykPortrait, alt: 'Patryk — barber w Sqoonay’s Barbershop' },
  dominika: { image: dominikaPortrait, alt: 'Dominika — barberka w Sqoonay’s Barbershop' },
  interior,
  haircut: {
    image: sqoonayHaircut,
    alt: 'Strzyżenie z krótkimi bokami i dłuższą, teksturowaną górą — z portfolio Sqoonay’s',
  },
  styling: {
    image: dominikaHaircut,
    alt: 'Krótkie blond włosy z krótszymi bokami — realizacja z portfolio Dominiki',
  },
};

export const gallery = [
  { number: '01', label: 'Wnętrze salonu', key: 'interior', sourceUrl: null },
  { number: '02', label: 'Z portfolio Sqoonay’s', key: 'haircut', sourceUrl: 'https://www.instagram.com/sqoonaybarbershop/p/C69KGwmorG6/' },
  { number: '03', label: 'Z portfolio Dominiki', key: 'styling', sourceUrl: 'https://www.instagram.com/domi.nika_hair/p/C5eIdVmrPgR/' },
] as const;
