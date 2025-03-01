import { Module } from '@nestjs/common';
import { ContaPagarService } from './conta-pagar.service';
import { ContaPagarController } from './conta-pagar.controller';
import { DespesaService } from 'src/despesa/despesa.service';
import { UsuarioPainelService } from 'src/usuario-painel/usuario-painel.service';
import { PainelService } from 'src/painel/painel.service';

@Module({
  controllers: [ContaPagarController],
  providers: [ContaPagarService, DespesaService, UsuarioPainelService, PainelService],
})
export class ContaPagarModule {}
