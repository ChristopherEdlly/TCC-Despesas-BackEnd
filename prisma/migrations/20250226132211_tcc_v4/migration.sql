/*
  Warnings:

  - Added the required column `dataCompra` to the `Despesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesa" ADD COLUMN     "dataCompra" DATE NOT NULL;
