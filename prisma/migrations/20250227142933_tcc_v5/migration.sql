/*
  Warnings:

  - Added the required column `tipo` to the `Receita` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoReceita" AS ENUM ('Fixo', 'Unico');

-- AlterTable
ALTER TABLE "Receita" ADD COLUMN     "tipo" "TipoReceita" NOT NULL;
