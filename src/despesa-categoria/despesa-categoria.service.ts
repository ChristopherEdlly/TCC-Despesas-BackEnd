import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';

@Injectable()
export class DespesaCategoriaService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaCategoriaDto) {
        return this.prisma.categoriaDespesa.create({ data });
    }

    async uscarPorUsuarioId(usuarioId: number) {
        return this.prisma.categoriaDespesa.findMany({
            where: {
                usuarioId,
            },
        });
    }

    async buscarPorGrupoDespesaId(grupoDespesaId: number) {
        return this.prisma.categoriaDespesa.findMany({
            where: {
                grupoDespesaId,
            },
        });
    }

    async atualizar(id: number, data: UpdateDespesaCategoriaDto) {
        return this.prisma.categoriaDespesa.update({
            where: {
                id,
            },
            data,
        });
    }

    async deletar(id: number) {
        return this.prisma.categoriaDespesa.delete({
            where: {
                id,
            },
        });
    }

    async buscarPorId(id: number) {
        return this.prisma.categoriaDespesa.findUnique({
            where: {
                id,
            },
        });
    }
}
