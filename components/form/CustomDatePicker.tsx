'use client';

import { parseZonedDateTime, type ZonedDateTime, CalendarDate, type CalendarDateTime } from '@internationalized/date';
import { DatePicker, DatePickerProps } from '@nextui-org/date-picker';
import { useState, forwardRef } from 'react';

interface IProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: string;
  onChange: (date: string) => void;
}

type PossibleDates = CalendarDate | CalendarDateTime | ZonedDateTime;

/**
 * This custom date picker component is used
 * to handle date and time values as strings
 * and expose them to the parent form!
 * Note: Use this component with react-hook-form Controller.
 * @example
 * <Controller
 *   control={form.control}
 *   name="dueDate"
 *   render={ ({field}) => <CustomDatePicker {...field} /> }
 * />
 */
export const CustomDatePicker = forwardRef<HTMLInputElement, IProps>(
  ({ value = new Date().toString(), onChange, ...props }, inputRef) => {
    const [dateRaw, setDateRaw] = useState<PossibleDates>(parseZonedDateTime(value));
    const [dateISO, setDateISO] = useState(value);

    // Handle date change
    const handleChangePicker = (value: PossibleDates) => {
      setDateRaw(value);
      // Expose date as ISO string to the parent form
      setDateISO(value.toString());
      onChange?.(value.toString());
    };

    return [
      <DatePicker key="picker" hideTimeZone value={dateRaw} onChange={handleChangePicker} {...props} />,
      <input key="value" ref={inputRef} hidden readOnly value={dateISO} />,
    ];
  },
);

CustomDatePicker.displayName = 'CustomDatePicker';
