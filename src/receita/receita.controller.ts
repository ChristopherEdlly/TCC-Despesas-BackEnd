import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ReceitaService } from './receita.service';
import { CreateReceitaDto } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';

@Controller('receita')
export class ReceitaController {
    constructor(private readonly receitaService: ReceitaService) {}

    @Post()
    create(@Body() createReceitaDto: CreateReceitaDto) {
        return this.receitaService.create(createReceitaDto);
    }

    @Get('/painel/:painelId')
    BuscarPorPainelId(@Param('painelId') painelId: string) {
        return this.receitaService.BuscarPorPainelId(+painelId);
    }

    @Get('painel/:painelId/categoria/:categoriaReceitaId')
    BuscarPorPainelIdECategoriaId(
        @Param('painelId') painelId: string,
        @Param('categoriaReceitaId') categoriaReceitaId: string,
    ) {
        return this.receitaService.BuscarPorPainelIdECategoriaId(
            +painelId,
            +categoriaReceitaId,
        );
    }

    @Patch(':id')
    AtualizarReceita(
        @Param('id') id: string,
        @Body() updateReceitaDto: UpdateReceitaDto,
    ) {
        return this.receitaService.AtualizarReceita(+id, updateReceitaDto);
    }

    @Delete(':id')
    DeletarReceita(@Param('id') id: string) {
        return this.receitaService.DeletarReceita(+id);
    }

    @Get(':data')
    calcularSaldoAteData(@Param('data') data: string) {
        return this.receitaService.calcularSaldoAteData(data);
    }
}
