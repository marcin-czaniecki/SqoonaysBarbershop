import { business } from './business.ts';

export const social = {
  title: `${business.name} | ${business.address.city}`,
  description: 'Włosy. Broda. Twój styl. Odwiedź nas przy Mylnej 1 w Gdyni i umów wizytę przez Booksy.',
  headline: 'Strzyżenie z charakterem.',
  tagline: 'Włosy. Broda. Twój styl.',
  bookingLabel: 'Umów wizytę przez Booksy',
  domainLabel: 'sqoonays.pl',
  imageAlt: 'Sqoonay’s Barbershop — nazwa salonu, Gdynia, Mylna 1, rezerwacja przez Booksy i zdjęcie wnętrza z fotelami barberskimi.',
} as const;
