import { Module } from '@nestjs/common';
import { DespesaCategoriaService } from './despesa-categoria.service';
import { DespesaCategoriaController } from './despesa-categoria.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PainelModule } from '../painel/painel.module';
import { UsuarioPainelModule } from '../usuario-painel/usuario-painel.module';

@Module({
  imports: [
    PainelModule,
    UsuarioPainelModule
  ],
  controllers: [DespesaCategoriaController],
  providers: [
    DespesaCategoriaService,
    PrismaService
  ],
  exports: [DespesaCategoriaService]
})
export class DespesaCategoriaModule {}
