export interface TimelineEntry {
  id: string;
  title: string;
  institution: string;
  period: string;
  description?: string;
}

export const educationEntries: TimelineEntry[] = [
  {
    id: 'e1',
    title: 'Programme "Réussir en Afrique"',
    institution: 'Cotonou',
    period: 'Mars 2025 – Aujourd\'hui',
    description:
      'Entrepreneuriat digital, freelancing, marketing d\'affiliation, stratégies réseaux sociaux.',
  },
  {
    id: 'e2',
    title: 'Formation Design UI/UX',
    institution: '',
    period: '2023 – 2024',
    description:
      'Principes de design, prototypage, Figma, Adobe XD, expérience utilisateur, accessibilité.',
  },
  {
    id: 'e3',
    title: 'Licence Professionnelle en Génie Informatique',
    institution: 'École supérieure Faucon',
    period: '2021 – 2024',
    description: 'Formation professionnelle & développement mobile.',
  },
  {
    id: 'e4',
    title: 'Baccalauréat',
    institution: 'CEG Gomparou',
    period: '2017 – 2021',
    description: 'Série scientifique.',
  },
  {
    id: 'e5',
    title: 'Certificat d\'Études du Premier Cycle',
    institution: 'CEG Kokey',
    period: '2013 – 2017',
  },
];
