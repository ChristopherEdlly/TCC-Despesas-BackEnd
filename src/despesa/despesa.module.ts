import { Module } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { PainelService } from 'src/painel/painel.service';
import { UsuarioPainelService } from 'src/usuario-painel/usuario-painel.service';

@Module({
    controllers: [DespesaController],
    providers: [DespesaService, PainelService, UsuarioPainelService],
})
export class DespesaModule {}
