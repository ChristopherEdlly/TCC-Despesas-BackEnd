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
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { PainelService } from '../painel/painel.service'; // Importando o PainelService
import { UsuarioPainelService } from 'src/usuario-painel/usuario-painel.service'; // Importando o UsuarioPainelService
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard) // Protege os endpoints com o AuthGuard
@Controller('despesa')
export class DespesaController {
    constructor(
        private readonly despesaService: DespesaService,
        private readonly painelService: PainelService, // Injeta o PainelService
        private readonly usuarioPainelService: UsuarioPainelService, // Injeta o UsuarioPainelService
    ) {}

    @Post()
    async create(@Body() createDespesaDto: CreateDespesaDto, @Req() req) {
        const usuarioId = req.user.id;

        // Verifica se o painel pertence ao usuário
        const painel = await this.painelService.buscarPorId(
            createDespesaDto.painelId,
        );

        if (!painel || usuarioId !== painel.usuarioId) {
            console.log(
                'Usuário não é o criador, verificando se é convidado...',
            );

            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    createDespesaDto.painelId,
                    usuarioId,
                );

            if (!usuarioNoPainel) {
                console.log(
                    'Usuário não tem permissão para adicionar despesa.',
                );
                throw new ForbiddenException(
                    'Usuário não tem permissão para adicionar despesa neste painel.',
                );
            }

            console.log('Usuário é um convidado do painel, pode prosseguir.');
        } else {
            console.log('Usuário é o criador do painel, pode prosseguir.');
        }

        return this.despesaService.create(createDespesaDto);
    }

    @Get('despesa/:id')
    async buscarPorId(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.id;

        // Buscando a despesa por ID
        const despesa = await this.despesaService.buscarPorId(+id);
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }

        // Verificando se o painel da despesa pertence ao usuário
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        if (usuarioId !== painel.usuarioId) {
            console.log(
                'Usuário não é o criador, verificando se é convidado...',
            );

            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    despesa.painelId, // Usando despesa.painelId corretamente
                    usuarioId,
                );

            if (!usuarioNoPainel) {
                console.log('Usuário não tem permissão para buscar despesa.');
                throw new ForbiddenException(
                    'Usuário não tem permissão para buscar despesa neste painel.',
                );
            }

            console.log('Usuário é um convidado do painel, pode prosseguir.');
        } else {
            console.log('Usuário é o criador do painel, pode prosseguir.');
        }

        return despesa;
    }

    @Get('painel/:painelId')
    async buscarPorPainelId(@Param('painelId') painelId: string, @Req() req) {
        const usuarioId = req.user.id;

        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        if (usuarioId !== painel.usuarioId) {
            console.log(
                'Usuário não é o criador, verificando se é convidado...',
            );

            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    +painelId,
                    usuarioId,
                );

            if (!usuarioNoPainel) {
                console.log('Usuário não tem permissão para buscar despesa.');
                throw new ForbiddenException(
                    'Usuário não tem permissão para acessar as despesas deste painel.',
                );
            }

            console.log('Usuário é um convidado do painel, pode prosseguir.');
        } else {
            console.log('Usuário é o criador do painel, pode prosseguir.');
        }

        // Retorna todas as despesas do painel
        return this.despesaService.buscarPorPainelId(+painelId);
    }

    @Get('PorCategoria/:painelId/:categoriaDespesaId')
    async buscarPorPainelIdECategoriaDespesaId(
        @Param('painelId') painelId: string,
        @Param('categoriaDespesaId') categoriaDespesaId: string,
        @Req() req,
    ) {
        const usuarioId = req.user.id;

        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        if (usuarioId !== painel.usuarioId) {
            console.log(
                'Usuário não é o criador, verificando se é convidado...',
            );

            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    +painelId,
                    usuarioId,
                );

            if (!usuarioNoPainel) {
                console.log('Usuário não tem permissão para buscar despesa.');
                throw new ForbiddenException(
                    'Usuário não tem permissão para buscar despesa neste painel.',
                );
            }

            console.log('Usuário é um convidado do painel, pode prosseguir.');
        } else {
            console.log('Usuário é o criador do painel, pode prosseguir.');
        }

        return this.despesaService.buscarPorPainelIdECategoriaDespesaId(
            +painelId,
            +categoriaDespesaId,
        );
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateDespesaDto: UpdateDespesaDto,
        @Req() req,
    ) {
        const usuarioId = req.user.id;
        const despesa = await this.despesaService.buscarPorId(+id);
        if (!despesa) {
            throw new NotFoundException(`Despesa com id ${id} não encontrada.`);
        }

        // Verifica se o painel da despesa pertence ao usuário
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para editar esta despesa.',
            );
        }

        return this.despesaService.atualizar(+id, updateDespesaDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.id;
        const despesa = await this.despesaService.buscarPorId(+id);
        if (!despesa) {
            throw new NotFoundException(`Despesa com id ${id} não encontrada.`);
        }

        // Verifica se o painel da despesa pertence ao usuário
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para deletar esta despesa.',
            );
        }

        return this.despesaService.deletar(+id);
    }

    @Get('PainelAteData/:painelId/:dataLimite')
    async buscarSomaPorPainelIdEDataLimite(
        @Param('painelId') painelId: string,
        @Param('dataLimite') dataLimite: string,
        @Req() req,
    ) {
        const usuarioId = req.user.id;

        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esse painel.',
            );
        }

        const dataLimiteObj = new Date(dataLimite);

        const resultado = await this.despesaService.buscarSomaDasDespesas(
            +painelId,
            dataLimiteObj,
        );

        return resultado._sum.valor;
    }
}
