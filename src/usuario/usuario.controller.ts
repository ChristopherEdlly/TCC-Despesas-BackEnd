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
} from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post('criar')
    async criarUsuario(
        @Body() body: { email: string; senha: string; nome: string },
    ) {
        const usuario = await this.usuarioService.criarUsuario(body);
        return usuario;
    }

    @Get(':nome')
    async findOne(@Param('nome') nome: string) {
        return this.usuarioService.buscarUsuarioPorNome(nome);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: UpdateUsuarioDto) {
        return this.usuarioService.atualizarUsuario(+id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.usuarioService.removerUsuario(+id);
    }

    @Get()
    async buscarPerfil(@Req() req) {
        console.log(
            'Token recebido no servidor:',
            req.headers['authorization'],
        );
        const usuarioId = req.user.id;
        const usuario = await this.usuarioService.buscarPorId(usuarioId);

        if (!usuario) {
            throw new ForbiddenException('Usuário não encontrado.');
        }

        const nomeCompleto = usuario.nome;
        const primeiroNome = nomeCompleto.split(' ')[0];

        return { primeiroNome };
    }
}
