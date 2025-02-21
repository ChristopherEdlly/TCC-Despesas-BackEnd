-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Painel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Painel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioPainel" (
    "id" SERIAL NOT NULL,
    "permissao" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "painelId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioPainel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaReceita" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "CategoriaReceita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "descricao" TEXT,
    "dataRecebimento" TIMESTAMP(3) NOT NULL,
    "painelId" INTEGER NOT NULL,
    "categoriaReceitaId" INTEGER NOT NULL,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoDespesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "GrupoDespesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaDespesa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "grupoDespesaId" INTEGER,

    CONSTRAINT "CategoriaDespesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "descricao" TEXT,
    "painelId" INTEGER NOT NULL,
    "categoriaDespesaId" INTEGER NOT NULL,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContaAPagar" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "statusPagamento" TEXT NOT NULL,
    "despesaId" INTEGER NOT NULL,

    CONSTRAINT "ContaAPagar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioPainel_usuarioId_painelId_key" ON "UsuarioPainel"("usuarioId", "painelId");

-- AddForeignKey
ALTER TABLE "UsuarioPainel" ADD CONSTRAINT "UsuarioPainel_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioPainel" ADD CONSTRAINT "UsuarioPainel_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaReceita" ADD CONSTRAINT "CategoriaReceita_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_categoriaReceitaId_fkey" FOREIGN KEY ("categoriaReceitaId") REFERENCES "CategoriaReceita"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaDespesa" ADD CONSTRAINT "CategoriaDespesa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaDespesa" ADD CONSTRAINT "CategoriaDespesa_grupoDespesaId_fkey" FOREIGN KEY ("grupoDespesaId") REFERENCES "GrupoDespesa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_painelId_fkey" FOREIGN KEY ("painelId") REFERENCES "Painel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_categoriaDespesaId_fkey" FOREIGN KEY ("categoriaDespesaId") REFERENCES "CategoriaDespesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaAPagar" ADD CONSTRAINT "ContaAPagar_despesaId_fkey" FOREIGN KEY ("despesaId") REFERENCES "Despesa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
