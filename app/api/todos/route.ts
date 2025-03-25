import type { CreateTodoPayload, UpdateTodoPayload } from '@/types/todos';

import { Status } from '.prisma/client';
import { NextResponse } from 'next/server';

import { todosService } from '@/features/todos/services/todosService';

// GET /api/todos
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || undefined;
  const status = (searchParams.get('status') as Status) || undefined;

  try {
    const todos = await todosService.search({ title, status });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(request: Request) {
  try {
    const payload: CreateTodoPayload = await request.json();
    const todo = await todosService.create(payload);

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// PUT /api/todos/:id
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '', 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const payload: UpdateTodoPayload = await request.json();
    const todo = await todosService.update(id, payload);

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// DELETE /api/todos/:id
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '', 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const todo = await todosService.remove(id);

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
