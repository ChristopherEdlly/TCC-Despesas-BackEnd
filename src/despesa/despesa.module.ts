import { Module } from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { DespesaController } from './despesa.controller';
import { PainelService } from 'src/painel/painel.service';

@Module({
    controllers: [DespesaController],
    providers: [DespesaService, PainelService],
})
export class DespesaModule {}
