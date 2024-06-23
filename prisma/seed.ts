import { Status } from '@prisma/client';

import { prismaClient } from '@/lib/prisma';

async function main() {
  console.log('Start seeding');
  const todo1 = await prismaClient.todo.create({
    data: {
      title: 'First Todo',
      status: Status.TODO,
      dueDate: new Date(),
    },
  });

  const todo2 = await prismaClient.todo.create({
    data: {
      title: 'Second Todo',
      status: Status.IN_PROGRESS,
      dueDate: new Date(),
    },
  });

  console.log({ todo1, todo2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
