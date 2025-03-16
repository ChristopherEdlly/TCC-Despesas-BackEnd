/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `CategoriaDespesa` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `CategoriaReceita` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `GrupoDespesa` table. All the data in the column will be lost.
  - Added the required column `painelId` to the `CategoriaDespesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `painelId` to the `CategoriaReceita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `painelId` to the `GrupoDespesa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriaDespesa" DROP CONSTRAINT "CategoriaDespesa_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriaReceita" DROP CONSTRAINT "CategoriaReceita_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "GrupoDespesa" DROP CONSTRAINT "GrupoDespesa_usuarioId_fkey";

-- AlterTable
ALTER TABLE "CategoriaDespesa" DROP COLUMN "usuarioId",
ADD COLUMN     "painelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CategoriaReceita" DROP COLUMN "usuarioId",
ADD COLUMN     "painelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GrupoDespesa" DROP COLUMN "usuarioId",
ADD COLUMN     "painelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "fotoPerfil" TEXT;

-- AddForeignKey
ALTER TABLE "CategoriaReceita" ADD CONSTRAINT "CategoriaReceita_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrupoDespesa" ADD CONSTRAINT "GrupoDespesa_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaDespesa" ADD CONSTRAINT "CategoriaDespesa_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
