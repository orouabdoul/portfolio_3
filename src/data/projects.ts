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
      "Refonte complète de l'interface utilisateur pour une application e-commerce de gestion en masse de produits.",
    fullDescription: `Conception d'une interface moderne et intuitive pour Smart Bulk Editor — application e-commerce de gestion en masse de produits.\n\n✅ Impact : prototype interactif Figma validé avant développement, réduisant les aller-retours et accélérant la mise en production.\n\nLivraisons :\n- Wireframes basse fidélité\n- Maquettes haute fidélité sur Figma\n- Design System (couleurs, typographie, composants)\n- Prototype interactif cliquable\n- Animations et micro-interactions`,
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
    fullDescription: `SIM est une application mobile développée pour COSIT-BENIN, permettant le suivi en temps réel des prix sur les marchés agricoles du Bénin.\n\n✅ Impact : déployée auprès des agents terrain sur l'ensemble du territoire national, avec collecte de données fiable en mode hors-ligne.\n\nFonctionnalités :\n- Collecte de données terrain par les agents\n- Analyse et visualisation des prix par marché\n- Reporting et export de données\n- Mode hors-ligne pour les zones à faible connectivité\n- Interface simple et accessible\n\n🖥️ Back-office web : tableau de bord d'administration pour la supervision des données, la gestion des agents et la génération de rapports.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Laravel', 'PHP'],
    duration: '6 mois',
    featured: true,
  },
  {
    id: 'mymonto-garages',
    title: 'MyMonto — App Garages',
    shortDescription:
      'Application pour la gestion des réparations automobiles, assurances, localisation GPS et marketplace.',
    fullDescription: `MyMonto Garages est l'application destinée aux propriétaires et gérants de garages — partie d'un écosystème auto complet (2 apps complémentaires).\n\n✅ Impact : gestion centralisée des interventions avec prise de RDV en ligne, marketplace intégrée et suivi GPS des garages partenaires.\n\nFonctionnalités :\n- Gestion des interventions et réparations\n- Suivi des révisions et historique véhicule\n- Localisation GPS des garages partenaires\n- Gestion des assurances\n- Prise de rendez-vous en ligne\n- Marketplace de pièces détachées\n\n🖥️ Back-office web : panneau d'administration complet pour la gestion des garages, des utilisateurs, des commandes et des statistiques métier.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'REST API', 'Laravel', 'PHP'],
    duration: '8 mois',
    featured: true,
  },
  {
    id: 'mymonto-users',
    title: 'MyMonto — App Utilisateurs',
    shortDescription:
      'App pour les propriétaires de véhicules : suivi des réparations, prise de RDV et marketplace.',
    fullDescription: `MyMonto Users est l'application complémentaire destinée aux propriétaires de véhicules, formant un écosystème auto complet avec l'app Garages.\n\n✅ Impact : expérience utilisateur fluide du diagnostic à la prise en charge, avec paiement Stripe intégré et notifications push en temps réel.\n\nFonctionnalités :\n- Suivi de l'historique des réparations\n- Prise de rendez-vous avec les garages\n- Localisation des garages à proximité\n- Marketplace pour acheter/vendre des pièces\n- Gestion des assurances véhicule\n- Notifications push en temps réel\n\n🖥️ Back-office web partagé commun à l'app Garages, gérant l'ensemble de l'écosystème : utilisateurs, garages, transactions et reporting.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Stripe', 'Laravel', 'PHP'],
    duration: '8 mois',
    featured: false,
  },
];
