/*
  Warnings:

  - You are about to drop the column `studentId` on the `Instructor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Instructor" DROP CONSTRAINT "Instructor_studentId_fkey";

-- DropIndex
DROP INDEX "Instructor_studentId_key";

-- AlterTable
ALTER TABLE "Instructor" DROP COLUMN "studentId";
