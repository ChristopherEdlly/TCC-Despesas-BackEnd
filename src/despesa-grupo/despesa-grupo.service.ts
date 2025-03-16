import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';

@Injectable()
export class DespesaGrupoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDespesaGrupoDto) {
    return this.prisma.grupoDespesa.create({
      data: {
        nome: data.nome,
        painelId: data.painelId,
      },
    });
  }

  async buscarPorPainelId(painelId: number) {
    return this.prisma.grupoDespesa.findMany({
      where: { painelId },
      include: {
        categoriaDespesas: true,
      },
    });
  }

  async atualizar(id: number, data: UpdateDespesaGrupoDto) {
    const grupo = await this.prisma.grupoDespesa.findUnique({
      where: { id },
    });

    if (!grupo) {
      throw new NotFoundException('Grupo de despesa não encontrado.');
    }

    return this.prisma.grupoDespesa.update({
      where: { id },
      data,
    });
  }

  async deletar(id: number) {
    const grupo = await this.prisma.grupoDespesa.findUnique({
      where: { id },
    });

    if (!grupo) {
      throw new NotFoundException('Grupo de despesa não encontrado.');
    }

    return this.prisma.grupoDespesa.delete({
      where: { id },
    });
  }

  async buscarPorId(id: number) {
    const grupo = await this.prisma.grupoDespesa.findUnique({
      where: { id },
    });

    if (!grupo) {
      throw new NotFoundException('Grupo de despesa não encontrado.');
    }

    return grupo;
  }
}
