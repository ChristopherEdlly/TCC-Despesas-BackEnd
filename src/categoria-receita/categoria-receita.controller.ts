import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('categoria-receita')
export class CategoriaReceitaController {
    constructor(
        private readonly categoriaReceitaService: CategoriaReceitaService,
    ) {}

    @Post()
    criarCategoriaReceita(@Body() data: CreateCategoriaReceitaDto) {
        return this.categoriaReceitaService.criarCategoriaReceita(data);
    }

    @Get()
    listarCategoriasReceitaPorUsuario(@Req() req) {
        const usuarioId = req.user.id;
        return this.categoriaReceitaService.listarCategoriasReceitaPorUsuario(
            +usuarioId,
        );
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
