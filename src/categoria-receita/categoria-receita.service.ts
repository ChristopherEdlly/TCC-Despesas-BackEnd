import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';

@Injectable()
export class CategoriaReceitaService {
    constructor(private prisma: PrismaService) {}

    async criarCategoriaReceita(data: CreateCategoriaReceitaDto) {
        return this.prisma.categoriaReceita.create({ data });
    }

    async listarCategoriasReceitaPorUsuario(usuarioId: number) {
        return this.prisma.categoriaReceita.findMany({
            where: { usuarioId },
        });
    }

    async atualizarCategoriaReceita(
        id: number,
        data: UpdateCategoriaReceitaDto,
    ) {
        return this.prisma.categoriaReceita.update({ where: { id }, data });
    }

    async removerCategoriaReceita(id: number) {
        return this.prisma.categoriaReceita.delete({ where: { id } });
    }
}
