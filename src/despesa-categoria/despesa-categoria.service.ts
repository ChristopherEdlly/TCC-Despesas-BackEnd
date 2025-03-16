import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';

@Injectable()
export class DespesaCategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDespesaCategoriaDto) {
    return this.prisma.categoriaDespesa.create({
      data: {
        nome: data.nome,
        painelId: data.painelId, // Alterado de usuarioId para painelId
        grupoDespesaId: data.grupoDespesaId,
      },
    });
  }

  async buscarPorPainelId(painelId: number) {
    return this.prisma.categoriaDespesa.findMany({
      where: { painelId }, // Alterado de usuarioId para painelId
      include: {
        grupoDespesa: true,
      },
    });
  }

  async buscarPorGrupoDespesaId(grupoDespesaId: number) {
    return this.prisma.categoriaDespesa.findMany({
      where: { grupoDespesaId },
    });
  }

  async buscarGrupoDespesaPorId(id: number) {
    return this.prisma.grupoDespesa.findUnique({
      where: { id },
    });
  }

  async atualizar(id: number, data: UpdateDespesaCategoriaDto) {
    const categoria = await this.prisma.categoriaDespesa.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de despesa não encontrada.');
    }

    return this.prisma.categoriaDespesa.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    const categoria = await this.prisma.categoriaDespesa.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de despesa não encontrada.');
    }

    return this.prisma.categoriaDespesa.delete({
      where: { id },
    });
  }

  async buscarPorId(id: number) {
    const categoria = await this.prisma.categoriaDespesa.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria de despesa não encontrada.');
    }

    return categoria;
  }
}
