import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaReceitaModule } from './categoria-receita/categoria-receita.module';
import { ContaPagarModule } from './conta-pagar/conta-pagar.module';
import { DespesaCategoriaModule } from './despesa-categoria/despesa-categoria.module';
import { DespesaGrupoModule } from './despesa-grupo/despesa-grupo.module';
import { DespesaModule } from './despesa/despesa.module';
import { PainelModule } from './painel/painel.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReceitaModule } from './receita/receita.module';
import { UsuarioPainelModule } from './usuario-painel/usuario-painel.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        UsuarioModule,
        UsuarioPainelModule,
        PainelModule,
        ReceitaModule,
        CategoriaReceitaModule,
        DespesaModule,
        ContaPagarModule,
        DespesaCategoriaModule,
        DespesaGrupoModule,
        PrismaModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
