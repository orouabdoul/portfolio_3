export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    id: 'f1',
    question: 'Combien de temps pour une app mobile ?',
    answer: "En moyenne 4 à 8 semaines selon la complexité, avec des points d'étape réguliers.",
  },
  {
    id: 'f2',
    question: "Est-ce que tu t'occupes du design ?",
    answer:
      "Oui, je prends en charge l'UX/UI de A à Z, de la réflexion à la maquette finale. Je réalise également des designs modernes et des prototypes cliquables pour valider l'expérience utilisateur avant le développement.",
  },
  {
    id: 'f3',
    question: 'Peux-tu assurer la maintenance après livraison ?',
    answer: 'Bien sûr, je propose un suivi et des évolutions selon vos besoins.',
  },
  {
    id: 'f4',
    question: "Quel est le coût d'un projet mobile ?",
    answer:
      "Chaque projet est unique. Après un échange sur vos besoins, je vous propose un devis transparent et adapté à votre budget.",
  },
  {
    id: 'f5',
    question: "Puis-je suivre l'avancement de mon projet ?",
    answer:
      "Oui, vous recevez des points d'étape réguliers, des démos et un accès à un espace de suivi pour rester informé à chaque phase.",
  },
  {
    id: 'f6',
    question: 'Proposes-tu des accompagnements ou des formations ?',
    answer:
      'Oui, je propose du coaching, des ateliers pratiques et des formations sur-mesure pour vous ou vos équipes.',
  },
  {
    id: 'f7',
    question: "Et si je n'ai pas encore d'idée précise ?",
    answer:
      "Aucun souci ! Je vous accompagne dès la phase d'idéation pour clarifier vos besoins et bâtir un projet solide et réaliste.",
  },
];
