export const profile = {
  name: 'Abdoulaye AMADOU ISSIAKA',
  initials: 'A',
  roles: ['Développeur mobile', 'Expert Flutter', 'Expert React Native', 'Designer UI/UX', 'Consultant Tech'],
  bio: "J'accompagne les startups et solopreneurs à transformer leurs idées en applications mobiles concrètes — Flutter ou React Native — livrées rapidement avec une architecture solide et une expérience utilisateur engageante.",
  mission:
    "Développement Flutter & React Native pour des applications performantes, scalables et multiplateformes — back-office web inclus si le projet le nécessite. Design UX/UI pour des expériences fluides, esthétiques et efficaces.",
  yearsExperience: 3,
  projectCount: 5,
  clientCount: 3,
  cvUrl: '/cv.pdf',
  socials: [
    { label: 'Email', href: 'mailto:orouabdoulayeissiaka@gmail.com', icon: '✉️' },
    { label: 'WhatsApp', href: 'https://wa.me/22959000892', icon: '💬' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amadou-fullstack-mobile/', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com/orouabdoul', icon: 'GH' },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61580646575283',
      icon: 'f',
    },
    { label: 'Telegram', href: 'https://t.me/orouabdoul', icon: '✈️' },
  ],
};

export type Social = (typeof profile.socials)[number];
