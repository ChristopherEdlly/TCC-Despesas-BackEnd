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
import { DespesaCategoriaService } from './despesa-categoria.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PainelService } from '../painel/painel.service';
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service';

@UseGuards(AuthGuard)
@Controller('despesa-categoria')
export class DespesaCategoriaController {
    constructor(
        private readonly despesaCategoriaService: DespesaCategoriaService,
        private readonly painelService: PainelService,
        private readonly usuarioPainelService: UsuarioPainelService,
    ) {}

    @Post()
    async create(
        @Body() createDespesaCategoriaDto: CreateDespesaCategoriaDto,
        @Req() req,
    ) {
        const usuarioId = req.user.id;

        // Verificar se o usuário tem acesso ao painel
        const painel = await this.painelService.buscarPorId(
            createDespesaCategoriaDto.painelId
        );

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                createDespesaCategoriaDto.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para criar categorias neste painel'
            );
        }

        return this.despesaCategoriaService.create(createDespesaCategoriaDto);
    }

    // Substituído por buscarPorPainelId
    // @Get('usuario/')
    // buscarPorUsuarioId(@Req() req) {
    //     const usuarioId = req.user.id;
    //     return this.despesaCategoriaService.uscarPorUsuarioId(+usuarioId);
    // }

    @Get('painel/:painelId')
    async buscarPorPainelId(
        @Param('painelId') painelId: string,
        @Req() req,
    ) {
        const usuarioId = req.user.id;
        const painelIdNum = parseInt(painelId);

        // Verificar se o usuário tem acesso ao painel
        const painel = await this.painelService.buscarPorId(painelIdNum);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                painelIdNum,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar categorias deste painel'
            );
        }

        return this.despesaCategoriaService.buscarPorPainelId(painelIdNum);
    }

    @Get('grupo-despesa/:grupoDespesaId')
    async buscarPorGrupoDespesaId(
        @Param('grupoDespesaId') grupoDespesaId: string,
        @Req() req,
    ) {
        const usuarioId = req.user.id;
        const grupoDespesaIdNum = parseInt(grupoDespesaId);

        // Buscar o grupo para verificar o painel
        const grupoDespesa = await this.despesaCategoriaService.buscarGrupoDespesaPorId(
            grupoDespesaIdNum
        );

        if (!grupoDespesa) {
            throw new NotFoundException('Grupo de despesa não encontrado');
        }

        // Verificar se o usuário tem acesso ao painel do grupo
        const painel = await this.painelService.buscarPorId(grupoDespesa.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                grupoDespesa.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar categorias deste painel'
            );
        }

        return this.despesaCategoriaService.buscarPorGrupoDespesaId(grupoDespesaIdNum);
    }

    @Patch(':id')
    async atualizar(
        @Param('id') id: string,
        @Body() data: UpdateDespesaCategoriaDto,
        @Req() req,
    ) {
        const usuarioId = req.user.id;
        const categoriaId = parseInt(id);

        // Buscar a categoria para verificar o painel
        const categoria = await this.despesaCategoriaService.buscarPorId(categoriaId);

        if (!categoria) {
            throw new NotFoundException('Categoria de despesa não encontrada');
        }

        // Verificar se o usuário tem acesso ao painel da categoria
        const painel = await this.painelService.buscarPorId(categoria.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                categoria.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para atualizar categorias deste painel'
            );
        }

        // Se estiver atualizando o painelId, verificar acesso ao novo painel também
        if (data.painelId && data.painelId !== categoria.painelId) {
            const novoPainel = await this.painelService.buscarPorId(data.painelId);

            if (!novoPainel) {
                throw new NotFoundException('Novo painel não encontrado');
            }

            const temPermissaoNoNovoPainel =
                novoPainel.usuarioId === usuarioId ||
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    data.painelId,
                    usuarioId
                );

            if (!temPermissaoNoNovoPainel) {
                throw new ForbiddenException(
                    'Usuário não tem permissão para mover categoria para o novo painel'
                );
            }
        }

        return this.despesaCategoriaService.atualizar(categoriaId, data);
    }

    @Delete(':id')
    async deletar(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.id;
        const categoriaId = parseInt(id);

        // Buscar a categoria para verificar o painel
        const categoria = await this.despesaCategoriaService.buscarPorId(categoriaId);

        if (!categoria) {
            throw new NotFoundException('Categoria de despesa não encontrada');
        }

        // Verificar se o usuário tem acesso ao painel da categoria
        const painel = await this.painelService.buscarPorId(categoria.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                categoria.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para deletar categorias deste painel'
            );
        }

        return this.despesaCategoriaService.deletar(categoriaId);
    }

    @Get(':id')
    async buscarPorId(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.id;
        const categoriaId = parseInt(id);

        // Buscar a categoria para verificar o painel
        const categoria = await this.despesaCategoriaService.buscarPorId(categoriaId);

        if (!categoria) {
            throw new NotFoundException('Categoria de despesa não encontrada');
        }

        // Verificar se o usuário tem acesso ao painel da categoria
        const painel = await this.painelService.buscarPorId(categoria.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                categoria.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esta categoria'
            );
        }

        return categoria;
    }
}
