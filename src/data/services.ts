export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
}

export const services: Service[] = [
  {
    id: 'ux-ui',
    icon: '🎨',
    title: 'UX-UI Design',
    description:
      'Nous créons des interfaces élégantes, simples à utiliser et visuellement cohérentes grâce à une méthode rigoureuse alliant wireframes, maquettes interactives et branding mobile.',
    cta: 'En savoir plus',
  },
  {
    id: 'mobile-dev',
    icon: '📱',
    title: 'Développement mobile',
    description:
      'Nous développons des applications performantes, rapides et évolutives pour Android et iOS, en utilisant une seule base de code. Grâce à une architecture propre et optimisée, chaque app est pensée pour durer et s\'adapter facilement aux futurs besoins.',
    cta: 'En savoir plus',
  },
  {
    id: 'coaching',
    icon: '🎓',
    title: 'Accompagnements & Formations',
    description:
      'Coaching personnalisé, ateliers pratiques et formations sur-mesure pour maîtriser le développement mobile, Flutter ou l\'UX/UI, que vous soyez débutant ou confirmé.',
    cta: 'Découvrir',
  },
];
