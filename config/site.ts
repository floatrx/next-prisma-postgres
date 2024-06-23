export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js + Postgres + Prisma + NextUI',
  description: 'Testing vercel Postgres database with Prisma',
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
