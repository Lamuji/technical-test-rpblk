/*
  Warnings:

  - Added the required column `firstname` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "firstname" VARCHAR(100) NOT NULL,
ADD COLUMN     "lastname" VARCHAR(100) NOT NULL,
ALTER COLUMN "like" SET DEFAULT 0,
ALTER COLUMN "dislike" SET DEFAULT 0;
