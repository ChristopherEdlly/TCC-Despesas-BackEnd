import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsuarioPainelModule } from './usuario-painel/usuario-painel.module';
import { PainelModule } from './painel/painel.module';
import { ReceitaModule } from './receita/receita.module';
import { CategoriaReceitaModule } from './categoria-receita/categoria-receita.module';
import { DespesaModule } from './despesa/despesa.module';
import { ContaPagarModule } from './conta-pagar/conta-pagar.module';
import { DespesaCategoriaModule } from './despesa-categoria/despesa-categoria.module';
import { DespesaGrupoModule } from './despesa-grupo/despesa-grupo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        UsuariosModule,
        UsuarioPainelModule,
        PainelModule,
        ReceitaModule,
        CategoriaReceitaModule,
        DespesaModule,
        ContaPagarModule,
        DespesaCategoriaModule,
        DespesaGrupoModule,
        PrismaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
