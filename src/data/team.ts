export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly instagram: string | null;
}

// TODO: Confirm current team. Portrait reuse permission confirmed in chat, 2026-10-31.
// No individual booking links supplied.
export const teamConfirmed = false;
export const team: readonly TeamMember[] = [
  { name: 'Patryk', role: 'Barber', initials: 'P', instagram: null },
  { name: 'Dominika', role: 'Barber', initials: 'D', instagram: 'https://www.instagram.com/domi.nika_hair/' },
];
