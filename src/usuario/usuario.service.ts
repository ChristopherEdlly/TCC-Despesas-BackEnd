import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

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

  async atualizarUsuario(id: number, data: UpdateUsuarioDto) {
    const updateData = { ...data };

    if (updateData.senha) {
      const senhaCriptografada = await bcrypt.hash(updateData.senha, 10);
      updateData.senha = senhaCriptografada;
    }

    return this.prisma.usuario.update({
      where: { id },
      data: updateData,
    });
  }

  async removerUsuario(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }

  async buscarPorId(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        fotoPerfil: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async buscarUsuarioPorEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }
}
