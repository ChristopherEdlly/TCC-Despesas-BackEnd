import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';

@Controller('categoria-receita')
export class CategoriaReceitaController {
    constructor(
        private readonly categoriaReceitaService: CategoriaReceitaService,
    ) {}

    @Post()
    criarCategoriaReceita(@Body() data: CreateCategoriaReceitaDto) {
        return this.categoriaReceitaService.criarCategoriaReceita(data);
    }

    @Get(':id')
    listarCategoriasReceitaPorUsuario(@Param('id') id: number) {
        return this.categoriaReceitaService.listarCategoriasReceitaPorUsuario(id);
    }

    @Patch(':id')
    atualizarCategoriaReceita(
        @Param('id') id: number,
        @Body() data: UpdateCategoriaReceitaDto,
    ) {
        return this.categoriaReceitaService.atualizarCategoriaReceita(id, data);
    }

    @Delete(':id')
    removerCategoriaReceita(@Param('id') id: number) {
        return this.categoriaReceitaService.removerCategoriaReceita(id);
    }
    
}
