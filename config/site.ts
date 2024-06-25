export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js + Postgres + Prisma + NextUI',
  description: 'Testing Vercel Postgres DB with Next.js, Prisma, and NextUI (tailwindcss)',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
  ],
  navMenuItems: [],
  links: {
    github: 'https://github.com/floatrx/next-prisma-postgres',
  },
};
