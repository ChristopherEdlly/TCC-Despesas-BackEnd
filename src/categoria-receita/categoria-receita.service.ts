import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';

@Injectable()
export class CategoriaReceitaService {
  constructor(private prisma: PrismaService) {}

  async criar(data: CreateCategoriaReceitaDto) {
    return this.prisma.categoriaReceita.create({
      data: {
        nome: data.nome,
        painelId: data.painelId, // Alterado de usuarioId para painelId
      },
    });
  }

  async buscarPorPainelId(painelId: number) {
    return this.prisma.categoriaReceita.findMany({
      where: { painelId }, // Alterado de usuarioId para painelId
    });
  }

  async atualizar(id: number, data: UpdateCategoriaReceitaDto) {
    const categoria = await this.prisma.categoriaReceita.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de receita não encontrada.');
    }

    return this.prisma.categoriaReceita.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    const categoria = await this.prisma.categoriaReceita.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de receita não encontrada.');
    }

    return this.prisma.categoriaReceita.delete({
      where: { id },
    });
  }

  async buscarPorId(id: number) {
    const categoria = await this.prisma.categoriaReceita.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de receita não encontrada.');
    }

    return categoria;
  }
}
