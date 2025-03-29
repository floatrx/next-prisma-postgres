import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

/**
 * Possible values can be `falsy`,
 * but the returned `value` should always be a string.
 */
type PossibleValues = string | number | boolean | undefined | null;

type Fn = (
  key: string, // search param key
  initialValue?: PossibleValues,
  debounceMs?: number, // customise debounce time
) => [string, (val: PossibleValues) => void, { isPending: boolean }];

/**
 * This hook is used to `manage search params in the URL`
 * @param key - search param key (e.g. 'search', 'tab', etc.)
 * @param initialValue - initial value for the search param
 * @param debounceMs - customise debounce time (default: 150ms)
 * @deprecated (use nuqs instead)
 */
export const useSearchParamState: Fn = (key, initialValue, debounceMs = 150) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<string>(String(searchParams.get(key) || initialValue || ''));

  // Debounce router.replace function with transition
  const debouncedRouterReplace = useDebounce(
    (url: string) => startTransition(() => router.replace(url)),
    [],
    debounceMs,
  );

  const updateValue = (newValue?: PossibleValues) => {
    setValue(String(newValue)); // Update state immediately

    const qs = new URLSearchParams(searchParams);

    if (!newValue) {
      qs.delete(key);
    } else {
      qs.set(key, String(newValue));
    }

    // Call debounced function
    debouncedRouterReplace?.(`${pathname}?${qs.toString()}`);
  };

  return [value, updateValue, { isPending }];
};
