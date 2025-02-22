import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async create(@Body() data: CreateUsuarioDto) {
        return this.usuarioService.criarUsuario(data);
    }

    @Get()
    async findAll() {
        return this.usuarioService.listarUsuarios();
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
}
