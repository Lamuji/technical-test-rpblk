/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstname" VARCHAR(100) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "message" VARCHAR(500) NOT NULL,
    "like" INTEGER NOT NULL,
    "dislike" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);
