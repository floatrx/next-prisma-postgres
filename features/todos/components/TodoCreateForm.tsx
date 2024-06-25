/**
 * Form create todo using server-action
 * NOTE: This component uses
 * `useForm`
 * `zodResolver`
 */
'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Controller } from 'react-hook-form';

import { CustomDatePicker } from '@/components/form/CustomDatePicker';
import { formVariants } from '@/components/primitives';
import { TodoStatusSelect } from '@/features/todos/components/TodoStatusSelect';
import { useTodoForm } from '@/features/todos/hooks/useTodoForm';

export const TodoCreateForm = () => {
  const { formRef, form, formState, onSubmit } = useTodoForm();
  const { errors, isSubmitting } = formState;

  return (
    <form ref={formRef} className={formVariants({ isSubmitting })} onSubmit={onSubmit}>
      <div className="gap-4 space-y-4 md:flex md:space-y-0">
        <TodoStatusSelect
          errorMessage={errors.status?.message}
          isInvalid={!!errors.status}
          label="Status"
          variant="bordered"
          {...form.register('status', { required: true })}
        />
        <Controller
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <CustomDatePicker
              disabled={isSubmitting}
              errorMessage={errors.dueDate?.message}
              isInvalid={!!errors.dueDate}
              label="Due date"
              labelPlacement="inside"
              variant="bordered"
              {...field}
            />
          )}
        />
      </div>
      <Input
        disabled={isSubmitting}
        errorMessage={errors.title?.message}
        isInvalid={!!errors.title}
        label="Title"
        placeholder="Enter todo"
        type="text"
        variant="bordered"
        {...form.register('title', { required: true })}
      />
      <div className="stack">
        <Button
          className="flex-1"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          size="lg"
          type="submit"
          variant="ghost"
        >
          Submit
        </Button>
        <Button size="lg" type="reset" variant="bordered">
          Reset
        </Button>
      </div>
    </form>
  );
};
