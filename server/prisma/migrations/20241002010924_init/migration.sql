/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `Instructor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "studentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_studentId_key" ON "Instructor"("studentId");

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
