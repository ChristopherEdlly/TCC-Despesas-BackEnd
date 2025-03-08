import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('usuario')
@UseGuards(AuthGuard)
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Get(':nome')
    async PesquisarUsuarios(@Param('nome') nome: string, @Req() req) {
        return this.usuarioService.buscarUsuarioPorNome(nome);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() data: UpdateUsuarioDto,
        @Req() req,
    ) {
        const usuarioId = req.user.id;

        if (id !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para editar este usuario.',
            );
        }

        return this.usuarioService.atualizarUsuario(+id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Req() req) {
        const usuarioId = req.user.id;
        if (id !== usuarioId) {
            throw new ForbiddenException(
                'Usuário não tem permissão para deletar esta esse usuario.',
            );
        }

        return this.usuarioService.removerUsuario(+id);
    }

    @Get()
    async buscarPerfil(@Req() req) {
        const usuarioId = req.user.id;
        const usuario = await this.usuarioService.buscarPorId(usuarioId);

        if (!usuario) {
            throw new ForbiddenException('Usuário não encontrado.');
        }

        const nomeCompleto = usuario.nome;
        const primeiroNome = nomeCompleto.split(' ')[0];

        return { primeiroNome };
    }

    @Get('email/:email')
    async buscarPorEmail(@Param('email') email: string) {
        return this.usuarioService.buscarUsuarioPorEmail(email);
    }
}
