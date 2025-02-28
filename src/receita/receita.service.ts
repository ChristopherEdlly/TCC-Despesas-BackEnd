import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { TipoReceita } from '@prisma/client';

@Injectable()
export class ReceitaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateReceitaDto) {
        data.dataRecebimento = new Date(data.dataRecebimento);
        return this.prisma.receita.create({
            data,
        });
    }

    async BuscarPorPainelId(painelId: number) {
        return this.prisma.receita.findMany({
            where: {
                painelId,
            },
        });
    }

    async BuscarPorPainelIdECategoriaId(
        painelId: number,
        categoriaReceitaId: number,
    ) {
        return this.prisma.receita.findMany({
            where: {
                painelId,
                categoriaReceitaId,
            },
        });
    }

    async AtualizarReceita(id: number, data: UpdateReceitaDto) {
        return this.prisma.receita.update({
            where: {
                id,
            },
            data,
        });
    }

    async DeletarReceita(id: number) {
        return this.prisma.receita.delete({
            where: {
                id,
            },
        });
    }

    async calcularSaldoAteData(data: string): Promise<number> {
        const dataFinal = new Date(data);

        // 1️⃣ Buscar receitas únicas (Unico) dentro do período
        const receitasUnicas = await this.prisma.receita.findMany({
            where: {
                tipo: TipoReceita.Unico,
                dataRecebimento: { lte: dataFinal }, // Receitas únicas até a data fornecida
            },
            select: { valor: true },
        });

        // 2️⃣ Buscar receitas fixas (Fixo) que iniciaram antes da data final
        const receitasFixas = await this.prisma.receita.findMany({
            where: {
                tipo: TipoReceita.Fixo,
                dataRecebimento: { lte: dataFinal }, // Pegamos apenas as fixas que começaram antes ou na data limite
            },
            select: {
                valor: true,
                dataRecebimento: true,
            },
        });

        // 🔢 Somar valores das receitas únicas
        let saldoTotal = receitasUnicas.reduce(
            (acc, receita) => acc + Number(receita.valor),
            0,
        );

        // 🔁 Calcular quanto cada receita fixa foi recebida no período e somar
        receitasFixas.forEach((receita) => {
            const dataInicial = new Date(receita.dataRecebimento);
            const mesesRecebidos =
                (dataFinal.getFullYear() - dataInicial.getFullYear()) * 12 +
                (dataFinal.getMonth() - dataInicial.getMonth()) +
                1;

            if (mesesRecebidos > 0) {
                saldoTotal += Number(receita.valor) * mesesRecebidos;
            }
        });

        return saldoTotal;
    }
}
