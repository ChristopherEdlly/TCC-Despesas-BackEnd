import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ContaPagarService } from './conta-pagar.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';

@Controller('contaPagar')
export class ContaPagarController {
    constructor(private readonly contaPagarService: ContaPagarService) {}

    @Post()
    async criar(@Body() createContaAPagarDto: CreateContaAPagarDto) {
        try {
            const contas =
                await this.contaPagarService.criarContaAPagar(
                    createContaAPagarDto,
                );
            return { message: 'Contas a pagar criadas com sucesso', contas };
        } catch (error: unknown) {
            return { message: 'Erro ao criar contas a pagar', error };
        }
    }

    @Get('listarPorDespesaId/:despesaId')
    async listarPorDespesaId(@Param('despesaId') despesaId: string) {
        try {
            const contas =
                await this.contaPagarService.listarContasAPagarPorDespesaId(
                    +despesaId,
                );
            return { message: 'Contas a pagar listadas com sucesso', contas };
        } catch (error: unknown) {
            return { message: 'Erro ao listar contas a pagar', error };
        }
    }

    @Get('buscarDespesasAPagar/:PainelId')
    async buscarDespesasContasAPagar(@Param('PainelId') PainelId: string) {
        try {
            const contas =
                await this.contaPagarService.buscarDespesasComContasAPagarPorPainelId(
                    +PainelId,
                );
            return {
                message: 'Despesas e contas a pagar listadas com sucesso',
                contas,
            };
        } catch (error: unknown) {
            return {
                message: 'Erro ao buscar despesas e contas a pagar',
                error,
            };
        }
    }

    @Patch('atualizarContaAPagar/:contaId')
    async atualizarContaAPagar(
        @Param('contaId') contaId: string,
        @Body() updateContaAPagarDto: CreateContaAPagarDto,
    ) {
        try {
            const conta = await this.contaPagarService.atualizarContaAPagar(
                +contaId,
                updateContaAPagarDto,
            );
            return { message: 'Conta a pagar atualizada com sucesso', conta };
        } catch (error: unknown) {
            return { message: 'Erro ao atualizar conta a pagar', error };
        }
    }

    @Delete('deletarPorDespesaId/:despesaId')
    async deletarPorDespesaId(@Param('despesaId') despesaId: string) {
        try {
            await this.contaPagarService.deletarContasAPagarPorDespesaId(
                +despesaId,
            );
            return { message: 'Contas a pagar deletadas com sucesso' };
        } catch (error: unknown) {
            return { message: 'Erro ao deletar contas a pagar', error };
        }
    }

    @Delete('deletarContaAPagar/:contaId')
    async deletarContaAPagar(@Param('contaId') contaId: string) {
        try {
            await this.contaPagarService.deletarContaAPagar(+contaId);
            return { message: 'Conta a pagar deletada com sucesso' };
        } catch (error: unknown) {
            return { message: 'Erro ao deletar conta a pagar', error };
        }
    }
}
