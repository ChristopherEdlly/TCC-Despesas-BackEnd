import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
    constructor(private prisma: PrismaService) {}

    async criarUsuario(data: { email: string; senha: string; nome: string }) {
        const senhaCriptografada = await bcrypt.hash(data.senha, 10);
        data.senha = senhaCriptografada;
        return this.prisma.usuario.create({
            data,
        });
    }

    async buscarUsuarioPorNome(nome: string) {
        return this.prisma.usuario.findMany({ where: { nome } });
    }

    async atualizarUsuario(id: number, data: Prisma.UsuarioUpdateInput) {
        return this.prisma.usuario.update({
            where: { id },
            data,
        });
    }

    async removerUsuario(id: number) {
        return this.prisma.usuario.delete({ where: { id } });
    }

    async buscarPorId(id: number) {
        return this.prisma.usuario.findUnique({ where: { id } });
    }
}
