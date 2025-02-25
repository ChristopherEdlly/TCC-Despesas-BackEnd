import { Injectable } from '@nestjs/common';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';

@Injectable()
export class DespesaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaDto) {
        return this.prisma.despesa.create({ data });
    }

    async buscarPorPeinelId(painelId: number) {
        return this.prisma.despesa.findMany({
            where: { painelId },
        });
    }

    async buscarPorDespesaCategoriaId(categoriaDespesaId: number) {
        return this.prisma.despesa.findMany({
            where: { categoriaDespesaId },
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

    async buscarPorPainelIdEDespesaCategoriaId(
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
}
