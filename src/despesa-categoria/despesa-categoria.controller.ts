import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { DespesaCategoriaService } from './despesa-categoria.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('despesa-categoria')
export class DespesaCategoriaController {
    constructor(
        private readonly despesaCategoriaService: DespesaCategoriaService,
    ) {}

    @Post()
    create(@Body() createDespesaCategoriaDto: CreateDespesaCategoriaDto) {
        return this.despesaCategoriaService.create(createDespesaCategoriaDto);
    }

    @Get('usuario/:usuarioId')
    buscarPorUsuarioId(@Param('usuarioId') usuarioId: string) {
        return this.despesaCategoriaService.uscarPorUsuarioId(+usuarioId);
    }

    @Get('grupo-despesa/:grupoDespesaId')
    buscarPorGrupoDespesaId(@Param('grupoDespesaId') grupoDespesaId: string) {
        return this.despesaCategoriaService.buscarPorGrupoDespesaId(
            +grupoDespesaId,
        );
    }

    @Patch(':id')
    atualizar(
        @Param('id') id: string,
        @Body() data: UpdateDespesaCategoriaDto,
    ) {
        return this.despesaCategoriaService.atualizar(+id, data);
    }

    @Delete(':id')
    deletar(@Param('id') id: string) {
        return this.despesaCategoriaService.deletar(+id);
    }
}
