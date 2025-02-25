import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';

@Injectable()
export class DespesaGrupoService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDespesaGrupoDto) {
        return this.prisma.grupoDespesa.create({ data });
    }

    async BuscarPorUsuarioId(usuarioId: number) {
        return this.prisma.grupoDespesa.findMany({
            where: {
                usuarioId,
            },
        });
    }

    async Atualizar(id: number, data: UpdateDespesaGrupoDto) {
        return this.prisma.grupoDespesa.update({
            where: {
                id,
            },
            data,
        });
    }

    async Deletar(id: number) {
        return this.prisma.grupoDespesa.delete({
            where: {
                id,
            },
        });
    }
}
