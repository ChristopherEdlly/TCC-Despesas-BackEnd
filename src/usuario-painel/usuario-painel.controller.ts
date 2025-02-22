import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
} from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';
import { UpdateUsuarioPainelDto } from './dto/update-usuario-painel.dto';

@Controller('usuariopainel')
export class UsuarioPainelController {
    constructor(private readonly usuarioPainelService: UsuarioPainelService) {}

    @Post()
    create(@Body() data: CreateUsuarioPainelDto) {
        return this.usuarioPainelService.adicionarUsuarioAoPainel(data);
    }

    @Get()
    findAll() {
        return this.usuarioPainelService.findAll();
    }

    @Get('/ListarUsuariosDoPainel/:id')
    listarUsuariosDoPainel(@Param('id') id: string) {
        return this.usuarioPainelService.listarUsuariosDoPainel(+id);
    }

    @Get('/ListarPaineisDoUsuario/:id')
    listarPaineisDoUsuario(@Param('id') id: string) {
        return this.usuarioPainelService.listarPaineisDoUsuario(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUsuarioPainelDto: UpdateUsuarioPainelDto,
    ) {
        if (!updateUsuarioPainelDto.permissao) {
            throw new BadRequestException('Permissão não informada');
        }
        return this.usuarioPainelService.atualizarPermissao(
            +id,
            updateUsuarioPainelDto.permissao,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usuarioPainelService.removerUsuarioDoPainel(+id);
    }
}
