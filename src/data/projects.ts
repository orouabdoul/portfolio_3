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
  imageUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  figmaUrl?: string;
  videoUrl?: string;
  videoPoster?: string;
  role?: string;
  year?: string;
  client?: string;
  highlights?: string[];
  features?: string[];
  backOffice?: string;
  challenge?: string;
}

export const projects: Project[] = [
  {
    id: 'ux-smartbulk',
    title: 'Smart Bulk Editor — UI/UX',
    shortDescription:
      "Refonte complète de l'interface utilisateur pour une application e-commerce SaaS de gestion en masse de produits.",
    fullDescription: `Conception d'une interface moderne et intuitive pour Smart Bulk Editor — application e-commerce de gestion en masse de produits.\n\n✅ Impact : prototype interactif Figma validé avant développement, réduisant les aller-retours et accélérant la mise en production.\n\nLivraisons :\n- Wireframes basse fidélité\n- Maquettes haute fidélité sur Figma\n- Design System (couleurs, typographie, composants)\n- Prototype interactif cliquable\n- Animations et micro-interactions`,
    category: 'design',
    stack: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototypage', 'Design System'],
    duration: '2 mois',
    featured: true,
    role: 'UI/UX Designer',
    year: '2024',
    client: 'Smart Bulk Editor',
    challenge:
      "L'application existante souffrait d'une interface confuse et peu intuitive, freinant l'adoption et augmentant le taux d'abandon des utilisateurs.",
    highlights: [
      'Prototype interactif validé avant toute ligne de code écrite',
      'Zéro aller-retour entre design et développement grâce au design system',
      'Réduction estimée de 40 % du temps de développement front-end',
      'Expérience utilisateur optimisée pour la gestion en masse',
    ],
    features: [
      'Wireframes basse fidélité pour validation rapide des parcours',
      'Maquettes haute fidélité sur Figma',
      'Design System complet : couleurs, typographie, composants réutilisables',
      'Prototype interactif cliquable',
      'Animations et micro-interactions pour une UX premium',
      'Accessibilité et responsive design inclus',
    ],
  },
  {
    id: 'sim-app',
    title: 'SIM — Suivi des Prix Marchés',
    shortDescription:
      'Application mobile pour le suivi en temps réel des prix agricoles du Bénin — collecte terrain, analyse et reporting.',
    fullDescription: `SIM est une application mobile développée pour COSIT-BENIN, permettant le suivi en temps réel des prix sur les marchés agricoles du Bénin.\n\n✅ Impact : déployée auprès des agents terrain sur l'ensemble du territoire national, avec collecte de données fiable en mode hors-ligne.\n\nFonctionnalités :\n- Collecte de données terrain par les agents\n- Analyse et visualisation des prix par marché\n- Reporting et export de données\n- Mode hors-ligne pour les zones à faible connectivité\n- Interface simple et accessible\n\n🖥️ Back-office web : tableau de bord d'administration pour la supervision des données, la gestion des agents et la génération de rapports.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Laravel', 'PHP', 'MySQL'],
    duration: '6 mois',
    featured: true,
    role: 'Développeur Mobile Full-Stack',
    year: '2024',
    client: 'COSIT-BENIN',
    challenge:
      "La collecte des données de prix agricoles se faisait manuellement sur papier — saisie lente, erreurs fréquentes, aucune centralisation des données en temps réel.",
    highlights: [
      'Déployée sur tout le territoire national du Bénin',
      'Collecte de données 100 % fiable en mode hors-ligne',
      'Réduction drastique des erreurs de saisie terrain',
      'Reporting automatisé pour la prise de décision agricole',
      'Interface pensée pour des agents à faible connectivité',
    ],
    features: [
      'Collecte de données terrain par les agents en temps réel',
      'Analyse et visualisation des prix par marché et région',
      'Reporting automatisé et export de données',
      'Mode hors-ligne robuste pour zones à faible connectivité',
      'Synchronisation automatique dès le retour en ligne',
      'Gestion des comptes agents avec rôles et permissions',
      'Interface optimisée pour une prise en main rapide',
    ],
    backOffice:
      "Tableau de bord d'administration web pour la supervision des données collectées, la gestion des agents terrain, la génération de rapports et l'export des statistiques de prix par marché.",
  },
  {
    id: 'mymonto-garages',
    title: 'MyMonto — App Garages',
    shortDescription:
      'Application Flutter pour les gérants de garages : gestion des réparations, assurances, localisation GPS et marketplace intégrée.',
    fullDescription: `MyMonto Garages est l'application destinée aux propriétaires et gérants de garages — partie d'un écosystème auto complet (2 apps complémentaires).\n\n✅ Impact : gestion centralisée des interventions avec prise de RDV en ligne, marketplace intégrée et suivi GPS des garages partenaires.\n\nFonctionnalités :\n- Gestion des interventions et réparations\n- Suivi des révisions et historique véhicule\n- Localisation GPS des garages partenaires\n- Gestion des assurances\n- Prise de rendez-vous en ligne\n- Marketplace de pièces détachées\n\n🖥️ Back-office web : panneau d'administration complet pour la gestion des garages, des utilisateurs, des commandes et des statistiques métier.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'REST API', 'Laravel', 'PHP', 'MySQL'],
    duration: '8 mois',
    featured: true,
    role: 'Développeur Mobile Full-Stack',
    year: '2024',
    client: 'COSIT-BENIN',
    challenge:
      "Les garages géraient leurs interventions sur papier ou fichiers Excel — aucune visibilité temps réel, prise de RDV manuelle et zéro digitalisation de la relation client.",
    highlights: [
      'Écosystème 2 apps complémentaires (Garages + Utilisateurs)',
      'Prise de rendez-vous en ligne intégrée',
      'Géolocalisation GPS des garages partenaires',
      'Marketplace de pièces détachées intégrée',
      'Gestion complète des assurances véhicule',
      'Tableau de bord back-office pour le suivi métier',
    ],
    features: [
      'Gestion des interventions et réparations en temps réel',
      'Historique complet des révisions par véhicule',
      'Localisation GPS et carte des garages partenaires',
      'Prise et gestion des rendez-vous en ligne',
      'Marketplace de pièces détachées (achat/vente)',
      'Gestion des contrats et sinistres assurance',
      'Notifications push pour les rappels et mises à jour',
      'Dashboard analytique pour les gérants',
    ],
    backOffice:
      "Panneau d'administration web complet pour la gestion des garages partenaires, des utilisateurs, des commandes marketplace, des statistiques métier et des rapports d'activité.",
  },
  {
    id: 'mymonto-users',
    title: 'MyMonto — App Utilisateurs',
    shortDescription:
      'App complémentaire pour les propriétaires de véhicules : suivi des réparations, RDV, marketplace et paiement Stripe intégré.',
    fullDescription: `MyMonto Users est l'application complémentaire destinée aux propriétaires de véhicules, formant un écosystème auto complet avec l'app Garages.\n\n✅ Impact : expérience utilisateur fluide du diagnostic à la prise en charge, avec paiement Stripe intégré et notifications push en temps réel.\n\nFonctionnalités :\n- Suivi de l'historique des réparations\n- Prise de rendez-vous avec les garages\n- Localisation des garages à proximité\n- Marketplace pour acheter/vendre des pièces\n- Gestion des assurances véhicule\n- Notifications push en temps réel\n\n🖥️ Back-office web partagé commun à l'app Garages, gérant l'ensemble de l'écosystème : utilisateurs, garages, transactions et reporting.`,
    category: 'mobile',
    stack: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Stripe', 'Laravel', 'PHP', 'MySQL'],
    duration: '8 mois',
    featured: false,
    role: 'Développeur Mobile Full-Stack',
    year: '2024',
    client: 'COSIT-BENIN',
    challenge:
      "Les propriétaires de véhicules n'avaient aucun outil pour trouver un garage fiable rapidement, suivre leurs réparations ou gérer leurs assurances — tout se faisait par téléphone et bouche-à-oreille.",
    highlights: [
      'Expérience utilisateur fluide du diagnostic à la prise en charge',
      'Paiement Stripe sécurisé intégré',
      'Notifications push en temps réel sur chaque étape',
      'Géolocalisation des garages les plus proches',
      'Historique complet de tous les véhicules du compte',
    ],
    features: [
      'Recherche et localisation des garages à proximité (GPS)',
      'Prise de rendez-vous en ligne avec confirmation instantanée',
      'Suivi en temps réel de l\'avancement des réparations',
      'Historique complet des interventions par véhicule',
      'Marketplace pour acheter/vendre des pièces détachées',
      'Paiement sécurisé via Stripe',
      'Gestion des assurances et sinistres',
      'Notifications push à chaque étape clé',
    ],
    backOffice:
      "Back-office partagé avec l'app Garages — gérant l'ensemble de l'écosystème : utilisateurs, garages, transactions, commandes marketplace et reporting consolidé.",
  },
];
