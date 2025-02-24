import { Injectable } from '@nestjs/common';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaReceitaService {
    constructor(private prisma: PrismaService) {}

    async criarCategoriaReceita(data: CreateCategoriaReceitaDto) {
        return this.prisma.categoriaReceita.create({ data });
    }

    async listarCategoriasReceita() {
        return this.prisma.categoriaReceita.findMany();
    }

    async buscarCategoriaReceita(id: number) {
        return this.prisma.categoriaReceita.findUnique({ where: { id } });
    }

    async atualizarCategoriaReceita(id: number, data: UpdateCategoriaReceitaDto) {
        return this.prisma.categoriaReceita.update({ where: { id }, data });
    }

    async removerCategoriaReceita(id: number) {
        return this.prisma.categoriaReceita.delete({ where: { id } });
    }
}
