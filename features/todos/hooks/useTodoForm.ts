import type { CreateTodoPayload } from '@/types/todos';

import { zodResolver } from '@hookform/resolvers/zod';
import { now, getLocalTimeZone } from '@internationalized/date';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { createTodo } from '../actions/createTodo';
import { createTodoSchema } from '../schemas/createTodoSchema';

export const useTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // Create a form using `useForm` and `zodResolver`
  const form = useForm<CreateTodoPayload>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      status: 'TODO',
      dueDate: now(getLocalTimeZone()).toString(),
    },
  });

  // Find and focus on title input field in current form
  const focusTitle = () => formRef.current?.querySelector<HTMLInputElement>('input[name="title"]')?.focus();

  // Submit form using server-action `createTodo`
  const onSubmit = form.handleSubmit(
    async (values) => {
      const response = await createTodo(values);

      console.log('Response:', response);
      formRef.current?.reset();

      // Set timeout trick to fix focus issue
      setTimeout(focusTitle, 0);
      console.log('Form reset');
    },
    (errors) => {
      console.error('Error:', errors);
    },
  );

  return { formRef, onSubmit, form, formState: form.formState };
};
