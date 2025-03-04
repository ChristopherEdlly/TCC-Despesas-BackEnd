import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';
import { UpdateUsuarioPainelDto } from './dto/update-usuario-painel.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('usuariopainel')
export class UsuarioPainelController {
    constructor(private readonly usuarioPainelService: UsuarioPainelService) {}

    @Post()
    create(@Body() data: CreateUsuarioPainelDto) {
        return this.usuarioPainelService.adicionarUsuarioAoPainel(data);
    }

    @Get('/ListarUsuariosDoPainel/:id')
    listarUsuariosDoPainel(@Param('id') id: string) {
        return this.usuarioPainelService.listarUsuariosDoPainel(+id);
    }

    @Get('/ListarPaineisDoUsuario')
    listarPaineisDoUsuario(@Req() req) {
        const id = req.user.id;
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
