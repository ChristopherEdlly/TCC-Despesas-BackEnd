import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesa')
export class DespesaController {
    constructor(private readonly despesaService: DespesaService) {}

    @Post()
    create(@Body() createDespesaDto: CreateDespesaDto) {
        return this.despesaService.create(createDespesaDto);
    }

    @Get('PorDespesa/:id')
    buscarPorId(@Param('id') id: string) {
        return this.despesaService.buscarPorId(+id);
    }

    @Get('PorPainel/:painelId')
    buscarPainelId(@Param('painelId') painelId: string) {
        return this.despesaService.buscarPorPainelId(+painelId);
    }

    @Get('PorCategoria/:painelId/:categoriaDespesaId')
    buscarPainelIdECategoriaDespesaId(
        @Param('painelId') painelId: string,
        @Param('categoriaDespesaId') categoriaDespesaId: string,
    ) {
        return this.despesaService.buscarPorPainelIdECategoriaDespesaId(
            +painelId,
            +categoriaDespesaId,
        );
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDespesaDto: UpdateDespesaDto,
    ) {
        return this.despesaService.atualizar(+id, updateDespesaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.despesaService.deletar(+id);
    }
}
