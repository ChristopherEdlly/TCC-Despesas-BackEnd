/*
  Warnings:

  - Added the required column `usuarioId` to the `Painel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Painel" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Painel" ADD CONSTRAINT "Painel_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
