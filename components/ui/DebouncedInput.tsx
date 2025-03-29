import type { InputProps } from '@heroui/input';

import { Input } from '@heroui/input';
import { useEffect, useState, useCallback } from 'react';

import { debounce } from '@/lib/debounce';

interface DebouncedInputProps extends Omit<InputProps, 'onChange'> {
  debounceMs?: number;
  onChange?: (value: string) => void;
}

/**
 * DebouncedInput - allows to debounce input changes
 * @param debounceMs - wait time in milliseconds before calling onChange
 * @param defaultValue
 * @param onChange
 * @param props
 * @constructor
 */
export const DebouncedInput: FC<DebouncedInputProps> = ({
  value: defaultValue = '',
  onChange,
  debounceMs = 350,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const debouncedOnChange = debounce(onChange, debounceMs);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value); // sync with local state immediately
    debouncedOnChange?.(value);
  }, []);

  // Sync value from parent component with local state
  useEffect(() => {
    if (value === defaultValue) return;
    setValue(value);
  }, [value]);

  return <Input value={value} onChange={handleChange} {...props} />;
};
