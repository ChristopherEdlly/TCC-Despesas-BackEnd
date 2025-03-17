import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DespesaService } from '../despesa/despesa.service';
import { PainelService } from '../painel/painel.service';
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service';
import { ContaPagarService } from './conta-pagar.service';
import { CreateContaAPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';

@UseGuards(AuthGuard)
@Controller('conta-pagar')
export class ContaPagarController {
  constructor(
    private readonly contaPagarService: ContaPagarService,
    private readonly despesaService: DespesaService,
    private readonly painelService: PainelService,
    private readonly usuarioPainelService: UsuarioPainelService,
  ) {}

  @Post()
  async create(@Body() createContaAPagarDto: CreateContaAPagarDto, @Req() req) {
    const usuarioId = req.user.id;

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

    // Verifica se o usuário é dono do painel ou se é um convidado
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        painel.id,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para criar contas a pagar neste painel.',
      );
    }

    return this.contaPagarService.create(createContaAPagarDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const usuarioId = req.user.id;
    const contaAPagar = await this.contaPagarService.findOne(+id);
    if (!contaAPagar) {
      throw new NotFoundException(`Conta a pagar com id ${id} não encontrada.`);
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
        'Usuário não tem permissão para acessar esta conta a pagar.',
      );
    }

    return contaAPagar;
  }

  @Get('despesa/:despesaId')
  async findByDespesa(@Param('despesaId') despesaId: string, @Req() req) {
    const usuarioId = req.user.id;

    // Busca a despesa para verificar permissões
    const despesa = await this.despesaService.buscarPorId(+despesaId);
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada.');
    }

    // Busca o painel da despesa
    const painel = await this.painelService.buscarPorId(despesa.painelId);
    if (!painel) {
      throw new NotFoundException('Painel não encontrado.');
    }

    // Verifica permissões
    const temPermissao =
      painel.usuarioId === usuarioId ||
      (await this.usuarioPainelService.verificarSeUsuarioNoPainel(
        painel.id,
        usuarioId,
      ));

    if (!temPermissao) {
      throw new ForbiddenException(
        'Usuário não tem permissão para acessar estas contas a pagar.',
      );
    }

    // Busca as contas a pagar associadas à despesa
    return this.contaPagarService.findByDespesaId(+despesaId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContaPagarDto: UpdateContaPagarDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;
    const contaAPagar = await this.contaPagarService.findOne(+id);
    if (!contaAPagar) {
      throw new NotFoundException(`Conta a pagar com id ${id} não encontrada.`);
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
    const usuarioId = req.user.id;
    const contaAPagar = await this.contaPagarService.findOne(+id);
    if (!contaAPagar) {
      throw new NotFoundException(`Conta a pagar com id ${id} não encontrada.`);
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
