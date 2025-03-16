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
  listarUsuariosDoPainel(@Param('id') id: string) {
    return this.usuarioPainelService.listarUsuariosDoPainel(+id);
  }

  @Get('/ListarPaineisDoUsuario')
  listarPaineisDoUsuario(@Req() req) {
    const id = req.user.id;
    return this.usuarioPainelService.listarPaineisDoUsuario(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioPainelDto: UpdateUsuarioPainelDto,
  ) {
    if (!updateUsuarioPainelDto.permissao) {
      throw new BadRequestException('Permissão não informada');
    }
    return this.usuarioPainelService.atualizarPermissao(
      +id,
      updateUsuarioPainelDto.permissao,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPainelService.removerUsuarioDoPainel(+id);
  }
}
