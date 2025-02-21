import { Module } from '@nestjs/common';
import { DespesaGrupoService } from './despesa-grupo.service';
import { DespesaGrupoController } from './despesa-grupo.controller';

@Module({
  controllers: [DespesaGrupoController],
  providers: [DespesaGrupoService],
})
export class DespesaGrupoModule {}
