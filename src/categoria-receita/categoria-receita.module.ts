import { Module } from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CategoriaReceitaController } from './categoria-receita.controller';

@Module({
    controllers: [CategoriaReceitaController],
    providers: [CategoriaReceitaService],
})
export class CategoriaReceitaModule {}
