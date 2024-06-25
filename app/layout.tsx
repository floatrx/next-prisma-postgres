import '@/styles/globals.css';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { Providers } from './providers';

import { Navbar } from '@/components/layout/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
            <footer className="m-auto max-w-lg p-2 text-center text-sm text-foreground-400">
              &copy; 2024, floatrx. {siteConfig.description}.
              <a
                className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-300"
                href="https://github.com/floatrx/next-prisma-postgres"
                rel="noreferrer"
                target="_blank"
              >
                Source code<span className="hidden sm:inline-block"> on GitHub</span>.
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
