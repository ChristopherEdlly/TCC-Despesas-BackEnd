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
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard) // Protege os endpoints com o AuthGuard
@Controller('despesa')
export class DespesaController {
    constructor(
        private readonly despesaService: DespesaService,
        private readonly painelService: PainelService, // Injeta o PainelService
    ) {}

    @Post()
    async create(@Body() createDespesaDto: CreateDespesaDto, @Req() req) {
        const usuarioId = req.user.sub;

        // Verifica se o painel pertence ao usuário
        const painel = await this.painelService.buscarPorId(
            createDespesaDto.painelId,
        );
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para adicionar despesa nesse painel.',
            );
        }

        return this.despesaService.create(createDespesaDto);
    }

    @Get('PorDespesa/:id')
    async buscarPorId(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.sub;
        const despesa = await this.despesaService.buscarPorId(+id);
        if (!despesa) {
            throw new NotFoundException(`Despesa com id ${id} não encontrada.`);
        }

        // Verifica se o painel da despesa pertence ao usuário
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esta despesa.',
            );
        }

        return despesa;
    }

    @Get('PorPainel/:painelId')
    async buscarPorPainelId(@Param('painelId') painelId: string, @Req() req) {
        const usuarioId = req.user.sub;

        // Verifica se o painel pertence ao usuário
        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esse painel.',
            );
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
        const usuarioId = req.user.sub;

        // Verifica se o painel pertence ao usuário
        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esse painel.',
            );
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
        const usuarioId = req.user.sub;
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
        const usuarioId = req.user.sub;
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
        const usuarioId = req.user.sub;

        // Verifica se o painel existe e se pertence ao usuário
        const painel = await this.painelService.buscarPorId(+painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esse painel.',
            );
        }

        // Converte a dataLimite para objeto Date
        const dataLimiteObj = new Date(dataLimite);

        // Chama o serviço para buscar a soma das despesas até a data fornecida
        const resultado = await this.despesaService.buscarSomaDasDespesas(
            +painelId,
            dataLimiteObj,
        );

        // Retorna o valor somado das despesas até a data limite
        return resultado._sum.valor;
    }
}
