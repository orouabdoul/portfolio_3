export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Omar Faruk',
    role: 'Consultant Marketing · Paid Ads & CRO',
    quote:
      "En 6 semaines, Amadou a livré un frontend fluide et une UX irréprochable. Professionnalisme, précision et réactivité — notre projet a décollé dès le lancement.",
    rating: 5,
  },
  {
    id: 't2',
    name: 'Julien M.',
    role: 'Solopreneur · SaaS',
    quote:
      "Pédagogie, expertise et disponibilité hors pair. Mon app SaaS livrée dans les délais, avec un code propre et prêt à scaler. Je recommande à 100 % sans hésitation !",
    rating: 5,
  },
  {
    id: 't3',
    name: 'Fatou D.',
    role: 'Responsable Produit · Startup Tech',
    quote:
      "Un vrai partenaire stratégique, force de proposition et toujours à l'écoute. Notre appli a été adoptée immédiatement par nos utilisateurs dès le premier jour de lancement.",
    rating: 5,
  },
];
