import { Module } from '@nestjs/common';
import { DespesaGrupoService } from './despesa-grupo.service';
import { DespesaGrupoController } from './despesa-grupo.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PainelModule } from '../painel/painel.module';
import { UsuarioPainelModule } from '../usuario-painel/usuario-painel.module';

@Module({
  imports: [
    PainelModule,
    UsuarioPainelModule
  ],
  controllers: [DespesaGrupoController],
  providers: [
    DespesaGrupoService,
    PrismaService
  ],
  exports: [DespesaGrupoService]
})
export class DespesaGrupoModule {}
