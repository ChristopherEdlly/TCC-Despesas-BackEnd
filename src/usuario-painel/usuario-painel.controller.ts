import { UsuarioService } from './../usuario/usuario.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';
import { UpdateUsuarioPainelDto } from './dto/update-usuario-painel.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PainelService } from 'src/painel/painel.service';

@UseGuards(AuthGuard)
@Controller('usuariopainel')
export class UsuarioPainelController {
  constructor(
    private readonly usuarioPainelService: UsuarioPainelService,
    private readonly painelService: PainelService,
  ) {}

  @Post()
  async create(@Body() data: CreateUsuarioPainelDto, @Req() req) {
    const usuarioId = req.user.id;

    // Verificar se o usuário logado tem permissão para adicionar usuários ao painel
    const painel = await this.painelService.buscarPorId(data.painelId);

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // Apenas o criador do painel pode adicionar usuários
    if (painel.usuarioId !== usuarioId) {
      throw new ForbiddenException(
        'Apenas o criador do painel pode adicionar usuários',
      );
    }

    return this.usuarioPainelService.adicionarUsuarioAoPainel(data);
  }

  @Get('/ListarUsuariosDoPainel/:id')
  async listarUsuariosDoPainel(@Param('id') id: string) {
    return this.usuarioPainelService.listarUsuariosDoPainel(+id);
  }

  @Get('/ListarPaineisDoUsuario')
  async listarPaineisDoUsuario(@Req() req) {
    const id = req.user.id;
    return this.usuarioPainelService.listarPaineisDoUsuario(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioPainelDto: UpdateUsuarioPainelDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;

    if (!updateUsuarioPainelDto.permissao) {
      throw new BadRequestException('Permissão não informada');
    }

    const usuarioPainel = await this.usuarioPainelService.findOne(+id);
    if (!usuarioPainel) {
      throw new NotFoundException('Usuário não encontrado no painel');
    }

    const painel = await this.painelService.buscarPorId(usuarioPainel.painelId);
    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    if (painel.usuarioId !== usuarioId) {
      throw new ForbiddenException(
        'Apenas o criador do painel pode alterar permissões',
      );
    }

    return this.usuarioPainelService.atualizarPermissao(
      +id,
      updateUsuarioPainelDto.permissao,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const usuarioId = req.user.id;

     // Primeiro busca o usuarioPainel para obter o painelId
  const usuarioPainel = await this.usuarioPainelService.findOne(+id);
  if (!usuarioPainel) {
    throw new NotFoundException('Usuário não encontrado no painel');
  }

  const painel = await this.painelService.buscarPorId(usuarioPainel.painelId);
  if (!painel) {
    throw new NotFoundException('Painel não encontrado');
  }

  if (painel.usuarioId !== usuarioId) {
    throw new ForbiddenException(
      'Apenas o criador do painel pode remover usuários',
    );
  }

    return this.usuarioPainelService.removerUsuarioDoPainel(+id);
  }
}
