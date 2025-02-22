import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioPainelService {
    constructor(private prisma: PrismaService) {}

    async adicionarUsuarioAoPainel(data: {
        usuarioId: number;
        painelId: number;
        permissao: string;
    }) {
        return this.prisma.usuarioPainel.create({
            data: {
                usuario: { connect: { id: data.usuarioId } },
                painel: { connect: { id: data.painelId } },
                permissao: data.permissao,
            },
        });
    }

    async removerUsuarioDoPainel(id: number) {
        return this.prisma.usuarioPainel.deleteMany({
            where: {
                id,
            },
        });
    }

    async atualizarPermissao(id: number, permissao: string) {
        return this.prisma.usuarioPainel.update({
            where: { id },
            data: { permissao },
        });
    }

    async listarUsuariosDoPainel(painelId: number) {
        return this.prisma.usuarioPainel.findMany({
            where: { painelId },
            include: { usuario: true },
        });
    }

    async listarPaineisDoUsuario(usuarioId: number) {
        return this.prisma.usuarioPainel.findMany({
            where: { usuarioId },
            include: { painel: true },
        });
    }

    async findAll() {
        return this.prisma.usuarioPainel.findMany();
    }
}
