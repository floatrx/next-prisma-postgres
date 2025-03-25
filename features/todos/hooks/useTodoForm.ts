import type { TodoCreateFormProps } from '@/features/todos/components/TodoCreateForm';
import type { CreateTodoPayload } from '@/types/todos';

import { zodResolver } from '@hookform/resolvers/zod';
import { now, getLocalTimeZone } from '@internationalized/date';
import { Status } from '@prisma/client';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { createTodoSchema } from '@/features/todos/schemas/createTodoSchema';

type HookOptions = Pick<TodoCreateFormProps, 'onCreate'>;

export const useTodoForm = ({ onCreate }: HookOptions) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Create a form using `useForm` and `zodResolver`
  const form = useForm<CreateTodoPayload>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      status: Status.TODO,
      dueDate: now(getLocalTimeZone()).toString(),
    },
  });

  // Find and focus on title input field in current form
  const focusTitle = () => formRef.current?.querySelector<HTMLInputElement>('input[name="title"]')?.focus();

  // Submit form using server-action `createTodo`
  const onSubmit = form.handleSubmit(
    async (values) => {
      if (!onCreate) return;
      const newTodo = await onCreate?.(values);

      console.log('Created :', newTodo);
      form.reset();

      // Set timeout trick to fix focus issue
      setTimeout(focusTitle, 10);
    },
    (errors) => {
      console.error('Error:', errors);
    },
  );

  return { formRef, onSubmit, form, formState: form.formState };
};
