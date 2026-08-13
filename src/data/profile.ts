export const profile = {
  name: 'Abdoulaye AMADOU ISSIAKA',
  initials: 'A',
  roles: ['Développeur mobile', 'Expert Flutter', 'Designer UI/UX', 'Consultant Tech'],
  bio: "J'accompagne les startups et solopreneurs à transformer leurs idées en applications mobiles concrètes, bien conçues et prêtes à être lancées rapidement, grâce à une architecture solide et une expérience utilisateur engageante.",
  mission:
    "Développement Flutter pour des applications performantes, scalables et multiplateformes. Design UX/UI pour des expériences utilisateurs fluides, esthétiques et efficaces.",
  yearsExperience: 3,
  projectCount: 5,
  clientCount: 3,
  cvUrl: '/cv.pdf',
  socials: [
    { label: 'Email', href: 'mailto:orouabdoulayeissiaka@gmail.com', icon: '✉' },
    { label: 'WhatsApp', href: 'https://wa.me/22959000892', icon: '💬' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amadou-fullstack-mobile/', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com/orouabdoul', icon: '◉' },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61580646575283',
      icon: 'f',
    },
    { label: 'Telegram', href: 'https://t.me/orouabdoul', icon: '✈' },
    { label: 'Twitter/X', href: 'https://twitter.com/orouabdoul', icon: '✕' },
  ],
};

export type Social = (typeof profile.socials)[number];
