import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    ForbiddenException,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { PainelService } from 'src/painel/painel.service';
import { UsuarioPainelService } from 'src/usuario-painel/usuario-painel.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('receita')
@UseGuards(AuthGuard)
export class ReceitaController {
    constructor(
        private readonly receitaService: ReceitaService,
        private readonly painelService: PainelService,
        private readonly usuarioPainelService: UsuarioPainelService,
    ) {}

    @Post()
    async create(@Body() createReceitaDto: CreateReceitaDto, @Req() req) {
        const usuarioId = req.user.sub;
        console.log('Usuário autenticado:', usuarioId);

        // Busca o painel vinculado à receita
        const painel = await this.painelService.buscarPorId(
            createReceitaDto.painelId,
        );
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        console.log('Criador do painel:', painel.usuarioId);

        // Verifica se o usuário é o criador do painel ou está nele
        if (painel.usuarioId !== usuarioId) {
            console.log(
                'Usuário não é o criador, verificando se é convidado...',
            );

            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    painel.id,
                    usuarioId,
                );
            if (!usuarioNoPainel) {
                console.log(
                    'Usuário não tem permissão para adicionar receitas.',
                );
                throw new ForbiddenException(
                    'Usuário não tem permissão para adicionar receitas neste painel.',
                );
            }

            console.log('Usuário é um convidado do painel, pode prosseguir.');
        } else {
            console.log('Usuário é o criador do painel, pode prosseguir.');
        }

        return this.receitaService.create(createReceitaDto);
    }

    @Patch(':id')
    async atualizarReceita(
        @Param('id') id: string,
        @Body() updateReceitaDto: UpdateReceitaDto,
        @Req() req,
    ) {
        const usuarioId = req.user.sub;

        // Busca a receita para pegar o painelId
        const receita = await this.receitaService.buscarPorId(+id);
        if (!receita) {
            throw new NotFoundException('Receita não encontrada.');
        }

        // Busca o painel vinculado à receita
        const painel = await this.painelService.buscarPorId(receita.painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        // Verifica permissões
        if (painel.usuarioId !== usuarioId) {
            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    painel.id,
                    usuarioId,
                );
            if (!usuarioNoPainel) {
                throw new ForbiddenException(
                    'Usuário não tem permissão para editar esta receita.',
                );
            }
        }

        return this.receitaService.AtualizarReceita(+id, updateReceitaDto);
    }

    @Delete(':id')
    async deletarReceita(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.sub;

        // Busca a receita para pegar o painelId
        const receita = await this.receitaService.buscarPorId(+id);
        if (!receita) {
            throw new NotFoundException('Receita não encontrada.');
        }

        // Busca o painel vinculado à receita
        const painel = await this.painelService.buscarPorId(receita.painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        // Verifica permissões
        if (painel.usuarioId !== usuarioId) {
            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    painel.id,
                    usuarioId,
                );
            if (!usuarioNoPainel) {
                throw new ForbiddenException(
                    'Usuário não tem permissão para deletar esta receita.',
                );
            }
        }

        return this.receitaService.DeletarReceita(+id);
    }

    @Get('/painel/:painelId')
    BuscarPorPainelId(@Param('painelId') painelId: string) {
        return this.receitaService.BuscarPorPainelId(+painelId);
    }

    @Get('painel/:painelId/categoria/:categoriaReceitaId')
    BuscarPorPainelIdECategoriaId(
        @Param('painelId') painelId: string,
        @Param('categoriaReceitaId') categoriaReceitaId: string,
    ) {
        return this.receitaService.BuscarPorPainelIdECategoriaId(
            +painelId,
            +categoriaReceitaId,
        );
    }

    @Get(':data')
    calcularSaldoAteData(@Param('data') data: string) {
        return this.receitaService.calcularSaldoAteData(data);
    }
}
