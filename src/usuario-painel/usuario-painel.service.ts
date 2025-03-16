import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';

@Injectable()
export class UsuarioPainelService {
  constructor(private prisma: PrismaService) {}

  async adicionarUsuarioAoPainel(data: CreateUsuarioPainelDto) {
    const { email, painelId, permissao } = data;

    // 1. Verificar se o painel existe
    const painel = await this.prisma.painel.findUnique({
      where: { id: painelId },
    });

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // 2. Verificar se o usuário com o email fornecido existe
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado. O usuário precisa estar cadastrado no sistema para receber o convite.`,
      );
    }

    // 3. Verificar se já existe uma relação entre este usuário e painel
    const relacaoExistente = await this.prisma.usuarioPainel.findUnique({
      where: {
        usuarioId_painelId: {
          usuarioId: usuario.id,
          painelId,
        },
      },
    });

    if (relacaoExistente) {
      throw new BadRequestException('Este usuário já tem acesso a este painel');
    }

    return this.prisma.usuarioPainel.create({
      data: {
        usuarioId: usuario.id,
        painelId,
        permissao,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        painel: true,
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
      select: {
        id: true,
        permissao: true,
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  async listarPaineisDoUsuario(usuarioId: number) {
    return this.prisma.usuarioPainel.findMany({
      where: { usuarioId },
      include: { painel: true, usuario: true },
    });
  }

  async verificarSeUsuarioNoPainel(
    painelId: number,
    usuarioId: number,
  ): Promise<boolean> {
    const usuarioPainel = await this.prisma.usuarioPainel.findFirst({
      where: {
        painelId,
        usuarioId,
      },
    });
    return !!usuarioPainel;
  }
}
