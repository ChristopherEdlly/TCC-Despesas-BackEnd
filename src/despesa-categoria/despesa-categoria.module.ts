import { Module } from '@nestjs/common';
import { DespesaCategoriaService } from './despesa-categoria.service';
import { DespesaCategoriaController } from './despesa-categoria.controller';

@Module({
  controllers: [DespesaCategoriaController],
  providers: [DespesaCategoriaService],
})
export class DespesaCategoriaModule {}
