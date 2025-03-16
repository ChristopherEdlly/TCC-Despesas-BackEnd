import { Module } from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CategoriaReceitaController } from './categoria-receita.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PainelService } from '../painel/painel.service';
import { UsuarioPainelService } from '../usuario-painel/usuario-painel.service';
import { PainelModule } from '../painel/painel.module';
import { UsuarioPainelModule } from '../usuario-painel/usuario-painel.module';

@Module({
  imports: [
    PainelModule,       // Importa o módulo do Painel
    UsuarioPainelModule // Importa o módulo do UsuarioPainel
  ],
  controllers: [CategoriaReceitaController],
  providers: [
    CategoriaReceitaService,
    PrismaService
    // Não precisamos adicionar aqui porque estamos importando os módulos
  ],
  exports: [CategoriaReceitaService]
})
export class CategoriaReceitaModule {}
