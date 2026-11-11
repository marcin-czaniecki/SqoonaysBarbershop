interface PostalAddress {
  readonly street: string;
  readonly postalCode: string;
  readonly city: string;
  readonly country: string;
}

interface Business {
  readonly name: string;
  readonly legalName: string;
  readonly taxId: string;
  readonly address: PostalAddress;
  readonly correspondenceAddress: PostalAddress;
  readonly contact: { readonly phone: string; readonly phoneDisplay: string; readonly email: string };
  readonly links: { readonly booking: string; readonly instagram: string; readonly directions: string; readonly mapEmbed: string };
  readonly seo: { readonly title: string; readonly description: string };
}

const salonAddress: PostalAddress = { street: 'Mylna 1', postalCode: '81-009', city: 'Gdynia', country: 'PL' };

// Source: SPEC.md.
export const business: Business = {
  name: "Sqoonay's Barbershop",
  legalName: 'Patryk Pyszka Usługi fryzjerskie',
  taxId: '5851512406',
  address: salonAddress,
  correspondenceAddress: salonAddress,
  contact: { phone: '+48692729148', phoneDisplay: '692 729 148', email: 'sqoonaybarber@gmail.com' },
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
};

export const businessContact = {
  phone: `tel:${business.contact.phone}`,
  email: `mailto:${business.contact.email}`,
  mailingAddress: `${business.correspondenceAddress.street}, ${business.correspondenceAddress.postalCode} ${business.correspondenceAddress.city}`,
} as const;

export const legalPages = {
  privacy: '/polityka-prywatnosci/',
  terms: '/regulamin/',
} as const;

export const navigation = [
  { href: '#uslugi', label: 'Usługi' },
  { href: '#o-nas', label: 'O nas' },
  { href: '#zespol', label: 'Barberzy' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#opinie', label: 'Opinie' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;
