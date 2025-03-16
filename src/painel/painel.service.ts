import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePainelDto } from './dto/create-painel.dto';

@Injectable()
export class PainelService {
    constructor(private prisma: PrismaService) {}

    async criarPainel(data: CreatePainelDto) {
        return this.prisma.painel.create({
            data: {
                nome: data.nome,
                descricao: data.descricao,
                usuario: { connect: { id: data.usuarioId } },
            },
        });
    }

    async listarPaineisDoUsuario(usuarioId: number, nome?: string) {
        try {
            return await this.prisma.painel.findMany({
                where: {
                    OR: [
                        { usuarioId: usuarioId },
                        {
                            usuarioPainel: {
                                some: { usuarioId: usuarioId },
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

    // Função para atualizar um painel
    async atualizarPainel(
        id: number,
        data: Prisma.PainelUpdateInput,
        usuarioId: number,
    ) {
        // Verifica se o usuário tem permissão para atualizar o painel
        const painel = await this.prisma.painel.findUnique({ where: { id } });

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Se o usuário não for o criador do painel, verifica se ele é convidado
        if (painel.usuarioId !== usuarioId) {
            const usuarioPainel = await this.prisma.usuarioPainel.findFirst({
                where: { painelId: id, usuarioId: usuarioId },
            });
            if (!usuarioPainel) {
                throw new UnauthorizedException(
                    'Você não tem permissão para modificar este painel',
                );
            }
        }

        return this.prisma.painel.update({
            where: { id },
            data,
        });
    }

    async removerPainel(id: number, usuarioId: number) {
        const painel = await this.prisma.painel.findUnique({ where: { id } });

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se o usuário é o criador do painel
        if (painel.usuarioId !== usuarioId) {
            throw new UnauthorizedException(
                'Apenas o criador do painel pode excluí-lo'
            );
        }

        return this.prisma.painel.delete({ where: { id } });
    }

    async buscarPorId(painelId: number) {
        return this.prisma.painel.findUnique({
            where: { id: painelId },
        });
    }
}
