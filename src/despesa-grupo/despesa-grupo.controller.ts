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
import { DespesaGrupoService } from './despesa-grupo.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PainelService } from '../painel/painel.service';
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service';

@UseGuards(AuthGuard)
@Controller('despesa-grupo')
export class DespesaGrupoController {
    constructor(
        private readonly despesaGrupoService: DespesaGrupoService,
        private readonly painelService: PainelService,
        private readonly usuarioPainelService: UsuarioPainelService
    ) {}

    @Post()
    async create(
        @Body() createDespesaGrupoDto: CreateDespesaGrupoDto,
        @Req() req
    ) {
        const usuarioId = req.user.id;

        // Verificar se o usuário tem acesso ao painel
        const painel = await this.painelService.buscarPorId(
            createDespesaGrupoDto.painelId
        );

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                createDespesaGrupoDto.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para criar grupos neste painel'
            );
        }

        return this.despesaGrupoService.create(createDespesaGrupoDto);
    }

    // Substituir o método buscarPorUsuarioId pelo buscarPorPainelId
    @Get('painel/:painelId')
    async buscarPorPainelId(
        @Param('painelId') painelId: string,
        @Req() req
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
                'Usuário não tem permissão para acessar grupos deste painel'
            );
        }

        return this.despesaGrupoService.buscarPorPainelId(painelIdNum);
    }

    @Get(':id')
    async buscarPorId(
        @Param('id') id: string,
        @Req() req
    ) {
        const usuarioId = req.user.id;
        const grupoId = parseInt(id);

        // Buscar o grupo para verificar o painel
        const grupo = await this.despesaGrupoService.buscarPorId(grupoId);

        if (!grupo) {
            throw new NotFoundException('Grupo de despesa não encontrado');
        }

        // Verificar se o usuário tem acesso ao painel do grupo
        const painel = await this.painelService.buscarPorId(grupo.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                grupo.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar este grupo'
            );
        }

        return grupo;
    }

    @Patch(':id')
    async atualizar(
        @Param('id') id: string,
        @Body() data: UpdateDespesaGrupoDto,
        @Req() req
    ) {
        const usuarioId = req.user.id;
        const grupoId = parseInt(id);

        // Buscar o grupo para verificar o painel
        const grupo = await this.despesaGrupoService.buscarPorId(grupoId);

        if (!grupo) {
            throw new NotFoundException('Grupo de despesa não encontrado');
        }

        // Verificar se o usuário tem acesso ao painel do grupo
        const painel = await this.painelService.buscarPorId(grupo.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                grupo.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para atualizar este grupo'
            );
        }

        // Se estiver mudando o painelId, verificar permissão no novo painel
        if (data.painelId && data.painelId !== grupo.painelId) {
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
                    'Usuário não tem permissão para mover grupo para o novo painel'
                );
            }
        }

        return this.despesaGrupoService.atualizar(grupoId, data);
    }

    @Delete(':id')
    async deletar(
        @Param('id') id: string,
        @Req() req
    ) {
        const usuarioId = req.user.id;
        const grupoId = parseInt(id);

        // Buscar o grupo para verificar o painel
        const grupo = await this.despesaGrupoService.buscarPorId(grupoId);

        if (!grupo) {
            throw new NotFoundException('Grupo de despesa não encontrado');
        }

        // Verificar se o usuário tem acesso ao painel do grupo
        const painel = await this.painelService.buscarPorId(grupo.painelId);

        if (!painel) {
            throw new NotFoundException('Painel não encontrado');
        }

        // Verifica se é proprietário ou se está convidado no painel
        const temPermissao =
            painel.usuarioId === usuarioId ||
            await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                grupo.painelId,
                usuarioId
            );

        if (!temPermissao) {
            throw new ForbiddenException(
                'Usuário não tem permissão para deletar este grupo'
            );
        }

        return this.despesaGrupoService.deletar(grupoId);
    }
}
