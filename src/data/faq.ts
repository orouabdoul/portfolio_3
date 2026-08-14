export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export const faqEntries: FaqEntry[] = [
  {
    id: 'f0',
    question: 'Comment démarrer mon projet avec vous ?',
    answer:
      "Simple en 4 étapes : 1️⃣ Remplissez le formulaire de contact → 2️⃣ Appel découverte gratuit de 30 min → 3️⃣ Devis transparent sous 48h → 4️⃣ On démarre ! Même si votre idée est encore floue, je vous accompagne dès la phase d'idéation.",
  },
  {
    id: 'f1',
    question: 'Combien de temps pour développer une app mobile ?',
    answer:
      "En moyenne 4 à 8 semaines selon la complexité. Un MVP simple : 4 semaines. Une app avec back-end, paiement et notifications : 6 à 10 semaines. Des points d'étape réguliers et des démos intermédiaires sont inclus à chaque phase.",
  },
  {
    id: 'f2',
    question: "Est-ce que tu t'occupes aussi du design ?",
    answer:
      "Oui, je prends en charge l'UX/UI de A à Z : analyse des besoins, wireframes, maquettes haute fidélité sur Figma, design system et prototype interactif cliquable. L'expérience utilisateur est validée avant que la première ligne de code soit écrite.",
  },
  {
    id: 'f3',
    question: 'Peux-tu assurer la maintenance après livraison ?',
    answer:
      "Absolument. Je propose des forfaits de maintenance mensuelle pour les corrections de bugs, mises à jour de dépendances et évolutions mineures. Les tarifs démarrent à 30 000 FCFA/mois selon le périmètre. Votre app reste performante dans la durée.",
  },
  {
    id: 'f4',
    question: "Quel est le budget pour un projet mobile ?",
    answer:
      "Les projets démarrent à partir de 150 000 FCFA pour un MVP. Un projet complet (design + développement + déploiement) se situe généralement entre 300 000 et 800 000 FCFA selon les fonctionnalités. Chaque devis est transparent, détaillé et adapté à votre budget réel.",
  },
  {
    id: 'f5',
    question: "Puis-je suivre l'avancement de mon projet ?",
    answer:
      "Oui. Vous accédez à un espace de suivi partagé (Notion/Trello), recevez des rapports hebdomadaires et des démos à chaque étape clé. Vous êtes informé en temps réel — aucune surprise à la livraison.",
  },
  {
    id: 'f6',
    question: 'Proposes-tu des accompagnements ou des formations ?',
    answer:
      "Oui, je propose du coaching individuel, des ateliers pratiques en groupe et des formations sur-mesure pour vous ou vos équipes sur Flutter, React Native et UX/UI Design. Contactez-moi pour définir le programme adapté à vos besoins.",
  },
  {
    id: 'f7',
    question: "Et si je n'ai pas encore d'idée précise ?",
    answer:
      "Aucun souci, c'est même fréquent ! Je vous accompagne dès la phase d'idéation : analyse de marché, définition des personas, priorisation des fonctionnalités et cahier des charges. On construit votre projet de zéro, ensemble.",
  },
  {
    id: 'f8',
    question: "Proposez-vous un contrat de confidentialité (NDA) ?",
    answer:
      "Oui, systématiquement. Un NDA peut être signé avant tout échange sur votre projet. Vos idées, données, code source et informations restent strictement confidentiels. La confiance est la base de chaque collaboration.",
  },
  {
    id: 'f9',
    question: "Travaillez-vous avec des équipes déjà en place ?",
    answer:
      "Tout à fait. Je m'intègre facilement à une équipe existante — développeurs, PO, designer ou CTO. Je m'adapte à vos outils (Slack, Notion, Jira, GitHub…) et à votre workflow. L'objectif reste le même : livrer vite et bien.",
  },
];
