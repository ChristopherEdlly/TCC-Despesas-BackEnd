import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ContaAPagar } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';

@Injectable()
export class ContaPagarService {
    constructor(private prisma: PrismaService) {}

    async create(
        createContaAPagarDto: CreateContaAPagarDto,
    ): Promise<ContaAPagar[]> {
        try {
            const {
                despesaId,
                quantidadeParcelas,
                dataVencimento,
                statusPagamento,
            } = createContaAPagarDto;

            console.log('Dados recebidos:', createContaAPagarDto);

            const despesa = await this.prisma.despesa.findUnique({
                where: { id: despesaId },
                include: { painel: true }
            });

            if (!despesa) {
                throw new NotFoundException('Despesa não encontrada.');
            }

            console.log('Despesa encontrada:', despesa);

            if (quantidadeParcelas <= 0) {
                throw new ForbiddenException(
                    'A quantidade de parcelas deve ser maior que zero.',
                );
            }

            const valorParcela = Number(despesa.valor) / quantidadeParcelas;
            console.log('Valor por parcela:', valorParcela);

            const contasAPagar: ContaAPagar[] = [];
            const dataVencimentoDate = new Date(dataVencimento);

            for (let i = 0; i < quantidadeParcelas; i++) {
                const novaDataVencimento = new Date(dataVencimentoDate);
                novaDataVencimento.setMonth(novaDataVencimento.getMonth() + i);

                try {
                    const novaConta = await this.prisma.contaAPagar.create({
                        data: {
                            valor: new Decimal(valorParcela.toFixed(2)),
                            dataVencimento: novaDataVencimento,
                            statusPagamento,
                            despesaId: despesa.id,
                        },
                    });

                    console.log('Conta criada:', novaConta);
                    contasAPagar.push(novaConta);
                } catch (createError) {
                    console.error('Erro ao criar parcela:', createError);
                    throw createError;
                }
            }

            console.log('Total de contas criadas:', contasAPagar.length);
            return contasAPagar;
        } catch (error) {
            console.error('Erro completo ao criar conta a pagar:', error);
            throw error;
        }
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
