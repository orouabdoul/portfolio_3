export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  imageUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Omar Faruk',
    role: 'Paid Ads · GA4 · CRO',
    quote:
      "Amadou a apporté professionnalisme, précision et rapidité, offrant une collaboration fluide et un résultat frontend/UX qui a propulsé notre projet.",
  },
  {
    id: 't2',
    name: 'Julien M.',
    role: 'Solopreneur · SaaS',
    quote: "Pédagogie, expertise et disponibilité. Je recommande à 100 % pour tout projet mobile !",
  },
  {
    id: 't3',
    name: 'Fatou D.',
    role: 'Responsable Produit',
    quote:
      "Un vrai partenaire, force de proposition et toujours à l'écoute. Résultat : une appli qui cartonne !",
  },
];
