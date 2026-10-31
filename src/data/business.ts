interface Business {
  readonly name: string;
  readonly address: { readonly street: string; readonly postalCode: string; readonly city: string; readonly country: string };
  readonly links: { readonly booking: string; readonly instagram: string; readonly directions: string; readonly mapEmbed: string };
  readonly seo: { readonly title: string; readonly description: string };
}

// Source: SPEC.md. TODO: Obtain final owner approval before publication.
export const business = {
  name: "Sqoonay's Barbershop",
  address: { street: 'Mylna 1', postalCode: '81-009', city: 'Gdynia', country: 'PL' },
  links: {
    booking: 'https://booksy.com/pl-pl/363234_sqoonay-s-barbershop_barber-shop_21029_gdynia',
    instagram: 'https://www.instagram.com/sqoonaybarbershop/',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Mylna%201%2C%2081-009%20Gdynia%2C%20Polska',
    mapEmbed: 'https://www.google.com/maps?q=Mylna%201%2C%2081-009%20Gdynia%2C%20Polska&z=16&output=embed&hl=pl',
  },
  seo: {
    title: "Sqoonay's Barbershop | Barber Gdynia, Mylna 1",
    description: "Strzyżenie męskie, pielęgnacja brody i usługi barberskie w Gdyni. Poznaj Sqoonay's Barbershop i zarezerwuj wizytę przez Booksy.",
  },
} as const satisfies Business;

export const navigation = [
  { href: '#uslugi', label: 'Usługi' },
  { href: '#o-nas', label: 'O nas' },
  { href: '#zespol', label: 'Barberzy' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;
