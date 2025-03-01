import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Req as Request,
    Req,
} from '@nestjs/common';
import { PainelService } from './painel.service';
import { CreatePainelDto } from './dto/create-painel.dto';
import { UpdatePainelDto } from './dto/update-painel.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('painel')
export class PainelController {
    constructor(private readonly painelService: PainelService) {}

    @Post()
    async criarPainel(@Body() data: CreatePainelDto, @Req() req) {
        const usuarioId = req.user.sub; // Pega o id do usuário do token
        return this.painelService.criarPainel({ ...data, usuarioId });
    }

    @Get()
    async listarPaineis(@Req() req, @Query('nome') nome?: string) {
        const usuarioId = req.user.sub; // Pega o id do usuário do token
        return this.painelService.listarPaineisDoUsuario(usuarioId, nome);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePainelDto: UpdatePainelDto,
        @Req() req,
    ) {
        const usuarioId = req.user.sub; // Pega o id do usuário do token
        return this.painelService.atualizarPainel(
            +id,
            updatePainelDto,
            usuarioId,
        );
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Req() req) {
        const usuarioId = req.user.sub; // Pega o id do usuário do token
        return this.painelService.removerPainel(+id, usuarioId);
    }
}
