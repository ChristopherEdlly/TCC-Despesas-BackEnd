import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';
import { ContaAPagar } from '@prisma/client';

@Injectable()
export class ContaPagarService {
    constructor(private prisma: PrismaService) {}

    async create(
        createContaAPagarDto: CreateContaAPagarDto,
    ): Promise<ContaAPagar[]> {
        const {
            despesaId,
            quantidadeParcelas,
            dataVencimento,
            statusPagamento,
        } = createContaAPagarDto;

        // Busca a despesa para obter o valor total
        const despesa = await this.prisma.despesa.findUnique({
            where: { id: despesaId },
        });
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }

        if (quantidadeParcelas <= 0) {
            throw new ForbiddenException(
                'A quantidade de parcelas deve ser maior que zero.',
            );
        }

        // Calcula o valor de cada parcela
        const valorParcela =
            parseFloat(despesa.valor.toString()) / quantidadeParcelas;
        const contasAPagar: ContaAPagar[] = [];

        // Cria uma conta a pagar para cada parcela
        for (let i = 0; i < quantidadeParcelas; i++) {
            const novaDataVencimento = new Date(dataVencimento);
            // Incrementa o mês para cada parcela
            novaDataVencimento.setMonth(novaDataVencimento.getMonth() + i);

            const novaConta = await this.prisma.contaAPagar.create({
                data: {
                    valor: valorParcela,
                    dataVencimento: novaDataVencimento,
                    statusPagamento,
                    despesaId: despesa.id,
                },
            });
            contasAPagar.push(novaConta);
        }

        return contasAPagar;
    }

    async findOne(id: number): Promise<ContaAPagar> {
        const conta = await this.prisma.contaAPagar.findUnique({
            where: { id },
        });
        if (!conta) {
            throw new NotFoundException('Conta a pagar não encontrada.');
        }
        return conta;
    }

    async update(id: number, data: UpdateContaPagarDto): Promise<ContaAPagar> {
        const conta = await this.prisma.contaAPagar.findUnique({
            where: { id },
        });
        if (!conta) {
            throw new NotFoundException(
                `Conta a pagar com id ${id} não encontrada.`,
            );
        }
        return this.prisma.contaAPagar.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<ContaAPagar> {
        const conta = await this.prisma.contaAPagar.findUnique({
            where: { id },
        });
        if (!conta) {
            throw new NotFoundException(
                `Conta a pagar com id ${id} não encontrada.`,
            );
        }
        return this.prisma.contaAPagar.delete({
            where: { id },
        });
    }

}
