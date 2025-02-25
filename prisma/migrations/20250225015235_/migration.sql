/*
  Warnings:

  - Added the required column `usuarioId` to the `GrupoDespesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GrupoDespesa" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "GrupoDespesa" ADD CONSTRAINT "GrupoDespesa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
