export interface Service {
  readonly name: string;
  readonly price: number;
  readonly durationMinutes: number;
  readonly featured: boolean;
}

// Source: SPEC.md / Booksy, 2026-10-31. TODO: Confirm every service, price and duration.
export const serviceReview = {
  confirmed: false,
  sourceDate: '2026-10-31',
  sourceDateLabel: '31.10.2026',
};

export const services: readonly Service[] = [
  { name: 'Strzyżenie męskie', price: 70, durationMinutes: 50, featured: true },
  { name: 'Combo (włosy + broda)', price: 110, durationMinutes: 80, featured: true },
  { name: 'Strzyżenie brody', price: 50, durationMinutes: 30, featured: true },
  { name: 'Strzyżenie długich włosów', price: 90, durationMinutes: 60, featured: false },
  { name: 'Golenie głowy na zero (golarką)', price: 40, durationMinutes: 25, featured: false },
  { name: 'Combo długie włosy + broda', price: 130, durationMinutes: 90, featured: false },
];

export const formatPrice = (price: number): string => new Intl.NumberFormat('pl-PL', {
  style: 'currency', currency: 'PLN', maximumFractionDigits: 0,
}).format(price);
