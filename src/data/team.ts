/**
 * Team.
 * REGEL: Nur echte Personen mit belegten Rollen. Es werden keine
 * Teammitglieder erfunden und keine Titel dazugedichtet.
 *
 * Foto ergänzen: Datei nach /src/assets/about/ legen und
 * `image: '/src/assets/about/<datei>.jpg'` eintragen.
 */
export interface Member {
  name: string;
  role: string;
  /** Optionaler Satz zur Person. Nur ausfüllen, wenn belegt. */
  bio?: string;
  image?: string;
  lead?: boolean;
}

export const team: Member[] = [
  {
    name: 'Nick Mielke',
    role: 'Founder & Creative Director',
    bio: 'Gründer von LAMOR AGENCY. Führt Konzept, Look und Produktion – von der ersten Idee bis zum finalen Frame.',
    lead: true,
  },
  {
    name: 'Nikolai Aharon',
    role: 'Lichttechnischer Assistent / Kameraassistent',
  },
  {
    name: 'Gizem Korkmaz',
    role: 'UGC & Creative Partner',
  },
];
