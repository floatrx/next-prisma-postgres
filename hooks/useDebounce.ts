import { useCallback } from 'react';

import { DEFAULT_DEBOUNCE_DELAY } from '@/config/const';
import { debounce } from '@/lib/debounce';

/**
 * Debounce function (hook)
 * NOTE: fn should be ignored in the deps array
 * @param fn - function to debounce
 * @param delay - delay in milliseconds
 * @param deps - dependencies array
 * @returns debounced function
 */
export const useDebounce = <T extends AnyFn>(
  fn: T,
  deps: Array<any> = [],
  delay: number = DEFAULT_DEBOUNCE_DELAY,
): T => {
  // Use useCallback to return a memoized version of the debounced function
  return useCallback(debounce(fn, delay), [delay, ...deps]) as T; // eslint-disable-line
};
