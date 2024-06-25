'use server';
import { revalidatePath } from 'next/cache';

/**
 * Revalidate todos
 * TODO: Change `revalidatePath` to `revalidateTag`
 *  Currently, Next.js only supports assigning tags via fetch.
 *  One possible solution is to use fetch with tags. However,
 *  this would require duplicating functionality.
 * @example
 *  fetch(url, { next: { tags: [...] } });
 * @see https://nextjs.org/docs/app/api-reference/functions/revalidateTag#parameters
 */
export const revalidateTodos = async () => {
  revalidatePath('/');
};
