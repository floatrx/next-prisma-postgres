import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

/**
 * Possible values can be `falsy`,
 * but the returned `value` should always be a string.
 */
type PossibleValues = string | null | undefined | boolean;

/**
 * This hook is used to `manage search params in the URL`
 * @param key - search param key (e.g. 'search', 'tab', etc.)
 * @param initialValue - initial value for the search param
 * @param debounceMs - customise debounce time (default: 150ms)
 */
export const useSearchParamState = (
  key: string,
  initialValue?: PossibleValues,
  debounceMs: number = 300,
): [string, (val?: PossibleValues) => void, boolean] => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>(String(searchParams.get(key) || initialValue || ''));

  const updateValue = useDebounce(
    (newValue?: PossibleValues) => {
      setValue(String(newValue));

      startTransition(() => {
        const qs = new URLSearchParams(searchParams);

        if (!newValue) {
          qs.delete(key);
        } else {
          qs.set(key, String(newValue));
        }

        router.replace(`${pathname}?${qs.toString()}`);
      });
    },
    [searchParams],
    debounceMs,
  );

  return [value, updateValue, isPending];
};
