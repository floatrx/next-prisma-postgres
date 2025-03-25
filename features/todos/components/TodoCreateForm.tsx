/**
 * Form create todo using server-action
 * NOTE: This component uses
 * `useForm`
 * `zodResolver`
 */
'use client';

import type { CreateTodoPayload } from '@/types/todos';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Controller } from 'react-hook-form';

import { CustomDatePicker } from '@/components/form/CustomDatePicker';
import { formVariants } from '@/components/primitives';
import { TodoStatusSelect } from '@/features/todos/components/TodoStatusSelect';
import { useTodoForm } from '@/features/todos/hooks/useTodoForm';

export type TodoCreateFormProps = {
  onCreate?: (payload: CreateTodoPayload) => Promise<any>;
};
export const TodoCreateForm: RC<TodoCreateFormProps> = ({ onCreate }) => {
  const { formRef, form, formState, onSubmit } = useTodoForm({ onCreate });
  const { errors, isSubmitting } = formState;

  return (
    <form ref={formRef} className={formVariants({ isSubmitting })} onSubmit={onSubmit}>
      <div className="gap-4 space-y-4 md:flex md:space-y-0">
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <TodoStatusSelect
              defaultSelectedKeys={[field.value]}
              errorMessage={errors.status?.message}
              isInvalid={!!errors.status}
              label="Status"
              variant="bordered"
              {...field}
            />
          )}
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
      <Controller
        control={form.control}
        name="title"
        render={({ field }) => (
          <Input
            autoFocus
            disabled={isSubmitting}
            errorMessage={errors.title?.message}
            isInvalid={!!errors.title}
            label="Title"
            placeholder="Enter todo"
            type="text"
            variant="bordered"
            {...field}
          />
        )}
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
