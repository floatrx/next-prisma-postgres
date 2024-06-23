export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + Postgres + Prisma + NextUI",
  description: "Testing vercel Postgres database with Prisma\n",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [],
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
