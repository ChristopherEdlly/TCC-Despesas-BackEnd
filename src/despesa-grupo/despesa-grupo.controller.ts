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
import { DespesaGrupoService } from './despesa-grupo.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('despesa-grupo')
export class DespesaGrupoController {
    constructor(private readonly despesaGrupoService: DespesaGrupoService) {}

    @Post()
    create(@Body() createDespesaGrupoDto: CreateDespesaGrupoDto) {
        return this.despesaGrupoService.create(createDespesaGrupoDto);
    }

    @Get(':usuarioId')
    buscarPorUsuarioId(@Param('usuarioId') usuarioId: string) {
        return this.despesaGrupoService.BuscarPorUsuarioId(+usuarioId);
    }

    @Patch(':id')
    atualizar(@Param('id') id: string, @Body() data: UpdateDespesaGrupoDto) {
        return this.despesaGrupoService.Atualizar(+id, data);
    }

    @Delete(':id')
    deletar(@Param('id') id: string) {
        return this.despesaGrupoService.Deletar(+id);
    }
}
