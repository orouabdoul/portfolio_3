export type ProjectCategory = 'mobile' | 'design' | 'web';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  stack: string[];
  duration?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'ux-smartbulk',
    title: 'Smart Bulk Editor — UI/UX',
    shortDescription:
      'Refonte complète de l\'interface utilisateur pour une application e-commerce de gestion en masse de produits.',
    fullDescription: `Conception d'une interface moderne et intuitive pour Smart Bulk Editor.\n\nLivraisons :\n- Wireframes basse fidélité\n- Maquettes haute fidélité sur Figma\n- Design System (couleurs, typographie, composants)\n- Prototype interactif cliquable\n- Animations et micro-interactions`,
    category: 'design',
    stack: ['Figma', 'Adobe XD', 'UI/UX', 'Prototypage'],
    duration: '2 mois',
    featured: true,
  },
  {
    id: 'sim-app',
    title: 'SIM — Suivi des Prix Marchés',
    shortDescription:
      'Application mobile de suivi des prix sur les marchés agricoles du Bénin (collecte, analyse, reporting terrain).',
    fullDescription: `SIM est une application mobile développée pour COSIT-BENIN, permettant le suivi en temps réel des prix sur les marchés agricoles.\n\nFonctionnalités :\n- Collecte de données terrain par les agents\n- Analyse et visualisation des prix par marché\n- Reporting et export de données\n- Mode hors-ligne pour les zones à faible connectivité\n- Interface simple et accessible`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    duration: '6 mois',
    featured: true,
  },
  {
    id: 'mymonto-garages',
    title: 'MyMonto — App Garages',
    shortDescription:
      'Application pour la gestion des réparations automobiles, assurances, localisation GPS et marketplace.',
    fullDescription: `MyMonto Garages est l'application à destination des propriétaires et gérants de garages automobiles.\n\nFonctionnalités :\n- Gestion des interventions et réparations\n- Suivi des révisions et historique véhicule\n- Localisation GPS des garages partenaires\n- Gestion des assurances\n- Prise de rendez-vous en ligne\n- Marketplace de pièces détachées`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'REST API'],
    duration: '8 mois',
    featured: true,
  },
  {
    id: 'mymonto-users',
    title: 'MyMonto — App Utilisateurs',
    shortDescription:
      'App pour les propriétaires de véhicules : suivi des réparations, prise de RDV et marketplace.',
    fullDescription: `MyMonto Users est l'application complémentaire destinée aux propriétaires de véhicules.\n\nFonctionnalités :\n- Suivi de l'historique des réparations\n- Prise de rendez-vous avec les garages\n- Localisation des garages à proximité\n- Marketplace pour acheter/vendre des pièces\n- Gestion des assurances véhicule\n- Notifications push en temps réel`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Stripe'],
    duration: '8 mois',
    featured: false,
  },
];
