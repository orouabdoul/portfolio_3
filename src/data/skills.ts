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
        name: 'UX Pilot',
        level: 'UI/UX',
        iconUrl: 'https://uxpilot.ai/favicon.ico',
        desc: "Plugin Figma IA pour générer des wireframes, composants et flows UX en quelques secondes.",
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
      {
        name: 'Cursor',
        level: 'Code',
        iconUrl: 'https://cursor.sh/favicon.ico',
        desc: "Éditeur IA nouvelle génération — refactoring, génération et revue de code en langage naturel.",
      },
      {
        name: 'Gemini',
        level: 'Généraliste',
        iconUrl: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
        desc: "IA multimodale de Google pour l'analyse, la génération de contenu et l'intégration dans les apps.",
      },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Flutter', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'React Native', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Dart', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      { name: 'TypeScript', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Expo', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg' },
      { name: 'Android', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
      { name: 'iOS', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
      { name: 'Swift', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
      { name: 'Xcode', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg' },
    ],
  },
  {
    category: 'Web',
    skills: [
      { name: 'Laravel', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'PHP', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'HTML5', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'REST API', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'Node.js', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    ],
  },
  {
    category: 'Outils',
    skills: [
      { name: 'VS Code', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Android Studio', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
      { name: 'Figma', level: 'Expert', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Postman', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      { name: 'Git', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'GitLab', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
      { name: 'Notion', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg' },
    ],
  },
  {
    category: 'Bases de données',
    skills: [
      { name: 'Firebase', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'Supabase', level: 'Intermédiaire', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
      { name: 'MySQL', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', level: 'Avancé', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
      { name: 'Hive', level: 'Avancé', iconUrl: 'https://avatars.githubusercontent.com/u/45634030?s=64' },
    ],
  },
];
