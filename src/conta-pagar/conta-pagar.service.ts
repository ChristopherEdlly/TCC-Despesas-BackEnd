import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';

@Injectable()
export class ContaPagarService {
    constructor(private prisma: PrismaService) {}

    async criarContaAPagar(createContaAPagarDto: CreateContaAPagarDto) {
        const {
            statusPagamento,
            quantidadeParcelas,
            dataVencimento,
            despesaId,
        } = createContaAPagarDto;

        // 🔹 Busca o valor da despesa no banco de dados
        const despesa = await this.prisma.despesa.findUnique({
            where: { id: despesaId },
            select: { valor: true },
        });

        if (!despesa) {
            throw new Error('Despesa não encontrada');
        }

        const parcelas = this.calcularParcelas(
            despesa.valor.toNumber(), // Usa o valor da despesa automaticamente
            quantidadeParcelas,
            dataVencimento,
        );

        // 🔹 Cria as contas a pagar no banco
        const contas = await this.prisma.contaAPagar.createMany({
            data: parcelas.map((parcela) => ({
                valor: parcela.valor, // Cada parcela recebe o valor calculado
                dataVencimento: parcela.dataVencimento,
                statusPagamento,
                despesaId,
            })),
        });

        return contas;
    }

    private calcularParcelas(
        valorTotal: number,
        quantidadeParcelas: number,
        dataVencimento: string,
    ) {
        const valorParcela = valorTotal / quantidadeParcelas;
        const parcelas: { valor: number; dataVencimento: string }[] = [];
        const vencimento = new Date(dataVencimento);

        for (let i = 0; i < quantidadeParcelas; i++) {
            const novaDataVencimento = new Date(vencimento);
            novaDataVencimento.setMonth(vencimento.getMonth() + i);

            parcelas.push({
                valor: valorParcela, // Cada parcela recebe a divisão correta
                dataVencimento: novaDataVencimento.toISOString(),
            });
        }

        return parcelas;
    }

    async listarContasAPagarPorDespesaId(despesaId: number) {
        return this.prisma.contaAPagar.findMany({
            where: { despesaId },
        });
    }

    async deletarContasAPagarPorDespesaId(despesaId: number) {
        return this.prisma.contaAPagar.deleteMany({
            where: { despesaId: despesaId },
        });
    }

    async deletarContaAPagar(contaId: number) {
        return this.prisma.contaAPagar.delete({
            where: { id: contaId },
        });
    }

    async atualizarContaAPagar(
        contaId: number,
        UpdateContaPagarDto: UpdateContaPagarDto,
    ) {
        return this.prisma.contaAPagar.update({
            where: { id: contaId },
            data: UpdateContaPagarDto,
        });
    }

    async buscarDespesasComContasAPagarPorPainelId(painelId: number) {
        return this.prisma.despesa.findMany({
            where: {
                painelId: painelId,
                contasAPagar: {
                    some: {}, // Verifica se há pelo menos uma conta a pagar vinculada
                },
            },
            include: {
                contasAPagar: true,
            },
        });
    }
}
