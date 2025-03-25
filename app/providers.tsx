'use client';

import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/lib/store/store';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NuqsAdapter>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <Provider store={store}>{children}</Provider>
        </NextThemesProvider>
      </NextUIProvider>
    </NuqsAdapter>
  );
}
