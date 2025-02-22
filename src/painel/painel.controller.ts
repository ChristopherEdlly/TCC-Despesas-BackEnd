import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { PainelService } from './painel.service';
import { CreatePainelDto } from './dto/create-painel.dto';
import { UpdatePainelDto } from './dto/update-painel.dto';

@Controller('painel')
export class PainelController {
    constructor(private readonly painelService: PainelService) {}

    @Post()
    async criarPainel(@Body() data: CreatePainelDto) {
        return this.painelService.criarPainel(data);
    }

    @Get()
    async listarPaineis(
        @Query('usuarioId') usuarioId: string,
        @Query('nome') nome?: string,
    ) {
        const parsedUsuarioId = parseInt(usuarioId, 10);
        return this.painelService.listarPaineisDoUsuario(parsedUsuarioId, nome);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePainelDto: UpdatePainelDto) {
        return this.painelService.atualizarPainel(+id, updatePainelDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.painelService.removerPainel(+id);
    }
}
