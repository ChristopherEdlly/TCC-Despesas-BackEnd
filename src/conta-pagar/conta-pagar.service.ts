import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';

@Injectable()
export class ContaPagarService {
    constructor(private prisma: PrismaService) {}

    async criarContaAPagar(createContaAPagarDto: CreateContaAPagarDto) {
        const {
            valor,
            statusPagamento,
            quantidadeParcelas,
            dataVencimento,
            despesaId,
        } = createContaAPagarDto;

        const parcelas = this.calcularParcelas(
            valor,
            quantidadeParcelas,
            dataVencimento,
        );

        const contas = await this.prisma.contaAPagar.createMany({
            data: parcelas.map((parcela) => ({
                valor: parcela.valor,
                dataVencimento: parcela.dataVencimento,
                statusPagamento, // Status de pagamento
                despesaId, // Incluindo o despesaId
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
        const vencimento = new Date(dataVencimento); // Usando a data de vencimento informada

        for (let i = 0; i < quantidadeParcelas; i++) {
            const novaDataVencimento = new Date(vencimento);
            novaDataVencimento.setMonth(vencimento.getMonth() + i); // Ajusta o mês para as parcelas seguintes

            parcelas.push({
                valor: valorParcela,
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
