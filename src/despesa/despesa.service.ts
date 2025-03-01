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
}
