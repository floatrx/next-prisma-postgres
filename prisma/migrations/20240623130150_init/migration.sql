-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '1 day',
    "order" SERIAL NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
