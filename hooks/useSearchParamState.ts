import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

/**
 * This hook is used to manage search params in the URL
 * @param key - search param key (e.g. 'search', 'tab', etc.)
 * @param initialValue
 */
export const useSearchParamState = (
  key: string,
  initialValue: string = '',
): [string, (val: string) => void, boolean] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get(key) ?? initialValue);

  const updateValue = useDebounce(
    (newValue: string) => {
      startTransition(() => {
        const qs = new URLSearchParams(searchParams);

        if (!newValue) {
          qs.delete(key);
        } else {
          qs.set(key, newValue);
        }

        setValue(newValue);
        router.replace(`${pathname}?${qs.toString()}`);
      });
    },
    [searchParams],
  );

  return [value, updateValue, isPending];
};
