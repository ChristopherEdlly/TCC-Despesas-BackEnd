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
import { ContaPagarService } from './conta-pagar.service';
import { DespesaService } from '../despesa/despesa.service'; // Importando o DespesaService
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { PainelService } from '../painel/painel.service'; // Importando o PainelService
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service'; // Serviço para verificar os convites

@UseGuards(AuthGuard)
@Controller('conta-pagar')
export class ContaPagarController {
    constructor(
        private readonly contaPagarService: ContaPagarService,
        private readonly despesaService: DespesaService, // Injeta o DespesaService
        private readonly painelService: PainelService, // Injeta o PainelService
        private readonly usuarioPainelService: UsuarioPainelService, // Injeta o UsuarioPainelService
    ) {}

    @Post()
    async create(
        @Body() createContaAPagarDto: CreateContaAPagarDto,
        @Req() req,
    ) {
        const usuarioId = req.user.sub;

        const despesa = await this.despesaService.buscarPorId(
            createContaAPagarDto.despesaId,
        );
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }

        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel) {
            throw new NotFoundException('Painel não encontrado.');
        }

        if (painel.usuarioId !== usuarioId) {
            const usuarioNoPainel =
                await this.usuarioPainelService.verificarSeUsuarioNoPainel(
                    painel.id,
                    usuarioId,
                );
            if (!usuarioNoPainel) {
                throw new ForbiddenException(
                    'Usuário não tem permissão para acessar este painel.',
                );
            }
        }
        return this.contaPagarService.create(createContaAPagarDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.sub;
        const contaAPagar = await this.contaPagarService.findOne(+id);
        if (!contaAPagar) {
            throw new NotFoundException(
                `Conta a pagar com id ${id} não encontrada.`,
            );
        }

        // Verifica se o painel da conta a pagar pertence ao usuário ou se o usuário é um convidado
        const despesa = await this.despesaService.buscarPorId(
            contaAPagar.despesaId,
        );
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para acessar esta conta a pagar.',
            );
        }

        return contaAPagar;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateContaPagarDto: UpdateContaPagarDto,
        @Req() req,
    ) {
        const usuarioId = req.user.sub;
        const contaAPagar = await this.contaPagarService.findOne(+id);
        if (!contaAPagar) {
            throw new NotFoundException(
                `Conta a pagar com id ${id} não encontrada.`,
            );
        }

        const despesa = await this.despesaService.buscarPorId(
            contaAPagar.despesaId,
        );
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para editar esta conta a pagar.',
            );
        }

        return this.contaPagarService.update(+id, updateContaPagarDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.sub;
        const contaAPagar = await this.contaPagarService.findOne(+id);
        if (!contaAPagar) {
            throw new NotFoundException(
                `Conta a pagar com id ${id} não encontrada.`,
            );
        }

        const despesa = await this.despesaService.buscarPorId(
            contaAPagar.despesaId,
        );
        if (!despesa) {
            throw new NotFoundException('Despesa não encontrada.');
        }
        const painel = await this.painelService.buscarPorId(despesa.painelId);
        if (!painel || painel.usuarioId !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para deletar esta conta a pagar.',
            );
        }

        return this.contaPagarService.delete(+id);
    }
}
