import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PainelService } from '../painel/painel.service';
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service';

@Controller('categoria-receita')
@UseGuards(AuthGuard)
export class CategoriaReceitaController {
  constructor(
    private readonly categoriaReceitaService: CategoriaReceitaService,
    private readonly painelService: PainelService,
    private readonly usuarioPainelService: UsuarioPainelService,
  ) {}

  @Post()
  async criar(
    @Body() createCategoriaReceitaDto: CreateCategoriaReceitaDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;

    // Verificar se o usuário tem acesso ao painel
    const painel = await this.painelService.buscarPorId(
      createCategoriaReceitaDto.painelId,
    );

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        createCategoriaReceitaDto.painelId,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para criar categorias neste painel',
      );
    }

    return this.categoriaReceitaService.criar(createCategoriaReceitaDto);
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string, @Req() req) {
    const usuarioId = req.user.id;
    const categoriaId = parseInt(id);

    // Buscar a categoria para verificar o painel
    const categoria =
      await this.categoriaReceitaService.buscarPorId(categoriaId);

    // Verificar se o usuário tem acesso ao painel da categoria
    const painel = await this.painelService.buscarPorId(categoria.painelId);

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // Verifica se é proprietário ou se está convidado no painel
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        categoria.painelId,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para acessar esta categoria',
      );
    }

    return categoria;
  }

  @Get('painel/:painelId')
  async buscarPorPainelId(@Param('painelId') painelId: string, @Req() req) {
    const usuarioId = req.user.id;
    const painelIdNum = parseInt(painelId);

    const painel = await this.painelService.buscarPorId(painelIdNum);

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // Verifica se é proprietário ou se está convidado no painel
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        painelIdNum,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para acessar categorias deste painel',
      );
    }

    return this.categoriaReceitaService.buscarPorPainelId(painelIdNum);
  }

  @Patch(':id')
  async atualizar(
    @Param('id') id: string,
    @Body() updateCategoriaReceitaDto: UpdateCategoriaReceitaDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;
    const categoriaId = parseInt(id);

    // Buscar a categoria para verificar o painel
    const categoria =
      await this.categoriaReceitaService.buscarPorId(categoriaId);

    // Verificar se o usuário tem acesso ao painel da categoria
    const painel = await this.painelService.buscarPorId(categoria.painelId);

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // Verifica se é proprietário ou se está convidado no painel
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        categoria.painelId,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para atualizar categorias deste painel',
      );
    }

    return this.categoriaReceitaService.atualizar(
      categoriaId,
      updateCategoriaReceitaDto,
    );
  }

  @Delete(':id')
  async deletar(@Param('id') id: string, @Req() req) {
    const usuarioId = req.user.id;
    const categoriaId = parseInt(id);

    // Buscar a categoria para verificar o painel
    const categoria =
      await this.categoriaReceitaService.buscarPorId(categoriaId);

    // Verificar se o usuário tem acesso ao painel da categoria
    const painel = await this.painelService.buscarPorId(categoria.painelId);

    if (!painel) {
      throw new NotFoundException('Painel não encontrado');
    }

    // Verifica se é proprietário ou se está convidado no painel
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        categoria.painelId,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para deletar categorias deste painel',
      );
    }

    return this.categoriaReceitaService.deletar(categoriaId);
  }
}
