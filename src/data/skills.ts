export interface Skill {
  name: string;
  level: string;
  iconUrl: string;
  desc?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'IA',
    skills: [
      {
        name: 'ChatGPT',
        level: 'Généraliste',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        desc: "Assistant IA polyvalent pour la génération de texte, d'idées et d'aide à la rédaction.",
      },
      {
        name: 'Claude',
        level: 'IA Avancée',
        iconUrl: 'https://www.anthropic.com/favicon.ico',
        desc: "IA conversationnelle de pointe pour la génération de code, l'analyse et l'intégration via API Anthropic.",
      },
      {
        name: 'Midjourney',
        level: 'Design',
        iconUrl: 'https://static-00.iconduck.com/assets.00/midjourney-icon-512x512-2v7qkzrn.png',
        desc: "Génération d'images créatives et illustrations par intelligence artificielle.",
      },
      {
        name: 'Uizard',
        level: 'UI/UX',
        iconUrl: 'https://uizard.io/favicon.ico',
        desc: "Prototypage rapide d'interfaces et wireframes grâce à l'IA.",
      },
      {
        name: 'GitHub Copilot',
        level: 'Code',
        iconUrl: 'https://github.githubassets.com/favicons/favicon.svg',
        desc: "Assistant de code IA pour l'autocomplétion et la génération de fonctions.",
      },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Flutter', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'React Native', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Dart', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'Android', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'iOS', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
    ],
  },
  {
    category: 'Web',
    skills: [
      { name: 'Laravel', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'PHP', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'HTML5', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'API Laravel', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    ],
  },
  {
    category: 'Outils',
    skills: [
      { name: 'Git', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'GitLab', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
      { name: 'Figma', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    ],
  },
  {
    category: 'Bases de données',
    skills: [
      { name: 'Firebase', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Supabase', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'MySQL', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
    ],
  },
];
