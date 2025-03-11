import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';

@Injectable()
export class DespesaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaDto) {
        // Valida o ID da categoria antes de criar a despesa
        const categoria = await this.prisma.categoriaDespesa.findUnique({
            where: { id: data.categoriaDespesaId },
        });

        if (!categoria) {
            throw new NotFoundException('Categoria de despesa não encontrada.');
        }

        data.dataCompra = new Date(data.dataCompra);

        // Cria a despesa
        return this.prisma.despesa.create({
            data,
        });
    }

    async buscarPorPainelId(painelId: number) {
        return this.prisma.despesa.findMany({
            where: { painelId },
        });
    }

    async atualizar(id: number, data: UpdateDespesaDto) {
        return this.prisma.despesa.update({
            where: { id },
            data,
        });
    }

    async deletar(id: number) {
        return this.prisma.despesa.delete({
            where: { id },
        });
    }

    async buscarPorId(id: number) {
        return this.prisma.despesa.findUnique({
            where: { id },
        });
    }

    async buscarPorPainelIdECategoriaDespesaId(
        painelId: number,
        categoriaDespesaId: number,
    ) {
        return this.prisma.despesa.findMany({
            where: {
                painelId,
                categoriaDespesaId,
            },
        });
    }

    async buscarSomaDasDespesas(painelId: number, dataLimite: Date) {
        return this.prisma.despesa.aggregate({
            _sum: {
                valor: true,  // Somar o valor das despesas
            },
            where: {
                painelId,
                dataCompra: {
                    lte: dataLimite,  // lte significa "menor ou igual"
                },
            },
        });
    }

    async obterResumoDespesas(painelId: number, periodo: 'mes' | 'ano') {
        const hoje = new Date();
        const inicioPeriodo = periodo === 'mes'
            ? new Date(hoje.getFullYear(), hoje.getMonth(), 1)
            : new Date(hoje.getFullYear(), 0, 1);

        // Busca despesas com suas categorias
        const despesas = await this.prisma.despesa.findMany({
            where: {
                painelId,
                dataCompra: {
                    gte: inicioPeriodo,
                    lte: hoje
                }
            },
            include: {
                categoriaDespesa: true
            }
        });

        // Agrupa despesas por categoria
        const despesasPorCategoria = await this.prisma.despesa.groupBy({
            by: ['categoriaDespesaId'],
            where: {
                painelId,
                dataCompra: {
                    gte: inicioPeriodo,
                    lte: hoje
                }
            },
            _sum: {
                valor: true
            }
        });

        // Busca nomes das categorias
        const categorias = await this.prisma.categoriaDespesa.findMany({
            where: {
                id: {
                    in: despesasPorCategoria.map(d => d.categoriaDespesaId)
                }
            }
        });

        // Formata dados por período
        const despesasPorPeriodo = despesas.reduce((acc, despesa) => {
            const data = periodo === 'mes'
                ? despesa.dataCompra.toISOString().split('T')[0]
                : despesa.dataCompra.toISOString().slice(0, 7);

            if (!acc[data]) {
                acc[data] = 0;
            }
            acc[data] = Number(acc[data]) + Number(despesa.valor);
            return acc;
        }, {});

        // Calcula total
        const totalDespesas = despesas.reduce((sum, despesa) =>
            Number(sum) + Number(despesa.valor), 0);

        return {
            resumoPorCategoria: despesasPorCategoria.map(d => ({
                nome: categorias.find(c => c.id === d.categoriaDespesaId)?.nome || 'Sem categoria',
                valor: Number(d._sum.valor)
            })),
            resumoPorPeriodo: despesasPorPeriodo,
            total: totalDespesas
        };
    }
}
