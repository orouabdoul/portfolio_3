export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  price?: string;
  duration?: string;
  badge?: string;
}

export const services: Service[] = [
  {
    id: 'ux-ui',
    icon: '🎨',
    title: 'UX-UI Design',
    description:
      'Interfaces élégantes, simples à utiliser et visuellement cohérentes. Wireframes, maquettes haute fidélité sur Figma, design system et prototype interactif — livrés prêts à développer.',
    cta: 'Démarrer mon design',
    price: 'À partir de 80 000 FCFA',
    duration: 'Livraison en 2–3 semaines',
  },
  {
    id: 'mobile-dev',
    icon: '📱',
    title: 'Développement mobile',
    description:
      "Applications performantes pour Android & iOS en Flutter ou React Native selon votre contexte. Architecture propre, code testé et documenté. Back-office web inclus si le projet le nécessite.",
    cta: 'Lancer mon application',
    price: 'À partir de 150 000 FCFA',
    duration: 'Livraison en 4–8 semaines',
    badge: '⭐ Le plus demandé',
  },
  {
    id: 'coaching',
    icon: '🎓',
    title: 'Coaching & Formations',
    description:
      "Coaching personnalisé, ateliers pratiques et formations sur-mesure pour maîtriser Flutter, React Native ou l'UX/UI — pour débutants comme pour confirmés.",
    cta: 'Commencer ma formation',
    price: 'Sur devis personnalisé',
    duration: 'Dès 1 session / semaine',
  },
];
