import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PainelService {
    constructor(private prisma: PrismaService) {}

    async criarPainel(data: {
        nome: string;
        descricao?: string;
        usuarioId: number;
    }) {
        return this.prisma.painel.create({
            data: {
                nome: data.nome,
                descricao: data.descricao,
                usuario: { connect: { id: data.usuarioId } }, // Faz a conversão aqui
            },
        });
    }

    async listarPaineisDoUsuario(usuarioId: number, nome?: string) {
        try {
            return await this.prisma.painel.findMany({
                where: {
                    OR: [
                        { usuarioId: usuarioId }, // Painéis que o usuário criou
                        {
                            usuarioPainel: {
                                some: { usuarioId: usuarioId }, // Painéis em que o usuário participa
                            },
                        },
                    ],
                    nome: nome
                        ? { contains: nome, mode: 'insensitive' }
                        : undefined,
                },
            });
        } catch (error) {
            console.error('Erro ao listar painéis:', error);
            throw new InternalServerErrorException('Erro ao listar os painéis');
        }
    }

    async atualizarPainel(id: number, data: Prisma.PainelUpdateInput) {
        return this.prisma.painel.update({
            where: { id },
            data,
        });
    }

    async removerPainel(id: number) {
        return this.prisma.painel.delete({ where: { id } });
    }
}
